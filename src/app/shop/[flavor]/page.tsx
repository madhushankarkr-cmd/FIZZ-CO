"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BubbleEffect, useBubbleBurst } from "@/components/BubbleEffect";
import { useCart } from "@/context/CartContext";

interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  pricePerCan: number;
  tags: string[];
  description: string;
  image: string;
  colorClass: {
    primary: string;
    text: string;
    bg: string;
    border: string;
    badge: string;
  };
  details: string;
  nutrition: {
    calories: string;
    sugar: string;
    ingredients: string;
    fizzLevel: string;
  };
}

const PRODUCT_DETAILS: { [key: string]: ProductDetail } = {
  "electric-lime": {
    id: "electric-lime",
    name: "Electric Lime",
    slug: "electric-lime",
    pricePerCan: 3.5,
    tags: ["Zesty", "Refreshing", "Crisp"],
    description: "A citrus surge that wakes up your senses with real Tahitian lime and a pinch of sea salt.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvPH6QbyjrjidKyRcP-4URET2l20kDVQyH_pkdvDitqTIz-oMpVnVaaY8fNO4vml8Yn323lTKeWNpz3pvY2b0XHm9H9Cxr1_ui4MjX3-L8m2wQb7AvybcXjtKBnxqt5M8_vqFpbcO4OhTJUWbTsysMdKxs5CIvAxR_jODMA3QedkFxbaH3uj-bcohrFpEM4kJGMqIbT5aWwbvQEm__Z3tvKV6vfvAKCn53_krL8C3gDN1gWYCiVrFh51x231yD6RWn2FPLNxTHOI4",
    colorClass: {
      primary: "bg-primary hover:bg-primary/90 text-on-primary",
      text: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary",
      badge: "bg-primary/10 text-primary",
    },
    details: "Crafted using freshly cold-pressed Tahitian limes and premium carbonated artesian mineral water. We add a micro-dose of hand-harvested sea salt to enhance the citrus profile and replenish trace minerals.",
    nutrition: {
      calories: "5 Calories",
      sugar: "0g Sugar",
      ingredients: "Carbonated mineral water, cold-pressed lime juice, stevia extract, sea salt.",
      fizzLevel: "High Fizz",
    },
  },
  "tropical-mango": {
    id: "tropical-mango",
    name: "Tropical Mango",
    slug: "tropical-mango",
    pricePerCan: 3.5,
    tags: ["Sweet", "Tropical", "Smooth"],
    description: "Sunkissed Alphonso mangoes blended for a smooth, velvety fizz that feels like a beach day.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeIVNUHd9iTMur5F5OzXZU6wd2kkalye2nCySCrENogCNr6NNYeSVdigz-jgy_yC3xWEAHadEmEKsv8D3YAiUjBSSVz6V5xpXOA0iVmD1ha9R_xXIgICMe_Ll4l6MGHAzrieb0z1flgco9N5oQEj1zSn7bOAUAf1VjFfXlrprkOMWthWRxFlisPITX3CPU4RGcbetLD2zXhh6sJf7nF2evlLN6e2Y2NY81OELUA-Ph52iS8VmfYtqE5bSXzAJCveg9DNZTpS32mew",
    colorClass: {
      primary: "bg-secondary hover:bg-secondary/90 text-on-primary",
      text: "text-secondary",
      bg: "bg-secondary/10",
      border: "border-secondary",
      badge: "bg-secondary/10 text-secondary",
    },
    details: "Sun-ripened Alphonso mangoes are cold-pressed and infused with light sparkling water. A tropical splash of real flavor that feels smooth and velvety, with zero syrupy sweetness.",
    nutrition: {
      calories: "8 Calories",
      sugar: "0g Sugar",
      ingredients: "Carbonated mineral water, cold-pressed mango juice, stevia extract, natural botanicals.",
      fizzLevel: "Medium Fizz",
    },
  },
  "zesty-berry": {
    id: "zesty-berry",
    name: "Zesty Berry",
    slug: "zesty-berry",
    pricePerCan: 3.5,
    tags: ["Tart", "Bold", "Floral"],
    description: "A wild mix of raspberries and blackberries with a sharp hibiscus finish for the bold ones.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBvAVvzNYoF7zCaa8Gu13l1IdpbllKNhynGSnV-EFrS5Q4hR0o_0n5jijgBE_xH6KDfzwIszn7j5VbYVXQ3Kj-y_T7cNIzkv91Y-e7NdAbEH0w02VFJRcHmXWit-lbonEhsERM1_8sihUOo0RBxHj0HMUjqcUR5lPV4kiWLIggRhvvYdD3CYZbHl7q1IgSgcTbawPVycPuddfTokvomtVNd3dd2HjsuLjbUDuRbyC7U-iqpzf6zHUkA97bYDFx9lenZoyThMUIKh8",
    colorClass: {
      primary: "bg-tertiary hover:bg-tertiary/90 text-on-primary",
      text: "text-tertiary",
      bg: "bg-tertiary/10",
      border: "border-tertiary",
      badge: "bg-tertiary/10 text-tertiary",
    },
    details: "A wild infusion of raspberries, blackberries, and organic dried hibiscus flowers. Tangy berry fruit notes are complemented by a bright carbonation kick that is crisp and satisfying.",
    nutrition: {
      calories: "6 Calories",
      sugar: "0g Sugar",
      ingredients: "Carbonated mineral water, cold-pressed berry juices, organic hibiscus extract, stevia.",
      fizzLevel: "High Fizz",
    },
  },
  "peach-pop": {
    id: "peach-pop",
    name: "Peach Pop",
    slug: "peach-pop",
    pricePerCan: 3.5,
    tags: ["Sweet", "Summery", "Juicy"],
    description: "Sun-ripened peaches squeezed into carbonated mineral water for a sweet, summery punch.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbJ9FUlw7r4wLU1sL580d_xOge6jQfGcmKG7sjFvwXxviRrYQRXHVMlxo4FDhIC8O-Oyv2oTLJQQw0nLoUBPKyMpp0V7rqiMCZL-jokGUyilqhwN6BGmaQCP-ua_MWN7uSD-2meT8ytgk2HUyCBd8tl-78xNKNYyRo6HRnix4PSsWoYGVDdMP1WZUqBBIpvgdXr_NX53bJKsV5vuUQ6i1wtO6UczTr3A0wxUXEg9evf-beID8HI-RBa-VlwvEWHahHwCkQXl_1d_o",
    colorClass: {
      primary: "bg-[var(--tertiary)] hover:bg-[var(--tertiary)]/90 text-on-primary",
      text: "text-[var(--tertiary)]",
      bg: "bg-[var(--tertiary-container)]/20",
      border: "border-[var(--tertiary)]",
      badge: "bg-[var(--tertiary-container)]/30 text-[var(--tertiary)]",
    },
    details: "Juicy organic peaches cold-squeezed and lightly carbonated. A refreshing beverage that balances sweet stonefruit flavor with pure natural minerals.",
    nutrition: {
      calories: "7 Calories",
      sugar: "0g Sugar",
      ingredients: "Carbonated mineral water, cold-pressed peach juice, stevia extract, citric acid.",
      fizzLevel: "Medium Fizz",
    },
  },
};

