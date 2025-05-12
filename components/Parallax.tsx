//components\Parallax.tsx
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import { useWindowSize } from "hamo";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  id?: string;
  position?: "top" | "center" | "bottom";
}

export function Parallax({
  children,
  speed = 1,
  className = "",
  id = "parallax",
  position = "center",
}: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { width: windowWidth = 0 } = useWindowSize(); // Default value added
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const parallaxAmount = windowWidth * speed * 0.1;
      const startPosition = {
        top: "top bottom",
        center: "center center",
        bottom: "bottom top"
      }[position];

      gsap.fromTo(contentRef.current, 
        { y: 0 },
        {
          y: -parallaxAmount,
          ease: "none",
          scrollTrigger: {
            id: id,
            trigger: containerRef.current,
            start: startPosition,
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [speed, windowWidth, id, position]);

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`} 
      id={id}
    >
      <div ref={contentRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}