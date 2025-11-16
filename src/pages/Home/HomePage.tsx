import React from 'react';
import { Navbar } from '../../components/sections/Navbar';
import { HeroSection } from '../../components/sections/HeroSection';
import { SearchWidget } from '../../components/sections/SearchWidget';
import { LuxuryShowcase } from '../../components/sections/LuxuryShowcase';
import { ExperienceGrid } from '../../components/sections/ExperienceGrid';
import { FeaturedProperties } from '../../components/sections/FeaturedProperties';
import { TestimonialsCarousel } from '../../components/sections/TestimonialsCarousel';
import { NewsletterSection } from '../../components/sections/NewsletterSection';
import { Footer } from '../../components/sections/Footer';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <Navbar />
      <HeroSection />
      <SearchWidget />
      <LuxuryShowcase />
      <ExperienceGrid />
      <FeaturedProperties />
      <TestimonialsCarousel />
      <NewsletterSection />
      <Footer />
    </div>
  );
};
