import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FC } from 'react';

interface ContactLinksProps {
  showDownloadResume?: boolean;
}

const ContactLinks: FC<ContactLinksProps> = ({ showDownloadResume = false }) => {
  const iconSize = 24;
  const commonIconClasses = "text-primary icon-glow transition-all duration-300 ease-in-out transform hover:scale-125 hover:text-accent";

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
      <a
        href="https://github.com/PRASANNAPATIL12"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Prasanna Patil's GitHub Profile"
        className={commonIconClasses}
      >
        <Github size={iconSize} />
      </a>
      <a
        href="https://www.linkedin.com/in/prasanna-patil-66a079201/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Prasanna Patil's LinkedIn Profile"
        className={commonIconClasses}
      >
        <Linkedin size={iconSize} />
      </a>
      <a
        href="https://twitter.com/PspatilX"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Prasanna Patil's X Profile"
        className={commonIconClasses}
      >
        <svg
          role="img"
          aria-label="X logo"
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.931ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      </a>
      <a
        href="mailto:pspatil77888@gmail.com"
        aria-label="Email Prasanna Patil"
        className={commonIconClasses}
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
          <a
            href="https://drive.google.com/uc?export=download&id=1jK5keBpTDM-xsZ7GDsX12KFHOfyV7y3x"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText size={16} className="mr-2" />
            Resume
          </a>
        </Button>
      )}
    </div>
  );
};

export default ContactLinks;
