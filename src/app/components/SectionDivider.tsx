import type { FC } from 'react';
import { cn } from '@/lib/utils';

interface SectionDividerProps {
  className?: string;
}

const SectionDivider: FC<SectionDividerProps> = ({ className }) => {
  return (
    <div 
      className={cn(
        "h-px w-full max-w-4xl mx-auto my-16 md:my-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent",
        className
      )}
      aria-hidden="true"
    />
  );
};

export default SectionDivider;
