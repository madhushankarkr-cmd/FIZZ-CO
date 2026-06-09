"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useBubbleBurst } from "@/components/BubbleEffect";

export default function Checkout() {
  const {
    cartItems,
    subtotal,
    shippingCost,
    total,
    pointsEarned,
    shippingMethod,
    setShippingMethod,
    clearCart,
  } = useCart();

  const triggerBurst = useBubbleBurst();

  // Form states
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !address || !city || !zip || !cardNumber || !expiry || !cvc) {
      alert("Please fill out all required checkout fields.");
      return;
    }
    
    // Success flow
    setIsSuccess(true);
    clearCart();
  };

  const handleCtaHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerBurst(e);
  };

  if (isSuccess) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-24 px-6 md:px-16 max-w-xl mx-auto min-h-screen flex flex-col items-center justify-center text-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center animate-pulse">
            <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
          </div>
          <h1 className="font-display-lg text-headline-lg md:text-display-lg text-on-background leading-tight">
            Order Confirmed!
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Thank you for your purchase. We are preparing your order to get it sparkling and delivered straight to your door!
          </p>
          <div className="p-4 bg-primary-container/10 border border-primary-container/20 rounded-xl flex items-center gap-3 mt-2">
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
            <p className="text-sm text-on-primary-container">
              You earned <strong>{pointsEarned} Bubbly Points</strong> from this order!
            </p>
          </div>
          <Link
            href="/shop"
            className="mt-6 bg-primary text-on-primary font-label-bold text-label-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Continue Shopping
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="pt-32 pb-20 px-6 md:px-16 max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-2">
            Secure Checkout
          </h1>
          <p className="text-on-surface-variant font-body-lg">
            You're just one step away from sparkling refreshment.
          </p>
        </header>

        {cartItems.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center gap-6 bg-white dark:bg-inverse-surface border border-outline-variant/30 rounded-[24px]">
            <span className="material-symbols-outlined text-6xl text-outline-variant">shopping_cart</span>
            <h2 className="font-headline-sm text-headline-sm">Your cart is empty</h2>
            <p className="font-body-md text-on-surface-variant max-w-sm">
              Please add some cans to your shopping cart before proceeding to checkout.
            </p>
            <Link
              href="/shop"
              className="bg-primary text-on-primary font-label-bold text-label-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Checkout Form (Left Col) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Shipping Address */}
              <div
                className={`bg-white dark:bg-inverse-surface rounded-xl p-6 md:p-8 shadow-sm border border-outline-variant/30 transition-all ${
                  focusedInput === "shipping" ? "ring-2 ring-primary/20" : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">
                    1
                  </span>
                  <h2 className="font-headline-sm text-headline-sm">Shipping Address</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedInput("shipping")}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full bg-surface-container-low border-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all px-4 py-3 text-body-md rounded-t-lg"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      onFocus={() => setFocusedInput("shipping")}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full bg-surface-container-low border-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all px-4 py-3 text-body-md rounded-t-lg"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      onFocus={() => setFocusedInput("shipping")}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full bg-surface-container-low border-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all px-4 py-3 text-body-md rounded-t-lg"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onFocus={() => setFocusedInput("shipping")}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full bg-surface-container-low border-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all px-4 py-3 text-body-md rounded-t-lg"
                      placeholder="123 Sparkling Way"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      onFocus={() => setFocusedInput("shipping")}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full bg-surface-container-low border-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all px-4 py-3 text-body-md rounded-t-lg"
                      placeholder="Bubbletown"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      onFocus={() => setFocusedInput("shipping")}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full bg-surface-container-low border-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all px-4 py-3 text-body-md rounded-t-lg"
                      placeholder="90210"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="bg-white dark:bg-inverse-surface rounded-xl p-6 md:p-8 shadow-sm border border-outline-variant/30">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">
                    2
                  </span>
                  <h2 className="font-headline-sm text-headline-sm">Delivery Method</h2>
                </div>

                <div className="space-y-4">
                  <div
                    onClick={() => setShippingMethod("standard")}
                    className={`relative flex items-center p-4 border-2 rounded-xl bg-surface-container-low cursor-pointer transition-all ${
                      shippingMethod === "standard"
                        ? "border-primary bg-primary/5 font-black"
                        : "border-outline-variant"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={shippingMethod === "standard"}
                      onChange={() => setShippingMethod("standard")}
                      className="text-primary focus:ring-primary h-5 w-5 cursor-pointer"
                    />
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between font-label-bold text-sm">
                        <span>Standard Carbonated Delivery</span>
                        <span>{subtotal >= 40 ? "FREE" : "$4.99"}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5">Arrives in 3-5 business days</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setShippingMethod("express")}
                    className={`relative flex items-center p-4 border-2 rounded-xl bg-surface-container-low cursor-pointer transition-all ${
                      shippingMethod === "express"
                        ? "border-primary bg-primary/5 font-black"
                        : "border-outline-variant"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={shippingMethod === "express"}
                      onChange={() => setShippingMethod("express")}
                      className="text-primary focus:ring-primary h-5 w-5 cursor-pointer"
                    />
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between font-label-bold text-sm">
                        <span>Express Fizz</span>
                        <span>$12.00</span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5">Next-day sparkling delivery</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div
                className={`bg-white dark:bg-inverse-surface rounded-xl p-6 md:p-8 shadow-sm border border-outline-variant/30 transition-all ${
                  focusedInput === "payment" ? "ring-2 ring-primary/20" : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">
                    3
                  </span>
                  <h2 className="font-headline-sm text-headline-sm">Payment Details</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        onFocus={() => setFocusedInput("payment")}
                        onBlur={() => setFocusedInput(null)}
                        className="w-full bg-surface-container-low border-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all px-4 py-3 text-body-md rounded-t-lg"
                        placeholder="0000 0000 0000 0000"
                      />
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                        credit_card
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        onFocus={() => setFocusedInput("payment")}
                        onBlur={() => setFocusedInput(null)}
                        className="w-full bg-surface-container-low border-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all px-4 py-3 text-body-md rounded-t-lg"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                        CVC
                      </label>
                      <input
                        type="text"
                        required
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        onFocus={() => setFocusedInput("payment")}
                        onBlur={() => setFocusedInput(null)}
                        className="w-full bg-surface-container-low border-none border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all px-4 py-3 text-body-md rounded-t-lg"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button with fizz trigger */}
                <button
                  type="submit"
                  onMouseEnter={handleCtaHover}
                  className="mt-12 w-full bg-primary text-on-primary py-5 px-8 rounded-full font-label-bold text-lg uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Complete Purchase
                    <span className="material-symbols-outlined">shopping_cart_checkout</span>
                  </span>
                </button>
                <p className="mt-4 text-center text-xs text-on-surface-variant">
                  Your transaction is encrypted and 100% secure.
                </p>
              </div>
            </div>

            {/* Cart Summary (Right Col) */}
            <aside className="lg:col-span-5 sticky top-32 space-y-6">
              <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-6 md:p-8 shadow-sm">
                <h2 className="font-headline-sm text-headline-sm mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined">shopping_basket</span>
                  Cart Summary
                </h2>

                <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 mb-8">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-16 h-16 bg-white rounded-lg flex-shrink-0 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-200 border border-outline-variant/20">
                        <img src={item.image} alt={item.flavor} className="max-h-full object-contain" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-label-bold text-label-bold text-sm">{item.flavor}</h3>
                          <span className="font-label-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <p className="text-on-surface-variant text-xs mt-0.5">
                          {item.packSize} {item.subscribe && "(Subscription)"}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-outline-variant pt-6 space-y-3">
                  <div className="flex justify-between text-on-surface-variant text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant text-sm">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? <span className="text-primary font-semibold">FREE</span> : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-headline-sm font-bold pt-4 border-t border-outline-variant">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Bubbly Points tracker */}
              <div className="p-4 rounded-lg bg-primary-container/10 border border-primary-container/20 flex items-start gap-3">
                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                <p className="text-sm text-on-primary-container">
                  You're earning <strong>{pointsEarned} Bubbly Points</strong> with this purchase!
                </p>
              </div>
            </aside>
          </form>
        )}
      </main>

      <Footer />
    </>
  );
}
