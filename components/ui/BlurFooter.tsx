import React from 'react';
import { LinearBlur } from "progressive-blur";

export const BlurFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-[200px] pointer-events-none z-40">
      {/* Linear blur effect at the bottom */}
      <LinearBlur
        side="bottom"
        steps={8.6}
        strength={52}
        falloffPercentage={100}
        // Match your dark theme
        style={{
          position: 'absolute',
          inset: 0,
          height: '100%',
          width: '100%',
        }}
      />
      
      {/* Optional: Additional gradient overlay for better blending */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgb(10,10,20)] to-transparent opacity-70" />
    </div>
  );
};