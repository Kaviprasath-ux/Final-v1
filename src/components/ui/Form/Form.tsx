import React from 'react';
import styles from './Form.module.css';

// Form Label Component
export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: React.ReactNode;
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ required = false, className = '', children, ...props }, ref) => {
    return (
      <label ref={ref} className={`${styles.label} ${className}`} {...props}>
        {children}
        {required && (
          <span className={styles.required} aria-label="required">
            {' '}*
          </span>
        )}
      </label>
    );
  }
);

FormLabel.displayName = 'FormLabel';

// Form Error Component
export interface FormErrorProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const FormError = React.forwardRef<HTMLSpanElement, FormErrorProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <span ref={ref} className={`${styles.error} ${className}`} role="alert" {...props}>
        {children}
      </span>
    );
  }
);

FormError.displayName = 'FormError';

// Form Helper Text Component
export interface FormHelperTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const FormHelperText = React.forwardRef<HTMLSpanElement, FormHelperTextProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <span ref={ref} className={`${styles.helperText} ${className}`} {...props}>
        {children}
      </span>
    );
  }
);

FormHelperText.displayName = 'FormHelperText';

// Form Field Component
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ fullWidth = false, className = '', children, ...props }, ref) => {
    const fieldClasses = [
      styles.field,
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={fieldClasses} {...props}>
        {children}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

// Form Group Component
export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spacing?: 'small' | 'medium' | 'large';
}

export const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({ spacing = 'medium', className = '', children, ...props }, ref) => {
    const groupClasses = [
      styles.group,
      styles[`spacing-${spacing}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={groupClasses} {...props}>
        {children}
      </div>
    );
  }
);

FormGroup.displayName = 'FormGroup';

// Form Component
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <form ref={ref} className={`${styles.form} ${className}`} {...props}>
        {children}
      </form>
    );
  }
);

Form.displayName = 'Form';
