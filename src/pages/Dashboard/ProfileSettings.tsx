import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Lock,
  Settings,
  Shield,
  Upload,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Save,
  Monitor,
  Smartphone,
  Clock,
  Bell,
  MessageSquare,
  Tag,
  CheckCircle,
  Globe,
  DollarSign,
  Activity,
  History,
  Download,
  Trash,
  AlertTriangle,
  X,
  Info,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './ProfileSettings.module.css';

type Tab = 'personal' | 'security' | 'preferences' | 'privacy';

// Mock user data
const mockUserData = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '1990-01-15',
  gender: 'Male',
  address: {
    line1: '123 Main Street',
    line2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postal: '10001',
    country: 'United States',
  },
  emergencyContact: {
    name: 'Jane Doe',
    relationship: 'Spouse',
    phone: '+1 (555) 987-6543',
    email: 'jane.doe@email.com',
  },
  avatar: null,
  preferences: {
    notifications: {
      email: true,
      sms: false,
      marketing: true,
      preCheckIn: true,
      bookingConfirmations: true,
    },
    room: {
      highFloor: true,
      lowFloor: false,
      quietRoom: true,
      bathtub: false,
      extraPillows: false,
      hypoallergenic: false,
      earlyCheckIn: true,
      lateCheckout: false,
    },
    language: 'English',
    currency: 'USD',
    timezone: 'America/New_York',
  },
  security: {
    twoFactorEnabled: false,
    activeSessions: [
      {
        id: '1',
        device: 'Chrome on MacOS',
        location: 'New York, USA',
        lastActive: 'Active now',
        current: true,
      },
      {
        id: '2',
        device: 'Safari on iPhone',
        location: 'Boston, USA',
        lastActive: '2 hours ago',
        current: false,
      },
    ],
  },
  privacy: {
    publicProfile: false,
    showActivity: false,
    shareHistory: true,
  },
};

interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAccountModal: React.FC<DeleteModalProps> = ({ onClose, onConfirm }) => {
  const [confirmText, setConfirmText] = useState('');

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.deleteModal}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.deleteIcon}>
          <AlertTriangle size={56} color="#DC3545" />
        </div>

        <h2 className={styles.deleteTitle}>Delete Account?</h2>

        <div className={styles.deleteWarning}>
          <Info size={18} />
          <span>This action cannot be undone. All your data will be permanently deleted.</span>
        </div>

        <div className={styles.consequencesList}>
          <div className={styles.consequenceItem}>
            <X size={16} color="#DC3545" />
            <span>All bookings will be cancelled</span>
          </div>
          <div className={styles.consequenceItem}>
            <X size={16} color="#DC3545" />
            <span>Reward points will be lost</span>
          </div>
          <div className={styles.consequenceItem}>
            <X size={16} color="#DC3545" />
            <span>Account recovery will not be possible</span>
          </div>
          <div className={styles.consequenceItem}>
            <X size={16} color="#DC3545" />
            <span>All personal data will be deleted</span>
          </div>
        </div>

        <div className={styles.confirmInputContainer}>
          <label>Type DELETE to confirm</label>
          <input
            type="text"
            placeholder="DELETE"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className={styles.confirmInput}
          />
        </div>

        <div className={styles.deleteButtons}>
          <button className={styles.cancelDeleteButton} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.confirmDeleteButton}
            onClick={onConfirm}
            disabled={confirmText !== 'DELETE'}
          >
            Delete My Account
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const [formData, setFormData] = useState(mockUserData);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { key: 'personal' as Tab, label: 'Personal Info', icon: User },
    { key: 'security' as Tab, label: 'Security', icon: Lock },
    { key: 'preferences' as Tab, label: 'Preferences', icon: Settings },
    { key: 'privacy' as Tab, label: 'Privacy', icon: Shield },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...(prev as any)[parent],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    // Show success toast (implement toast notification)
    console.log('Settings saved');
  };

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength: number): string => {
    if (strength === 1) return '#DC3545';
    if (strength === 2) return '#FFA500';
    if (strength === 3) return '#2196F3';
    return '#27AE60';
  };

  const getStrengthText = (strength: number): string => {
    if (strength === 0) return '';
    if (strength === 1) return 'Weak';
    if (strength === 2) return 'Fair';
    if (strength === 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className={styles.profileSettings}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Profile Settings</h1>
        <p className={styles.pageSubtitle}>Manage your account information and preferences</p>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabNavigation}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'personal' && (
          <motion.div
            key="personal"
            className={styles.tabContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Avatar Section */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Profile Photo</h2>
              <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                  {formData.avatar ? (
                    <img src={formData.avatar} alt="Profile" />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      {formData.firstName[0]}{formData.lastName[0]}
                    </div>
                  )}
                </div>
                <div className={styles.avatarActions}>
                  <button className={styles.uploadButton}>
                    <Upload size={16} />
                    Upload Photo
                  </button>
                  <button className={styles.removeButton}>Remove</button>
                  <p className={styles.avatarGuidelines}>JPG, PNG or GIF. Max size 5MB</p>
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            {/* Personal Details Form */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Personal Details</h2>
              <div className={styles.formGrid}>
                <div className={styles.formField}>
                  <label>
                    First Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="John"
                  />
                </div>

                <div className={styles.formField}>
                  <label>
                    Last Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Doe"
                  />
                </div>

                <div className={styles.formField}>
                  <label>
                    Email Address <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.inputWithIcon}>
                    <Mail size={16} />
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      placeholder="john.doe@email.com"
                    />
                  </div>
                  <p className={styles.helperText}>Contact support to change email</p>
                </div>

                <div className={styles.formField}>
                  <label>Phone Number</label>
                  <div className={styles.inputWithIcon}>
                    <Phone size={16} />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className={styles.formField}>
                  <label>Date of Birth</label>
                  <div className={styles.inputWithIcon}>
                    <Calendar size={16} />
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.formField}>
                  <label>Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>

                <div className={`${styles.formField} ${styles.fullWidth}`}>
                  <label>Address Line 1</label>
                  <input
                    type="text"
                    value={formData.address.line1}
                    onChange={(e) => handleNestedChange('address', 'line1', e.target.value)}
                    placeholder="123 Main Street"
                  />
                </div>

                <div className={`${styles.formField} ${styles.fullWidth}`}>
                  <label>Address Line 2</label>
                  <input
                    type="text"
                    value={formData.address.line2}
                    onChange={(e) => handleNestedChange('address', 'line2', e.target.value)}
                    placeholder="Apartment, suite, etc."
                  />
                </div>

                <div className={styles.formField}>
                  <label>City</label>
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={(e) => handleNestedChange('address', 'city', e.target.value)}
                    placeholder="New York"
                  />
                </div>

                <div className={styles.formField}>
                  <label>State/Province</label>
                  <input
                    type="text"
                    value={formData.address.state}
                    onChange={(e) => handleNestedChange('address', 'state', e.target.value)}
                    placeholder="NY"
                  />
                </div>

                <div className={styles.formField}>
                  <label>Postal Code</label>
                  <input
                    type="text"
                    value={formData.address.postal}
                    onChange={(e) => handleNestedChange('address', 'postal', e.target.value)}
                    placeholder="10001"
                  />
                </div>

                <div className={styles.formField}>
                  <label>Country</label>
                  <select
                    value={formData.address.country}
                    onChange={(e) => handleNestedChange('address', 'country', e.target.value)}
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            {/* Emergency Contact */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Emergency Contact (Optional)</h2>
              <div className={styles.formGrid}>
                <div className={styles.formField}>
                  <label>Contact Name</label>
                  <input
                    type="text"
                    value={formData.emergencyContact.name}
                    onChange={(e) => handleNestedChange('emergencyContact', 'name', e.target.value)}
                    placeholder="Jane Doe"
                  />
                </div>

                <div className={styles.formField}>
                  <label>Relationship</label>
                  <input
                    type="text"
                    value={formData.emergencyContact.relationship}
                    onChange={(e) => handleNestedChange('emergencyContact', 'relationship', e.target.value)}
                    placeholder="Spouse"
                  />
                </div>

                <div className={styles.formField}>
                  <label>Contact Phone</label>
                  <input
                    type="tel"
                    value={formData.emergencyContact.phone}
                    onChange={(e) => handleNestedChange('emergencyContact', 'phone', e.target.value)}
                    placeholder="+1 (555) 987-6543"
                  />
                </div>

                <div className={styles.formField}>
                  <label>Contact Email</label>
                  <input
                    type="email"
                    value={formData.emergencyContact.email}
                    onChange={(e) => handleNestedChange('emergencyContact', 'email', e.target.value)}
                    placeholder="jane.doe@email.com"
                  />
                </div>
              </div>
            </div>

            <div className={styles.formActions}>
              <button className={styles.cancelButton}>Cancel</button>
              <button className={styles.saveButton} onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save size={18} />
                    SAVE CHANGES
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'security' && (
          <motion.div
            key="security"
            className={styles.tabContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Change Password */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Change Password</h2>
              <div className={styles.passwordForm}>
                <div className={styles.formField}>
                  <label>
                    Current Password <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.passwordInput}>
                    <Lock size={16} />
                    <input
                      type={showPassword.current ? 'text' : 'password'}
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                    >
                      {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className={styles.formField}>
                  <label>
                    New Password <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.passwordInput}>
                    <Lock size={16} />
                    <input
                      type={showPassword.new ? 'text' : 'password'}
                      placeholder="Enter new password"
                      onChange={(e) => setPasswordStrength(calculatePasswordStrength(e.target.value))}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                    >
                      {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {passwordStrength > 0 && (
                    <div className={styles.passwordStrength}>
                      <div className={styles.strengthBars}>
                        {[1, 2, 3, 4].map(level => (
                          <div
                            key={level}
                            className={styles.strengthBar}
                            style={{
                              background: level <= passwordStrength ? getStrengthColor(passwordStrength) : '#E8E4E0'
                            }}
                          />
                        ))}
                      </div>
                      <span style={{ color: getStrengthColor(passwordStrength) }}>
                        {getStrengthText(passwordStrength)}
                      </span>
                    </div>
                  )}

                  <div className={styles.passwordRequirements}>
                    <div className={styles.requirement}>
                      <Check size={14} color={passwordStrength >= 1 ? '#27AE60' : '#808080'} />
                      At least 8 characters
                    </div>
                    <div className={styles.requirement}>
                      <Check size={14} color={passwordStrength >= 2 ? '#27AE60' : '#808080'} />
                      One uppercase letter
                    </div>
                    <div className={styles.requirement}>
                      <Check size={14} color={passwordStrength >= 3 ? '#27AE60' : '#808080'} />
                      One number
                    </div>
                    <div className={styles.requirement}>
                      <Check size={14} color={passwordStrength >= 4 ? '#27AE60' : '#808080'} />
                      One special character
                    </div>
                  </div>
                </div>

                <div className={styles.formField}>
                  <label>
                    Confirm New Password <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.passwordInput}>
                    <Lock size={16} />
                    <input
                      type={showPassword.confirm ? 'text' : 'password'}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                    >
                      {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button className={styles.updatePasswordButton}>UPDATE PASSWORD</button>
              </div>
            </div>

            <div className={styles.divider} />

            {/* Two-Factor Authentication */}
            <div className={styles.section}>
              <div className={styles.twoFactorCard}>
                <div className={styles.twoFactorLeft}>
                  <Shield size={40} color="#A57865" />
                  <div>
                    <h3 className={styles.twoFactorTitle}>Two-Factor Authentication</h3>
                    <p className={styles.twoFactorDescription}>
                      Add an extra layer of security to your account
                    </p>
                    <span className={formData.security.twoFactorEnabled ? styles.statusEnabled : styles.statusDisabled}>
                      {formData.security.twoFactorEnabled ? 'ENABLED' : 'DISABLED'}
                    </span>
                  </div>
                </div>
                <div className={styles.twoFactorRight}>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={formData.security.twoFactorEnabled}
                      onChange={(e) => handleNestedChange('security', 'twoFactorEnabled', e.target.checked)}
                    />
                    <span className={styles.toggleSlider} />
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            {/* Active Sessions */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Active Sessions</h2>
              <div className={styles.sessionsList}>
                {formData.security.activeSessions.map(session => (
                  <div key={session.id} className={styles.sessionCard}>
                    <div className={styles.sessionInfo}>
                      {session.device.includes('iPhone') ? (
                        <Smartphone size={32} color="#A57865" />
                      ) : (
                        <Monitor size={32} color="#A57865" />
                      )}
                      <div className={styles.sessionDetails}>
                        <div className={styles.sessionDevice}>{session.device}</div>
                        <div className={styles.sessionLocation}>
                          <MapPin size={14} />
                          {session.location}
                        </div>
                        <div className={styles.sessionTime}>
                          <Clock size={13} />
                          {session.lastActive}
                        </div>
                      </div>
                      {session.current && (
                        <span className={styles.currentBadge}>THIS DEVICE</span>
                      )}
                    </div>
                    <button
                      className={styles.revokeButton}
                      disabled={session.current}
                    >
                      Revoke
                    </button>
                  </div>
                ))}
              </div>
              <button className={styles.revokeAllButton}>
                Revoke All Other Sessions
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'preferences' && (
          <motion.div
            key="preferences"
            className={styles.tabContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Notification Preferences */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Notification Preferences</h2>
              <div className={styles.preferencesList}>
                <div className={styles.preferenceItem}>
                  <div className={styles.preferenceLeft}>
                    <Mail size={24} color="#A57865" />
                    <div>
                      <div className={styles.preferenceTitle}>Email Notifications</div>
                      <div className={styles.preferenceDescription}>
                        Receive email updates about your bookings
                      </div>
                    </div>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={formData.preferences.notifications.email}
                      onChange={(e) => handleNestedChange('preferences', 'notifications', {
                        ...formData.preferences.notifications,
                        email: e.target.checked
                      })}
                    />
                    <span className={styles.toggleSlider} />
                  </label>
                </div>

                <div className={styles.preferenceItem}>
                  <div className={styles.preferenceLeft}>
                    <MessageSquare size={24} color="#A57865" />
                    <div>
                      <div className={styles.preferenceTitle}>SMS Notifications</div>
                      <div className={styles.preferenceDescription}>
                        Get text messages for important updates
                      </div>
                    </div>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={formData.preferences.notifications.sms}
                      onChange={(e) => handleNestedChange('preferences', 'notifications', {
                        ...formData.preferences.notifications,
                        sms: e.target.checked
                      })}
                    />
                    <span className={styles.toggleSlider} />
                  </label>
                </div>

                <div className={styles.preferenceItem}>
                  <div className={styles.preferenceLeft}>
                    <Tag size={24} color="#A57865" />
                    <div>
                      <div className={styles.preferenceTitle}>Promotional Emails</div>
                      <div className={styles.preferenceDescription}>
                        Special offers and travel deals
                      </div>
                    </div>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={formData.preferences.notifications.marketing}
                      onChange={(e) => handleNestedChange('preferences', 'notifications', {
                        ...formData.preferences.notifications,
                        marketing: e.target.checked
                      })}
                    />
                    <span className={styles.toggleSlider} />
                  </label>
                </div>

                <div className={styles.preferenceItem}>
                  <div className={styles.preferenceLeft}>
                    <Bell size={24} color="#A57865" />
                    <div>
                      <div className={styles.preferenceTitle}>Pre-Check-In Reminders</div>
                      <div className={styles.preferenceDescription}>
                        Reminders when pre-check-in is available
                      </div>
                    </div>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={formData.preferences.notifications.preCheckIn}
                      onChange={(e) => handleNestedChange('preferences', 'notifications', {
                        ...formData.preferences.notifications,
                        preCheckIn: e.target.checked
                      })}
                    />
                    <span className={styles.toggleSlider} />
                  </label>
                </div>

                <div className={styles.preferenceItem}>
                  <div className={styles.preferenceLeft}>
                    <CheckCircle size={24} color="#A57865" />
                    <div>
                      <div className={styles.preferenceTitle}>Booking Confirmations</div>
                      <div className={styles.preferenceDescription}>
                        Confirmations for new and modified bookings
                      </div>
                    </div>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                    />
                    <span className={styles.toggleSlider} />
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            {/* Room Preferences */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Room Preferences</h2>
              <div className={styles.checkboxGrid}>
                {[
                  { key: 'highFloor', label: 'High Floor Preferred' },
                  { key: 'lowFloor', label: 'Low Floor Preferred' },
                  { key: 'quietRoom', label: 'Quiet Room (away from elevator)' },
                  { key: 'bathtub', label: 'Room with Bathtub' },
                  { key: 'extraPillows', label: 'Extra Pillows' },
                  { key: 'hypoallergenic', label: 'Hypoallergenic Bedding' },
                  { key: 'earlyCheckIn', label: 'Early Check-in (if available)' },
                  { key: 'lateCheckout', label: 'Late Checkout (if available)' },
                ].map(pref => (
                  <label key={pref.key} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={(formData.preferences.room as any)[pref.key]}
                      onChange={(e) => handleNestedChange('preferences', 'room', {
                        ...formData.preferences.room,
                        [pref.key]: e.target.checked
                      })}
                    />
                    <span>{pref.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.divider} />

            {/* Language & Region */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Language & Region</h2>
              <div className={styles.formGrid}>
                <div className={styles.formField}>
                  <label>Preferred Language</label>
                  <div className={styles.inputWithIcon}>
                    <Globe size={16} />
                    <select
                      value={formData.preferences.language}
                      onChange={(e) => handleNestedChange('preferences', 'language', e.target.value)}
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formField}>
                  <label>Display Currency</label>
                  <div className={styles.inputWithIcon}>
                    <DollarSign size={16} />
                    <select
                      value={formData.preferences.currency}
                      onChange={(e) => handleNestedChange('preferences', 'currency', e.target.value)}
                    >
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                    </select>
                  </div>
                </div>

                <div className={`${styles.formField} ${styles.fullWidth}`}>
                  <label>Timezone</label>
                  <div className={styles.inputWithIcon}>
                    <Clock size={16} />
                    <select
                      value={formData.preferences.timezone}
                      onChange={(e) => handleNestedChange('preferences', 'timezone', e.target.value)}
                    >
                      <option>America/New_York</option>
                      <option>America/Los_Angeles</option>
                      <option>Europe/London</option>
                      <option>Asia/Tokyo</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formActions}>
              <button className={styles.cancelButton}>Cancel</button>
              <button className={styles.saveButton} onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save size={18} />
                    SAVE CHANGES
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'privacy' && (
          <motion.div
            key="privacy"
            className={styles.tabContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Privacy Settings */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Privacy & Data</h2>
              <div className={styles.preferencesList}>
                <div className={styles.preferenceItem}>
                  <div className={styles.preferenceLeft}>
                    <Eye size={24} color="#A57865" />
                    <div>
                      <div className={styles.preferenceTitle}>Public Profile</div>
                      <div className={styles.preferenceDescription}>
                        Make your profile visible to other users
                      </div>
                    </div>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={formData.privacy.publicProfile}
                      onChange={(e) => handleNestedChange('privacy', 'publicProfile', e.target.checked)}
                    />
                    <span className={styles.toggleSlider} />
                  </label>
                </div>

                <div className={styles.preferenceItem}>
                  <div className={styles.preferenceLeft}>
                    <Activity size={24} color="#A57865" />
                    <div>
                      <div className={styles.preferenceTitle}>Show Activity Status</div>
                      <div className={styles.preferenceDescription}>
                        Let others see when you're active
                      </div>
                    </div>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={formData.privacy.showActivity}
                      onChange={(e) => handleNestedChange('privacy', 'showActivity', e.target.checked)}
                    />
                    <span className={styles.toggleSlider} />
                  </label>
                </div>

                <div className={styles.preferenceItem}>
                  <div className={styles.preferenceLeft}>
                    <History size={24} color="#A57865" />
                    <div>
                      <div className={styles.preferenceTitle}>Share Booking History</div>
                      <div className={styles.preferenceDescription}>
                        Share anonymized data to improve service
                      </div>
                    </div>
                  </div>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={formData.privacy.shareHistory}
                      onChange={(e) => handleNestedChange('privacy', 'shareHistory', e.target.checked)}
                    />
                    <span className={styles.toggleSlider} />
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            {/* Data Management */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Data Management</h2>
              <div className={styles.actionsList}>
                <div className={styles.actionCard}>
                  <div className={styles.actionLeft}>
                    <Download size={24} color="#A57865" />
                    <div>
                      <div className={styles.actionTitle}>Download Your Data</div>
                      <div className={styles.actionDescription}>
                        Get a copy of all your data
                      </div>
                    </div>
                  </div>
                  <button className={styles.primaryActionButton}>Download</button>
                </div>

                <div className={styles.actionCard}>
                  <div className={styles.actionLeft}>
                    <Trash size={24} color="#DC3545" />
                    <div>
                      <div className={styles.actionTitle}>Delete Account</div>
                      <div className={styles.actionDescription}>
                        Permanently delete your account and data
                      </div>
                    </div>
                  </div>
                  <button
                    className={styles.dangerActionButton}
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteAccountModal
            onClose={() => setShowDeleteModal(false)}
            onConfirm={() => {
              console.log('Account deleted');
              setShowDeleteModal(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileSettings;
