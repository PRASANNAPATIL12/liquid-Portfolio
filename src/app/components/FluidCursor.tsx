
'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Helper function to parse HSL string and convert to RGB object for the library
const hslToRgb = (hslStr: string): { r: number; g: number; b: number } => {
  const regex = /hsl\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*\)/;
  const match = hslStr.match(regex);

  if (!match) {
    return { r: 0.5, g: 0.5, b: 0.5 }; // Default color if parse fails
  }

  let h = parseInt(match[1], 10);
  let s = parseInt(match[2].replace('%', ''), 10) / 100;
  let l = parseInt(match[3].replace('%', ''), 10) / 100;

  if (s === 0) {
    return { r: l, g: l, b: l }; // achromatic
  } else {
    const hueToRgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    h /= 360;
    const r = hueToRgb(p, q, h + 1 / 3);
    const g = hueToRgb(p, q, h);
    const b = hueToRgb(p, q, h - 1 / 3);
    return { r, g, b };
  }
};


const FluidCursor: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  const [accentColorRgb, setAccentColorRgb] = useState({ r: 0.0, g: 0.7, b: 0.9 }); // Default fallback

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);
      const accentHsl = computedStyle.getPropertyValue('--accent').trim();
      if (accentHsl) {
         // HSL values in globals.css are space-separated numbers for hue, saturation%, lightness%
         // e.g. --accent: 259 90% 65%;
        const [h, s, l] = accentHsl.split(" ").map(val => val.trim());
        if (h && s && l) {
            setAccentColorRgb(hslToRgb(`hsl(${h}, ${s}, ${l})`));
        }
      }
    }
  }, []);


  useEffect(() => {
    if (isMobile || !canvasRef.current) {
      return;
    }

    // Dynamically import the library
    import('webgl-fluid')
      .then(module => {
        const webGLFluid = module.default;
        if (canvasRef.current && webGLFluid) {
          const config = {
            TRANSPARENT: true,
            SIM_RESOLUTION: 128,
            DYE_RESOLUTION: 512, 
            CAPTURE_RESOLUTION: 512,
            DENSITY_DISSIPATION: 0.97, // How quickly the "dye" fades
            VELOCITY_DISSIPATION: 0.98, // How quickly movement slows down
            PRESSURE: 0.8,
            PRESSURE_ITERATIONS: 20,
            CURL: 20, // Amount of curl noise, adds turbulence
            SPLAT_RADIUS: 0.35, // Radius of interaction
            SPLAT_FORCE: 5000, // Force of interaction
            // SHADING: true, // Causes issues with transparency sometimes
            COLORFUL: true, // Uses random splat colors, try false and SPLAT_COLOR for specific theme color
            // SPLAT_COLOR: accentColorRgb, // Use if COLORFUL is false
            COLOR_UPDATE_SPEED: 10,
            PAUSED: false,
            BLOOM: true,
            BLOOM_ITERATIONS: 8,
            BLOOM_RESOLUTION: 256,
            BLOOM_INTENSITY: 0.6,
            BLOOM_THRESHOLD: 0.5,
            BLOOM_SOFT_KNEE: 0.7,
            SUNRAYS: true,
            SUNRAYS_RESOLUTION: 196,
            SUNRAYS_WEIGHT: 0.8,
          };
          // @ts-ignore webGLFluid expects a config object, types might not be perfect
          webGLFluid(canvasRef.current, config);
        }
      })
      .catch(error => {
        console.error("Failed to load webgl-fluid:", error);
      });

    // No explicit cleanup method is provided by the library for the simulation instance.
    // The canvas and its context will be garbage collected when the component unmounts.
  }, [isMobile, accentColorRgb]);

  if (isMobile) {
    return null; // Don't render anything on mobile
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none', // The library handles mouse interactions on the canvas internally
        zIndex: 0, // Render above solid background but below other UI content
      }}
    />
  );
};

export default FluidCursor;
