import type { FC } from 'react';
import { resumeData } from '@/data/resume';
import ExperienceCard from './resume/ExperienceCard';
import ProjectCard from './resume/ProjectCard';
import SkillsSection from './resume/SkillsSection';
import SectionDivider from './SectionDivider';

const ResumeSection: FC = () => {
  return (
    <section id="resume" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h2 className="font-headline text-4xl md:text-5xl font-bold mb-12 text-center text-primary">
        My Journey
      </h2>

      {/* Summary Section */}
      <div className="mb-12 p-6 rounded-lg bg-card/80 backdrop-blur-md border border-border shadow-subtle">
        <h3 className="font-headline text-2xl text-primary mb-3">About Me</h3>
        <p className="text-lg text-muted-foreground leading-relaxed">{resumeData.summary}</p>
      </div>
      
      <SectionDivider />

      {/* Experience Section */}
      <div>
        <h3 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center text-primary">Work Experience</h3>
        <div className="space-y-8">
          {resumeData.experience.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* Projects Section */}
      <div>
        <h3 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center text-accent">Featured Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {resumeData.projects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </div>
      
      <SectionDivider />

      {/* Skills Section */}
      <SkillsSection skills={resumeData.skills} />

    </section>
  );
};

export default ResumeSection;
