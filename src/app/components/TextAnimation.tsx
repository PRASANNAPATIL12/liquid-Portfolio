'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { cn } from '@/lib/utils';

interface TextAnimationProps {
  text: string;
  className?: string;
}

const TextAnimation: React.FC<TextAnimationProps> = ({ text, className }) => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const textWrapper = textRef.current;
    if (!textWrapper) return;

    // Wrap each letter in a span
    textWrapper.innerHTML = text.replace(
      /\S/g,
      "<span class='letter' style='display:inline-block;'>$&</span>"
    );

    // Create the animation timeline
    const timeline = anime.timeline({
      loop: false,
      autoplay: true,
    });

    timeline.add({
      targets: textWrapper.querySelectorAll('.letter'),
      translateY: [-50, 0],
      scale: [0.8, 1],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1500,
      delay: anime.stagger(100),
    });
    
    return () => {
      // Clean up anime instance if needed
      timeline.pause();
    };
  }, [text]);

  return <h1 ref={textRef} className={cn(className, 'text-center')}></h1>;
};

export default TextAnimation;
