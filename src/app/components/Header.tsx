import Link from 'next/link';
import ContactLinks from './ContactLinks';
import type { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md shadow-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-2xl font-headline font-bold text-primary hover:text-primary/80 transition-colors duration-300">
          
        </Link>
        <nav className="flex items-center space-x-6">
          {/* Placeholder for potential future nav links like About, Projects, Contact sections */}
          {/* <Link href="#about" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-300">About</Link> */}
          {/* <Link href="#projects" className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-300">Projects</Link> */}
          <ContactLinks showDownloadResume={true} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
