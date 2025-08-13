import type { FC } from 'react';
import ContactLinks from './ContactLinks';
import WalkingCharacter from './WalkingCharacter';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative py-8 bg-background/50 border-t border-border mt-auto overflow-x-hidden">
      <WalkingCharacter />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
        <div className="flex justify-center mb-4">
          <ContactLinks />
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Prasanna Patil. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Crafted with care.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
