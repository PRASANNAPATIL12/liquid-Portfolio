export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
  logoUrl?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  imageUrl?: string;
  dataAiHint?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'AI/ML' | 'Tools' | 'Languages';
  level?: number; // Optional: 0-100 for proficiency bar
}

export const resumeData = {
  name: "Prasanna Patil",
  title: "Full Stack Developer | AI Enthusiast",
  summary: "Innovative and results-driven Full Stack Developer with a passion for building scalable web applications and exploring AI technologies. Adept at leveraging modern frameworks and tools to deliver high-quality software solutions.",
  contact: {
    email: "prasannapatil@example.com",
    phone: "+1 (555) 123-4567",
    linkedin: "linkedin.com/in/prasanna-patil-66a079201",
    github: "github.com/PRASANNAPATIL12",
    twitter: "twitter.com/PspatilX",
    location: "San Francisco, CA"
  },
  experience: [
    {
      id: "exp1",
      title: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      duration: "Jan 2021 - Present",
      responsibilities: [
        "Led development of a new SaaS platform using React, Node.js, and PostgreSQL.",
        "Integrated AI-powered features for data analysis and user personalization.",
        "Mentored junior developers and conducted code reviews."
      ],
      logoUrl: "https://placehold.co/50x50.png",
    },
    {
      id: "exp2",
      title: "Full Stack Developer",
      company: "Innovatech Ltd.",
      duration: "Jun 2018 - Dec 2020",
      responsibilities: [
        "Developed and maintained client-facing web applications using Angular and Java Spring Boot.",
        "Collaborated with cross-functional teams to define project requirements and deliverables.",
        "Optimized application performance, reducing load times by 20%."
      ],
      logoUrl: "https://placehold.co/50x50.png",
    },
  ] as Experience[],
  projects: [
    {
      id: "proj1",
      name: "AI Powered Portfolio Optimizer",
      description: "A tool that leverages GenAI to analyze and suggest improvements for portfolio content, enhancing its appeal and effectiveness.",
      technologies: ["Next.js", "TypeScript", "Genkit AI", "Tailwind CSS"],
      link: "https://github.com/PRASANNAPATIL12/ai-portfolio-optimizer",
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "abstract code"
    },
    {
      id: "proj2",
      name: "E-commerce Platform",
      description: "A full-featured e-commerce website with product listings, shopping cart, user authentication, and payment gateway integration.",
      technologies: ["React", "Redux", "Node.js", "Express", "MongoDB"],
      link: "https://github.com/PRASANNAPATIL12/ecommerce-platform",
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "online shopping"
    },
  ] as Project[],
  skills: [
    { id: "sk1", name: "JavaScript", category: "Languages", level: 95 },
    { id: "sk2", name: "TypeScript", category: "Languages", level: 90 },
    { id: "sk3", name: "Python", category: "Languages", level: 80 },
    { id: "sk4", name: "React", category: "Frontend", level: 95 },
    { id: "sk5", name: "Next.js", category: "Frontend", level: 90 },
    { id: "sk6", name: "Node.js", category: "Backend", level: 90 },
    { id: "sk7", name: "Express.js", category: "Backend", level: 85 },
    { id: "sk8", name: "PostgreSQL", category: "Database", level: 80 },
    { id: "sk9", name: "MongoDB", category: "Database", level: 75 },
    { id: "sk10", name: "Docker", category: "DevOps", level: 80 },
    { id: "sk11", name: "Git", category: "Tools", level: 95 },
    { id: "sk12", name: "Genkit", category: "AI/ML", level: 70 },
    { id: "sk13", name: "Tailwind CSS", category: "Frontend", level: 90 },
  ] as Skill[],
  education: [
    {
      id: "edu1",
      degree: "Master of Science in Computer Science",
      institution: "Stanford University",
      year: "2018"
    },
    {
      id: "edu2",
      degree: "Bachelor of Technology in Information Technology",
      institution: "National Institute of Technology",
      year: "2016"
    }
  ]
};
