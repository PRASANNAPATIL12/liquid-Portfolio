
'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Desktop Configuration: Persistent, soft, glowing globules
const desktopConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 512,
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 0.998, // Longer lasting
  VELOCITY_DISSIPATION: 0.999, // Longer lasting
  PRESSURE: 0.7, // Softer pressure
  PRESSURE_ITERATIONS: 20,
  CURL: 30, // More inherent swirl
  SPLAT_RADIUS: 0.35, // Default splat size
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
};

// Mobile Configuration: Optimized for performance, still fluid with random blasts
const mobileConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 64,        // Lowered
  DYE_RESOLUTION: 128,       // Lowered further
  CAPTURE_RESOLUTION: 256,
  DENSITY_DISSIPATION: 0.98, // Fades a bit faster
  VELOCITY_DISSIPATION: 0.985,
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 5,   // Reduced significantly
  CURL: 5,                  // Reduced curl
  SPLAT_RADIUS: 0.5,
  SPLAT_FORCE: 3000,
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
    
    // Hide system cursor for WebGL effect on desktop, allow default on mobile initially
    // This will be overridden by global styles for webgl-fluid-canvas if needed
    document.body.style.cursor = isMobile ? 'auto' : 'none'; 
    
    let fluidInstance: any = null;
    const selectedConfig = isMobile ? mobileConfig : desktopConfig;

    import('webgl-fluid')
      .then(module => {
        fluidInstance = module.default;
        if (currentCanvas && fluidInstance) {
          fluidInstance(currentCanvas, selectedConfig);
          setSimulationReady(true); 
        }
      })
      .catch(error => {
        console.error("Failed to load webgl-fluid:", error);
        document.body.style.cursor = 'auto'; 
      });

    return () => {
      document.body.style.cursor = 'auto';
      setSimulationReady(false);
      // Consider if fluidInstance needs a destroy method if library provides one
    };
  }, [isMobile]);


  // Effect for initial and random blasts
  useEffect(() => {
    if (!simulationReady || !canvasRef.current || !canvasRef.current.pointer) return;

    const currentCanvas = canvasRef.current;
    const { clientWidth: width, clientHeight: height } = currentCanvas;

    // Initial blast
    const numInitialSplats = isMobile ? 2 : 4; 
    for (let i = 0; i < numInitialSplats; i++) {
      setTimeout(() => {
        if (currentCanvas.pointer) {
          const randomX = width * (0.3 + Math.random() * 0.4); 
          const randomY = height * (0.3 + Math.random() * 0.4);
          currentCanvas.pointer.move(randomX, randomY);
          currentCanvas.pointer.down(randomX, randomY);
          setTimeout(() => currentCanvas.pointer?.up(randomX, randomY), 100 + Math.random() * 150);
        }
      }, i * 150 + (isMobile ? 300 : 200)); 
    }
    
    // Random blasts interval
    const randomBlastInterval = isMobile ? 2500 : 1200; // More frequent on desktop
    
    const intervalId = setInterval(() => {
      if (currentCanvas.pointer) {
        const randomX = Math.random() * width;
        const randomY = Math.random() * height;
        
        currentCanvas.pointer.move(randomX, randomY);
        currentCanvas.pointer.down(randomX, randomY);
        
        setTimeout(() => currentCanvas.pointer?.up(randomX, randomY), 70 + Math.random() * 80);
      }
    }, randomBlastInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [simulationReady, isMobile, canvasRef]);

  // Effect for global touch listeners on mobile
  useEffect(() => {
    if (!isMobile || !simulationReady || !canvasRef.current || !canvasRef.current.pointer) {
      return;
    }

    const currentCanvas = canvasRef.current;
    // Ensure pointer API is available before attaching listeners
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
      if (event.changedTouches.length > 0) {
        const touch = event.changedTouches[0];
        pointerAPI.up(touch.clientX, touch.clientY);
      } else {
        // Fallback if no changedTouches, pass arbitrary coords or last known if stored
        pointerAPI.up(0,0); 
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
  }, [isMobile, simulationReady, canvasRef]);


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
        // pointerEvents: 'none', // Removed to allow direct cursor/touch interaction on canvas
      }}
    />
  );
};

export default FluidCursor;

