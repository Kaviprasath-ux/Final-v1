import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mic, Send, Globe } from 'lucide-react';
import styles from './AIAssistantDemo.module.css';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const demoConversation = [
  { text: "What time is breakfast served?", isUser: true },
  { text: "Breakfast is served daily from 7:00 AM to 11:00 AM in our main restaurant. We also offer in-room dining 24/7. Would you like to place an order?", isUser: false },
  { text: "Can you book a spa appointment?", isUser: true },
  { text: "I'd be happy to help! We have availability at 2:00 PM and 4:00 PM today. Which time works best for you?", isUser: false },
  { text: "Recommend local restaurants", isUser: true },
  { text: "Here are my top 3 recommendations near you:\n\n1. 🍽️ La Marina - Seafood, 0.5 mi\n2. 🍕 Bella Italia - Italian, 0.8 mi\n3. 🍣 Sakura Sushi - Japanese, 1.2 mi\n\nWould you like me to make a reservation?", isUser: false }
];

const quickActions = [
  "What's the WiFi password?",
  "Request housekeeping",
  "Late checkout",
  "Room service menu"
];

export const AIAssistantDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentConvIndex, setCurrentConvIndex] = useState(0);

  useEffect(() => {
    if (currentConvIndex < demoConversation.length) {
      const timer = setTimeout(() => {
        const newMessage: Message = {
          id: currentConvIndex,
          text: demoConversation[currentConvIndex].text,
          isUser: demoConversation[currentConvIndex].isUser,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newMessage]);
        setCurrentConvIndex(prev => prev + 1);
      }, currentConvIndex === 0 ? 500 : 2000);

      return () => clearTimeout(timer);
    }
  }, [currentConvIndex]);

  return (
    <section className={styles.aiAssistantDemo} id="chat">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.sectionHeader}
        >
          <p className={styles.pretitle}>24/7 AI CONCIERGE</p>
          <h2 className={styles.title}>Meet Your AI Assistant</h2>
          <p className={styles.subtitle}>
            Available 24/7 in 9 languages. Get instant answers to any question.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.chatDemo}
        >
          {/* Chat Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.aiAvatar}>
                <MessageCircle size={20} />
              </div>
              <div>
                <h4>Glimmora AI</h4>
                <span className={styles.onlineStatus}>
                  <span className={styles.onlineDot} />
                  Always available
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.languageBtn}
            >
              <Globe size={18} />
              English
            </motion.button>
          </div>

          {/* Messages */}
          <div className={styles.messagesContainer}>
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`${styles.message} ${message.isUser ? styles.userMessage : styles.aiMessage}`}
                >
                  {!message.isUser && (
                    <div className={styles.messageAvatar}>
                      <MessageCircle size={16} />
                    </div>
                  )}
                  <div className={styles.messageBubble}>
                    <p>{message.text}</p>
                    <span className={styles.timestamp}>{message.timestamp}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {currentConvIndex < demoConversation.length && !demoConversation[currentConvIndex].isUser && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`${styles.message} ${styles.aiMessage}`}
              >
                <div className={styles.messageAvatar}>
                  <MessageCircle size={16} />
                </div>
                <div className={styles.typingIndicator}>
                  <span /><span /><span />
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={styles.quickAction}
              >
                {action}
              </motion.button>
            ))}
          </div>

          {/* Input */}
          <div className={styles.chatInput}>
            <input
              type="text"
              placeholder="Ask me anything..."
              disabled
            />
            <button className={styles.voiceBtn}>
              <Mic size={20} />
            </button>
            <button className={styles.sendBtn}>
              <Send size={20} />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={styles.languageGrid}
        >
          <p>Available in:</p>
          <div className={styles.languages}>
            {['English', 'Spanish', 'French', 'German', 'Italian', 'Japanese', 'Chinese', 'Arabic', 'Portuguese'].map((lang, i) => (
              <motion.span
                key={lang}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className={styles.languageTag}
              >
                {lang}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
