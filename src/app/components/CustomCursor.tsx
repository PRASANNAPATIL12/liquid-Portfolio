
'use client';

import type { FC } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';

const MAX_TRAIL_POINTS = 12; // Number of points in the trail
const MAIN_CURSOR_SIZE = 56; // Increased size for the main cursor
const TRAIL_BASE_SIZE = 48; // Base size for trail dots

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  hue: number;
}

const CustomCursor: FC = () => {
  const mainCursorRef = useRef<HTMLDivElement>(null);
  const [mainCursorPos, setMainCursorPos] = useState({ x: 0, y: 0 });
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([]);
  const [currentHue, setCurrentHue] = useState(0);
  const animationFrameRef = useRef<number>();

  const lastEventTimeRef = useRef(0);
  const MIN_EVENT_INTERVAL = 16; // roughly 60fps

  useEffect(() => {
    const cursor = mainCursorRef.current;
    if (cursor) {
      cursor.style.position = 'fixed';
      cursor.style.pointerEvents = 'none';
      cursor.style.zIndex = '9999';
      cursor.style.width = `${MAIN_CURSOR_SIZE}px`;
      cursor.style.height = `${MAIN_CURSOR_SIZE}px`;
      cursor.style.borderRadius = '50%';
      cursor.style.transform = 'translate(-50%, -50%)';
      // Adjusted transition for more fluidity
      cursor.style.transition = 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)';
    }
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const now = performance.now();
    if (now - lastEventTimeRef.current < MIN_EVENT_INTERVAL) {
        // Skip if last event was too recent
        return;
    }
    lastEventTimeRef.current = now;

    setMainCursorPos({ x: event.clientX, y: event.clientY });
    
    const newHue = (currentHue + 0.5) % 360; // Slower hue shift for more subtle changes
    setCurrentHue(newHue);

    const newPoint: TrailPoint = { 
      x: event.clientX, 
      y: event.clientY, 
      id: now, // Using performance.now for potentially more unique IDs
      hue: newHue 
    };
    
    setTrailPoints(prevPoints => [newPoint, ...prevPoints].slice(0, MAX_TRAIL_POINTS));

  }, [currentHue]);


  useEffect(() => {
    const onThrottledMouseMove = (event: MouseEvent) => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(() => handleMouseMove(event));
    };

    document.addEventListener('mousemove', onThrottledMouseMove);
    return () => {
      document.removeEventListener('mousemove', onThrottledMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleMouseMove]);

  useEffect(() => {
    if (mainCursorRef.current) {
      mainCursorRef.current.style.left = `${mainCursorPos.x}px`;
      mainCursorRef.current.style.top = `${mainCursorPos.y}px`;
      mainCursorRef.current.style.background = `radial-gradient(circle, hsla(${currentHue}, 85%, 75%, 0.25) 0%, hsla(${currentHue}, 85%, 75%, 0) 70%)`;
    }
  }, [mainCursorPos, currentHue]);

  return (
    <>
      <div ref={mainCursorRef} />
      {trailPoints.map((point, index) => {
        const progress = index / MAX_TRAIL_POINTS; // 0 for newest, 1 for oldest
        const opacity = 0.20 * (1 - progress * 0.9); // Fades out, slightly faster
        const scale = 1 - progress * 0.7; // Shrinks, trail dots are smaller
        const size = TRAIL_BASE_SIZE * scale;

        return (
          <div
            key={point.id}
            style={{
              position: 'fixed',
              pointerEvents: 'none',
              zIndex: '9998', // Below main cursor
              left: `${point.x}px`,
              top: `${point.y}px`,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, hsla(${point.hue}, 80%, 70%, ${opacity}) 0%, hsla(${point.hue}, 80%, 70%, 0) 70%)`,
              transition: 'opacity 0.5s ease-out, width 0.5s ease-out, height 0.5s ease-out', // Smooth healing
            }}
          />
        );
      })}
    </>
  );
};

export default CustomCursor;
