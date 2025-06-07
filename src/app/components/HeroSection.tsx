import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection: FC = () => {
  return (
    <section id="hero" className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Optional: Add some subtle background graphics here if desired */}
      {/* <div className="absolute inset-0 opacity-5 [background-image:radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary to-transparent rounded-full animate-pulse"></div> */}
      
      <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-text-glow">
          Prasanna Patil
        </span>
      </h1>
      <p className="font-body text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 max-w-3xl">
        Full Stack Developer & AI Enthusiast | Crafting Digital Experiences with Code and Creativity
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button 
          size="lg" 
          className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow-primary transition-all duration-300 ease-in-out"
          asChild
        >
          <a href="#resume">View My Work <ArrowDown className="ml-2 h-5 w-5" /></a>
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="border-accent text-accent hover:bg-accent hover:text-accent-foreground hover-glow-accent transition-all duration-300 ease-in-out"
          asChild
        >
          <a href="#contact">Get In Touch</a>
        </Button>
      </div>
      <div className="absolute bottom-8 animate-bounce">
        <ArrowDown className="h-8 w-8 text-accent opacity-50" />
      </div>
    </section>
  );
};

export default HeroSection;
