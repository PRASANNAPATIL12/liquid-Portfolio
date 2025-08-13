
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import FluidCursor from '@/app/components/FluidCursor'; // Import the new fluid cursor
import { AnimationProvider } from '@/context/AnimationContext';

export const metadata: Metadata = {
  title: 'Portfolio - Prasanna Patil',
  description: 'Personal portfolio of Prasanna Patil, showcasing skills, experience, and projects with a sophisticated and minimalistic design.',
};

const consoleLogStyle = [
  'font-family: monospace',
  'font-weight: bold',
  'font-size: 1.2rem',
  'color: hsl(var(--primary))',
  'text-shadow: 2px 2px 4px rgba(0,0,0,0.5)',
].join(';');

const consoleLogMessage = `
  %cHey, developer! Thanks for checking out my portfolio.
  
  Feel free to reach out if you want to connect!
  
  - Prasanna Patil
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --font-outfit: 'Outfit', sans-serif;
            --font-space-grotesk: 'Space Grotesk', sans-serif;
            --font-jetbrains-mono: 'JetBrains Mono', monospace;
            --font-great-vibes: 'Great Vibes', cursive;
          }
        `}} />
        <script dangerouslySetInnerHTML={{ __html: `console.log("${consoleLogMessage.replace(/\n/g, '\\n')}", "${consoleLogStyle}");` }} />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background text-foreground" suppressHydrationWarning={true}>
        <AnimationProvider>
          <FluidCursor /> {/* Add the fluid cursor component */}
          {children}
        </AnimationProvider>
        <Toaster />
      </body>
    </html>
  );
}
