
'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Desktop Configuration: Persistent, soft, glowing globules
const desktopConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 512, // Lowered for softer, larger features
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 0.998,    // Very slow dissipation for persistence
  VELOCITY_DISSIPATION: 0.999,  // Very slow dissipation for persistence
  PRESSURE: 0.7,                // Softer pressure
  PRESSURE_ITERATIONS: 20,
  CURL: 30,                     // Increased for more inherent swirls
  SPLAT_RADIUS: 0.5,            // Larger radius for blob-like splats
  SPLAT_FORCE: 4000,            // Moderate force for softer interaction
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BLOOM: true,
  BLOOM_ITERATIONS: 10,          // More iterations for softer bloom
  BLOOM_RESOLUTION: 256,
  BLOOM_INTENSITY: 0.9,         // Increased intensity for glow
  BLOOM_THRESHOLD: 0.5,         // Lower threshold for more bloom
  BLOOM_SOFT_KNEE: 0.7,
  SUNRAYS: true,
  SUNRAYS_RESOLUTION: 196,
  SUNRAYS_WEIGHT: 0.7,
};

// Mobile Configuration: Optimized for performance, still fluid with random blasts
const mobileConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 64,           // Lowered significantly
  DYE_RESOLUTION: 256,          // Lowered significantly
  CAPTURE_RESOLUTION: 256,      // Lowered
  DENSITY_DISSIPATION: 0.98,    // Faster dissipation than desktop
  VELOCITY_DISSIPATION: 0.985,   // Faster dissipation
  PRESSURE: 0.8,                // Standard pressure
  PRESSURE_ITERATIONS: 15,       // Fewer iterations
  CURL: 20,                     // Less curl
  SPLAT_RADIUS: 0.6,            // Relatively larger splats to be visible
  SPLAT_FORCE: 3000,            // Gentler force
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BLOOM: false,                 // Disabled for performance
  BLOOM_ITERATIONS: 0,
  BLOOM_RESOLUTION: 0,
  BLOOM_INTENSITY: 0,
  BLOOM_THRESHOLD: 0,
  BLOOM_SOFT_KNEE: 0,
  SUNRAYS: false,               // Disabled for performance
  SUNRAYS_RESOLUTION: 0,
  SUNRAYS_WEIGHT: 0,
};

interface FluidCanvasElement extends HTMLCanvasElement {
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
  const [currentConfig, setCurrentConfig] = useState(desktopConfig); 

  useEffect(() => {
    if (isMobile === undefined) return; 

    const newConfig = isMobile ? mobileConfig : desktopConfig;
    setCurrentConfig(newConfig);

    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;

    document.body.style.cursor = 'none';
    let fluidInstance: any = null;

    import('webgl-fluid')
      .then(module => {
        fluidInstance = module.default;
        if (currentCanvas && fluidInstance) {
          // @ts-ignore webGLFluid expects a config object
          fluidInstance(currentCanvas, newConfig);
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
    };
  }, [isMobile]);


  useEffect(() => {
    if (!simulationReady || !canvasRef.current || !canvasRef.current.pointer) return;

    const currentCanvas = canvasRef.current;
    const { clientWidth: width, clientHeight: height } = currentCanvas;

    // Initial "Blast" - more prominent
    const numInitialSplats = isMobile ? 3 : 5;
    for (let i = 0; i < numInitialSplats; i++) {
      setTimeout(() => {
        if (currentCanvas.pointer) {
          const randomX = width * (0.25 + Math.random() * 0.5); 
          const randomY = height * (0.25 + Math.random() * 0.5);
          currentCanvas.pointer.move(randomX, randomY);
          currentCanvas.pointer.down(randomX, randomY);
          setTimeout(() => currentCanvas.pointer?.up(randomX, randomY), 70 + Math.random() * 80);
        }
      }, i * 100); 
    }
    
    const randomBlastInterval = isMobile ? 2000 : 1200; 
    
    const intervalId = setInterval(() => {
      if (currentCanvas.pointer) {
        const randomX = Math.random() * width;
        const randomY = Math.random() * height;
        
        currentCanvas.pointer.move(randomX, randomY);
        currentCanvas.pointer.down(randomX, randomY);
        
        setTimeout(() => currentCanvas.pointer?.up(randomX, randomY), 50 + Math.random() * 100);
      }
    }, randomBlastInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [simulationReady, isMobile]);


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
        // pointerEvents: 'none', // Removed to allow direct cursor interaction
        zIndex: 0, 
      }}
    />
  );
};

export default FluidCursor;
