'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScrollProgressBar = () => {
  const [scroll, setScroll] = useState(0);
  const pathname = usePathname(); // Use usePathname to get the current path

  const handleScroll = () => {
    const scrolled = document.documentElement.scrollTop;
    const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolledPercentage = `${(scrolled / totalScroll) * 100}%`;
    setScroll(scrolledPercentage);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setScroll(0); // Reset scroll progress on path change
  }, [pathname]);

  return (
    <div className="scroll-progress-container">
      <div className="scroll-progress-bar" style={{ width: scroll }} />
    </div>
  );
};

export default ScrollProgressBar;
