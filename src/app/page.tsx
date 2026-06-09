"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BubbleEffect, useBubbleBurst } from "@/components/BubbleEffect";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const { addToCart } = useCart();
  const triggerBurst = useBubbleBurst();

  // Parallax offsets based on mouse moves
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollActive, setScrollActive] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Simple scroll reveal intersection observer
  const reveals = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-reveal-id");
            if (id) {
              setScrollActive((prev) => ({ ...prev, [id]: true }));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(reveals.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Custom 3D Tilt handler
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width - 0.5) * 15;
    const yPercent = (y / rect.height - 0.5) * -15;
    card.style.transform = `perspective(1000px) rotateX(${yPercent}deg) rotateY(${xPercent}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const quickAddToCart = (flavor: string, image: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    triggerBurst(e);
    addToCart({
      flavor,
      packSize: "6-Pack",
      quantity: 1,
      price: 14.99,
      subscribe: false,
      image,
    });
  };

  return (
    <>
      <Header />

      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="bg-blob -top-24 -left-24" />
        <div
          className="bg-blob top-1/2 -right-24"
          style={{
            animationDelay: "-5s",
            background:
              "linear-gradient(135deg, rgba(255,183,165,0.2) 0%, rgba(0,109,53,0.1) 100%)",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 md:px-16 overflow-hidden">
        {/* Parallax Background Brand Title */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center select-none overflow-hidden">
          <h2
            className="font-display-lg text-[15vw] md:text-[20vw] text-primary/5 font-black uppercase whitespace-nowrap transition-transform duration-150 ease-out"
            style={{
              transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
            }}
          >
            Fizz & Co
          </h2>
        </div>

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center relative z-10">
          <div
            ref={(el) => { reveals.current["hero-text"] = el; }}
            data-reveal-id="hero-text"
            className={`space-y-6 transition-all duration-1000 transform ${
              scrollActive["hero-text"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[30px]"
            }`}
          >
            <span className="inline-block py-1 px-4 bg-primary/10 text-primary font-label-bold text-label-bold rounded-full mb-4">
              NEW DROP ARRIVED
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight">
              Taste the <span className="text-primary italic">Spark.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mt-6">
              A vibrant explosion of real fruit and crisp carbonation. No sugar, no junk, just pure effervescent energy to fuel your day.
            </p>
            <div className="pt-10 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="bg-primary text-on-primary px-10 py-5 rounded-full font-label-bold text-label-bold hover:scale-105 transition-all shadow-lg active:scale-95 text-center"
              >
                Shop Now
              </Link>
              <Link
                href="/#flavors"
                className="border-2 border-primary text-primary px-10 py-5 rounded-full font-label-bold text-label-bold hover:bg-primary/5 transition-all active:scale-95 text-center"
              >
                View Flavors
              </Link>
            </div>
          </div>

          <div
            className="relative mt-12 lg:mt-0 transition-transform duration-150 ease-out flex justify-center z-20"
            style={{
              transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px) rotate(3deg)`,
            }}
          >
            <div className="absolute -inset-20 bg-primary/20 blur-3xl rounded-full opacity-50 mix-blend-multiply" />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKXXDa4e2-p0gUpXI62EjEx6K-DG4SJwtPyk8efCpw5shaMPx5xbf7ICJRg9RC9RUuVZpL3eI9gGRNs8tZuOpgU-1pBRrQIWNBdK6wCrma62N_kCDe044IlJFToO0I_0kWfcHUqrrnycagqMz9dsYriKV-2eUMewXpXvDUAJBeG_XwWfeT-ySDl8Jx5dQPOB9Ulzj3nBZLMqQrpPzsMBHAohC7DsNp4TzwliTlLcfAPsEfeuBzDNc2jNlQ2JZkEDPNlbu762yzJo8"
              alt="Fizz & Co Hero Cans"
              className="w-full max-w-[500px] h-auto relative z-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>
      </section>

      {/* Flavors Section */}
      <section
        id="flavors"
        className="py-24 px-6 md:px-16 bg-surface-container-lowest relative overflow-hidden"
      >
        <div className="absolute inset-0 animated-mesh opacity-30 pointer-events-none" />
        
        <div
          ref={(el) => { reveals.current["flavors-title"] = el; }}
          data-reveal-id="flavors-title"
          className={`text-center mb-16 relative z-10 transition-all duration-1000 transform ${
            scrollActive["flavors-title"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[30px]"
          }`}
        >
          <h2 className="font-display-lg text-headline-lg text-on-surface mb-4">
            Choose Your Vibe
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Boldly crafted with cold-pressed fruits and naturally sourced botanicals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter relative z-10 max-w-6xl mx-auto">
          {/* Flavor 1: Electric Lime */}
          <div
            ref={(el) => { reveals.current["flavor-lime"] = el; }}
            data-reveal-id="flavor-lime"
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            className={`group relative bg-white dark:bg-inverse-surface p-8 rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center cursor-pointer transform ${
              scrollActive["flavor-lime"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[30px]"
            }`}
          >
            <div className="absolute inset-0 bg-primary/5 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative mb-8 w-48 h-64 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary-container/20 rounded-full blur-2xl transform group-hover:scale-125 transition-transform duration-700" />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPFtv9Qw07qZ9OhnADHhBoBOczMJ013MQReyaO7aPNB-cwakn4ajYZMqLsmKO1YswxP8s7HAkjQqo7FD7fJfFrkxcETBymGPev24I2yI27NM3Eo0Sje0tbcZqESwKwrvXh7P_wWjHxu8qxBL9878igG3EugL8Q48yRzEYAzye9x_4XPdItled67dkZYSlC5boiTZJfxoHSFPaTX_iQkcClt1cfOkAMW2q1fwDm_Op6IYtlNWg5pz9N5eSKj2NPvirzVFjMQ0R2PDk"
                alt="Electric Lime"
                className="relative z-10 h-full w-auto object-contain transform group-hover:-translate-y-8 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <span className="bg-primary/10 text-primary font-label-bold text-[12px] px-3 py-1 rounded-full mb-4">
              ZESTY & SHARP
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
              Electric Lime
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              A citrus surge that wakes up your senses with real Tahitian lime and a pinch of sea salt.
            </p>
            <div className="mt-auto w-full space-y-3">
              <Link
                href="/shop/electric-lime"
                className="w-full py-3 rounded-full border border-primary text-primary font-label-bold hover:bg-primary/5 transition-all text-center block"
              >
                Learn More
              </Link>
              <button
                onClick={(e) =>
                  quickAddToCart(
                    "Electric Lime",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuDPFtv9Qw07qZ9OhnADHhBoBOczMJ013MQReyaO7aPNB-cwakn4ajYZMqLsmKO1YswxP8s7HAkjQqo7FD7fJfFrkxcETBymGPev24I2yI27NM3Eo0Sje0tbcZqESwKwrvXh7P_wWjHxu8qxBL9878igG3EugL8Q48yRzEYAzye9x_4XPdItled67dkZYSlC5boiTZJfxoHSFPaTX_iQkcClt1cfOkAMW2q1fwDm_Op6IYtlNWg5pz9N5eSKj2NPvirzVFjMQ0R2PDk",
                    e
                  )
                }
                className="w-full py-4 rounded-full bg-primary text-on-primary font-label-bold hover:scale-[1.02] active:scale-95 transition-all"
              >
                Quick Add to Cart
              </button>
            </div>
          </div>

          {/* Flavor 2: Tropical Mango */}
          <div
            ref={(el) => { reveals.current["flavor-mango"] = el; }}
            data-reveal-id="flavor-mango"
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            className={`group relative bg-white dark:bg-inverse-surface p-8 rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center cursor-pointer transform ${
              scrollActive["flavor-mango"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[30px]"
            }`}
          >
            <div className="absolute inset-0 bg-secondary-container/10 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative mb-8 w-48 h-64 flex items-center justify-center">
              <div className="absolute inset-0 bg-secondary-container/20 rounded-full blur-2xl transform group-hover:scale-125 transition-transform duration-700" />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeIVNUHd9iTMur5F5OzXZU6wd2kkalye2nCySCrENogCNr6NNYeSVdigz-jgy_yC3xWEAHadEmEKsv8D3YAiUjBSSVz6V5xpXOA0iVmD1ha9R_xXIgICMe_Ll4l6MGHAzrieb0z1flgco9N5oQEj1zSn7bOAUAf1VjFfXlrprkOMWthWRxFlisPITX3CPU4RGcbetLD2zXhh6sJf7nF2evlLN6e2Y2NY81OELUA-Ph52iS8VmfYtqE5bSXzAJCveg9DNZTpS32mew"
                alt="Tropical Mango"
                className="relative z-10 h-full w-auto object-contain transform group-hover:-translate-y-8 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <span className="bg-secondary/10 text-secondary font-label-bold text-[12px] px-3 py-1 rounded-full mb-4">
              SWEET & SUNNY
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
              Tropical Mango
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              Sunkissed Alphonso mangoes blended for a smooth, velvety fizz that feels like a beach day.
            </p>
            <div className="mt-auto w-full space-y-3">
              <Link
                href="/shop/tropical-mango"
                className="w-full py-3 rounded-full border border-secondary text-secondary font-label-bold hover:bg-secondary/5 transition-all text-center block"
              >
                Learn More
              </Link>
              <button
                onClick={(e) =>
                  quickAddToCart(
                    "Tropical Mango",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBeIVNUHd9iTMur5F5OzXZU6wd2kkalye2nCySCrENogCNr6NNYeSVdigz-jgy_yC3xWEAHadEmEKsv8D3YAiUjBSSVz6V5xpXOA0iVmD1ha9R_xXIgICMe_Ll4l6MGHAzrieb0z1flgco9N5oQEj1zSn7bOAUAf1VjFfXlrprkOMWthWRxFlisPITX3CPU4RGcbetLD2zXhh6sJf7nF2evlLN6e2Y2NY81OELUA-Ph52iS8VmfYtqE5bSXzAJCveg9DNZTpS32mew",
                    e
                  )
                }
                className="w-full py-4 rounded-full bg-secondary text-on-primary font-label-bold hover:scale-[1.02] active:scale-95 transition-all"
              >
                Quick Add to Cart
              </button>
            </div>
          </div>

          {/* Flavor 3: Zesty Berry */}
          <div
            ref={(el) => { reveals.current["flavor-berry"] = el; }}
            data-reveal-id="flavor-berry"
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            className={`group relative bg-white dark:bg-inverse-surface p-8 rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center cursor-pointer transform ${
              scrollActive["flavor-berry"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[30px]"
            }`}
          >
            <div className="absolute inset-0 bg-tertiary-container/10 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative mb-8 w-48 h-64 flex items-center justify-center">
              <div className="absolute inset-0 bg-tertiary-container/20 rounded-full blur-2xl transform group-hover:scale-125 transition-transform duration-700" />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBvAVvzNYoF7zCaa8Gu13l1IdpbllKNhynGSnV-EFrS5Q4hR0o_0n5jijgBE_xH6KDfzwIszn7j5VbYVXQ3Kj-y_T7cNIzkv91Y-e7NdAbEH0w02VFJRcHmXWit-lbonEhsERM1_8sihUOo0RBxHj0HMUjqcUR5lPV4kiWLIggRhvvYdD3CYZbHl7q1IgSgcTbawPVycPuddfTokvomtVNd3dd2HjsuLjbUDuRbyC7U-iqpzf6zHUkA97bYDFx9lenZoyThMUIKh8"
                alt="Zesty Berry"
                className="relative z-10 h-full w-auto object-contain transform group-hover:-translate-y-8 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <span className="bg-tertiary/10 text-tertiary font-label-bold text-[12px] px-3 py-1 rounded-full mb-4">
              TART & BOLD
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
              Zesty Berry
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              A wild mix of raspberries and blackberries with a sharp hibiscus finish for the bold ones.
            </p>
            <div className="mt-auto w-full space-y-3">
              <Link
                href="/shop/zesty-berry"
                className="w-full py-3 rounded-full border border-tertiary text-tertiary font-label-bold hover:bg-tertiary/5 transition-all text-center block"
              >
                Learn More
              </Link>
              <button
                onClick={(e) =>
                  quickAddToCart(
                    "Zesty Berry",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuDBvAVvzNYoF7zCaa8Gu13l1IdpbllKNhynGSnV-EFrS5Q4hR0o_0n5jijgBE_xH6KDfzwIszn7j5VbYVXQ3Kj-y_T7cNIzkv91Y-e7NdAbEH0w02VFJRcHmXWit-lbonEhsERM1_8sihUOo0RBxHj0HMUjqcUR5lPV4kiWLIggRhvvYdD3CYZbHl7q1IgSgcTbawPVycPuddfTokvomtVNd3dd2HjsuLjbUDuRbyC7U-iqpzf6zHUkA97bYDFx9lenZoyThMUIKh8",
                    e
                  )
                }
                className="w-full py-4 rounded-full bg-tertiary text-on-primary font-label-bold hover:scale-[1.02] active:scale-95 transition-all"
              >
                Quick Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section id="story" className="py-24 px-6 md:px-16 relative">
        <div className="container mx-auto max-w-6xl">
          <div
            ref={(el) => { reveals.current["story-card"] = el; }}
            data-reveal-id="story-card"
            className={`bg-surface-container-high dark:bg-inverse-surface rounded-[48px] overflow-hidden flex flex-col lg:flex-row shadow-xl transition-all duration-1000 transform ${
              scrollActive["story-card"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[30px]"
            }`}
          >
            <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center">
              <h2 className="font-display-lg text-headline-lg text-on-surface mb-6">
                Stay Bubbly, Naturally.
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                We believe that what you put in your body should be as vibrant as your life. Fizz & Co was born in a small kitchen with a big idea: soda doesn't have to be a "guilty" pleasure. We use cold-pressed juices, zero synthetic sweeteners, and just the right amount of fizz to keep you moving.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-primary bg-primary/10 p-1 rounded-full"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="font-label-bold text-on-surface">
                    100% Real Fruit Ingredients
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-primary bg-primary/10 p-1 rounded-full"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="font-label-bold text-on-surface">
                    Zero Added Sugars or Syrups
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-primary bg-primary/10 p-1 rounded-full"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="font-label-bold text-on-surface">
                    Eco-Friendly Recyclable Cans
                  </span>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 h-[500px] lg:h-auto relative overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFCeaiE6XfSGhK_yFz4fqcZLQWTFH40mqY6YRVOoiHo941dcSkKvcfW2JckI-ibfpPWZxfRPYLrT3JpDc1wvtWg41Kuq6E_jJ9K60purtTWWFETGiHsp_Ca67DjONDeUL5nDQzTcFqu-NSnajRvXYrQ6Yrq3SFD2QmYcqcR2Bxkfc8Rv2sdwGvd8wKn9oTWnf74yPgkTOlvyLiIlM6UQDCEGE7WkrPxyNjL03G9yW-iW1IIT0UMSR2YF3wyabBCcrvpbVgBL-1XS8"
                alt="Natural Fresh Ingredients"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply group-hover:opacity-0 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section with custom BubbleEffect */}
      <section className="py-24 px-6 md:px-16 bg-primary text-on-primary text-center relative overflow-hidden">
        <BubbleEffect color="rgba(255, 255, 255, 0.4)" count={15} opacity={0.3} />
        
        <div
          ref={(el) => { reveals.current["newsletter"] = el; }}
          data-reveal-id="newsletter"
          className={`max-w-2xl mx-auto relative z-10 transition-all duration-1000 transform ${
            scrollActive["newsletter"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[30px]"
          }`}
        >
          <h2 className="font-display-lg text-headline-lg mb-6">Get the First Sip.</h2>
          <p className="font-body-lg text-body-lg mb-10 opacity-90">
            Sign up for exclusive drops, secret flavor launches, and bubbly surprises delivered to your inbox.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed! Stay bubbly!");
            }}
          >
            <input
              type="email"
              className="flex-1 px-8 py-5 rounded-full bg-white text-on-surface border-none focus:ring-4 focus:ring-primary-container font-body-md placeholder:text-on-surface-variant/70"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="bg-secondary-container text-on-secondary-container px-10 py-5 rounded-full font-label-bold hover:scale-105 transition-all shadow-xl active:scale-95"
            >
              Stay Bubbly
            </button>
          </form>
          <p className="mt-6 text-[12px] opacity-70">
            No spam. Just bubbles. Unsubscribe anytime.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
