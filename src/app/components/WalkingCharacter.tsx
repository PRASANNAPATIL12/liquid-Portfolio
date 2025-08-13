'use client';

import type { FC } from 'react';
import './WalkingCharacter.css';

const WalkingCharacter: FC = () => {
  return (
    <div className="character-path">
      <div className="character">
        <svg
          width="50"
          height="70"
          viewBox="0 0 50 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Head */}
          <g className="head">
            <path d="M25 18C27.7614 18 30 15.7614 30 13C30 10.2386 27.7614 8 25 8C22.2386 8 20 10.2386 20 13C20 15.7614 22.2386 18 25 18Z" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
            <path d="M25 18V25" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
          </g>
          {/* Body */}
          <line x1="25" y1="25" x2="25" y2="45" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          {/* Legs */}
          <g className="legs">
            <path className="leg1" d="M25 45L18 58L15 65" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
            <path className="leg2" d="M25 45L32 58L35 65" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
          {/* Arms */}
          <g className="arms">
            <path className="arm1" d="M25 32L17 40" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
            <path className="arm2" d="M25 32L33 40" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default WalkingCharacter;
