import React from 'react';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outlined' | 'filled';
  hoverable?: boolean;
  clickable?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'elevated',
      hoverable = false,
      clickable = false,
      padding = 'medium',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const cardClasses = [
      styles.card,
      styles[variant],
      styles[`padding-${padding}`],
      hoverable && styles.hoverable,
      clickable && styles.clickable,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const Component = clickable ? 'button' : 'div';

    return (
      <Component
        ref={ref as any}
        className={cardClasses}
        {...(clickable && { type: 'button' })}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`${styles.header} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`${styles.body} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`${styles.footer} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
