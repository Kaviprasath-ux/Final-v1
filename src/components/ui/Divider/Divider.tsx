import React from 'react';
import styles from './Divider.module.css';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'none' | 'small' | 'medium' | 'large';
  children?: React.ReactNode;
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'solid',
      spacing = 'medium',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const dividerClasses = [
      styles.divider,
      styles[orientation],
      styles[variant],
      styles[`spacing-${spacing}`],
      children && styles.hasContent,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (children) {
      return (
        <div className={dividerClasses} role="separator" aria-orientation={orientation}>
          <span className={styles.content}>{children}</span>
        </div>
      );
    }

    return (
      <hr
        ref={ref}
        className={dividerClasses}
        role="separator"
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
