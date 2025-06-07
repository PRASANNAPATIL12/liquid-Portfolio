import Header from '@/app/components/Header';
import HeroSection from '@/app/components/HeroSection';
import ResumeSection from '@/app/components/ResumeSection';
import AiOptimizerForm from '@/app/components/AiOptimizerForm';
import ContactSection from '@/app/components/ContactSection';
import Footer from '@/app/components/Footer';
import SectionDivider from '@/app/components/SectionDivider';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <SectionDivider />
        <ResumeSection />
        <SectionDivider />
        <AiOptimizerForm />
        <SectionDivider />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
