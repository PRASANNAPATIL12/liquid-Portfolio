
'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Desktop Configuration: Globule-like, persistent, soft, glowing, drifting
const desktopConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 512, // Higher for desktop clarity
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 0.998, // Very persistent
  VELOCITY_DISSIPATION: 0.999, // Very persistent
  PRESSURE: 0.7, // Softer pressure
  PRESSURE_ITERATIONS: 20,
  CURL: 40, // Increased curl for more drift
  SPLAT_RADIUS: 0.5, // Larger, softer splats for desktop
  SPLAT_FORCE: 5500, // Softer force for desktop
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
  RANDOM_BLAST_INTERVAL: 1500, // Slightly less frequent than previous to let globules "live"
};

// Mobile Configuration: Optimized for touch visibility and performance
const mobileConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 64,       // Kept low for performance
  DYE_RESOLUTION: 128,      // Lowered for performance
  CAPTURE_RESOLUTION: 256,  // Lowered for performance
  DENSITY_DISSIPATION: 0.93, // Lowered for longer lasting splats
  VELOCITY_DISSIPATION: 0.94,// Lowered for longer lasting movement
  PRESSURE: 0.8,            // Standard pressure
  PRESSURE_ITERATIONS: 3,   // Reduced for performance
  CURL: 5,                  // Reduced curl for mobile
  SPLAT_RADIUS: 1.2,        // Significantly Increased for better touch visibility
  SPLAT_FORCE: 12000,       // Significantly Increased for more impact from touch
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BLOOM: false,             // Disabled for performance
  BLOOM_ITERATIONS: 0,
  BLOOM_RESOLUTION: 0,
  BLOOM_INTENSITY: 0,
  BLOOM_THRESHOLD: 0,
  BLOOM_SOFT_KNEE: 0,
  SUNRAYS: false,           // Disabled for performance
  SUNRAYS_RESOLUTION: 0,
  SUNRAYS_WEIGHT: 0,
  RANDOM_BLAST_INTERVAL: 1200, // More frequent to keep it active
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
    if (isMobile === undefined) return; // Wait for isMobile to be determined

    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;

    document.body.style.cursor = isMobile ? 'auto' : 'none';

    let fluidInstance: any = null;
    const selectedConfig = isMobile ? mobileConfig : desktopConfig;

    import('webgl-fluid')
      .then(module => {
        fluidInstance = module.default;
        if (canvasRef.current && fluidInstance) { // Check ref again inside promise
          fluidInstance(canvasRef.current, selectedConfig);
          // Add a small delay before marking simulation as ready
          setTimeout(() => {
            if (canvasRef.current) { // Ensure canvas still exists
               setSimulationReady(true);
            }
          }, 100); // Small delay to allow full init
        }
      })
      .catch(error => {
        console.error("Failed to load webgl-fluid:", error);
        document.body.style.cursor = 'auto'; // Fallback if fluid fails
      });

    // Cleanup on unmount or when isMobile changes (due to canvas key change)
    return () => {
      document.body.style.cursor = 'auto';
      setSimulationReady(false);
      // webgl-fluid doesn't have a destroy method, re-keying the canvas handles cleanup.
    };
  }, [isMobile]); // Re-run if isMobile changes (key on canvas handles re-mount)


  // Effect for initial and random blasts
  useEffect(() => {
    if (!simulationReady || !canvasRef.current || !canvasRef.current.pointer) return;

    const currentCanvas = canvasRef.current;
    const pointerAPI = currentCanvas.pointer;
    
    // Ensure canvas has dimensions before attempting splats
    if (currentCanvas.clientWidth === 0 || currentCanvas.clientHeight === 0) {
        console.warn("FluidCursor: Canvas dimensions are zero, skipping initial/random blasts for now.");
        return;
    }


    const { clientWidth: width, clientHeight: height } = currentCanvas;

    const numInitialSplats = isMobile ? 2 : 4; // Fewer initial for mobile
    for (let i = 0; i < numInitialSplats; i++) {
      setTimeout(() => {
        // Check pointerAPI still exists before using it
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
      }, i * 150 + (isMobile ? 300 : 200)); // Delay initial splats slightly more on mobile
    }

    const randomBlastIntervalConfig = isMobile ? mobileConfig.RANDOM_BLAST_INTERVAL : desktopConfig.RANDOM_BLAST_INTERVAL;

    const intervalId = setInterval(() => {
      if (canvasRef.current && canvasRef.current.pointer && document.hasFocus()) {
        const { clientWidth: currentWidth, clientHeight: currentHeight } = canvasRef.current;
        if (currentWidth === 0 || currentHeight === 0) return; // Prevent splat if canvas is not visible

        const randomX = Math.random() * currentWidth;
        const randomY = Math.random() * currentHeight;

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
  }, [simulationReady, isMobile]); // Re-run if simulation becomes ready or mobile state changes

  // Effect for global touch listeners on mobile
  useEffect(() => {
    if (!isMobile || !simulationReady || !canvasRef.current || !canvasRef.current.pointer) {
      return;
    }
    
    const pointerAPI = canvasRef.current.pointer;

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
      // Process up for all changed touches to handle multi-touch scenarios better
      for (let i = 0; i < event.changedTouches.length; i++) {
        if (canvasRef.current && canvasRef.current.pointer) {
          const touch = event.changedTouches[i];
          // Call up at the specific touch's last coordinates
          canvasRef.current.pointer.up(touch.clientX, touch.clientY);
        }
      }
    };

    document.documentElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.documentElement.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.documentElement.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.documentElement.addEventListener('touchcancel', handleTouchEnd, { passive: true }); // Also handle touchcancel

    return () => {
      document.documentElement.removeEventListener('touchstart', handleTouchStart);
      document.documentElement.removeEventListener('touchmove', handleTouchMove);
      document.documentElement.removeEventListener('touchend', handleTouchEnd);
      document.documentElement.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [isMobile, simulationReady]); // Re-run if mobile state or simulation readiness changes

  if (isMobile === undefined) {
    return null; // Don't render anything until we know if it's mobile or desktop
  }

  return (
    <canvas
      // Crucial: Change key on mobile/desktop switch to force re-mount and re-initialization of webgl-fluid
      key={isMobile ? 'mobile-fluid-canvas' : 'desktop-fluid-canvas'}
      ref={canvasRef}
      id="webgl-fluid-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0, // Behind other content
        // Desktop: canvas interacts with mouse. Mobile: canvas ignores direct touch, global listeners used.
        pointerEvents: isMobile ? 'none' : 'auto', 
      }}
    />
  );
};

export default FluidCursor;
