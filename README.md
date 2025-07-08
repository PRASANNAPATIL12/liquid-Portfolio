# Fluid Portfolio

This is a dynamic and visually stunning personal portfolio website built with Next.js, Tailwind CSS, and `webgl-fluid`. It showcases skills, experience, and projects in a modern, interactive way, leaving a lasting impression on visitors.

![Portfolio Screenshot](https://github.com/PRASANNAPATIL12/Fluid-Portfolio/assets/92949706/57d6ca8e-90eb-4028-a621-08103310f845)

## ✨ Features

- **Interactive Fluid Background:** A mesmerizing, real-time fluid simulation powered by `webgl-fluid` that reacts to user mouse movements.
- **Responsive Design:** Fully responsive layout that looks great on all devices, from mobile phones to desktops.
- **Dark Mode Aesthetic:** A sleek and modern dark theme that is easy on the eyes.
- **Component-Based Architecture:** Built with React and Next.js for a modular and maintainable codebase.
- **SEO Optimized:** Next.js provides excellent SEO capabilities out of the box.
- **Easy to Customize:** Portfolio data is centralized in `src/data/resume.ts`, making it simple to update your information.

## 🛠️ Built With

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Animations:** [WebGL Fluid Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/PRASANNAPATIL12/Fluid-Portfolio.git
   ```
2. Navigate to the project directory:
   ```sh
   cd Fluid-Portfolio
   ```
3. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running the Development Server

To run the app in development mode, execute:
```sh
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🔧 Customization

To personalize this portfolio, modify the data in `src/data/resume.ts`. This file contains all the text content for your summary, experience, projects, and skills.

```typescript
// src/data/resume.ts

export const resumeData = {
  name: "Your Name",
  title: "Your Title",
  summary: "Your professional summary.",
  contact: {
    // ... your contact info
  },
  experience: [
    // ... your work experience
  ],
  projects: [
    // ... your projects
  ],
  skills: [
    // ... your skills
  ],
};
```

You can also customize the theme colors in `src/app/globals.css`.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
