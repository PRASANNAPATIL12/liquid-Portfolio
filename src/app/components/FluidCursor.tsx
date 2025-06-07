
'use client';

import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Helper function to parse HSL string and convert to RGB object for the library
// This is kept in case a non-COLORFUL mode is used in the future with SPLAT_COLOR
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


const desktopConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 512, 
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 0.99, // Increased for longer persistence
  VELOCITY_DISSIPATION: 0.995, // Increased for longer persistence & continuous feel
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 20,
  CURL: 25, // Increased for more turbulence
  SPLAT_RADIUS: 0.4, // Adjusted for "pressed" feel
  SPLAT_FORCE: 5000, 
  COLORFUL: true, 
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BLOOM: true,
  BLOOM_ITERATIONS: 8,
  BLOOM_RESOLUTION: 256,
  BLOOM_INTENSITY: 0.7, // Slightly increased bloom
  BLOOM_THRESHOLD: 0.5,
  BLOOM_SOFT_KNEE: 0.7,
  SUNRAYS: true,
  SUNRAYS_RESOLUTION: 196,
  SUNRAYS_WEIGHT: 0.8,
};

const mobileConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 64,        // Reduced for mobile performance
  DYE_RESOLUTION: 256,       // Reduced
  CAPTURE_RESOLUTION: 256,   // Reduced
  DENSITY_DISSIPATION: 0.98, // Slightly faster dissipation
  VELOCITY_DISSIPATION: 0.985,// Slightly faster dissipation
  PRESSURE: 0.7,             // Slightly reduced
  PRESSURE_ITERATIONS: 15,   // Reduced
  CURL: 10,                  // Reduced turbulence
  SPLAT_RADIUS: 0.6,         // Larger for touch interaction
  SPLAT_FORCE: 3000,         // Reduced force
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BLOOM: true,
  BLOOM_ITERATIONS: 4,       // Reduced
  BLOOM_RESOLUTION: 128,     // Reduced
  BLOOM_INTENSITY: 0.4,      // Reduced
  BLOOM_THRESHOLD: 0.6,
  BLOOM_SOFT_KNEE: 0.7,
  SUNRAYS: true,
  SUNRAYS_RESOLUTION: 96,    // Reduced
  SUNRAYS_WEIGHT: 0.4,       // Reduced
};


const FluidCursor: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  // accentColorRgb state is kept for potential future use if COLORFUL is set to false
  // const [accentColorRgb, setAccentColorRgb] = useState({ r: 0.0, g: 0.7, b: 0.9 });

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const computedStyle = getComputedStyle(document.documentElement);
  //     const accentHsl = computedStyle.getPropertyValue('--accent').trim();
  //     if (accentHsl) {
  //       const [h, s, l] = accentHsl.split(" ").map(val => val.trim());
  //       if (h && s && l) {
  //           setAccentColorRgb(hslToRgb(`hsl(${h}, ${s}, ${l})`));
  //       }
  //     }
  //   }
  // }, []);


  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const currentConfig = isMobile ? mobileConfig : desktopConfig;

    import('webgl-fluid')
      .then(module => {
        const webGLFluid = module.default;
        if (canvasRef.current && webGLFluid) {
          // @ts-ignore webGLFluid expects a config object, types might not be perfect
          webGLFluid(canvasRef.current, currentConfig);
        }
      })
      .catch(error => {
        console.error("Failed to load webgl-fluid:", error);
      });

  }, [isMobile]); // Re-run effect if isMobile changes, though this usually happens once.

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none', 
        zIndex: 0, 
      }}
    />
  );
};

export default FluidCursor;
