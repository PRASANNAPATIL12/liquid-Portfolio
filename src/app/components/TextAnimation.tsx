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
      // Wrap every letter in a span
      textWrapper.innerHTML = text.replace(
        /\S/g,
        "<span class='letter' style='display:inline-block;'>$&</span>"
      );

      // Create the anime.js timeline
      const timeline = anime.timeline({ loop: true });
      timeline
        .add({
          targets: textWrapper.querySelectorAll('.letter'),
          opacity: [0, 1],
          easing: 'easeInOutQuad',
          duration: 1500, // Slightly slower for a more graceful effect
          delay: (el, i) => 120 * (i + 1), // Stagger delay
        })
        .add({
          targets: textWrapper,
          opacity: 0,
          duration: 1000,
          easing: 'easeOutExpo',
          delay: 1500, // Wait a bit longer before fading out
        });

      return () => {
        // Stop the animation when the component unmounts
        timeline.pause();
        // remove all anime instances from the element
        anime.remove(textWrapper);
        anime.remove(textWrapper.querySelectorAll('.letter'));
      };
    }
  }, [text]);

  return (
    <h1 ref={textWrapperRef} className={cn(className)}>
      {text}
    </h1>
  );
};

export default TextAnimation;
