import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Loader,
  AlertCircle,
  ChevronDown,
  ArrowRight,
  MessageSquare,
  Car,
  Plane,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  HelpCircle,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Contact.module.css';

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const [showChatWidget, setShowChatWidget] = useState(false);

  // Scroll to specific section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.heroPreTitle}>GET IN TOUCH</div>
            <h1 className={styles.heroTitle}>We're Here to Help</h1>
            <p className={styles.heroSubtitle}>
              Whether you have a question, need assistance with your booking, or want to learn more about Glimmora, our team is ready to assist you 24/7
            </p>

            <div className={styles.quickOptions}>
              <button
                className={styles.quickOption}
                onClick={() => scrollToSection('contact-info')}
              >
                <Phone size={20} />
                Call Us
              </button>
              <button
                className={styles.quickOption}
                onClick={() => setShowChatWidget(true)}
              >
                <MessageCircle size={20} />
                Live Chat
              </button>
              <button
                className={styles.quickOption}
                onClick={() => scrollToSection('contact-form')}
              >
                <Mail size={20} />
                Email Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <ContactMethods onChatClick={() => setShowChatWidget(true)} />

      {/* Contact Form + Info */}
      <ContactFormSection />

      {/* Location & Map */}
      <LocationMap />

      {/* FAQ Section */}
      <ContactFAQ />

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Experience Glimmora?</h2>
          <p className={styles.ctaDescription}>
            Book your stay today and discover luxury redefined with AI-powered hospitality
          </p>
          <div className={styles.ctaButtons}>
            <button
              className={styles.ctaPrimary}
              onClick={() => navigate('/rooms')}
            >
              BOOK YOUR STAY
            </button>
            <button
              className={styles.ctaSecondary}
              onClick={() => navigate('/amenities')}
            >
              EXPLORE AMENITIES
            </button>
          </div>
        </div>
      </section>

      {/* Floating Chat Button */}
      <button
        className={styles.chatButton}
        onClick={() => setShowChatWidget(true)}
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
        <span className={styles.chatBadge} />
      </button>

      {/* Chat Widget (Simple Modal) */}
      {showChatWidget && (
        <div className={styles.chatWidgetOverlay} onClick={() => setShowChatWidget(false)}>
          <motion.div
            className={styles.chatWidget}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.chatHeader}>
              <div>
                <h3>AI Assistant</h3>
                <span>Online</span>
              </div>
              <button onClick={() => setShowChatWidget(false)}>×</button>
            </div>
            <div className={styles.chatBody}>
              <div className={styles.chatMessage}>
                <MessageCircle size={20} />
                <div>
                  <strong>Glimmora AI</strong>
                  <p>Hello! I'm here to help. How can I assist you today?</p>
                </div>
              </div>
            </div>
            <div className={styles.chatFooter}>
              <input type="text" placeholder="Type your message..." />
              <button><Send size={20} /></button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Contact Methods Section
const ContactMethods: React.FC<{ onChatClick: () => void }> = ({ onChatClick }) => {
  const methods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak with our team 24/7 for immediate assistance',
      contactInfo: '+1 (555) 123-4567',
      action: 'Call Now',
      onClick: () => window.location.href = 'tel:+15551234567'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: "Send us a message and we'll respond within 2 hours",
      contactInfo: 'hello@glimmora.com',
      action: 'Send Email',
      onClick: () => window.location.href = 'mailto:hello@glimmora.com'
    },
    {
      icon: MessageCircle,
      title: 'AI Assistant',
      description: 'Chat with our AI assistant for instant answers',
      contactInfo: 'Available 24/7',
      action: 'Start Chat',
      badge: 'INSTANT',
      onClick: onChatClick
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      description: 'Message us on WhatsApp for quick responses',
      contactInfo: '+1 (555) 123-4567',
      action: 'Open WhatsApp',
      onClick: () => window.open('https://wa.me/15551234567', '_blank')
    }
  ];

  return (
    <section className={styles.contactMethods}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionPreTitle}>MULTIPLE WAYS TO REACH US</div>
          <h2 className={styles.sectionTitle}>Choose Your Preferred Contact Method</h2>
        </div>

        <div className={styles.methodsGrid}>
          {methods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.title}
                className={styles.methodCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={method.onClick}
              >
                {method.badge && (
                  <div className={styles.methodBadge}>{method.badge}</div>
                )}
                <div className={styles.methodIcon}>
                  <Icon size={28} />
                </div>
                <h3 className={styles.methodTitle}>{method.title}</h3>
                <p className={styles.methodDescription}>{method.description}</p>
                <div className={styles.methodContactInfo}>{method.contactInfo}</div>
                <div className={styles.methodAction}>
                  {method.action} <ArrowRight size={16} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Contact Form Section
const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    bookingReference: '',
    message: '',
    preferredContact: 'email',
    agreedToPrivacy: false
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: any = {};
    if (!formData.name || formData.name.length < 2) newErrors.name = 'Please enter your name';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.subject) newErrors.subject = 'Please select a subject';
    if (!formData.message || formData.message.length < 10) newErrors.message = 'Please enter a message (min 10 characters)';
    if (!formData.agreedToPrivacy) newErrors.agreedToPrivacy = 'You must agree to continue';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Form submitted:', formData);
      setShowSuccess(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        bookingReference: '',
        message: '',
        preferredContact: 'email',
        agreedToPrivacy: false
      });
    } catch (error) {
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <section className={styles.contactFormSection} id="contact-form">
        <div className={styles.container}>
          <motion.div
            className={styles.successMessage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle size={64} color="#27AE60" />
            <h2>Message Sent Successfully!</h2>
            <p>Thank you for contacting us. We'll get back to you within 2 hours.</p>
            <button
              className={styles.successButton}
              onClick={() => setShowSuccess(false)}
            >
              Send Another Message
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.contactFormSection} id="contact-form">
      <div className={styles.formContainer}>
        {/* Left Column: Contact Info */}
        <div className={styles.contactInfo} id="contact-info">
          <span className={styles.infoBadge}>CONTACT INFO</span>
          <h2 className={styles.infoTitle}>Get in Touch</h2>
          <p className={styles.infoDescription}>
            Have questions about your stay, our amenities, or special requests? We're here to make your experience exceptional. Fill out the form or use any of our contact methods.
          </p>

          {/* Contact Details */}
          <div className={styles.contactDetails}>
            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <MapPin size={20} />
              </div>
              <div className={styles.detailContent}>
                <div className={styles.detailLabel}>VISIT US</div>
                <div className={styles.detailValue}>123 Ocean Drive</div>
                <div className={styles.detailAdditional}>Paradise Bay, CA 90210</div>
                <div className={styles.detailAdditional}>United States</div>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <Phone size={20} />
              </div>
              <div className={styles.detailContent}>
                <div className={styles.detailLabel}>CALL US</div>
                <a href="tel:+15551234567" className={styles.detailValue}>+1 (555) 123-4567</a>
                <div className={styles.detailAdditional}>Available 24/7</div>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <Mail size={20} />
              </div>
              <div className={styles.detailContent}>
                <div className={styles.detailLabel}>EMAIL US</div>
                <a href="mailto:hello@glimmora.com" className={styles.detailValue}>hello@glimmora.com</a>
                <div className={styles.detailAdditional}>Response within 2 hours</div>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <Clock size={20} />
              </div>
              <div className={styles.detailContent}>
                <div className={styles.detailLabel}>FRONT DESK HOURS</div>
                <div className={styles.detailValue}>24/7 Service</div>
                <div className={styles.detailAdditional}>Always here for you</div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className={styles.socialSection}>
            <h3 className={styles.socialTitle}>Follow Us</h3>
            <div className={styles.socialIcons}>
              <button className={styles.socialIcon}><Facebook size={20} /></button>
              <button className={styles.socialIcon}><Instagram size={20} /></button>
              <button className={styles.socialIcon}><Twitter size={20} /></button>
              <button className={styles.socialIcon}><Linkedin size={20} /></button>
              <button className={styles.socialIcon}><Youtube size={20} /></button>
            </div>
          </div>

          {/* Response Time Badge */}
          <div className={styles.responseBadge}>
            <Clock size={24} color="#27AE60" />
            <div>
              <h4>Quick Response Time</h4>
              <p>We typically respond to all inquiries within 2 hours during business hours, and within 4 hours after hours.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <h2>Send Us a Message</h2>
            <p>Fill out the form below and we'll get back to you shortly</p>
          </div>

          {errors.submit && (
            <div className={styles.errorBanner}>
              <AlertCircle size={16} />
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Name */}
            <div className={styles.formGroup}>
              <label htmlFor="name">
                Full Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className={errors.name ? styles.inputError : ''}
              />
              {errors.name && (
                <div className={styles.errorText}>
                  <AlertCircle size={14} /> {errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="email">
                Email Address <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className={errors.email ? styles.inputError : ''}
              />
              {errors.email && (
                <div className={styles.errorText}>
                  <AlertCircle size={14} /> {errors.email}
                </div>
              )}
            </div>

            {/* Phone */}
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Subject */}
            <div className={styles.formGroup}>
              <label htmlFor="subject">
                Subject <span className={styles.required}>*</span>
              </label>
              <select
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className={errors.subject ? styles.inputError : ''}
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="booking">Booking Question</option>
                <option value="pre-checkin">Pre-Check-In Assistance</option>
                <option value="reservation">Room Reservation</option>
                <option value="special">Special Requests</option>
                <option value="feedback">Complaint or Feedback</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="media">Media & Press</option>
                <option value="other">Other</option>
              </select>
              {errors.subject && (
                <div className={styles.errorText}>
                  <AlertCircle size={14} /> {errors.subject}
                </div>
              )}
            </div>

            {/* Booking Reference */}
            <div className={styles.formGroup}>
              <label htmlFor="bookingRef">Booking Reference (if applicable)</label>
              <input
                type="text"
                id="bookingRef"
                value={formData.bookingReference}
                onChange={(e) => setFormData({ ...formData, bookingReference: e.target.value.toUpperCase() })}
                placeholder="GLM-2024-12345"
              />
            </div>

            {/* Message */}
            <div className={styles.formGroup}>
              <label htmlFor="message">
                Message <span className={styles.required}>*</span>
              </label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help you? Please provide as much detail as possible..."
                className={errors.message ? styles.inputError : ''}
                maxLength={1000}
              />
              <div className={styles.charCount}>{formData.message.length} / 1000 characters</div>
              {errors.message && (
                <div className={styles.errorText}>
                  <AlertCircle size={14} /> {errors.message}
                </div>
              )}
            </div>

            {/* Preferred Contact Method */}
            <div className={styles.formGroup}>
              <label>Preferred Contact Method</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="preferredContact"
                    value="email"
                    checked={formData.preferredContact === 'email'}
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                  />
                  <span>Email</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="preferredContact"
                    value="phone"
                    checked={formData.preferredContact === 'phone'}
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                  />
                  <span>Phone</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="preferredContact"
                    value="whatsapp"
                    checked={formData.preferredContact === 'whatsapp'}
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                  />
                  <span>WhatsApp</span>
                </label>
              </div>
            </div>

            {/* Privacy Consent */}
            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.agreedToPrivacy}
                  onChange={(e) => setFormData({ ...formData, agreedToPrivacy: e.target.checked })}
                />
                <span>
                  I agree to the <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Service</a> <span className={styles.required}>*</span>
                </span>
              </label>
              {errors.agreedToPrivacy && (
                <div className={styles.errorText}>
                  <AlertCircle size={14} /> {errors.agreedToPrivacy}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className={styles.spinner} size={20} />
                  SENDING...
                </>
              ) : (
                <>
                  <Send size={20} />
                  SEND MESSAGE
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Location Map Section
const LocationMap: React.FC = () => {
  const transportOptions = [
    {
      icon: Plane,
      title: 'Airport Transfer',
      description: '30 minutes from Paradise Bay International Airport',
      additional: 'Complimentary shuttle available - book in advance'
    },
    {
      icon: Car,
      title: 'Driving Directions',
      description: 'Free valet parking available for guests',
      additional: 'Get Directions'
    },
    {
      icon: MapPin,
      title: 'Taxi & Rideshare',
      description: 'Uber, Lyft, and local taxis readily available',
      additional: 'Average cost from airport: $45-60'
    },
    {
      icon: Car,
      title: 'Public Transportation',
      description: 'Bus route 42 stops directly in front of hotel',
      additional: 'Every 15 minutes, 6 AM - 11 PM'
    }
  ];

  return (
    <section className={styles.locationSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionPreTitle}>FIND US</div>
          <h2 className={styles.sectionTitle}>Our Location</h2>
          <p className={styles.sectionDescription}>Visit us at our beautiful waterfront location</p>
        </div>

        <div className={styles.locationGrid}>
          {/* Map */}
          <div className={styles.mapContainer}>
            <div className={styles.mapPlaceholder}>
              <MapPin size={48} />
              <h3>Glimmora Hotel</h3>
              <p>123 Ocean Drive, Paradise Bay, CA 90210</p>
              <a
                href="https://maps.google.com/?q=123+Ocean+Drive+Paradise+Bay+CA"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                View on Google Maps <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Directions Info */}
          <div className={styles.directionsInfo}>
            <h3 className={styles.directionsTitle}>How to Get Here</h3>

            {transportOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div key={index} className={styles.transportCard}>
                  <div className={styles.transportIcon}>
                    <Icon size={20} />
                  </div>
                  <div className={styles.transportContent}>
                    <h4>{option.title}</h4>
                    <p>{option.description}</p>
                    <span>{option.additional}</span>
                  </div>
                </div>
              );
            })}

            {/* Parking Info */}
            <div className={styles.parkingCard}>
              <Car size={24} />
              <div>
                <h4>Parking</h4>
                <ul>
                  <li>Valet Parking: $35/day</li>
                  <li>Self-Parking: $25/day</li>
                  <li>Complimentary for Suite guests</li>
                  <li>EV Charging stations available</li>
                </ul>
              </div>
            </div>

            {/* Nearby Landmarks */}
            <div className={styles.landmarksSection}>
              <h4>Nearby Attractions</h4>
              <ul className={styles.landmarksList}>
                <li>🏖️ Paradise Beach - 5 min walk</li>
                <li>🏛️ Art Museum - 2 miles</li>
                <li>🍽️ Restaurant District - 10 min walk</li>
                <li>🛍️ Shopping Center - 1.5 miles</li>
                <li>⛳ Golf Course - 3 miles</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact FAQ Section
const ContactFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What are your contact hours?",
      answer: "Our front desk is available 24/7, 365 days a year. Our guest services team responds to emails and chat messages within 2 hours during business hours (8 AM - 10 PM) and within 4 hours after hours."
    },
    {
      question: "How quickly will I receive a response?",
      answer: "We aim to respond to all inquiries within 2 hours during business hours. For urgent matters, we recommend calling our 24/7 hotline at +1 (555) 123-4567."
    },
    {
      question: "Can I modify or cancel my booking?",
      answer: "Yes! You can modify or cancel most bookings free of charge up to 48 hours before check-in. Please contact us with your booking reference or log into your account to make changes."
    },
    {
      question: "Do you offer airport transportation?",
      answer: "Yes, we provide complimentary airport shuttle service for all guests. Please book at least 24 hours in advance by contacting our concierge team."
    },
    {
      question: "How can I make a special request for my stay?",
      answer: "You can add special requests during the booking process, through your pre-check-in, or by contacting our concierge team directly. We'll do our best to accommodate all requests."
    },
    {
      question: "Is there a phone number for international guests?",
      answer: "Yes, international guests can reach us at +1 (555) 123-4567. We also offer WhatsApp messaging at the same number for your convenience."
    },
    {
      question: "Can I book amenities (spa, restaurant) before arrival?",
      answer: "Absolutely! Contact our concierge team or use our AI chat assistant to book spa treatments, restaurant reservations, and activities in advance."
    },
    {
      question: "What's the best way to reach you in an emergency?",
      answer: "For emergencies, please call our 24/7 hotline immediately at +1 (555) 123-4567. If you're already checked in, dial 0 from your room phone."
    },
    {
      question: "Do you have a chat support option?",
      answer: "Yes! Our AI-powered chat assistant is available 24/7 for instant answers. You can also request to speak with a human agent during business hours."
    },
    {
      question: "How do I provide feedback about my stay?",
      answer: "We welcome your feedback! You can submit feedback through our contact form, email us directly, or leave a review after your stay. Your input helps us improve."
    }
  ];

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionPreTitle}>QUICK ANSWERS</div>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <p className={styles.sectionDescription}>Find answers to common questions about contacting us</p>
        </div>

        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${openIndex === index ? styles.faqItemOpen : ''}`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={24}
                  className={openIndex === index ? styles.chevronOpen : ''}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  className={styles.faqAnswer}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className={styles.faqCta}>
          <HelpCircle size={48} />
          <h3>Still Need Help?</h3>
          <p>Can't find the answer you're looking for? Our team is here to assist you.</p>
          <button onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
