
import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Skill } from '@/data/resume';
import { Badge } from '@/components/ui/badge';
import { Cpu, Database, Server, Palette, Wrench, Languages } from 'lucide-react';


interface SkillsSectionProps {
  skills: Skill[];
}

const categoryIcons: Record<Skill['category'], React.ReactElement | null> = {
  'Frontend': <Palette className="h-5 w-5 text-primary" />,
  'Backend': <Server className="h-5 w-5 text-primary" />,
  'Database': <Database className="h-5 w-5 text-primary" />,
  'DevOps': <Wrench className="h-5 w-5 text-primary" />,
  'AI/ML': <Cpu className="h-5 w-5 text-primary" />,
  'Tools': <Wrench className="h-5 w-5 text-primary" />,
  'Languages': <Languages className="h-5 w-5 text-primary" />,
};


const SkillsSection: FC<SkillsSectionProps> = ({ skills }) => {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<Skill['category'], Skill[]>);

  return (
    <section id="skills" className="py-8">
      <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center text-primary">
        Skills & Expertise
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedSkills).map(([category, skillsInCategory]) => (
          <Card key={category} className="animated-border-card bg-card/70 backdrop-blur-lg border-border/70 transition-all duration-300 ease-in-out hover:shadow-subtle-md">
            <CardHeader className="flex flex-row items-center space-x-2 pb-2">
              {categoryIcons[category as Skill['category']]}
              <CardTitle className="font-headline text-lg text-primary">{category}</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <ul className="space-y-3">
                {skillsInCategory.map((skill) => (
                  <li key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      {skill.level && <Badge variant="outline" className="text-xs border-accent text-accent">{skill.level}%</Badge>}
                    </div>
                    {skill.level && (
                      <Progress value={skill.level} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-primary/70 [&>div]:to-accent/70" />
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
