import type { FC, SVGProps } from 'react';

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
  logoUrl?: string;
}

export interface Project {
  id:string;
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
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'AI/ML' | 'Languages' | 'Tools';
  logoUrl?: string;
  logoComponent?: FC<SVGProps<SVGSVGElement>>;
}

export const resumeData = {
  name: "Prasanna Patil",
  title: "Full Stack Developer | AI Enthusiast",
  summary: "Innovative and results-driven Full Stack Developer with a passion for building scalable web applications and exploring AI technologies. Adept at leveraging modern frameworks and tools to deliver high-quality software solutions.",
  contact: {
    email: "pspatil77888@gmail.com",
    phone: "+91 9448677888",
    linkedin: "linkedin.com/in/prasanna-patil-66a079201",
    github: "github.com/PRASANNAPATIL12",
    twitter: "twitter.com/PspatilX",
    location: "Bangalore, India"
  },
  experience: [
    {
      id: "exp1",
      title: "Information Systems Engineer Onsite",
      company: "Verifone",
      duration: "July 2024 - Present",
      responsibilities: [
        "Automated patch management for 500+ servers with a PowerShell script, reducing manual effort from 10-20 hours to a single-click task, generating CSV reports and SMTP email notifications.",
        "Optimized AWS cloud infrastructure (EC2, S3, Lambda) through Infrastructure as Code, resulting in 15% cost reduction while maintaining 99.9% uptime.",
        "Leveraged PowerShell Core remoting (Invoke-Command, New-PSSession, WinRM) and Chocolatey package management to automate application installation and configuration across multiple remote servers—eliminating 100% of manual logins, reducing average deployment time per server by 70%.",
      ],
      logoUrl: "https://media.licdn.com/dms/image/v2/D560BAQGS2-F6iJGaxA/company-logo_200_200/company-logo_200_200/0/1688131154498/verifone_logo?e=1757548800&v=beta&t=u-HLCO9hXHKJl10P9ZmhJWq78hDZnKD47R5iuZ4GZZw",
    },
    {
      id: "exp2",
      title: "Software Engineer - Intern Onsite",
      company: "Mercuri",
      duration: "March 2024 - May 2024",
      responsibilities: [
        "Developed Node.js/Express Shopify partner application that decreased order processing latency by 20% and improved data accuracy across integration points.",
        "Executed Prisma ORM with transaction management, optimizing database operations by 30% and enhancing query response times by 25%.",
        "Integrated Twilio API for automated customer communications, driving 22% higher engagement and 15% growth in repeat business transactions.",
      ],
      logoUrl: "https://media.licdn.com/dms/image/v2/D4D0BAQFjoWpmwLFGkQ/company-logo_200_200/company-logo_200_200/0/1731063709690/mercuricx_logo?e=1757548800&v=beta&t=ZcjpVpVS2tfc0r_FOnG_J9qZO3rZRmALkjySxriZR2M",
    },
     {
      id: "exp3",
      title: "Full Stack Web Developer - Intern Hybrid",
      company: "Kenai Technologies",
      duration: "November 2023 - January 2024",
      responsibilities: [
        "Architected and deployed a responsive web application using React.js and Node.js for academic data collection, resulting in a 25% increase in data accuracy and a 30% improvement in information retrieval speed.",
        "Implemented RESTful API endpoints using Express.js and MongoDB, enabling efficient data management and reducing database query time by 40%.",
      ],
    },
  ] as Experience[],
  projects: [
    {
      id: "proj1",
      name: "Online Wedding Invitation",
      description: "Developed an immersive online wedding invitation accessible via QR code, featuring a video backdrop, event timeline, and gallery. The project attracted over 1,000 unique visitors and was later spun into a successful freelance service.",
      technologies: ["JavaScript", "HTML5", "CSS3"],
      link: "https://shraddhapatil.onrender.com/",
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "wedding invitation"
    },
    {
      id: "proj2",
      name: "PatilCart — E-commerce Platform",
      description: "Architected a MERN stack marketplace with JWT authentication and a secure Paytm payment gateway, resulting in 30% higher user engagement. Automated inventory tracking ensures a seamless shopping experience.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Paytm"],
      link: "https://patilcart.onrender.com/",
      imageUrl: "https://i.postimg.cc/14rzks5M/20250708-1958-Futuristic-Neon-E-Commerce-simple-compose-01jzn6y6rgf53rz0jh25rysdtw.png",
      dataAiHint: "modern ui"
    },
  ] as Project[],
  skills: [
    { id: "sk1", name: "JavaScript", category: "Languages", logoUrl: "https://cdn.simpleicons.org/javascript/F7DF1E" },
    { id: "sk2", name: "TypeScript", category: "Languages", logoUrl: "https://cdn.simpleicons.org/typescript/3178C6" },
    { id: "sk3", name: "Python", category: "Languages", logoUrl: "https://cdn.simpleicons.org/python/3776AB" },
    { id: "sk14", name: "Java", category: "Languages" },
    { id: "sk4", name: "React", category: "Frontend", logoUrl: "https://cdn.simpleicons.org/react/61DAFB" },
    { id: "sk5", name: "Next.js", category: "Frontend", logoUrl: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
    { id: "sk13", name: "Tailwind CSS", category: "Frontend", logoUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    { id: "sk15", name: "HTML5", category: "Frontend", logoUrl: "https://cdn.simpleicons.org/html5/E34F26" },
    { id: "sk16", name: "CSS3", category: "Frontend" },
    { id: "sk17", name: "Material-UI", category: "Frontend", logoUrl: "https://cdn.simpleicons.org/mui/007FFF" },
    { id: "sk6", name: "Node.js", category: "Backend", logoUrl: "https://cdn.simpleicons.org/nodedotjs/339933" },
    { id: "sk7", name: "Express.js", category: "Backend", logoUrl: "https://cdn.simpleicons.org/express/FFFFFF" },
    { id: "sk18", name: "GraphQL", category: "Backend", logoUrl: "https://cdn.simpleicons.org/graphql/E10098" },
    { id: "sk8", name: "PostgreSQL", category: "Database", logoUrl: "https://cdn.simpleicons.org/postgresql/4169E1" },
    { id: "sk9", name: "MongoDB", category: "Database", logoUrl: "https://cdn.simpleicons.org/mongodb/47A248" },
    { id: "sk19", name: "MySQL", category: "Database", logoUrl: "https://cdn.simpleicons.org/mysql/4479A1" },
    { id: "sk20", name: "Redis", category: "Database", logoUrl: "https://cdn.simpleicons.org/redis/DC382D" },
    { id: "sk10", name: "Docker", category: "DevOps", logoUrl: "https://cdn.simpleicons.org/docker/2496ED" },
    { id: "sk12", name: "Genkit", category: "AI/ML", logoUrl: "https://cdn.simpleicons.org/googlecloud/FFFFFF" }, 
    { id: "sk11", name: "Git", category: "Tools", logoUrl: "https://cdn.simpleicons.org/git/F05032" },
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
