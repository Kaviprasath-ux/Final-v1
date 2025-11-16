import React from 'react';
import styles from './Spinner.module.css';

export type SpinnerSize = 'small' | 'medium' | 'large';
export type SpinnerVariant = 'primary' | 'white' | 'neutral';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'medium',
      variant = 'primary',
      label = 'Loading...',
      className = '',
      ...props
    },
    ref
  ) => {
    const spinnerClasses = [
      styles.spinner,
      styles[size],
      styles[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={spinnerClasses}
        role="status"
        aria-label={label}
        {...props}
      >
        <svg
          className={styles.svg}
          viewBox="0 0 50 50"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className={styles.circle}
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
        <span className="sr-only">{label}</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

export interface SpinnerOverlayProps {
  show: boolean;
  label?: string;
  backdrop?: boolean;
}

export const SpinnerOverlay: React.FC<SpinnerOverlayProps> = ({
  show,
  label = 'Loading...',
  backdrop = true,
}) => {
  if (!show) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={label}>
      {backdrop && <div className={styles.backdrop} />}
      <div className={styles.overlayContent}>
        <Spinner variant="white" size="large" label={label} />
        {label && <p className={styles.overlayLabel}>{label}</p>}
      </div>
    </div>
  );
};

SpinnerOverlay.displayName = 'SpinnerOverlay';
