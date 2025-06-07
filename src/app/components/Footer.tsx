import type { FC } from 'react';
import ContactLinks from './ContactLinks';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 bg-background/50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-4">
          <ContactLinks />
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Prasanna Patil. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Designed with a <span className="text-accent animate-pulse">neon</span> touch.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
