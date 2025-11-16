import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  UtensilsCrossed,
  Waves,
  Dumbbell,
  Palmtree,
  Briefcase,
  Bell,
  Baby,
  Ship,
  ArrowDown,
  Calendar,
  Phone,
  ChevronRight
} from 'lucide-react';
import styles from './Amenities.module.css';

const AmenitiesPage: React.FC = () => {
  const scrollToOverview = () => {
    document.getElementById('amenities-overview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.amenitiesPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.heroIcon}>
              <Sparkles size={48} />
            </div>
            <h1 className={styles.heroTitle}>Luxury Amenities & Experiences</h1>
            <p className={styles.heroSubtitle}>
              Discover world-class facilities and personalized services designed for your ultimate comfort
            </p>
            <button className={styles.heroButton}>
              EXPLORE AMENITIES
            </button>
          </motion.div>

          <motion.button
            className={styles.scrollIndicator}
            onClick={scrollToOverview}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <ArrowDown size={24} />
            <span>Scroll to explore</span>
          </motion.button>
        </div>
      </section>

      {/* Amenities Overview Grid */}
      <section id="amenities-overview" className={styles.overview}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.sectionHeader}
          >
            <h2 className={styles.sectionTitle}>Our Premium Amenities</h2>
            <p className={styles.sectionSubtitle}>
              Experience exceptional facilities and services curated for discerning travelers
            </p>
          </motion.div>

          <div className={styles.amenitiesGrid}>
            {/* Spa & Wellness */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={styles.amenityCard}
            >
              <div className={styles.amenityImage}>
                <img
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop"
                  alt="Luxury Spa"
                />
                <div className={styles.amenityBadge}>SIGNATURE</div>
              </div>
              <div className={styles.amenityContent}>
                <div className={styles.amenityIcon}>
                  <Sparkles size={40} />
                </div>
                <h3 className={styles.amenityTitle}>Glimmora Spa & Wellness</h3>
                <p className={styles.amenityDescription}>
                  Indulge in our award-winning spa featuring therapeutic treatments, aromatherapy, and holistic wellness programs.
                </p>
                <ul className={styles.amenityFeatures}>
                  <li>8 Treatment Rooms</li>
                  <li>Sauna & Steam Room</li>
                  <li>Meditation Garden</li>
                  <li>Couples Suites</li>
                </ul>
                <div className={styles.amenityHours}>
                  <strong>Hours:</strong> 7:00 AM - 10:00 PM Daily
                </div>
                <a href="#spa-details" className={styles.amenityLink}>
                  Learn More <ChevronRight size={16} />
                </a>
              </div>
            </motion.div>

            {/* Fine Dining */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={styles.amenityCard}
            >
              <div className={styles.amenityImage}>
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop"
                  alt="Fine Dining"
                />
                <div className={styles.amenityBadge}>FEATURED</div>
              </div>
              <div className={styles.amenityContent}>
                <div className={styles.amenityIcon}>
                  <UtensilsCrossed size={40} />
                </div>
                <h3 className={styles.amenityTitle}>Fine Dining & Bars</h3>
                <p className={styles.amenityDescription}>
                  Savor exceptional cuisine at our three signature restaurants and two sophisticated bars.
                </p>
                <ul className={styles.amenityFeatures}>
                  <li>3 Signature Restaurants</li>
                  <li>Rooftop Sky Bar</li>
                  <li>24/7 Room Service</li>
                  <li>Wine Cellar Tours</li>
                </ul>
                <div className={styles.amenityHours}>
                  <strong>Hours:</strong> Varies by Venue
                </div>
                <a href="#dining-details" className={styles.amenityLink}>
                  Learn More <ChevronRight size={16} />
                </a>
              </div>
            </motion.div>

            {/* Infinity Pool */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className={styles.amenityCard}
            >
              <div className={styles.amenityImage}>
                <img
                  src="https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&auto=format&fit=crop"
                  alt="Infinity Pool"
                />
              </div>
              <div className={styles.amenityContent}>
                <div className={styles.amenityIcon}>
                  <Waves size={40} />
                </div>
                <h3 className={styles.amenityTitle}>Infinity Pool & Deck</h3>
                <p className={styles.amenityDescription}>
                  Relax in our stunning rooftop infinity pool with panoramic ocean views and premium poolside service.
                </p>
                <ul className={styles.amenityFeatures}>
                  <li>25-Meter Heated Pool</li>
                  <li>Private Cabanas</li>
                  <li>Poolside Bar & Dining</li>
                  <li>Underwater Music</li>
                </ul>
                <div className={styles.amenityHours}>
                  <strong>Hours:</strong> 6:00 AM - 11:00 PM
                </div>
                <a href="#pool-details" className={styles.amenityLink}>
                  Learn More <ChevronRight size={16} />
                </a>
              </div>
            </motion.div>

            {/* Fitness Center */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className={styles.amenityCard}
            >
              <div className={styles.amenityImage}>
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop"
                  alt="Fitness Center"
                />
              </div>
              <div className={styles.amenityContent}>
                <div className={styles.amenityIcon}>
                  <Dumbbell size={40} />
                </div>
                <h3 className={styles.amenityTitle}>Fitness & Recreation</h3>
                <p className={styles.amenityDescription}>
                  Stay active with our state-of-the-art fitness center and personalized training programs.
                </p>
                <ul className={styles.amenityFeatures}>
                  <li>24/7 Gym Access</li>
                  <li>Personal Trainers</li>
                  <li>Yoga & Pilates Studio</li>
                  <li>Tennis Courts</li>
                </ul>
                <div className={styles.amenityHours}>
                  <strong>Hours:</strong> Open 24/7
                </div>
                <a href="#fitness-details" className={styles.amenityLink}>
                  Learn More <ChevronRight size={16} />
                </a>
              </div>
            </motion.div>

            {/* Beach Access */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className={styles.amenityCard}
            >
              <div className={styles.amenityImage}>
                <img
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop"
                  alt="Private Beach"
                />
              </div>
              <div className={styles.amenityContent}>
                <div className={styles.amenityIcon}>
                  <Palmtree size={40} />
                </div>
                <h3 className={styles.amenityTitle}>Private Beach Access</h3>
                <p className={styles.amenityDescription}>
                  Enjoy exclusive access to our pristine private beach with complimentary amenities.
                </p>
                <ul className={styles.amenityFeatures}>
                  <li>500m Private Beach</li>
                  <li>Beach Cabanas & Loungers</li>
                  <li>Beach Bar & Grill</li>
                  <li>Water Sports Equipment</li>
                </ul>
                <div className={styles.amenityHours}>
                  <strong>Hours:</strong> Sunrise to Sunset
                </div>
                <a href="#beach-details" className={styles.amenityLink}>
                  Learn More <ChevronRight size={16} />
                </a>
              </div>
            </motion.div>

            {/* Business Center */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className={styles.amenityCard}
            >
              <div className={styles.amenityImage}>
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop"
                  alt="Business Center"
                />
              </div>
              <div className={styles.amenityContent}>
                <div className={styles.amenityIcon}>
                  <Briefcase size={40} />
                </div>
                <h3 className={styles.amenityTitle}>Business & Events</h3>
                <p className={styles.amenityDescription}>
                  Conduct business seamlessly with our modern facilities and professional event spaces.
                </p>
                <ul className={styles.amenityFeatures}>
                  <li>5 Meeting Rooms</li>
                  <li>Grand Ballroom (500 guests)</li>
                  <li>Business Lounge</li>
                  <li>High-Speed WiFi</li>
                </ul>
                <div className={styles.amenityHours}>
                  <strong>Hours:</strong> 24/7 Access
                </div>
                <a href="#business-details" className={styles.amenityLink}>
                  Learn More <ChevronRight size={16} />
                </a>
              </div>
            </motion.div>

            {/* Concierge Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className={styles.amenityCard}
            >
              <div className={styles.amenityImage}>
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop"
                  alt="Concierge Services"
                />
              </div>
              <div className={styles.amenityContent}>
                <div className={styles.amenityIcon}>
                  <Bell size={40} />
                </div>
                <h3 className={styles.amenityTitle}>Concierge Services</h3>
                <p className={styles.amenityDescription}>
                  Our dedicated concierge team is here to fulfill your every request with exceptional care.
                </p>
                <ul className={styles.amenityFeatures}>
                  <li>24/7 Concierge Desk</li>
                  <li>Restaurant Reservations</li>
                  <li>Tour & Activity Booking</li>
                  <li>Personal Shopping</li>
                </ul>
                <div className={styles.amenityHours}>
                  <strong>Hours:</strong> Available 24/7
                </div>
                <a href="#concierge-details" className={styles.amenityLink}>
                  Learn More <ChevronRight size={16} />
                </a>
              </div>
            </motion.div>

            {/* Kids Club */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className={styles.amenityCard}
            >
              <div className={styles.amenityImage}>
                <img
                  src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop"
                  alt="Kids Club"
                />
              </div>
              <div className={styles.amenityContent}>
                <div className={styles.amenityIcon}>
                  <Baby size={40} />
                </div>
                <h3 className={styles.amenityTitle}>Glimmora Kids Club</h3>
                <p className={styles.amenityDescription}>
                  A magical world of supervised activities and entertainment for children ages 4-12.
                </p>
                <ul className={styles.amenityFeatures}>
                  <li>Indoor Play Area</li>
                  <li>Outdoor Playground</li>
                  <li>Arts & Crafts Studio</li>
                  <li>Professional Childcare</li>
                </ul>
                <div className={styles.amenityHours}>
                  <strong>Hours:</strong> 9:00 AM - 8:00 PM
                </div>
                <a href="#kids-details" className={styles.amenityLink}>
                  Learn More <ChevronRight size={16} />
                </a>
              </div>
            </motion.div>

            {/* Water Sports */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className={styles.amenityCard}
            >
              <div className={styles.amenityImage}>
                <img
                  src="https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=800&auto=format&fit=crop"
                  alt="Water Sports"
                />
              </div>
              <div className={styles.amenityContent}>
                <div className={styles.amenityIcon}>
                  <Ship size={40} />
                </div>
                <h3 className={styles.amenityTitle}>Water Sports Center</h3>
                <p className={styles.amenityDescription}>
                  Adventure awaits with our comprehensive water sports activities and equipment rental.
                </p>
                <ul className={styles.amenityFeatures}>
                  <li>Kayaking & Paddleboarding</li>
                  <li>Snorkeling & Diving</li>
                  <li>Jet Skiing</li>
                  <li>Sailing Lessons</li>
                </ul>
                <div className={styles.amenityHours}>
                  <strong>Hours:</strong> 8:00 AM - 6:00 PM
                </div>
                <a href="#watersports-details" className={styles.amenityLink}>
                  Learn More <ChevronRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.ctaContent}
          >
            <h2 className={styles.ctaTitle}>Experience Glimmora Luxury</h2>
            <p className={styles.ctaSubtitle}>
              Book your stay and enjoy unlimited access to all our world-class amenities
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimary}>
                <Calendar size={20} />
                BOOK YOUR STAY
              </button>
              <button className={styles.ctaSecondary}>
                <Phone size={20} />
                SPEAK TO CONCIERGE
              </button>
            </div>
            <p className={styles.ctaNote}>
              Questions about amenities? Our team is available 24/7 to assist you
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AmenitiesPage;
