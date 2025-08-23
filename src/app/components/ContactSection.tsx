
import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContactLinks from './ContactLinks';
import { Mail, Phone, MapPin } from 'lucide-react';
import { resumeData } from '@/data/resume.ts';

const ContactSection: FC = () => {
  return (
    <section id="contact" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h2 className="font-headline text-gradient text-2.5xl sm:text-4xl font-bold mb-12 text-center">
        Get In Touch
      </h2>
      <Card className="glass-card max-w-xl mx-auto p-2 sm:p-4">
        <CardHeader className="text-center p-6">
          <CardTitle className="font-headline text-gradient text-2xl">Let's Connect</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Feel free to reach out for collaborations, opportunities, or just a chat!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6 pt-0">
          <div className="flex items-center space-x-4 p-3 rounded-md hover:bg-secondary/70 transition-colors">
            <Mail className="h-6 w-6 text-primary icon-glow" />
            <a href={`mailto:${resumeData.contact.email}`} className="text-foreground hover:text-accent">
              {resumeData.contact.email}
            </a>
          </div>
          {resumeData.contact.phone && (
            <div className="flex items-center space-x-4 p-3 rounded-md hover:bg-secondary/70 transition-colors">
              <Phone className="h-6 w-6 text-primary icon-glow" />
              <span className="text-foreground">{resumeData.contact.phone}</span>
            </div>
          )}
          <div className="flex items-center space-x-4 p-3 rounded-md hover:bg-secondary/70 transition-colors">
            <MapPin className="h-6 w-6 text-primary icon-glow" />
            <span className="text-foreground">{resumeData.contact.location}</span>
          </div>
          <div className="pt-4 flex justify-center">
            <ContactLinks />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ContactSection;
