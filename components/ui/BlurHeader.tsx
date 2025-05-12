import React from 'react';
import { LinearBlur } from "progressive-blur";

export const BlurHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-[150px] pointer-events-none z-40">
      {/* Linear blur effect at the top */}
      <LinearBlur
        side="top"
        steps={8.6}
        strength={64}
        falloffPercentage={100}
        style={{
          position: 'absolute',
          inset: 0,
          height: '100%',
          width: '100%',
        }}
      />
      
      {/* Optional: Additional gradient overlay for better blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(10,10,20)] to-transparent opacity-70" />
    </div>
  );
};