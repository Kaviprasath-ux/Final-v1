import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  ChevronRight,
  ChevronDown,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  ArrowUp,
  Sparkles,
  Shield,
  Globe,
  CheckCircle,
  Loader
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Footer.module.css';

interface FooterProps {
  showNewsletter?: boolean;
  variant?: 'default' | 'minimal';
  theme?: 'dark' | 'light';
}

const Footer: React.FC<FooterProps> = ({
  showNewsletter = true,
  variant = 'default',
  theme = 'dark'
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [openMobileColumn, setOpenMobileColumn] = useState<string | null>(null);

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`${styles.footer} ${styles[variant]} ${styles[theme]}`}>
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Hotel",
          "name": "Glimmora Hotel",
          "description": "AI-Powered Luxury Hospitality",
          "url": "https://glimmora.com",
          "telephone": "+1-555-123-4567",
          "email": "hello@glimmora.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Ocean Drive",
            "addressLocality": "Paradise Bay",
            "addressRegion": "CA",
            "postalCode": "90210",
            "addressCountry": "US"
          },
          "sameAs": [
            "https://facebook.com/glimmora",
            "https://instagram.com/glimmora",
            "https://twitter.com/glimmora",
            "https://linkedin.com/company/glimmora",
            "https://youtube.com/@glimmora"
          ]
        })}
      </script>

      {/* Newsletter Bar */}
      {showNewsletter && <NewsletterBar />}

      {/* Main Footer Content */}
      <div className={styles.mainFooter}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Column 1: About/Brand */}
            <div className={styles.brandColumn}>
              <div className={styles.logo}>GLIMMORA</div>
              <div className={styles.tagline}>AI-Powered Luxury Hospitality</div>
              <p className={styles.description}>
                Experience the future of hospitality where cutting-edge AI technology meets timeless luxury. Skip the front desk, unlock with your phone, and enjoy seamless service.
              </p>

              <div className={styles.awards}>
                <h4 className={styles.awardsTitle}>Awards & Recognition</h4>
                <div className={styles.awardBadges}>
                  <span className={styles.badge}>⭐ 5-Star Rated</span>
                  <span className={styles.badge}>🏆 Best AI Hotel 2024</span>
                  <span className={styles.badge}>🌿 Eco-Certified</span>
                </div>
              </div>
            </div>

            {/* Column 2: Explore */}
            <FooterColumn
              title="Explore"
              links={[
                { label: 'Home', path: '/' },
                { label: 'Rooms & Suites', path: '/rooms' },
                { label: 'Amenities', path: '/amenities' },
                { label: 'Pre-Check-In', path: '/dashboard' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'About Glimmora', path: '/about' },
                { label: 'Careers', path: '/careers' },
                { label: 'Blog', path: '/blog' }
              ]}
              isOpen={openMobileColumn === 'explore'}
              onToggle={() => setOpenMobileColumn(openMobileColumn === 'explore' ? null : 'explore')}
            />

            {/* Column 3: Services */}
            <FooterColumn
              title="Services"
              links={[
                { label: 'Spa & Wellness', path: '/amenities#spa' },
                { label: 'Fine Dining', path: '/amenities#dining' },
                { label: 'Infinity Pool', path: '/amenities#pool' },
                { label: 'Fitness Center', path: '/amenities#fitness' },
                { label: 'Business Center', path: '/amenities#business' },
                { label: 'Concierge Services', path: '/amenities#concierge' },
                { label: 'Room Service', path: '/amenities#room-service' },
                { label: 'Valet Parking', path: '/amenities#parking' }
              ]}
              isOpen={openMobileColumn === 'services'}
              onToggle={() => setOpenMobileColumn(openMobileColumn === 'services' ? null : 'services')}
            />

            {/* Column 4: Guest Services */}
            <FooterColumn
              title="Guest Services"
              links={[
                { label: 'My Account', path: '/dashboard' },
                { label: 'My Bookings', path: '/dashboard/bookings' },
                { label: 'Pre-Check-In Portal', path: '/dashboard/pre-check-in' },
                { label: 'Digital Room Keys', path: '/dashboard' },
                { label: 'Special Requests', path: '/contact' },
                { label: 'FAQ', path: '/help' },
                { label: 'Help Center', path: '/help' },
                { label: 'Accessibility', path: '/accessibility' }
              ]}
              isOpen={openMobileColumn === 'guest'}
              onToggle={() => setOpenMobileColumn(openMobileColumn === 'guest' ? null : 'guest')}
            />

            {/* Column 5: Contact */}
            <ContactColumn
              isOpen={openMobileColumn === 'contact'}
              onToggle={() => setOpenMobileColumn(openMobileColumn === 'contact' ? null : 'contact')}
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <FooterBottom />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className={styles.backToTop}
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ y: -4 }}
            aria-label="Back to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

// Newsletter Bar Component
const NewsletterBar: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Newsletter subscription:', email);
      setSuccess(true);
      setEmail('');

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.newsletterBar}>
        <div className={styles.container}>
          <motion.div
            className={styles.successMessage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle size={32} />
            <div>
              <h3>✓ Subscribed! Check your email.</h3>
              <p>Welcome to the Glimmora family</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.newsletterBar}>
      <div className={styles.container}>
        <div className={styles.newsletterContent}>
          <div className={styles.newsletterLeft}>
            <Mail size={40} />
            <div>
              <h3 className={styles.newsletterTitle}>Stay Updated</h3>
              <p className={styles.newsletterDescription}>
                Subscribe to receive exclusive offers, travel tips, and updates from Glimmora
              </p>
            </div>
          </div>

          <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
            <div className={styles.formGroup}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={styles.newsletterInput}
                disabled={loading}
              />
              <button
                type="submit"
                className={styles.newsletterButton}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className={styles.spinner} size={16} />
                    SUBSCRIBING...
                  </>
                ) : (
                  'SUBSCRIBE'
                )}
              </button>
            </div>
            {error && <div className={styles.errorText}>{error}</div>}
            <p className={styles.privacyNote}>
              We respect your privacy. <Link to="/privacy">Privacy Policy</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

