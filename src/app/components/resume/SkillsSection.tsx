
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
  'Frontend': <Palette className="h-6 w-6 text-primary icon-glow" />,
  'Backend': <Server className="h-6 w-6 text-primary icon-glow" />,
  'Database': <Database className="h-6 w-6 text-primary icon-glow" />,
  'DevOps': <Wrench className="h-6 w-6 text-primary icon-glow" />,
  'AI/ML': <Cpu className="h-6 w-6 text-primary icon-glow" />,
  'Tools': <Wrench className="h-6 w-6 text-primary icon-glow" />,
  'Languages': <Languages className="h-6 w-6 text-primary icon-glow" />,
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
      <h2 className="font-headline text-gradient text-2.5xl sm:text-4xl font-bold mb-12 text-center">
        Skills & Expertise
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedSkills).map(([category, skillsInCategory]) => (
          <Card key={category} className="glass-card animated-border-card" style={{ '--animation-delay': `${Math.random() * 4}s` } as React.CSSProperties}>
            <CardHeader className="flex flex-row items-center space-x-3 p-6 pb-2">
              {categoryIcons[category as Skill['category']]}
              <CardTitle className="font-headline text-xl text-gradient">{category}</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 p-6">
              <ul className="space-y-3">
                {skillsInCategory.map((skill) => (
                  <li key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-base font-medium text-foreground font-code">{skill.name}</span>
                      {skill.level && <Badge variant="outline" className="text-xs border-accent text-accent font-code">{skill.level}%</Badge>}
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
