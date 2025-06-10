import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Process from '../components/Process';
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
        <Process />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default MainSite;