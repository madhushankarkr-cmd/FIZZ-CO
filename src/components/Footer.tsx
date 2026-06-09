"use client";

import React, { useState } from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      alert("Subscribed successfully! Keep bubbling!");
    }
  };

  return (
    <footer className="w-full py-16 px-6 md:px-16 flex flex-col md:flex-row justify-between items-start gap-12 bg-surface-container-highest dark:bg-inverse-surface mt-auto border-t border-outline/5 relative z-10">
      <div className="space-y-6 max-w-xs">
        <Link href="/" className="font-display-lg text-headline-sm text-on-surface uppercase font-black tracking-tighter">
          Fizz & Co
        </Link>
        <p className="text-on-surface-variant font-body-md">
          Refreshing the world, one bubble at a time. Crafted with love in the city of sun.
        </p>
        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full bg-on-surface/5 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-lg">share</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-on-surface/5 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-lg">favorite</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-on-surface/5 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-lg">public</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 md:gap-16">
        <div className="space-y-4">
          <h4 className="font-label-bold text-on-surface uppercase tracking-wider text-primary">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/#story" className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200 font-body-md">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/shop" className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200 font-body-md">
                Shop All
              </Link>
            </li>
            <li>
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200 font-body-md">
                Wholesale
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-label-bold text-on-surface uppercase tracking-wider text-primary">Support</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200 font-body-md">
                Shipping Info
              </a>
            </li>
            <li>
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200 font-body-md">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200 font-body-md">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full md:w-auto mt-8 md:mt-0 border-t md:border-none border-on-surface/10 pt-8 md:pt-0">
        <p className="font-body-md text-on-surface-variant">© 2026 Fizz & Co. Stay Bubbly.</p>
      </div>
    </footer>
  );
};
