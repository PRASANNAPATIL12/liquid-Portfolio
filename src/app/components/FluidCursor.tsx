
'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Desktop Configuration: Persistent, soft, glowing globules with rich effects
const desktopConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 512, 
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 0.998, 
  VELOCITY_DISSIPATION: 0.999,
  PRESSURE: 0.7, 
  PRESSURE_ITERATIONS: 20,
  CURL: 30, 
  SPLAT_RADIUS: 0.35, 
  SPLAT_FORCE: 5000, 
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
  RANDOM_BLAST_INTERVAL: 1200, 
};

// Mobile Configuration: Optimized for performance, touch responsive, still fluid with random blasts
const mobileConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 64, 
  DYE_RESOLUTION: 256, // Reduced further
  CAPTURE_RESOLUTION: 256,
  DENSITY_DISSIPATION: 0.97, 
  VELOCITY_DISSIPATION: 0.975,
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 5, // Reduced
  CURL: 10, // Reduced
  SPLAT_RADIUS: 0.7, 
  SPLAT_FORCE: 7000, // Increased for more touch impact
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BLOOM: false, 
  BLOOM_ITERATIONS: 0,
  BLOOM_RESOLUTION: 0,
  BLOOM_INTENSITY: 0,
  BLOOM_THRESHOLD: 0,
  BLOOM_SOFT_KNEE: 0,
  SUNRAYS: false, 
  SUNRAYS_RESOLUTION: 0,
  SUNRAYS_WEIGHT: 0,
  RANDOM_BLAST_INTERVAL: 1500, 
};

interface FluidCanvasElement extends HTMLCanvasElement {
  fluid?: {
    simulationPaused: boolean;
  };
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
    
    document.body.style.cursor = 'none'; 
    
    let fluidInstance: any = null;
    const selectedConfig = isMobile ? mobileConfig : desktopConfig;

    import('webgl-fluid')
      .then(module => {
        fluidInstance = module.default;
        if (currentCanvas && fluidInstance) {
          fluidInstance(currentCanvas, selectedConfig);
          // Add a small delay before setting simulationReady
          setTimeout(() => {
            if (canvasRef.current) { // Check if component is still mounted
              setSimulationReady(true); 
            }
          }, 50); // 50ms delay
        }
      })
      .catch(error => {
        console.error("Failed to load webgl-fluid:", error);
        document.body.style.cursor = 'auto'; 
      });

    return () => {
      document.body.style.cursor = 'auto';
      setSimulationReady(false);
      // Future: if webgl-fluid instance has a destroy method, call it here.
      // e.g., if (currentCanvas && currentCanvas.fluid && typeof currentCanvas.fluid.destroy === 'function') {
      //   currentCanvas.fluid.destroy();
      // }
      // currentCanvas.fluid = undefined; // Clear custom properties
      // currentCanvas.pointer = undefined;
    };
  }, [isMobile]);


  // Effect for initial and random blasts
  useEffect(() => {
    if (!simulationReady || !canvasRef.current || !canvasRef.current.pointer) return;

    const currentCanvas = canvasRef.current;
    const pointerAPI = currentCanvas.pointer;
    if (!pointerAPI) return; 

    const { clientWidth: width, clientHeight: height } = currentCanvas;

    if (width === 0 || height === 0) {
      console.warn("FluidCursor: Canvas dimensions are zero, skipping initial/random blasts for now.");
      return;
    }

    // Initial blast
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
  }, [simulationReady, isMobile]); // canvasRef is stable, pointerAPI derived from it

  // Effect for global touch listeners on mobile
  useEffect(() => {
    if (!isMobile || !simulationReady || !canvasRef.current || !canvasRef.current.pointer) {
      return;
    }

    const currentCanvas = canvasRef.current;
    const pointerAPI = currentCanvas.pointer;
    if (!pointerAPI) return;

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        pointerAPI.move(touch.clientX, touch.clientY);
        pointerAPI.down(touch.clientX, touch.clientY);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        pointerAPI.move(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      // Iterate over all touches that were lifted
      for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        pointerAPI.up(touch.clientX, touch.clientY);
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
  }, [isMobile, simulationReady]); // canvasRef and pointerAPI dependencies covered by simulationReady check

  if (isMobile === undefined) {
    return null; 
  }

  return (
    <canvas
      ref={canvasRef}
      id="webgl-fluid-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0, 
      }}
    />
  );
};

export default FluidCursor;
