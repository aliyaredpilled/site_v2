import React, { useEffect, useRef } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import MagicOfToysSection from './MagicOfToysSection';
import PartnersSection from './PartnersSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import { Toaster } from "sonner";
import ScrollToTopButton from './ScrollToTopButton';

const LandingPage = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]');

      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        const id = href.substring(1);
        const targetElement = document.getElementById(id);

        if (targetElement) {
          const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
          const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerHeight - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div 
      className="landing-page-container relative bg-microsoft-white text-microsoft-gray-900 font-sans !select-text"
      style={{ 
        minHeight: '100vh',
        userSelect: 'text'
      }}
    >
      {/* Убираем div вокруг Header */}
      {/* <div ref={headerRef} id="main-header"> */}
        <Header /> 
      {/* </div> */}
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <MagicOfToysSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
      
      <Toaster position="bottom-right" richColors />

      <ScrollToTopButton />

      {/* Содержимое лендинга будет здесь */}
      {/* <div className="absolute inset-0 bg-black opacity-30"></div> */}{/* Оверлей не нужен для белого фона */}
    </div>
  );
};

export default LandingPage; 