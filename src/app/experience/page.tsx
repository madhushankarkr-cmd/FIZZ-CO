"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import dynamic from "next/dynamic";
import { BubbleEffect, useBubbleBurst } from "@/components/BubbleEffect";
import { useCart } from "@/context/CartContext";

const ThreeDCanRenderer = dynamic(
  () => import("@/components/ThreeDCanRenderer").then((mod) => mod.ThreeDCanRenderer),
  { ssr: false }
);

interface CanFlavor {
  id: string;
  name: string;
  frontImage: string;
  cals: string;
  sugar: string;
  sodium: string;
  ingredients: string[];
  benefit: string;
  description: string;
  price: number;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  glowColor: string;
}

const CAN_FLAVORS: CanFlavor[] = [
  {
    id: "electric-lime",
    name: "Electric Lime",
    frontImage: "/electric_lime.png",
    cals: "5 Cals",
    sugar: "0g Sugar",
    sodium: "15mg",
    ingredients: ["Cold-pressed Tahitian lime juice", "Premium carbonated artesian mineral water", "Organic stevia extract", "Hand-harvested sea salt"],
    benefit: "⚡ Electrolyte Hydration & Replenish",
    description: "A citrus surge that wakes up your senses with real Tahitian lime and a pinch of sea salt for active hydration.",
    price: 2.99,
    primaryColor: "#006d35",
    secondaryColor: "#00210b",
    textColor: "text-emerald-500",
    glowColor: "rgba(0, 109, 53, 0.4)",
  },
  {
    id: "tropical-mango",
    name: "Tropical Mango",
    frontImage: "/tropical_mango.png",
    cals: "8 Cals",
    sugar: "0g Sugar",
    sodium: "10mg",
    ingredients: ["Cold-pressed Alphonso mango juice", "Sparkling artesian mineral water", "Organic stevia extract", "Natural botanicals"],
    benefit: "🥭 Sustained Energy & Digestion Support",
    description: "Sunkissed Alphonso mangoes blended for a smooth, velvety fizz that feels like a beach day, assisting digestion.",
    price: 2.99,
    primaryColor: "#705d00",
    secondaryColor: "#221b00",
    textColor: "text-yellow-600",
    glowColor: "rgba(112, 93, 0, 0.4)",
  },
  {
    id: "zesty-berry",
    name: "Zesty Berry",
    frontImage: "/zesty_berry.png",
    cals: "6 Cals",
    sugar: "0g Sugar",
    sodium: "12mg",
    ingredients: ["Cold-pressed raspberry juice", "Blackberry essence", "Organic dried hibiscus flowers", "Artesian water", "Stevia"],
    benefit: "🍇 Anti-oxidant Rich Vitality Boost",
    description: "A wild mix of raspberries and blackberries with a sharp hibiscus finish to deliver cell-supporting antioxidants.",
    price: 2.99,
    primaryColor: "#b42800",
    secondaryColor: "#3c0700",
    textColor: "text-red-500",
    glowColor: "rgba(180, 40, 0, 0.4)",
  },
  {
    id: "sun-kissed-orange",
    name: "Sun-Kissed Orange",
    frontImage: "/sun_kissed_orange.png",
    cals: "7 Cals",
    sugar: "0g Sugar",
    sodium: "10mg",
    ingredients: ["Cold-pressed Valencia orange juice", "Mandarin peel essential oil", "Carbonated artesian spring water", "Vitamin C (Ascorbic Acid)"],
    benefit: "🍊 Immune Support & Vitamin C Boost",
    description: "Zesty Florida oranges and sweet mandarins carbonated together for a bright citrus sparkle packed with vitamin C.",
    price: 2.99,
    primaryColor: "#c2410c",
    secondaryColor: "#431407",
    textColor: "text-orange-500",
    glowColor: "rgba(194, 65, 12, 0.4)",
  },
];

