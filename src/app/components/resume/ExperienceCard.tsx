
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
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-start gap-4 p-6">
        {experience.logoUrl ? (
          <Image 
            src={experience.logoUrl} 
            alt={`${experience.company} logo`} 
            width={48} 
            height={48} 
            className="rounded-md border border-border/50"
            data-ai-hint="company logo"
          />
        ) : (
          <Briefcase className="h-12 w-12 text-primary" />
        )}
        <div>
          <CardTitle className="font-headline text-xl text-primary">{experience.title}</CardTitle>
          <CardDescription className="text-muted-foreground font-code">
            {experience.company} &bull; {experience.duration}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ul className="list-disc list-inside space-y-2 text-base text-foreground/90">
          {experience.responsibilities.map((resp, index) => (
            <li key={index}>{resp}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;
