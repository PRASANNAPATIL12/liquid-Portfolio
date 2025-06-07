
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
};

// Mobile Configuration: Optimized for performance, still fluid with random blasts
const mobileConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 64,          
  DYE_RESOLUTION: 128,          // Further Reduced for performance
  CAPTURE_RESOLUTION: 256,      
  DENSITY_DISSIPATION: 0.98,    
  VELOCITY_DISSIPATION: 0.985,   
  PRESSURE: 0.8,                
  PRESSURE_ITERATIONS: 10,       // Reduced
  CURL: 10,                     // Reduced
  SPLAT_RADIUS: 0.5,            
  SPLAT_FORCE: 3000,            
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
};

interface FluidCanvasElement extends HTMLCanvasElement {
  fluid?: {
    simulationPaused: boolean;
    // Add other methods/properties if the library exposes them directly
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
          // @ts-ignore webGLFluid expects a config object
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
    };
  }, [isMobile]);


  useEffect(() => {
    if (!simulationReady || !canvasRef.current || !canvasRef.current.pointer) return;

    const currentCanvas = canvasRef.current;
    const { clientWidth: width, clientHeight: height } = currentCanvas;

    const numInitialSplats = isMobile ? 2 : 3; 
    for (let i = 0; i < numInitialSplats; i++) {
      setTimeout(() => {
        if (currentCanvas.pointer) {
          const randomX = width * (0.35 + Math.random() * 0.3); 
          const randomY = height * (0.35 + Math.random() * 0.3);
          currentCanvas.pointer.move(randomX, randomY);
          currentCanvas.pointer.down(randomX, randomY);
          setTimeout(() => currentCanvas.pointer?.up(randomX, randomY), 100 + Math.random() * 100);
        }
      }, i * 150 + 200); 
    }
    
    const randomBlastInterval = isMobile ? 2500 : 1200; // Slower on mobile
    
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
        zIndex: 0, 
      }}
    />
  );
};

export default FluidCursor;
