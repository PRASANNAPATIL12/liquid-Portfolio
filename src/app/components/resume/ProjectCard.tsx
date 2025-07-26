
import type { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/data/resume';
import { Badge } from '@/components/ui/badge';


interface ProjectCardProps {
  project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="animated-border-card flex flex-col bg-card/70 backdrop-blur-lg border-border/70 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-subtle-md transform hover:-translate-y-1 h-full">
      {project.id === 'proj1' ? (
        <div className="relative w-full h-48 flex items-center justify-center bg-card/50 overflow-hidden">
          <div className="text-center p-4">
            <h3 
              className="font-fancy text-4xl text-accent/90"
              style={{ textShadow: '0 0 8px hsl(var(--accent) / 0.5)' }}
            >
              Wedding Invitation
            </h3>
          </div>
        </div>
      ) : project.imageUrl && (
        <div className="relative w-full h-48">
          <Image 
            src={project.imageUrl} 
            alt={project.name} 
            layout="fill" 
            objectFit="cover" 
            quality={100}
            className="transition-transform duration-500 hover:scale-105"
            data-ai-hint={project.dataAiHint || "project image"}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-headline text-xl text-accent">{project.name}</CardTitle>
        <CardDescription className="text-muted-foreground h-20 overflow-y-auto text-sm">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-2">
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Technologies:</h4>
          <div className="flex flex-wrap gap-1">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">{tech}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
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
