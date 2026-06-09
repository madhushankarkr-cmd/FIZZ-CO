"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export const Header: React.FC = () => {
  const { cartItems, totalItemsCount, subtotal, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const pathname = usePathname();

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 md:px-16 py-4 bg-white/70 dark:bg-black/75 backdrop-blur-md shadow-sm border-b border-outline/10">
        <Link
          href="/"
          className="font-display-lg text-headline-sm font-black text-primary tracking-tighter uppercase cursor-pointer select-none"
        >
          Fizz & Co
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className={`font-body-md text-body-md uppercase tracking-wider font-bold transition-all ${
              pathname === "/"
                ? "text-primary border-b-2 border-primary"
                : "text-on-surface hover:text-primary"
            }`}
          >
            Home
          </Link>
          <Link
            href="/shop"
            className={`font-body-md text-body-md uppercase tracking-wider font-bold transition-all ${
              pathname === "/shop"
                ? "text-primary border-b-2 border-primary"
                : "text-on-surface hover:text-primary"
            }`}
          >
            Shop
          </Link>
          <Link
            href="/#flavors"
            className="font-body-md text-body-md uppercase tracking-wider text-on-surface hover:text-primary transition-all"
          >
            Flavors
          </Link>
          <Link
            href="/#story"
            className="font-body-md text-body-md uppercase tracking-wider text-on-surface hover:text-primary transition-all"
          >
            Our Story
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <Link
            href="/experience"
            className={`material-symbols-outlined transition-transform hover:scale-110 cursor-pointer ${
              pathname === "/experience" ? "text-primary font-bold" : "text-on-surface hover:text-primary"
            }`}
            title="3D Can Experience"
          >
            3d_rotation
          </Link>
          
          <button className="material-symbols-outlined text-on-surface hover:scale-110 hover:text-primary transition-transform cursor-pointer">
            person
          </button>
          
          <button
            onClick={() => setIsCartOpen(true)}
            className="material-symbols-outlined text-on-surface hover:scale-110 hover:text-primary transition-transform relative cursor-pointer"
          >
            shopping_cart
            {totalItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold animate-bounce shadow-md">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mini Cart Sidebar Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative w-full max-w-md h-full bg-white dark:bg-inverse-surface shadow-2xl flex flex-col z-10 animate-slide-in">
            {/* Header */}
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h2 className="font-headline-sm text-headline-sm flex items-center gap-2">
                <span className="material-symbols-outlined">shopping_basket</span>
                Your Cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="material-symbols-outlined text-on-surface hover:text-primary transition-colors cursor-pointer"
              >
                close
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <span className="material-symbols-outlined text-6xl text-outline-variant">
                    shopping_cart
                  </span>
                  <p className="font-body-lg text-on-surface-variant">Your cart is empty.</p>
                  <Link
                    href="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 bg-primary text-on-primary font-label-bold text-label-bold px-8 py-3 rounded-full hover:scale-105 transition-all shadow-md"
                  >
                    Go to Shop
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 group pb-4 border-b border-outline-variant/30">
                    <div className="w-16 h-20 bg-surface rounded-lg flex-shrink-0 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-200">
                      <img
                        src={item.image}
                        alt={item.flavor}
                        className="max-h-full object-contain"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-label-bold text-label-bold">{item.flavor}</h3>
                        <span className="font-label-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-on-surface-variant text-xs mt-0.5">
                        {item.packSize} {item.subscribe && "(Subscription)"}
                      </p>
                      
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center border border-outline-variant rounded-full px-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center font-bold text-sm"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center font-bold text-sm"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-error font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-outline-variant bg-surface-container-low">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-body-lg text-on-surface-variant">Subtotal</span>
                  <span className="font-headline-sm text-headline-sm text-primary">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-primary text-on-primary py-4 rounded-full font-label-bold text-center block shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200"
                >
                  Checkout Now
                </Link>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center text-sm font-semibold text-primary mt-4 hover:underline cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
};
