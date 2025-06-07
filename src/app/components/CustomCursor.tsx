@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: var(--font-inter), sans-serif;
}

@layer base {
  :root {
    /* Minimalist & Sophisticated Palette - Dark Theme */
    --background: 220 20% 7%; /* Very dark, slightly cool desaturated blue */
    --foreground: 220 15% 75%; /* Lighter gray for text, soft contrast */
    
    --card: 220 20% 10%; /* Slightly lighter than background for cards */
    --card-foreground: 220 15% 75%;
    
    --popover: 220 20% 5%; /* Even darker for popovers */
    --popover-foreground: 220 15% 75%;
    
    --primary: 210 60% 65%; /* Muted, sophisticated blue for primary actions */
    --primary-foreground: 220 20% 98%; /* White/very light gray for text on primary */
    
    --secondary: 220 15% 20%; /* Darker gray for secondary elements */
    --secondary-foreground: 220 10% 70%;
    
    --muted: 220 15% 15%; /* For less prominent elements */
    --muted-foreground: 220 10% 50%; /* Lighter gray for muted text */
    
    --accent: 250 60% 70%; /* A slightly more vibrant but still sophisticated purple/blue for accents */
    --accent-foreground: 220 20% 98%;
    
    --destructive: 0 60% 50%; /* Standard destructive red */
    --destructive-foreground: 0 0% 98%;
    
    --border: 220 15% 18%; /* Subtle borders */
    --input: 220 15% 18%; /* Input background */
    --ring: 210 60% 55%; /* Ring color for focus states, aligned with primary */
    
    --radius: 0.5rem; /* Slightly more rounded corners for a softer feel */

    /* Chart colors - can be adjusted to be more muted if needed */
    --chart-1: 210 60% 65%;
    --chart-2: 250 60% 70%;
    --chart-3: 180 50% 60%;
    --chart-4: 30 60% 65%;
    --chart-5: 300 50% 70%;
  }

  * {
    @apply border-border;
  }
  html, body {
    @apply bg-background text-foreground;
    scroll-behavior: smooth;
    cursor: none; /* Hide default system cursor for the fluid effect */
    overflow-x: hidden; /* Prevent horizontal scroll often caused by full-width elements */
    min-height: 100vh;
    width: 100%;
  }
  ::selection {
    @apply bg-primary/30 text-primary-foreground; /* Softer selection */
  }
}

.font-headline {
  font-family: var(--font-space-grotesk), sans-serif;
  font-weight: 500; /* Slightly less bold for sophistication */
}

.font-body {
  font-family: var(--font-inter), sans-serif;
}

/* Subtle shadows for a cleaner look */
.shadow-subtle {
  box-shadow: 0 2px 4px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04);
}
.shadow-subtle-md {
   box-shadow: 0 4px 8px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.04);
}

/* Ensure canvas for fluid simulation doesn't cause scrollbars if slightly off */
canvas {
  display: block; /* Removes bottom space under inline canvas */
}