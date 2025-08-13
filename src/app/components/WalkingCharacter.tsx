'use client';

import type { FC } from 'react';
import './WalkingCharacter.css';

const WalkingCharacter: FC = () => {
  return (
    <div className="walking-character-container">
      <div className="character-path">
        <div className="character">
          {/* A simple, cool character SVG */}
          <svg
            width="50"
            height="70"
            viewBox="0 0 50 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Head */}
            <circle cx="25" cy="15" r="12" fill="hsl(var(--primary))" />
            {/* Body */}
            <line x1="25" y1="27" x2="25" y2="55" stroke="hsl(var(--primary))" strokeWidth="4" />
            {/* Legs */}
            <g className="legs">
              <line className="leg1" x1="25" y1="55" x2="15" y2="70" stroke="hsl(var(--primary))" strokeWidth="4" />
              <line className="leg2" x1="25" y1="55" x2="35" y2="70" stroke="hsl(var(--primary))" strokeWidth="4" />
            </g>
            {/* Arms */}
            <g className="arms">
                <line className="arm1" x1="25" y1="35" x2="10" y2="45" stroke="hsl(var(--primary))" strokeWidth="4" />
                <line className="arm2" x1="25" y1="35" x2="40" y2="45" stroke="hsl(var(--primary))" strokeWidth="4" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WalkingCharacter;
