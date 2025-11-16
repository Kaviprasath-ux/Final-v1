import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import styles from './Footer.module.css';

const footerSections = [
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Press', 'Blog']
  },
  {
    title: 'Destinations',
    links: ['Maldives', 'Swiss Alps', 'Santorini', 'Dubai']
  },
  {
    title: 'Support',
    links: ['Help Center', 'Contact Us', 'FAQ', 'Booking Policy']
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap']
  }
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' }
];

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} id="about">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.footerContent}
        >
          {/* Brand Section */}
          <div className={styles.footerBrand}>
            <h3>GLIMMORA</h3>
            <p>Redefining luxury hospitality</p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4, scale: 1.1 }}
                    className={styles.socialIcon}
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Section */}
          <div className={styles.footerLinks}>
            {footerSections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
                className={styles.footerSection}
              >
                <h4>{section.title}</h4>
                <ul>
                  {section.links.map((link) => (
                    <motion.li
                      key={link}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <a href="#">{link}</a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className={styles.footerBottom}
        >
          <p>&copy; 2025 Glimmora Hotels. All rights reserved.</p>
          <div className={styles.footerLegal}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