export default function Experience() {
  const { addToCart } = useCart();
  const triggerBurst = useBubbleBurst();
  
  const [activeFlavor, setActiveFlavor] = useState<CanFlavor>(CAN_FLAVORS[0]);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [zeroGravActive, setZeroGravActive] = useState<boolean>(false);
  const [loadingAssets, setLoadingAssets] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    // Preload textures on the client side with CDN fallbacks to prevent runtime EROFS write crashes on Vercel
    const preloadImages = async () => {
      try {
        const promises = CAN_FLAVORS.map((flavor) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = flavor.frontImage;
            img.onload = () => resolve();
            img.onerror = () => {
              // CDN Fallback URL in case local asset files are not deployed/available
              const fallbackUrls: Record<string, string> = {
                "electric-lime": "https://lh3.googleusercontent.com/aida-public/AB6AXuDPFtv9Qw07qZ9OhnADHhBoBOczMJ013MQReyaO7aPNB-cwakn4ajYZMqLsmKO1YswxP8s7HAkjQqo7FD7fJfFrkxcETBymGPev24I2yI27NM3Eo0Sje0tbcZqESwKwrvXh7P_wWjHxu8qxBL9878igG3EugL8Q48yRzEYAzye9x_4XPdItled67dkZYSlC5boiTZJfxoHSFPaTX_iQkcClt1cfOkAMW2q1fwDm_Op6IYtlNWg5pz9N5eSKj2NPvirzVFjMQ0R2PDk",
                "tropical-mango": "https://lh3.googleusercontent.com/aida-public/AB6AXuBeIVNUHd9iTMur5F5OzXZU6wd2kkalye2nCySCrENogCNr6NNYeSVdigz-jgy_yC3xWEAHadEmEKsv8D3YAiUjBSSVz6V5xpXOA0iVmD1ha9R_xXIgICMe_Ll4l6MGHAzrieb0z1flgco9N5oQEj1zSn7bOAUAf1VjFfXlrprkOMWthWRxFlisPITX3CPU4RGcbetLD2zXhh6sJf7nF2evlLN6e2Y2NY81OELUA-Ph52iS8VmfYtqE5bSXzAJCveg9DNZTpS32mew",
                "zesty-berry": "https://lh3.googleusercontent.com/aida-public/AB6AXuDBvAVvzNYoF7zCaa8Gu13l1IdpbllKNhynGSnV-EFrS5Q4hR0o_0n5jijgBE_xH6KDfzwIszn7j5VbYVXQ3Kj-y_T7cNIzkv91Y-e7NdAbEH0w02VFJRcHmXWit-lbonEhsERM1_8sihUOo0RBxHj0HMUjqcUR5lPV4kiWLIggRhvvYdD3CYZbHl7q1IgSgcTbawPVycPuddfTokvomtVNd3dd2HjsuLjbUDuRbyC7U-iqpzf6zHUkA97bYDFx9lenZoyThMUIKh8",
                "sun-kissed-orange": "https://lh3.googleusercontent.com/aida-public/AB6AXuAFCeaiE6XfSGhK_yFz4fqcZLQWTFH40mqY6YRVOoiHo941dcSkKvcfW2JckI-ibfpPWZxfRPYLrT3JpDc1wvtWg41Kuq6E_jJ9K60purtTWWFETGiHsp_Ca67DjONDeUL5nDQzTcFqu-NSnajRvXYrQ6Yrq3SFD2QmYcqcR2Bxkfc8Rv2sdwGvd8wKn9oTWnf74yPgkTOlvyLiIlM6UQDCEGE7WkrPxyNjL03G9yW-iW1IIT0UMSR2YF3wyabBCcrvpbVgBL-1XS8"
              };
              if (fallbackUrls[flavor.id]) {
                img.src = fallbackUrls[flavor.id];
                img.onload = () => resolve();
                img.onerror = () => resolve(); // resolve anyway to avoid blocking UI
              } else {
                resolve();
              }
            };
          });
        });
        await Promise.all(promises);
        setLoadingAssets(false);
      } catch (err) {
        console.error("Error preloading images:", err);
        setLoadingAssets(false);
      }
    };
    preloadImages();
  }, []);

  const handleQuickAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    triggerBurst(e, activeFlavor.glowColor);
    addToCart({
      flavor: activeFlavor.name,
      packSize: "6-Pack",
      quantity: 1,
      price: 14.99,
      subscribe: false,
      image: activeFlavor.frontImage,
    });
  };

  const triggerZeroGravity = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerBurst(e, "rgba(255, 255, 255, 0.6)");
    setZeroGravActive(true);
    setTimeout(() => setZeroGravActive(false), 2500);
  };

  if (loadingAssets) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col items-center justify-center pt-32 pb-16">
          <div className="bg-white/70 dark:bg-zinc-900/70 border border-outline/10 backdrop-blur-md rounded-[36px] p-12 shadow-2xl flex flex-col items-center gap-6 max-w-sm text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <h3 className="font-display-lg text-headline-sm text-on-surface">Initializing 3D Scene</h3>
            <p className="font-body-md text-on-surface-variant">Optimizing high-fidelity textures for anti-gravity rendering...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (errorMsg) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col items-center justify-center pt-32 pb-16">
          <div className="bg-white/70 dark:bg-zinc-900/70 border border-outline/10 backdrop-blur-md rounded-[36px] p-12 shadow-2xl flex flex-col items-center gap-6 max-w-sm text-center">
            <span className="material-symbols-outlined text-error text-5xl">warning</span>
            <h3 className="font-display-lg text-headline-sm text-on-surface">Error Loading Scene</h3>
            <p className="font-body-md text-on-surface-variant">{errorMsg}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2.5 bg-primary text-on-primary rounded-full font-label-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              Retry
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col pt-32 pb-16 relative overflow-hidden transition-colors duration-500">
        
        {/* Anti-gravity bubble particles */}
        <BubbleEffect count={25} color="rgba(100, 116, 139, 0.15)" opacity={0.4} />

        {/* Dynamic Studio Background Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ease-out opacity-25 z-0"
          style={{
            background: `radial-gradient(circle, ${activeFlavor.glowColor} 0%, transparent 70%)`
          }}
        />

        <div className="container mx-auto px-6 md:px-16 flex-1 flex flex-col relative z-10">
          
          {/* Header Title */}
          <div className="text-center mb-10 max-w-2xl mx-auto space-y-3">
            <span className="inline-block py-1 px-4 bg-primary/10 text-primary font-label-bold text-xs rounded-full uppercase tracking-wider">
              Interactive 3D Showroom
            </span>
            <h1 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface leading-tight">
              Anti-Gravity Space
            </h1>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Drag to spin the cans 360° to inspect details. Hover to pause. Click to inspect ingredients and active health benefits.
            </p>
          </div>

          {/* Interactive Cans Platform Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 items-center justify-center py-6">
            {CAN_FLAVORS.map((flavor, index) => (
              <div 
                key={flavor.id}
                onClick={() => setActiveFlavor(flavor)}
                className={`flex flex-col items-center p-6 rounded-[32px] border-2 cursor-pointer transition-all duration-500 ${
                  activeFlavor.id === flavor.id 
                    ? "bg-white dark:bg-zinc-900 border-primary/50 shadow-xl scale-105" 
                    : "bg-white/40 dark:bg-zinc-900/30 border-transparent hover:bg-white/60 dark:hover:bg-zinc-900/50 hover:-translate-y-2"
                }`}
                style={{
                  animation: `floatWeightless ${3.5 + index * 0.4}s ease-in-out infinite`,
                  animationDelay: `${index * 0.3}s`,
                  // Extra lift if zero-gravity burst is clicked
                  transform: zeroGravActive ? "translateY(-60px) rotate(5deg) scale(1.08)" : undefined
                }}
              >
                {/* 3D Can element */}
                <ThreeDCanRenderer
                  frontImage={flavor.frontImage}
                  flavor={flavor.name}
                  cals={flavor.cals}
                  sugar={flavor.sugar}
                  sodium={flavor.sodium}
                  ingredients={flavor.ingredients}
                  benefit={flavor.benefit}
                  primaryColor={flavor.primaryColor}
                  secondaryColor={flavor.secondaryColor}
                  width={180}
                  height={270}
                  autoRotateSpeed={autoRotate ? 0.005 : 0}
                />
                
                <h3 className="font-headline-sm text-sm uppercase mt-4 tracking-wide text-on-surface text-center">
                  {flavor.name}
                </h3>
                <span className={`text-[10px] uppercase font-bold tracking-wider ${flavor.textColor} mt-1`}>
                  {flavor.cals} | {flavor.sugar}
                </span>
              </div>
            ))}
          </div>

          {/* Hologram details deck */}
          <div className="mt-16 max-w-4xl mx-auto w-full bg-white/70 dark:bg-zinc-900/70 border border-outline/10 backdrop-blur-md rounded-[36px] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-10 items-stretch">
            
            {/* Left: Active Flavor Label Specs */}
            <div className="flex-1 flex flex-col justify-between space-y-6 border-b md:border-b-0 md:border-r border-outline/10 pb-8 md:pb-0 md:pr-10">
              <div className="space-y-4">
                <span className={`font-label-bold text-xs uppercase tracking-wider block ${activeFlavor.textColor}`}>
                  Active Flavor Spec
                </span>
                <h2 className="font-display-lg text-headline-lg text-on-surface leading-none">
                  {activeFlavor.name}
                </h2>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  {activeFlavor.description}
                </p>
              </div>

              <div className="pt-4 flex gap-4 items-center">
                <div className="p-3 bg-surface-container-high rounded-xl text-center flex-1">
                  <span className="text-[10px] text-on-surface-variant font-semibold block uppercase">Cals</span>
                  <span className="font-bold text-on-surface text-sm">{activeFlavor.cals}</span>
                </div>
                <div className="p-3 bg-surface-container-high rounded-xl text-center flex-1">
                  <span className="text-[10px] text-on-surface-variant font-semibold block uppercase">Sugar</span>
                  <span className="font-bold text-on-surface text-sm">{activeFlavor.sugar}</span>
                </div>
                <div className="p-3 bg-surface-container-high rounded-xl text-center flex-1">
                  <span className="text-[10px] text-on-surface-variant font-semibold block uppercase">Sodium</span>
                  <span className="font-bold text-on-surface text-sm">{activeFlavor.sodium}</span>
                </div>
              </div>
            </div>

            {/* Right: Ingredients & Benefit info */}
            <div className="flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="font-label-bold text-xs uppercase tracking-wider block text-on-surface-variant">
                  Health & Ingredients
                </span>
                
                {/* Active Benefit */}
                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5">auto_awesome</span>
                  <div>
                    <h5 className="font-label-bold text-xs text-primary uppercase">Primary Benefit</h5>
                    <p className="font-label-bold text-[13px] text-on-surface mt-1 leading-snug">{activeFlavor.benefit}</p>
                  </div>
                </div>

                {/* Ingredients Grid */}
                <div className="space-y-2">
                  <h5 className="font-label-bold text-xs text-on-surface-variant uppercase">Key Ingredients</h5>
                  <div className="flex flex-wrap gap-2">
                    {activeFlavor.ingredients.map((ing) => (
                      <span 
                        key={ing}
                        className="px-3 py-1 bg-surface-container-low text-on-surface border border-outline-variant/30 rounded-full text-[10px] font-semibold"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleQuickAdd}
                  className="flex-1 bg-primary text-on-primary py-4 px-6 rounded-full font-label-bold text-label-bold hover:scale-[1.02] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  Quick Add (6-Pack) - $14.99
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Control Panel */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 bg-surface-container-low/50 border border-outline/5 rounded-full px-8 py-4 max-w-xl mx-auto">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setAutoRotate(!autoRotate)}
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                  autoRotate ? "bg-primary border-primary text-on-primary" : "bg-white border-outline-variant text-on-surface hover:bg-slate-100"
                }`}
                title="Toggle Auto-Rotate"
              >
                <span className="material-symbols-outlined text-lg">sync</span>
              </button>
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Auto-Rotate</span>
            </div>

            <div className="h-6 w-[1.5px] bg-outline-variant/30 hidden sm:block" />

            <button
              onClick={triggerZeroGravity}
              className={`px-6 py-2 border border-primary text-primary hover:bg-primary/5 active:scale-95 rounded-full font-label-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                zeroGravActive ? "bg-primary/10 scale-105 border-primary" : ""
              }`}
            >
              <span className="material-symbols-outlined text-sm">flight_land</span>
              Trigger Zero Gravity Burst
            </button>
          </div>

        </div>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes floatWeightless {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(0.8deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
    </>
  );
}
