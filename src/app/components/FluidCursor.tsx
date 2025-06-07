
'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Desktop Configuration: Globule-like, persistent, soft, glowing, drifting
const desktopConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 512,
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 0.998, // Very persistent
  VELOCITY_DISSIPATION: 0.999, // Very persistent
  PRESSURE: 0.7, // Softer pressure
  PRESSURE_ITERATIONS: 20,
  CURL: 35, // Increased curl for more drift
  SPLAT_RADIUS: 0.45, // Larger, softer splats
  SPLAT_FORCE: 5000, // Softer force
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BLOOM: true,
  BLOOM_ITERATIONS: 10,
  BLOOM_RESOLUTION: 256,
  BLOOM_INTENSITY: 0.9,
  BLOOM_THRESHOLD: 0.5,
  BLOOM_SOFT_KNEE: 0.7,
  SUNRAYS: true,
  SUNRAYS_RESOLUTION: 196,
  SUNRAYS_WEIGHT: 0.7,
  RANDOM_BLAST_INTERVAL: 1200, // More frequent random blasts
};

// Mobile Configuration: Optimized for touch visibility and performance
const mobileConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 64,
  DYE_RESOLUTION: 128, // Kept low
  CAPTURE_RESOLUTION: 256,
  DENSITY_DISSIPATION: 0.955, // Slightly lowered for more visible touch splats
  VELOCITY_DISSIPATION: 0.96, // Slightly lowered for more visible touch splats
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 3, // Reduced
  CURL: 3, // Significantly reduced
  SPLAT_RADIUS: 0.85, // Increased for better touch visibility
  SPLAT_FORCE: 9000,  // Increased for more impact
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BLOOM: false, // Disabled
  BLOOM_ITERATIONS: 0,
  BLOOM_RESOLUTION: 0,
  BLOOM_INTENSITY: 0,
  BLOOM_THRESHOLD: 0,
  BLOOM_SOFT_KNEE: 0,
  SUNRAYS: false, // Disabled
  SUNRAYS_RESOLUTION: 0,
  SUNRAYS_WEIGHT: 0,
  RANDOM_BLAST_INTERVAL: 1500, // Frequent for mobile
};


interface FluidCanvasElement extends HTMLCanvasElement {
  fluid?: {
    simulationPaused: boolean;
  };
  // The pointer object is attached by webgl-fluid
  pointer?: {
    down: (x: number, y: number) => void;
    move: (x: number, y: number) => void;
    up: (x: number, y: number) => void;
  };
}

const FluidCursor: FC = () => {
  const canvasRef = useRef<FluidCanvasElement>(null);
  const isMobile = useIsMobile();
  const [simulationReady, setSimulationReady] = useState(false);

  useEffect(() => {
    if (isMobile === undefined) return;

    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;

    document.body.style.cursor = isMobile ? 'auto' : 'none'; // No custom cursor for mobile default

    let fluidInstance: any = null;
    const selectedConfig = isMobile ? mobileConfig : desktopConfig;

    import('webgl-fluid')
      .then(module => {
        fluidInstance = module.default;
        if (currentCanvas && fluidInstance) {
          fluidInstance(currentCanvas, selectedConfig);
          setTimeout(() => {
            if (canvasRef.current) { // Check ref still exists
              setSimulationReady(true);
            }
          }, 100); 
        }
      })
      .catch(error => {
        console.error("Failed to load webgl-fluid:", error);
        document.body.style.cursor = 'auto';
      });

    return () => {
      document.body.style.cursor = 'auto';
      setSimulationReady(false);
    };
  }, [isMobile]); // Re-run if isMobile changes (key on canvas handles re-mount)


  // Effect for initial and random blasts
  useEffect(() => {
    if (!simulationReady || !canvasRef.current || !canvasRef.current.pointer) return;

    const currentCanvas = canvasRef.current;
    const { clientWidth: width, clientHeight: height } = currentCanvas;

    if (width === 0 || height === 0) {
      console.warn("FluidCursor: Canvas dimensions are zero, skipping initial/random blasts for now.");
      return;
    }
    
    const pointerAPI = canvasRef.current.pointer;

    const numInitialSplats = isMobile ? 2 : 4;
    for (let i = 0; i < numInitialSplats; i++) {
      setTimeout(() => {
        if (pointerAPI) { // Check pointerAPI still exists
          const randomX = width * (0.3 + Math.random() * 0.4);
          const randomY = height * (0.3 + Math.random() * 0.4);
          pointerAPI.move(randomX, randomY);
          pointerAPI.down(randomX, randomY);
          setTimeout(() => {
             if (pointerAPI) { // Check pointerAPI still exists
                pointerAPI.up(randomX, randomY);
             }
          }, 100 + Math.random() * 150);
        }
      }, i * 150 + (isMobile ? 300 : 200));
    }

    const randomBlastIntervalConfig = isMobile ? mobileConfig.RANDOM_BLAST_INTERVAL : desktopConfig.RANDOM_BLAST_INTERVAL;

    const intervalId = setInterval(() => {
      if (pointerAPI && document.hasFocus()) { // Check pointerAPI still exists
        const randomX = Math.random() * width;
        const randomY = Math.random() * height;

        pointerAPI.move(randomX, randomY);
        pointerAPI.down(randomX, randomY);

        setTimeout(() => {
          if (pointerAPI) { // Check pointerAPI still exists
            pointerAPI.up(randomX, randomY);
          }
        }, 70 + Math.random() * 80);
      }
    }, randomBlastIntervalConfig);

    return () => {
      clearInterval(intervalId);
    };
  }, [simulationReady, isMobile]);

  // Effect for global touch listeners on mobile
  useEffect(() => {
    if (!isMobile || !simulationReady || !canvasRef.current || !canvasRef.current.pointer) {
      return;
    }
    
    const pointerAPI = canvasRef.current.pointer;

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 0 && pointerAPI) {
        const touch = event.touches[0];
        pointerAPI.move(touch.clientX, touch.clientY);
        pointerAPI.down(touch.clientX, touch.clientY);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0 && pointerAPI) {
        const touch = event.touches[0];
        pointerAPI.move(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      for (let i = 0; i < event.changedTouches.length; i++) {
        if (pointerAPI) {
          const touch = event.changedTouches[i];
          pointerAPI.up(touch.clientX, touch.clientY);
        }
      }
    };

    document.documentElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.documentElement.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.documentElement.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.documentElement.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      document.documentElement.removeEventListener('touchstart', handleTouchStart);
      document.documentElement.removeEventListener('touchmove', handleTouchMove);
      document.documentElement.removeEventListener('touchend', handleTouchEnd);
      document.documentElement.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [isMobile, simulationReady]);

  if (isMobile === undefined) {
    return null;
  }

  return (
    <canvas
      key={isMobile ? 'mobile-fluid-canvas' : 'desktop-fluid-canvas'}
      ref={canvasRef}
      id="webgl-fluid-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: isMobile ? 'none' : 'auto', 
      }}
    />
  );
};

export default FluidCursor;
