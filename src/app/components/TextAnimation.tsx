'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { cn } from '@/lib/utils';

interface TextAnimationProps {
  text: string;
  className?: string;
}

const TextAnimation: React.FC<TextAnimationProps> = ({ text, className }) => {
  const textWrapperRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const textWrapper = textWrapperRef.current;
    if (textWrapper) {
      // Wrap each letter in a span
      textWrapper.innerHTML = text.replace(
        /\S/g,
        "<span class='letter' style='display:inline-block; opacity:0;'>$&</span>"
      );

      // Animation timeline
      anime.timeline({ loop: false })
        .add({
          targets: textWrapper.querySelectorAll('.letter'),
          opacity: [0, 1],
          translateY: ['1.1em', 0],
          translateX: ['0.5em', 0],
          scale: [0.2, 1],
          duration: 1500,
          delay: anime.stagger(100),
          easing: 'easeOutExpo',
        });
    }
  }, [text]);

  return (
    <h1 ref={textWrapperRef} className={cn("font-headline text-gradient text-4xl sm:text-5xl md:text-6xl font-bold mb-4", className)}>
      {text}
    </h1>
  );
};

export default TextAnimation;
