import React from 'react';
import ScrollReveal from './ScrollReveal';

interface StaggeredRevealProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  baseDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  className?: string;
  duration?: number;
}

const StaggeredReveal: React.FC<StaggeredRevealProps> = ({
  children,
  staggerDelay = 0.1,
  baseDelay = 0,
  direction = 'up',
  className = '',
  duration = 0.4
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <ScrollReveal
          key={index}
          delay={baseDelay + (index * staggerDelay)}
          direction={direction}
          duration={duration}
          threshold={0.15}
          distance={30}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
};

export default StaggeredReveal;