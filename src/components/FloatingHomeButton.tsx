"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useBubbleBurst } from "@/components/BubbleEffect";

export const FloatingHomeButton: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const triggerBurst = useBubbleBurst();
  
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // On homepage, show if scrolled > 200px. On other pages, always show.
      if (pathname === "/") {
        setIsVisible(window.scrollY > 200);
      } else {
        setIsVisible(true);
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleMainAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    triggerBurst(e, "var(--primary-container)");
    
    if (pathname === "/") {
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Go home smoothly via Next.js router
      router.push("/");
    }
  };

  const handleShortcutClick = (e: React.MouseEvent<HTMLAnchorElement>, targetPath: string) => {
    triggerBurst(e, "var(--primary-container)");
    setIsExpanded(false);
    
    if (pathname === "/" && targetPath.startsWith("/#")) {
      // Smooth scroll to the target anchor if we're already on home
      const elementId = targetPath.replace("/#", "");
      const element = document.getElementById(elementId);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (!isVisible) return null;

  const isHome = pathname === "/";

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 font-inter"
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Expanded Menu Options */}
      <div 
        className={`flex items-center gap-3 bg-white/85 dark:bg-black/80 backdrop-blur-md border border-outline/10 shadow-[0_8px_32px_rgba(0,109,53,0.15)] rounded-full px-4 py-2 transition-all duration-300 transform origin-right ${
          isExpanded 
            ? "opacity-100 translate-x-0 scale-100 max-w-[400px]" 
            : "opacity-0 translate-x-10 scale-95 pointer-events-none max-w-0 overflow-hidden"
        }`}
      >
        {/* Home option */}
        <Link
          href="/"
          onClick={(e) => {
            handleShortcutClick(e, "/");
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="group relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 text-on-surface hover:text-primary transition-all duration-200"
          title="Home"
        >
          <span className="material-symbols-outlined text-lg">home</span>
          <span className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Home
          </span>
        </Link>

        {/* Shop option */}
        <Link
          href="/shop"
          onClick={(e) => handleShortcutClick(e, "/shop")}
          className="group relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 text-on-surface hover:text-primary transition-all duration-200"
          title="Shop All"
        >
          <span className="material-symbols-outlined text-lg">shopping_bag</span>
          <span className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Shop All
          </span>
        </Link>

        {/* Flavors option */}
        <Link
          href="/#flavors"
          onClick={(e) => handleShortcutClick(e, "/#flavors")}
          className="group relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 text-on-surface hover:text-primary transition-all duration-200"
          title="Flavors"
        >
          <span className="material-symbols-outlined text-lg">celebration</span>
          <span className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Flavors
          </span>
        </Link>

        {/* Story option */}
        <Link
          href="/#story"
          onClick={(e) => handleShortcutClick(e, "/#story")}
          className="group relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 text-on-surface hover:text-primary transition-all duration-200"
          title="Our Story"
        >
          <span className="material-symbols-outlined text-lg">menu_book</span>
          <span className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Our Story
          </span>
        </Link>
      </div>

      {/* Main Floating Action Button */}
      <button
        onClick={handleMainAction}
        onMouseEnter={() => setIsExpanded(true)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white shadow-[0_8px_24px_rgba(0,109,53,0.3)] hover:shadow-[0_12px_32px_rgba(0,109,53,0.5)] active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border border-white/20 group relative overflow-hidden"
        title={isHome ? "Scroll to Top" : "Go to Homepage"}
      >
        <span className="absolute -inset-4 bg-white/20 rotate-45 translate-y-16 group-hover:-translate-y-16 transition-transform duration-1000 ease-out" />
        
        {isHome ? (
          <span className="material-symbols-outlined text-2xl animate-pulse group-hover:-translate-y-1 group-hover:scale-110 transition-transform">
            arrow_upward
          </span>
        ) : (
          <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
            home
          </span>
        )}
      </button>
    </div>
  );
};