// Footer Column Component
interface FooterColumnProps {
  title: string;
  links: Array<{ label: string; path: string }>;
  isOpen: boolean;
  onToggle: () => void;
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links, isOpen, onToggle }) => {
  return (
    <div className={styles.footerColumn}>
      <button className={styles.columnHeader} onClick={onToggle}>
        <h4 className={styles.columnTitle}>{title}</h4>
        <ChevronDown className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} size={20} />
      </button>

      <div className={`${styles.columnContent} ${isOpen ? styles.columnContentOpen : ''}`}>
        <nav className={styles.linkList}>
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={styles.footerLink}
            >
              <span>{link.label}</span>
              <ChevronRight size={14} className={styles.linkIcon} />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

// Contact Column Component
interface ContactColumnProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ContactColumn: React.FC<ContactColumnProps> = ({ isOpen, onToggle }) => {
  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com/glimmora', label: 'Facebook' },
    { icon: Instagram, url: 'https://instagram.com/glimmora', label: 'Instagram' },
    { icon: Twitter, url: 'https://twitter.com/glimmora', label: 'Twitter' },
    { icon: Linkedin, url: 'https://linkedin.com/company/glimmora', label: 'LinkedIn' },
    { icon: Youtube, url: 'https://youtube.com/@glimmora', label: 'YouTube' }
  ];

  return (
    <div className={styles.footerColumn}>
      <button className={styles.columnHeader} onClick={onToggle}>
        <h4 className={styles.columnTitle}>Contact Us</h4>
        <ChevronDown className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} size={20} />
      </button>

      <div className={`${styles.columnContent} ${isOpen ? styles.columnContentOpen : ''}`}>
        <div className={styles.contactDetails}>
          <div className={styles.contactItem}>
            <MapPin size={18} />
            <div>
              <span>123 Ocean Drive</span>
              <span>Paradise Bay, CA 90210</span>
              <span>United States</span>
            </div>
          </div>

          <div className={styles.contactItem}>
            <Phone size={18} />
            <div>
              <a href="tel:+15551234567">+1 (555) 123-4567</a>
              <span>Available 24/7</span>
            </div>
          </div>

          <div className={styles.contactItem}>
            <Mail size={18} />
            <div>
              <a href="mailto:hello@glimmora.com">hello@glimmora.com</a>
              <span>Response within 2 hours</span>
            </div>
          </div>

          <div className={styles.contactItem}>
            <Clock size={18} />
            <div>
              <span>Front Desk: 24/7</span>
            </div>
          </div>
        </div>

        <div className={styles.socialSection}>
          <h4 className={styles.socialTitle}>Follow Us</h4>
          <div className={styles.socialIcons}>
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label={social.label}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Bottom Component
const FooterBottom: React.FC = () => {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = ['English', 'Español', 'Français', 'Deutsch', '中文', '日本語'];

  const paymentMethods = [
    { name: 'Visa', icon: 'VISA' },
    { name: 'Mastercard', icon: 'MC' },
    { name: 'Amex', icon: 'AMEX' },
    { name: 'PayPal', icon: 'PP' },
    { name: 'Apple Pay', icon: 'AP' },
    { name: 'Google Pay', icon: 'GP' }
  ];

  return (
    <div className={styles.bottomBar}>
      <div className={styles.container}>
        <div className={styles.bottomContent}>
          {/* Left Side */}
          <div className={styles.bottomLeft}>
            {/* Language Selector */}
            <div className={styles.languageSelector}>
              <button
                className={styles.languageButton}
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              >
                <Globe size={16} />
                <span>{selectedLanguage}</span>
                <ChevronDown size={14} />
              </button>

              {showLanguageMenu && (
                <div className={styles.languageMenu}>
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      className={styles.languageItem}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setShowLanguageMenu(false);
                      }}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.copyright}>
              <p>© 2024 Glimmora Hotel. All rights reserved.</p>
              <div className={styles.legalLinks}>
                <Link to="/privacy">Privacy Policy</Link>
                <span>|</span>
                <Link to="/terms">Terms of Service</Link>
                <span>|</span>
                <Link to="/cookies">Cookie Policy</Link>
                <span>|</span>
                <Link to="/sitemap">Sitemap</Link>
              </div>
            </div>
          </div>

          {/* Center */}
          <div className={styles.bottomCenter}>
            <Sparkles size={14} color="#A57865" />
            <span>Powered by Glimmora AI</span>
          </div>

          {/* Right Side */}
          <div className={styles.bottomRight}>
            <div className={styles.paymentMethods}>
              <span className={styles.paymentLabel}>We Accept:</span>
              <div className={styles.paymentIcons}>
                {paymentMethods.map((method, index) => (
                  <div key={index} className={styles.paymentIcon} title={method.name}>
                    <span>{method.icon}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.securityBadges}>
              <div className={styles.securityBadge}>
                <Shield size={12} />
                <span>SSL Secure</span>
              </div>
              <div className={styles.securityBadge}>
                <Shield size={12} />
                <span>PCI Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
