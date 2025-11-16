import React from 'react';
import styles from './Typography.module.css';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'overline';
type TypographyColor = 'primary' | 'secondary' | 'tertiary' | 'white' | 'error' | 'success';
type TypographyAlign = 'left' | 'center' | 'right' | 'justify';
type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  component?: keyof JSX.IntrinsicElements;
  color?: TypographyColor;
  align?: TypographyAlign;
  weight?: TypographyWeight;
  gutterBottom?: boolean;
  noWrap?: boolean;
  children: React.ReactNode;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = 'body',
      component,
      color = 'primary',
      align = 'left',
      weight,
      gutterBottom = false,
      noWrap = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const Component = component || getDefaultComponent(variant);

    const typographyClasses = [
      styles.typography,
      styles[variant],
      styles[`color-${color}`],
      styles[`align-${align}`],
      weight && styles[`weight-${weight}`],
      gutterBottom && styles.gutterBottom,
      noWrap && styles.noWrap,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component ref={ref as any} className={typographyClasses} {...props}>
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

function getDefaultComponent(variant: TypographyVariant): keyof JSX.IntrinsicElements {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'caption':
    case 'overline':
      return 'span';
    default:
      return 'p';
  }
}

// Convenience components
export const Heading = (props: Omit<TypographyProps, 'variant'> & { level: 1 | 2 | 3 | 4 | 5 | 6 }) => {
  const { level, ...rest } = props;
  return <Typography variant={`h${level}` as TypographyVariant} {...rest} />;
};

export const Text = (props: Omit<TypographyProps, 'variant'>) => {
  return <Typography variant="body" {...props} />;
};

export const Caption = (props: Omit<TypographyProps, 'variant'>) => {
  return <Typography variant="caption" {...props} />;
};

export const Overline = (props: Omit<TypographyProps, 'variant'>) => {
  return <Typography variant="overline" {...props} />;
};
