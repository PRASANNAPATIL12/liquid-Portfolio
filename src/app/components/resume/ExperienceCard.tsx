import type { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Experience } from '@/data/resume';
import { Briefcase } from 'lucide-react';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <Card className="bg-card/90 backdrop-blur-sm border-border transition-all duration-300 ease-in-out hover:shadow-subtle-md transform hover:-translate-y-1">
      <CardHeader className="flex flex-row items-start gap-4">
        {experience.logoUrl ? (
          <Image 
            src={experience.logoUrl} 
            alt={`${experience.company} logo`} 
            width={48} 
            height={48} 
            className="rounded-md border border-border/70"
            data-ai-hint="company logo"
          />
        ) : (
          <Briefcase className="h-12 w-12 text-primary" />
        )}
        <div>
          <CardTitle className="font-headline text-xl text-primary">{experience.title}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {experience.company} &bull; {experience.duration}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-1 text-sm text-foreground/90">
          {experience.responsibilities.map((resp, index) => (
            <li key={index}>{resp}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;
