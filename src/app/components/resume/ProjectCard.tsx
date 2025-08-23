
import type { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/data/resume.ts';
import { Badge } from '@/components/ui/badge';


interface ProjectCardProps {
  project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="glass-card animated-border-card flex flex-col h-full overflow-hidden" style={{ '--animation-delay': `${Math.random() * 4}s` } as React.CSSProperties}>
      {project.id === 'proj1' ? (
        <div className="relative w-full h-48 flex items-center justify-center bg-card/50 overflow-hidden">
          <div className="text-center p-4">
            <h3 
              className="font-fancy text-4xl"
              style={{ 
                color: '#E6B4F5', /* A soft, elegant pink/lavender */
                textShadow: '0 0 10px rgba(230, 180, 245, 0.6)' 
              }}
            >
              Wedding Invitation
            </h3>
          </div>
        </div>
      ) : project.id === 'proj2' ? (
        <div className="relative w-full h-48 flex items-center justify-center bg-card/50 overflow-hidden">
          <div className="text-center p-4">
            <h3 
              className="font-headline text-4xl"
              style={{
                color: '#64FFDA', /* A vibrant, futuristic mint */
                textShadow: '0 0 12px rgba(100, 255, 218, 0.5)'
              }}
            >
              PatilCart
            </h3>
          </div>
        </div>
      ) : project.imageUrl && (
        <div className="relative w-full h-48 bg-black">
          <Image 
            src={project.imageUrl} 
            alt={project.name} 
            layout="fill" 
            objectFit="contain" 
            quality={100}
            className="transition-transform duration-500 group-hover:scale-105"
            data-ai-hint={project.dataAiHint || "project image"}
          />
        </div>
      )}
      <CardHeader className="p-6">
        <CardTitle className="font-headline text-xl text-gradient">{project.name}</CardTitle>
        <CardDescription className="text-muted-foreground h-20 overflow-y-auto text-base">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <div className="mb-2">
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1 font-code">Technologies:</h4>
          <div className="flex flex-wrap gap-1">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs font-code bg-primary/10 text-primary border-primary/20">{tech}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        {project.link && (
          <Button variant="link" size="sm" asChild className="text-accent hover:text-accent/80 p-0">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {project.link.includes('github.com') ? <Github className="mr-1 h-4 w-4" /> : <ExternalLink className="mr-1 h-4 w-4" />}
              View Project
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
