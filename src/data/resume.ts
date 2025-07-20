
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
      description: "Developed an immersive online wedding invitation accessible via QR code, featuring a video backdrop, event timeline, and gallery. The project attracted over 1,000 unique visitors, leading to a freelance service with 100% client satisfaction.",
      technologies: ["JavaScript", "HTML5", "CSS3"],
      link: "https://shraddhapatil.onrender.com/",
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "wedding invitation"
    },
    {
      id: "proj2",
      name: "PatilCart — E-commerce Platform",
      description: "Architected a MERN stack marketplace with JWT authentication and a secure Paytm payment gateway, driving 30% higher user engagement. Features automated inventory tracking for a seamless shopping experience.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Paytm"],
      link: "https://github.com/PRASANNAPATIL12/Flipkart-Clone-",
      imageUrl: "https://videos.openai.com/vg-assets/assets%2Ftask_01jzn6y65dex39gpejpjqvnrgb%2F1751984921_img_1.webp?st=2025-07-08T12%3A47%3A14Z&se=2025-07-14T13%3A47%3A14Z&sks=b&skt=2025-07-08T12%3A47%3A14Z&ske=2025-07-14T13%3A47%3A14Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=ONaq8HpxU40gMl0z70mm8g7ylmZaYDFU%2BV5%2Bt9cUKLc%3D&az=oaivgprodscus",
      dataAiHint: "modern ui"
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
