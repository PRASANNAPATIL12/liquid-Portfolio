import { Github, Linkedin, Mail, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FC } from 'react';

interface ContactLinksProps {
  showDownloadResume?: boolean;
}

const ContactLinks: FC<ContactLinksProps> = ({ showDownloadResume = false }) => {
  const iconSize = 20;
  const commonButtonClasses = "transition-all duration-300 ease-in-out transform hover:scale-110";
  const commonLinkClasses = "text-foreground hover:text-primary";

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      <a
        href="https://github.com/PRASANNAPATIL12"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Prasanna Patil's GitHub Profile"
        className={`${commonLinkClasses} ${commonButtonClasses}`}
      >
        <Github size={iconSize} />
      </a>
      <a
        href="https://www.linkedin.com/in/prasanna-patil-66a079201/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Prasanna Patil's LinkedIn Profile"
        className={`${commonLinkClasses} ${commonButtonClasses}`}
      >
        <Linkedin size={iconSize} />
      </a>
      <a
        href="https://twitter.com/PspatilX"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Prasanna Patil's X (Twitter) Profile"
        className={`${commonLinkClasses} ${commonButtonClasses}`}
      >
        <X size={iconSize} />
      </a>
      <a
        href="mailto:prasannapatil@example.com"
        aria-label="Email Prasanna Patil"
        className={`${commonLinkClasses} ${commonButtonClasses}`}
      >
        <Mail size={iconSize} />
      </a>
      {showDownloadResume && (
        <Button 
          variant="outline" 
          size="sm" 
          asChild 
          className="transition-all duration-300 ease-in-out"
        >
          <a href="/Prasanna_Patil_Resume.pdf" download="Prasanna_Patil_Resume.pdf">
            <FileText size={iconSize - 4} className="mr-2" />
            Resume
          </a>
        </Button>
      )}
    </div>
  );
};

export default ContactLinks;
