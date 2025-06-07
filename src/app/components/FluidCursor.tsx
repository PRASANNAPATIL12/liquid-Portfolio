
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
  DENSITY_DISSIPATION: 0.998, 
  VELOCITY_DISSIPATION: 0.999,
  PRESSURE: 0.7, 
  PRESSURE_ITERATIONS: 20,
  CURL: 30, // Increased curl for more drift and organic movement
  SPLAT_RADIUS: 0.6, // Slightly larger for softer, more globule-like splats
  SPLAT_FORCE: 6000, 
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BLOOM: true,
  BLOOM_ITERATIONS: 10, // More iterations for softer bloom
  BLOOM_RESOLUTION: 256,
  BLOOM_INTENSITY: 0.9, // Slightly higher intensity
  BLOOM_THRESHOLD: 0.5, // Lower threshold for more bloom
  BLOOM_SOFT_KNEE: 0.7,
  SUNRAYS: true, // Keep sunrays for a glowing effect
  SUNRAYS_RESOLUTION: 196,
  SUNRAYS_WEIGHT: 0.6, // Slightly reduced weight if too overpowering
  RANDOM_BLAST_INTERVAL: 2500, // More frequent random blasts for continuous activity
};

// Mobile Configuration: Optimized for touch visibility and performance
const mobileConfig = {
  TRANSPARENT: true,
  SIM_RESOLUTION: 64,
  DYE_RESOLUTION: 128,    
  CAPTURE_RESOLUTION: 256, 
  DENSITY_DISSIPATION: 0.90, // Significantly lower for much longer lasting splats from touch
  VELOCITY_DISSIPATION: 0.92, // Lower for longer lasting movement from touch
  PRESSURE: 0.8,            
  PRESSURE_ITERATIONS: 3,   
  CURL: 10,                  
  SPLAT_RADIUS: 1.0,        // Significantly Increased for better touch visibility
  SPLAT_FORCE: 9000,       // Significantly Increased for more impact from touch
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
  RANDOM_BLAST_INTERVAL: 1800, 
};


interface FluidCanvasElement extends HTMLCanvasElement {
  fluid?: {
    simulationPaused: boolean;
  };
  pointer?: {
    down: (x: number, y: number) => void;
    move: (x: number, y: number) => void;
    up: () => void; // Corrected: up takes no arguments
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

    document.body.style.cursor = isMobile ? 'auto' : 'none';

    let fluidInstance: any = null;
    const selectedConfig = isMobile ? mobileConfig : desktopConfig;

    import('webgl-fluid')
      .then(module => {
        fluidInstance = module.default;
        if (canvasRef.current && fluidInstance) { 
          fluidInstance(canvasRef.current, selectedConfig);
          setTimeout(() => {
            if (canvasRef.current) { 
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
  }, [isMobile]); 


  useEffect(() => {
    if (!simulationReady || !canvasRef.current || !canvasRef.current.pointer) return;

    const currentCanvas = canvasRef.current;
    
    if (currentCanvas.clientWidth === 0 || currentCanvas.clientHeight === 0) {
        console.warn("FluidCursor: Canvas dimensions are zero, skipping initial/random blasts for now.");
        return;
    }

    const { clientWidth: width, clientHeight: height } = currentCanvas;

    const numInitialSplats = isMobile ? 1 : 3; 
    for (let i = 0; i < numInitialSplats; i++) {
      setTimeout(() => {
        if (canvasRef.current?.pointer && 
            typeof canvasRef.current.pointer.move === 'function' &&
            typeof canvasRef.current.pointer.down === 'function' &&
            typeof canvasRef.current.pointer.up === 'function') {
          const randomX = width * (0.2 + Math.random() * 0.6);
          const randomY = height * (0.2 + Math.random() * 0.6);
          canvasRef.current.pointer.move(randomX, randomY);
          canvasRef.current.pointer.down(randomX, randomY);
          setTimeout(() => {
             if (canvasRef.current?.pointer && typeof canvasRef.current.pointer.up === 'function') {
                canvasRef.current.pointer.up();
             }
          }, 100 + Math.random() * 150);
        }
      }, i * 200 + (isMobile ? 300 : 200)); 
    }

    const randomBlastIntervalConfig = isMobile ? mobileConfig.RANDOM_BLAST_INTERVAL : desktopConfig.RANDOM_BLAST_INTERVAL;

    const intervalId = setInterval(() => {
      if (canvasRef.current?.pointer && 
          typeof canvasRef.current.pointer.move === 'function' &&
          typeof canvasRef.current.pointer.down === 'function' &&
          typeof canvasRef.current.pointer.up === 'function' && 
          document.hasFocus()) {
        const { clientWidth: currentWidth, clientHeight: currentHeight } = canvasRef.current;
        if (currentWidth === 0 || currentHeight === 0) return; 

        const randomX = Math.random() * currentWidth;
        const randomY = Math.random() * currentHeight;

        canvasRef.current.pointer.move(randomX, randomY);
        canvasRef.current.pointer.down(randomX, randomY);

        setTimeout(() => {
          if (canvasRef.current?.pointer && typeof canvasRef.current.pointer.up === 'function') {
            canvasRef.current.pointer.up();
          }
        }, 70 + Math.random() * 80);
      }
    }, randomBlastIntervalConfig);

    return () => {
      clearInterval(intervalId);
    };
  }, [simulationReady, isMobile]); 

  useEffect(() => {
    if (!isMobile || !simulationReady || !canvasRef.current) {
      return;
    }
    
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 0 && 
          canvasRef.current &&
          typeof canvasRef.current.pointer?.move === 'function' &&
          typeof canvasRef.current.pointer?.down === 'function') {
        const touch = event.touches[0];
        canvasRef.current.pointer.move(touch.clientX, touch.clientY);
        canvasRef.current.pointer.down(touch.clientX, touch.clientY);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0 &&
          canvasRef.current &&
          typeof canvasRef.current.pointer?.move === 'function') {
        const touch = event.touches[0];
        canvasRef.current.pointer.move(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (event.changedTouches.length > 0 &&
          canvasRef.current &&
          typeof canvasRef.current.pointer?.up === 'function') {
        canvasRef.current.pointer.up(); // Call up() without arguments
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
