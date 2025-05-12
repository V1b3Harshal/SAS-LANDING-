//components\LenisWrapper.tsx
"use client";

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

type SmoothScrollingProps = {
  children: ReactNode;
};

export function SmoothScrolling({ children }: SmoothScrollingProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1, // Smoothness factor (0-1)
        wheelMultiplier: 1.2,
        smoothWheel: true, // Enable smooth wheel scrolling
      }}
    >
      {children}
    </ReactLenis>
  );
}