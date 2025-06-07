
'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Base Desktop Configuration for a more persistent and richer fluid effect
const desktopConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 512,
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 0.998,     // Very slow dissipation for color
  VELOCITY_DISSIPATION: 0.999,    // Very slow dissipation for motion
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 20,
  CURL: 30,                       // Increased for more inherent swirls
  SPLAT_RADIUS: 0.35,             // Slightly adjusted for a good "press" feel
  SPLAT_FORCE: 6000,
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BLOOM: true,
  BLOOM_ITERATIONS: 8,
  BLOOM_RESOLUTION: 256,
  BLOOM_INTENSITY: 0.8,
  BLOOM_THRESHOLD: 0.6,
  BLOOM_SOFT_KNEE: 0.7,
  SUNRAYS: true,
  SUNRAYS_RESOLUTION: 196,
  SUNRAYS_WEIGHT: 1.0,            // Sunrays more prominent
};

// Mobile will now use a simple CSS cursor, WebGL is disabled for performance.
// The mobileConfig for webgl-fluid is no longer used directly for rendering.

const FluidCursor: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile(); // This hook will return undefined initially, then boolean
  
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isMobile === undefined) return; // Wait for isMobile to be determined

    if (isMobile) {
      // Mobile: Setup simple CSS cursor
      const handleMouseMove = (e: MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
      };
      const handleMouseLeave = () => {
        setIsVisible(false);
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'none'; // Ensure system cursor is hidden

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.body.style.cursor = 'auto'; // Restore system cursor on unmount
      };

    } else {
      // Desktop: Initialize WebGL Fluid Simulation
      if (!canvasRef.current) return;
      document.body.style.cursor = 'none';

      import('webgl-fluid')
        .then(module => {
          const webGLFluid = module.default;
          if (canvasRef.current && webGLFluid) {
            // @ts-ignore webGLFluid expects a config object
            webGLFluid(canvasRef.current, desktopConfig);
          }
        })
        .catch(error => {
          console.error("Failed to load webgl-fluid:", error);
        });
      
      return () => {
         document.body.style.cursor = 'auto'; 
      }
    }
  }, [isMobile, isVisible]); // Re-run if isMobile changes or visibility (for mobile)

  if (isMobile === undefined) {
    return null; // Don't render anything until we know if it's mobile or desktop
  }

  if (isMobile) {
    // Render simple CSS dot for mobile
    return (
      <div
        style={{
          position: 'fixed',
          top: cursorPos.y,
          left: cursorPos.x,
          width: '8px',
          height: '8px',
          backgroundColor: 'hsl(var(--accent))', // Use accent color
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease-out',
        }}
      />
    );
  }

  // Render WebGL canvas for desktop
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
        zIndex: 0, // Behind UI elements but visible
      }}
    />
  );
};

export default FluidCursor;
