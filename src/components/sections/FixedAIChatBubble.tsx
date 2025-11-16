import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Mic, Sparkles } from 'lucide-react';
import styles from './FixedAIChatBubble.module.css';

const quickActions = [
  { icon: '🍽️', label: 'Room Service' },
  { icon: '🧹', label: 'Housekeeping' },
  { icon: '🔑', label: 'Concierge' },
  { icon: '📞', label: 'Front Desk' }
];

export const FixedAIChatBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);

  const handleOpen = () => {
    setIsOpen(true);
    setHasNewMessage(false);
  };

  return (
    <>
      {/* Chat Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={handleOpen}
            className={styles.chatBubble}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className={styles.bubbleIcon}
              animate={{
                rotate: [0, -10, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <MessageCircle size={28} />
            </motion.div>

            {/* Pulsing Ring */}
            <motion.div
              className={styles.pulseRing}
              animate={{
                scale: [1, 1.5],
                opacity: [0.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />

            {/* New Message Badge */}
            {hasNewMessage && (
              <motion.div
                className={styles.newMessageBadge}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
              >
                1
              </motion.div>
            )}

            <span className={styles.bubbleLabel}>AI Assistant</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={styles.chatWindow}
          >
            {/* Header */}
            <div className={styles.chatHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.aiAvatar}>
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4>Glimmora AI</h4>
                  <span className={styles.status}>
                    <span className={styles.onlineDot} />
                    Online
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
                <X size={20} />
              </button>
            </div>

            {/* Welcome Message */}
            <div className={styles.chatBody}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={styles.welcomeMessage}
              >
                <div className={styles.messageAvatar}>
                  <Sparkles size={16} />
                </div>
                <div className={styles.messageBubble}>
                  <p>👋 Hi! I'm your AI concierge. How can I help you today?</p>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={styles.quickActionsGrid}
              >
                <p className={styles.quickActionsLabel}>Quick actions:</p>
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: '#FAF8F6' }}
                    whileTap={{ scale: 0.95 }}
                    className={styles.quickActionButton}
                  >
                    <span className={styles.actionIcon}>{action.icon}</span>
                    <span>{action.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Input */}
            <div className={styles.chatFooter}>
              <input
                type="text"
                placeholder="Type your message..."
                className={styles.chatInput}
              />
              <button className={styles.voiceButton}>
                <Mic size={20} />
              </button>
              <button className={styles.sendButton}>
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
