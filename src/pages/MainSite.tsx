import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ServiceInfoBoxes from '../components/ServiceInfoBoxes';
import Process from '../components/Process';
import ProcessInfoBoxes from '../components/ProcessInfoBoxes';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import CursorTracker from '../components/CursorTracker';

const MainSite = () => {
  return (
    <div className="min-h-screen relative overflow-hidden cursor-none">
      <AnimatedBackground />
      <CursorTracker />
      <div className="relative z-10">
        <Header />
        <Hero />
        <ServiceInfoBoxes />
        <Process />
        <ProcessInfoBoxes />
        <Services />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default MainSite;