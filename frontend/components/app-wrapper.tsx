'use client';

import React, { useState, useEffect } from 'react';
import { IntroAnimation } from './intro-animation';

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if user has already seen intro
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      {children}
    </>
  );
}
