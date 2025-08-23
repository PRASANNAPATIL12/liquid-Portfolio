
import type { FC } from 'react';
import Image from 'next/image';
import type { Skill } from '@/data/resume';

const SkillsSection: FC<{ skills: Skill[] }> = ({ skills }) => {
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
      <div className="space-y-12">
        {Object.entries(groupedSkills).map(([category, skillsInCategory]) => (
          <div key={category}>
            <h3 className="font-headline text-gradient text-2xl mb-6 text-center">{category}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center">
              {skillsInCategory.map((skill) => (
                <div key={skill.id} className="flex flex-col items-center gap-2 text-center">
                  <div className="w-20 h-20 p-4 bg-primary/10 rounded-2xl flex items-center justify-center glass-card hover:bg-primary/20 transition-all duration-300 transform hover:scale-110">
                    {skill.logoUrl && (
                      <div className="relative w-12 h-12">
                        <Image
                          src={skill.logoUrl}
                          alt={`${skill.name} logo`}
                          layout="fill"
                          objectFit="contain"
                          data-ai-hint="logo"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-medium text-muted-foreground font-code">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
