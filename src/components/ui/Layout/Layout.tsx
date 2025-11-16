import React from 'react';
import styles from './Layout.module.css';

// Container Component
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: React.ReactNode;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ maxWidth = 'xl', className = '', children, ...props }, ref) => {
    const containerClasses = [
      styles.container,
      styles[`maxWidth-${maxWidth}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

// Grid Component
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 1 | 2 | 3 | 4 | 6 | 8;
  responsive?: boolean;
  children: React.ReactNode;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      cols = 12,
      gap = 4,
      responsive = true,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const gridClasses = [
      styles.grid,
      styles[`cols-${cols}`],
      styles[`gap-${gap}`],
      responsive && styles.responsive,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={gridClasses} {...props}>
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

// Grid Item Component
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: 1 | 2 | 3 | 4 | 6 | 12;
  children: React.ReactNode;
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ span, className = '', children, ...props }, ref) => {
    const gridItemClasses = [
      styles.gridItem,
      span && styles[`span-${span}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={gridItemClasses} {...props}>
        {children}
      </div>
    );
  }
);

GridItem.displayName = 'GridItem';

// Flex Component
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: 1 | 2 | 3 | 4 | 6 | 8;
  children: React.ReactNode;
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = 'row',
      align = 'start',
      justify = 'start',
      wrap = 'nowrap',
      gap = 2,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const flexClasses = [
      styles.flex,
      styles[`direction-${direction}`],
      styles[`align-${align}`],
      styles[`justify-${justify}`],
      styles[`wrap-${wrap}`],
      styles[`flexGap-${gap}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={flexClasses} {...props}>
        {children}
      </div>
    );
  }
);

Flex.displayName = 'Flex';

// Stack Component (Flex with column direction)
export interface StackProps extends Omit<FlexProps, 'direction'> {
  spacing?: 1 | 2 | 3 | 4 | 6 | 8;
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ spacing = 3, gap, ...props }, ref) => {
    return <Flex ref={ref} direction="column" gap={gap || spacing} {...props} />;
  }
);

Stack.displayName = 'Stack';

// Spacer Component
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12 | 16 | 20;
  direction?: 'horizontal' | 'vertical';
}

export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ size = 4, direction = 'vertical', className = '', ...props }, ref) => {
    const spacerClasses = [
      styles.spacer,
      styles[`spacer-${direction}-${size}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return <div ref={ref} className={spacerClasses} {...props} />;
  }
);

Spacer.displayName = 'Spacer';
