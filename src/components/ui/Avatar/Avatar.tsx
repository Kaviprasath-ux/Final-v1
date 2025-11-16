import React from 'react';
import styles from './Avatar.module.css';

export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  fallback?: string;
  shape?: 'circle' | 'square';
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      size = 'medium',
      fallback,
      shape = 'circle',
      className = '',
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);

    const avatarClasses = [
      styles.avatar,
      styles[size],
      styles[shape],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const getInitials = (name?: string): string => {
      if (!name) return '?';
      const names = name.trim().split(' ');
      if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
      }
      return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    };

    const handleImageError = () => {
      setImageError(true);
    };

    return (
      <div ref={ref} className={avatarClasses} {...props}>
        {src && !imageError ? (
          <img
            src={src}
            alt={alt}
            className={styles.image}
            onError={handleImageError}
          />
        ) : (
          <span className={styles.fallback} aria-label={alt || fallback}>
            {getInitials(fallback || alt)}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarSize;
  children: React.ReactNode;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max = 3, size = 'medium', className = '', children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const displayChildren = max ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = childrenArray.length - (max || 0);

    const groupClasses = [
      styles.group,
      styles[`group-${size}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={groupClasses} {...props}>
        {displayChildren}
        {remainingCount > 0 && (
          <div className={`${styles.avatar} ${styles[size]} ${styles.circle} ${styles.more}`}>
            <span className={styles.fallback}>+{remainingCount}</span>
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';