export default function ProductDetails({
  params,
}: {
  params: Promise<{ flavor: string }>;
}) {
  const { flavor } = use(params);
  const product = PRODUCT_DETAILS[flavor];

  if (!product) {
    notFound();
  }

  const { addToCart } = useCart();
  const triggerBurst = useBubbleBurst();

  // State configurations
  const [packSize, setPackSize] = useState<"Individual" | "6-Pack" | "12-Pack">("6-Pack");
  const [subscribe, setSubscribe] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Compute price based on size
  let basePrice = 3.5; // Individual
  if (packSize === "6-Pack") basePrice = 14.99;
  if (packSize === "12-Pack") basePrice = 27.99;

  // Compute discount if subscribing (15%)
  const itemPrice = subscribe ? Number((basePrice * 0.85).toFixed(2)) : basePrice;

  // Handle Cart submit
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    triggerBurst(e, `var(--${product.id === 'electric-lime' ? 'primary' : product.id === 'tropical-mango' ? 'secondary' : 'tertiary'}-container)`);
    addToCart({
      flavor: product.name,
      packSize,
      quantity,
      price: itemPrice,
      subscribe,
      image: product.image,
    });
  };

  return (
    <>
      <Header />

      <main className="pt-28 min-h-screen relative">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
          {/* Back button */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary mb-8 font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left: Product Image Showcase */}
            <div className="relative group">
              <div className={`absolute inset-0 rounded-[48px] blur-3xl opacity-30 group-hover:opacity-40 transition-opacity duration-500 ${product.colorClass.bg}`} />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-2xl bg-white flex items-center justify-center p-12 border border-outline-variant/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-[380px] w-auto object-contain hover:scale-105 transition-transform duration-700 ease-out product-glow"
                />
                
                {/* Active float-up background bubbles inside the can box */}
                <BubbleEffect count={6} color="rgba(0, 109, 53, 0.15)" opacity={0.4} />
              </div>
            </div>

            {/* Right: Product details Configurator */}
            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <span className={`px-3 py-1 font-label-bold text-label-bold rounded-full uppercase tracking-widest ${product.colorClass.badge}`}>
                    Flagship Flavor
                  </span>
                  
                  <div className="flex items-center text-secondary-container bg-secondary-fixed-dim/10 px-3 py-1 rounded-full font-label-bold text-xs gap-1 border border-secondary-container/20">
                    <span className="material-symbols-outlined text-[16px] text-secondary">star</span>
                    <span className="font-semibold text-on-secondary-container">4.8 (124 reviews)</span>
                  </div>
                </div>

                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-none mt-2">
                  {product.name}
                </h1>
                
                <p className="font-headline-sm text-headline-sm text-primary font-bold">
                  ${itemPrice.toFixed(2)} <span className="text-on-surface-variant font-normal text-sm"> / {packSize}</span>
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-surface-container-high rounded-full font-label-bold text-on-surface-variant text-xs uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-6">
                {/* Pack Size Configurator */}
                <div className="flex flex-col gap-4">
                  <label className="font-label-bold text-on-surface-variant uppercase tracking-wider text-xs">
                    Select Pack Size
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {(["Individual", "6-Pack", "12-Pack"] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setPackSize(size)}
                        className={`p-4 border-2 rounded-xl font-bold text-center transition-all cursor-pointer ${
                          packSize === size
                            ? `${product.colorClass.border} ${product.colorClass.bg} font-black`
                            : "border-outline-variant hover:border-primary/50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subscribe & Save radio selector */}
                <div className="space-y-3">
                  <label className="font-label-bold text-on-surface-variant uppercase tracking-wider text-xs">
                    Purchase Options
                  </label>
                  
                  {/* One-time */}
                  <div
                    onClick={() => setSubscribe(false)}
                    className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      !subscribe
                        ? `${product.colorClass.border} ${product.colorClass.bg}`
                        : "border-outline-variant bg-surface-container-lowest"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        checked={!subscribe}
                        onChange={() => setSubscribe(false)}
                        className="w-5 h-5 text-primary focus:ring-primary cursor-pointer"
                      />
                      <div>
                        <p className="font-label-bold text-on-surface">One-time Purchase</p>
                        <p className="text-xs text-on-surface-variant">Purchase this pack size once</p>
                      </div>
                    </div>
                    <span className="font-bold">${basePrice.toFixed(2)}</span>
                  </div>

                  {/* Subscription */}
                  <div
                    onClick={() => setSubscribe(true)}
                    className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      subscribe
                        ? `${product.colorClass.border} ${product.colorClass.bg}`
                        : "border-outline-variant bg-surface-container-lowest"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        checked={subscribe}
                        onChange={() => setSubscribe(true)}
                        className="w-5 h-5 text-primary focus:ring-primary cursor-pointer"
                      />
                      <div>
                        <p className="font-label-bold text-on-surface">Subscribe & Save 15%</p>
                        <p className="text-xs text-on-surface-variant">Delivered every 30 days. Cancel anytime.</p>
                      </div>
                    </div>
                    <span className="font-bold text-primary">${(basePrice * 0.85).toFixed(2)}</span>
                  </div>
                </div>

                {/* Quantity and Add to Cart Button */}
                <div className="flex gap-4 items-stretch pt-2">
                  <div className="flex items-center border-2 border-outline-variant rounded-full px-4 bg-surface-container-lowest">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-full flex items-center justify-center font-bold text-xl cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-12 border-none bg-transparent text-center font-bold focus:ring-0 p-0"
                    />
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-full flex items-center justify-center font-bold text-xl cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 font-headline-sm py-4 rounded-full shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer ${product.colorClass.primary}`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Nutritional & Shipping Accordion */}
              <div className="mt-8 border-t border-outline-variant">
                <details className="group py-4 border-b border-outline-variant">
                  <summary className="flex justify-between items-center cursor-pointer list-none select-none">
                    <span className="font-headline-sm text-headline-sm">What's Inside</span>
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                      expand_more
                    </span>
                  </summary>
                  <div className="pt-4 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-surface-container rounded-xl">
                      <p className="font-label-bold text-primary">{product.nutrition.sugar}</p>
                      <p className="text-xs text-on-surface-variant mt-1">Sweetened naturally with organic extracts</p>
                    </div>
                    <div className="p-4 bg-surface-container rounded-xl">
                      <p className="font-label-bold text-primary">Natural Flavors</p>
                      <p className="text-xs text-on-surface-variant mt-1">Real cold-pressed fruit essence</p>
                    </div>
                    <div className="p-4 bg-surface-container rounded-xl">
                      <p className="font-label-bold text-primary">{product.nutrition.calories}</p>
                      <p className="text-xs text-on-surface-variant mt-1">Per serving size serves</p>
                    </div>
                    <div className="p-4 bg-surface-container rounded-xl">
                      <p className="font-label-bold text-primary">{product.nutrition.fizzLevel}</p>
                      <p className="text-xs text-on-surface-variant mt-1">Bubbling crisp texture profile</p>
                    </div>
                    <div className="p-4 bg-surface-container rounded-xl col-span-2">
                      <p className="font-label-bold text-primary">Ingredients</p>
                      <p className="text-sm text-on-surface-variant mt-1">{product.nutrition.ingredients}</p>
                    </div>
                  </div>
                </details>
                
                <details className="group py-4 border-b border-outline-variant">
                  <summary className="flex justify-between items-center cursor-pointer list-none select-none">
                    <span className="font-headline-sm text-headline-sm">Shipping & Returns</span>
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                      expand_more
                    </span>
                  </summary>
                  <p className="pt-4 text-on-surface-variant font-body-md leading-relaxed">
                    Free shipping on orders over $40. Standard delivery arrives in 3-5 business days. Express shipping options are available at checkout. Due to the perishable nature of beverages, returns are accepted within 30 days only if cans are unopened.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
