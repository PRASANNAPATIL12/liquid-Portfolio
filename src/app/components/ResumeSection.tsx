
import type { FC } from 'react';
import { resumeData } from '@/data/resume.ts';
import ExperienceCard from './resume/ExperienceCard';
import ProjectCard from './resume/ProjectCard';
import SkillsSection from './resume/SkillsSection';
import SectionDivider from './SectionDivider';

const ResumeSection: FC = () => {
  return (
    <section id="resume" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h2 className="font-headline text-gradient text-4xl font-bold mb-12 text-center md:text-2.5xl">
        My Journey
      </h2>

      {/* Summary Section */}
      <div className="mb-12 p-6 rounded-2xl glass-card">
        <h3 className="font-headline text-gradient text-2xl mb-3">About Me</h3>
        <p className="text-lg text-muted-foreground leading-relaxed">{resumeData.summary}</p>
      </div>
      
      <SectionDivider />

      {/* Experience Section */}
      <div>
        <h3 className="font-headline text-gradient text-4xl font-bold mb-8 text-center md:text-2.5xl">Work Experience</h3>
        <div className="space-y-8">
          {resumeData.experience.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* Projects Section */}
      <div>
        <h3 className="font-headline text-gradient text-4xl font-bold mb-8 text-center md:text-2.5xl">Featured Projects</h3>
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
