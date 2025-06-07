
'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Desktop Configuration: Persistent, soft, glowing globules with rich effects
const desktopConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 512, // Higher for desktop detail
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 0.998, // Very persistent for desktop "globules"
  VELOCITY_DISSIPATION: 0.999, // Very persistent
  PRESSURE: 0.7, // Softer pressure for desktop
  PRESSURE_ITERATIONS: 20,
  CURL: 30, // More swirling for desktop
  SPLAT_RADIUS: 0.35, // Adjusted for globule feel
  SPLAT_FORCE: 6000, // Force for desktop interactions
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
  RANDOM_BLAST_INTERVAL: 1200, // Frequent random blasts for desktop
};

// Mobile Configuration: Optimized for performance, touch responsive, still fluid with random blasts
const mobileConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 64, // Lower for mobile performance
  DYE_RESOLUTION: 128, // Further reduced for mobile performance
  CAPTURE_RESOLUTION: 256, // Lowered
  DENSITY_DISSIPATION: 0.96, // Lowered for more visible & lasting touch splats
  VELOCITY_DISSIPATION: 0.965, // Lowered for more visible & lasting touch splats
  PRESSURE: 0.8, // Standard pressure
  PRESSURE_ITERATIONS: 3, // Reduced for performance
  CURL: 3, // Reduced significantly for performance
  SPLAT_RADIUS: 0.75, // Larger splat for touch visibility
  SPLAT_FORCE: 8000, // More impactful touch
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BLOOM: false, // Disabled for performance
  BLOOM_ITERATIONS: 0,
  BLOOM_RESOLUTION: 0,
  BLOOM_INTENSITY: 0,
  BLOOM_THRESHOLD: 0,
  BLOOM_SOFT_KNEE: 0,
  SUNRAYS: false, // Disabled for performance
  SUNRAYS_RESOLUTION: 0,
  SUNRAYS_WEIGHT: 0,
  RANDOM_BLAST_INTERVAL: 1500, // Frequent blasts for mobile
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
            if (canvasRef.current) {
              setSimulationReady(true);
            }
          }, 50);
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
  }, [isMobile]);


  // Effect for initial and random blasts
  useEffect(() => {
    if (!simulationReady || !canvasRef.current || !canvasRef.current.pointer) return;

    const currentCanvas = canvasRef.current;
    const { clientWidth: width, clientHeight: height } = currentCanvas;

    if (width === 0 || height === 0) {
      console.warn("FluidCursor: Canvas dimensions are zero, skipping initial/random blasts for now.");
      return;
    }

    const numInitialSplats = isMobile ? 2 : 4;
    for (let i = 0; i < numInitialSplats; i++) {
      setTimeout(() => {
        if (canvasRef.current && canvasRef.current.pointer) {
          const randomX = width * (0.3 + Math.random() * 0.4);
          const randomY = height * (0.3 + Math.random() * 0.4);
          canvasRef.current.pointer.move(randomX, randomY);
          canvasRef.current.pointer.down(randomX, randomY);
          setTimeout(() => {
             if (canvasRef.current && canvasRef.current.pointer) {
                canvasRef.current.pointer.up(randomX, randomY);
             }
          }, 100 + Math.random() * 150);
        }
      }, i * 150 + (isMobile ? 300 : 200));
    }

    const randomBlastIntervalConfig = isMobile ? mobileConfig.RANDOM_BLAST_INTERVAL : desktopConfig.RANDOM_BLAST_INTERVAL;

    const intervalId = setInterval(() => {
      if (canvasRef.current && canvasRef.current.pointer && document.hasFocus()) {
        const randomX = Math.random() * width;
        const randomY = Math.random() * height;

        canvasRef.current.pointer.move(randomX, randomY);
        canvasRef.current.pointer.down(randomX, randomY);

        setTimeout(() => {
          if (canvasRef.current && canvasRef.current.pointer) {
            canvasRef.current.pointer.up(randomX, randomY);
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

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 0 && canvasRef.current && canvasRef.current.pointer) {
        const touch = event.touches[0];
        canvasRef.current.pointer.move(touch.clientX, touch.clientY);
        canvasRef.current.pointer.down(touch.clientX, touch.clientY);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0 && canvasRef.current && canvasRef.current.pointer) {
        const touch = event.touches[0];
        canvasRef.current.pointer.move(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      for (let i = 0; i < event.changedTouches.length; i++) {
        if (canvasRef.current && canvasRef.current.pointer) {
          const touch = event.changedTouches[i];
          canvasRef.current.pointer.up(touch.clientX, touch.clientY);
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
        pointerEvents: isMobile ? 'none' : 'auto', // Conditional pointer-events
      }}
    />
  );
};

export default FluidCursor;
