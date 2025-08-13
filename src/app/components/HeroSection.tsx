
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import TextAnimation from './TextAnimation';

const HeroSection: FC = () => {
  return (
    <section id="hero" className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <TextAnimation 
        text="Prasanna Patil"
        className="font-headline text-2.5xl sm:text-4xl font-bold mb-4"
        style={{ letterSpacing: '3px' }}
      />
      <p className="font-body text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl">
        Full Stack Developer & AI Enthusiast | Crafting Digital Experiences with Code and Creativity
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button 
          size="lg" 
          className="transition-all duration-300 ease-in-out"
          asChild
        >
          <a href="#resume">View My Work <ArrowDown className="ml-2 h-5 w-5" /></a>
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="transition-all duration-300 ease-in-out"
          asChild
        >
          <a href="#contact">Get In Touch</a>
        </Button>
      </div>
      <div className="absolute bottom-8 animate-bounce">
        <ArrowDown className="h-8 w-8 text-primary/50" />
      </div>
    </section>
  );
};

export default HeroSection;
