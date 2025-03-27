'use client';
import { motion, type SpringOptions, useSpring, useTransform } from 'motion/react';
import { JSX, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
  as?: React.ElementType;
};

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = 'span',
}: AnimatedNumberProps) {
  const MotionComponent = motion.create(as as keyof JSX.IntrinsicElements);
  const [currentValue, setCurrentValue] = useState(value);

  const spring = useSpring(currentValue, springOptions);
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
    setCurrentValue(value);
  }, [spring, value]);

  return <MotionComponent className={cn('tabular-nums', className)}>{display}</MotionComponent>;
}
