'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AddedAnimationProps {
  className?: string;
}

export function AddedAnimation({ className }: AddedAnimationProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div 
      className={cn(
        "opacity-0 animate-in fade-in-0 duration-150",
        "animate-out fade-out-0 duration-150",
        className
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.1) 100%)',
      }}
    />
  );
}
