'use client';

import type { FC } from 'react';

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
          {/* Body */}
          <line x1="25" y1="20" x2="25" y2="50" stroke="hsl(var(--primary))" strokeWidth="2" />
          {/* Head */}
          <circle cx="25" cy="15" r="5" fill="hsl(var(--primary))" />
          {/* Legs */}
          <line className="leg1" x1="25" y1="50" x2="15" y2="65" stroke="hsl(var(--primary))" strokeWidth="2" />
          <line className="leg2" x1="25" y1="50" x2="35" y2="65" stroke="hsl(var(--primary))" strokeWidth="2" />
          {/* Arms */}
          <line className="arm1" x1="25" y1="35" x2="15" y2="45" stroke="hsl(var(--primary))" strokeWidth="2" />
          <line className="arm2" x1="25" y1="35" x2="35" y2="45" stroke="hsl(var(--primary))" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};

export default WalkingCharacter;
