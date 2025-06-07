import type { FC } from 'react';
import { cn } from '@/lib/utils';

interface SectionDividerProps {
  className?: string;
}

const SectionDivider: FC<SectionDividerProps> = ({ className }) => {
  return (
    <div 
      className={cn(
        "h-px w-full my-12 md:my-16 bg-border",
        className
      )}
      aria-hidden="true"
    />
  );
};

export default SectionDivider;
