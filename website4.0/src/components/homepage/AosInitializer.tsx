"use client";

import { useEffect } from "react";
import AOS from "aos";

export function AosInitializer() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });

    return () => {
      AOS.refreshHard();
    };
  }, []);

  return null;
}
