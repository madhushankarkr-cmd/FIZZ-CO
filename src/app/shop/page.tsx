"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useBubbleBurst } from "@/components/BubbleEffect";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  tags: string[];
  categories: string[];
  image: string;
  description: string;
}

const PRODUCTS: Product[] = [
  {
    id: "electric-lime",
    name: "Electric Lime",
    slug: "electric-lime",
    price: 2.99,
    tags: ["Tart", "Citrus"],
    categories: ["All", "Classic"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRNTy_2fTzzNJm71GvvXUpS07cqJbxu3UKB76cd1S-0l3koIayYozfTNhFieAwPlgHOZ-8t4V4MtAmcVh9IVuXIViiR8ElBBh9B0q7PWHAZrGkdNsQ2YMrU3LzWsODUTcgpADcp7b3KHCszwBSd4rpsQBV46VgTtbSsvRmZQbckQe8s37pqBpW_ktV9iOvqYlSV5Euq0KwQnV7Wb9YEwuLbJoKky2P_qk_AcCz4UcC-Tcy9tB-eJ1DjKkcmFM9xK9Un1_f7_GpgTk",
    description: "A citrus surge that wakes up your senses with real Tahitian lime and a pinch of sea salt.",
  },
  {
    id: "tropical-mango",
    name: "Tropical Mango",
    slug: "tropical-mango",
    price: 2.99,
    tags: ["Sweet", "Exotic"],
    categories: ["All", "Fruity"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjvBnLTvFRLjrP4iIotxb0EFEzSEEQqwvupH2lt3DpvuQPeGkIX5bQcOQIQQmvzoLcSyV-35m1KZojMHHQtyGhDkiII4PJ4bUaxncOjNVpK2V2A3HrVgs6wGcRIxdgwL1lJPlSqHYkid8jcEYDQT3dxFhP4-Nbm9D3HXpzNi081RqXFsRwu4eflAYLqdq5RHCvBfivEttCCX78AMepPI8m0TidUi4XdDt-NLhKGwpkoNyda2ZXuOQAkZdX7bH8goDmsa74oUd56MU",
    description: "Sunkissed Alphonso mangoes blended for a smooth, velvety fizz that feels like a beach day.",
  },
  {
    id: "zesty-berry",
    name: "Zesty Berry",
    slug: "zesty-berry",
    price: 2.99,
    tags: ["Tangy", "Bold"],
    categories: ["All", "Fruity", "New"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKgYef-Z21JwWS1QnMBdhbG4lrmwVF-86QUJt-PDV_yfw0i9-eLcgJVvilZa8TklUE_bIKh8XvoP4BcpJGW8-W8VG-gHzYaQYJXQk06kuAdNJe11yy5jcOKrvfgDXv7X1g5HFDJWCD7VAZ-V-WBRXHqw5J7DJFSthRy7Y5BVikRR3geZMe1WN4KJQr4-nvaQqzwoWAvAFIFOkrJtEtLyohFiQjVDVWkC-5HXqUaxyjcyj2OlSArubd7pY8we3TbDbmbG_Ky1YnZCg",
    description: "A wild mix of raspberries and blackberries with a sharp hibiscus finish for the bold ones.",
  },
  {
    id: "peach-pop",
    name: "Peach Pop",
    slug: "peach-pop",
    price: 2.99,
    tags: ["Sweet", "Fruity"],
    categories: ["All", "Fruity", "New"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbJ9FUlw7r4wLU1sL580d_xOge6jQfGcmKG7sjFvwXxviRrYQRXHVMlxo4FDhIC8O-Oyv2oTLJQQw0nLoUBPKyMpp0V7rqiMCZL-jokGUyilqhwN6BGmaQCP-ua_MWN7uSD-2meT8ytgk2HUyCBd8tl-78xNKNYyRo6HRnix4PSsWoYGVDdMP1WZUqBBIpvgdXr_NX53bJKsV5vuUQ6i1wtO6UczTr3A0wxUXEg9evf-beID8HI-RBa-VlwvEWHahHwCkQXl_1d_o",
    description: "Sun-ripened peaches squeezed into carbonated mineral water for a sweet, summery punch.",
  },
];

export default function Shop() {
  const { addToCart } = useCart();
  const triggerBurst = useBubbleBurst();
  const [activeCategory, setActiveCategory] = useState("All");

  const handleQuickAdd = (product: Product, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    triggerBurst(e);
    addToCart({
      flavor: product.name,
      packSize: "6-Pack",
      quantity: 1,
      price: 14.99, // default 6-pack price
      subscribe: false,
      image: product.image,
    });
  };

  const filteredProducts = PRODUCTS.filter((product) =>
    product.categories.includes(activeCategory)
  );

  return (
    <>
      <Header />

      <main className="pt-32 pb-24 px-6 md:px-16 max-w-7xl mx-auto min-h-screen">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="font-display-lg text-headline-lg md:text-display-lg text-on-background mb-4">
            Our Bubbly Lineup
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Crisp, refreshing, and bursting with natural flavor. Explore our latest collection of carbonated perfection.
          </p>
        </div>

        {/* Filter/Sort Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["All", "Classic", "Fruity", "New"].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full font-label-bold text-label-bold transition-all cursor-pointer ${
                activeCategory === category
                  ? "bg-primary text-on-primary shadow-md hover:scale-105"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-primary-container/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter max-w-6xl mx-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white dark:bg-inverse-surface rounded-[24px] p-6 flex flex-col items-center shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 border border-outline-variant/30"
            >
              {/* Product Page Link wrap */}
              <Link href={`/shop/${product.slug}`} className="w-full flex flex-col items-center text-center">
                <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-xl flex items-center justify-center bg-surface-container-lowest/50">
                  <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[220px] w-auto object-contain product-glow group-hover:scale-110 transition-transform duration-500 z-10"
                  />
                </div>
                
                <div className="w-full text-left flex-grow">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-bold text-[10px] uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-4 font-semibold">
                    $2.99 / Can
                  </p>
                </div>
              </Link>

              <button
                onClick={(e) => handleQuickAdd(product, e)}
                className="w-full py-3.5 rounded-full bg-primary text-on-primary font-label-bold text-label-bold hover:scale-[1.02] active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-auto"
              >
                <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                Quick Add (6-Pack)
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
