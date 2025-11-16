import React from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      helperText,
      indeterminate = false,
      className = '',
      id,
      disabled,
      checked,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${React.useId()}`;
    const errorId = error ? `${checkboxId}-error` : undefined;
    const helperTextId = helperText ? `${checkboxId}-helper` : undefined;

    const internalRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = (ref as any) || internalRef;

    React.useEffect(() => {
      if (combinedRef.current) {
        combinedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, combinedRef]);

    const wrapperClasses = [
      styles.wrapper,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const checkboxClasses = [
      styles.checkbox,
      error && styles.hasError,
      disabled && styles.disabled,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        <div className={styles.checkboxWrapper}>
          <input
            ref={combinedRef}
            type="checkbox"
            id={checkboxId}
            className={checkboxClasses}
            disabled={disabled}
            checked={checked}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : helperTextId}
            {...props}
          />
          <span className={styles.checkmark}>
            {indeterminate ? (
              <svg viewBox="0 0 16 16" fill="none" className={styles.icon}>
                <rect x="4" y="7" width="8" height="2" fill="currentColor" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" fill="none" className={styles.icon}>
                <path
                  d="M13.5 4L6 11.5L2.5 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          {label && (
            <label htmlFor={checkboxId} className={styles.label}>
              {label}
            </label>
          )}
        </div>
        {error && (
          <span id={errorId} className={styles.error} role="alert">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span id={helperTextId} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
