import React from 'react';
import { HotelHeroSection } from '../../components/sections/HotelHeroSection';
import { SearchWidget } from '../../components/sections/SearchWidget';
import { AIFeaturesSection } from '../../components/sections/AIFeaturesSection';
import { PreCheckinShowcase } from '../../components/sections/PreCheckinShowcase';
import { AIAssistantDemo } from '../../components/sections/AIAssistantDemo';
import { RoomsSection } from '../../components/sections/RoomsSection';
import { TestimonialsCarousel } from '../../components/sections/TestimonialsCarousel';
import { NewsletterSection } from '../../components/sections/NewsletterSection';
import { FixedAIChatBubble } from '../../components/sections/FixedAIChatBubble';
import styles from './HotelHomePage.module.css';

export const HotelHomePage: React.FC = () => {
  return (
    <div className={styles.hotelHomePage}>
      <HotelHeroSection />
      <SearchWidget />
      <AIFeaturesSection />
      <PreCheckinShowcase />
      <RoomsSection />
      <AIAssistantDemo />
      <TestimonialsCarousel />
      <NewsletterSection />
      <FixedAIChatBubble />
    </div>
  );
};
