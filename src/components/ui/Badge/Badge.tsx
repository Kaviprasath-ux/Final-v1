import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      dot = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const badgeClasses = [
      styles.badge,
      styles[variant],
      styles[size],
      dot && styles.dot,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={badgeClasses} {...props}>
        {!dot && children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
