"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useShop } from "../context/ShopContext";
import { formatPriceARS } from "../utils/formatters";
import { X, Trash2, Tag, ArrowRight, ShoppingBag, Sparkles, Check, Gift } from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingCost,
    discountAmount,
    isFreeShipping,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError,
    couponLoading,
    setIsCheckoutOpen,
    setIsWalletOpen,
    setIsWheelOpen,
  } = useShop();

  const [couponInput, setCouponInput] = useState("");

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = await applyCoupon(couponInput);
    if (res.success) {
      setCouponInput("");
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l border-gray-200 shadow-2xl flex flex-col justify-between text-[#1C2321]">
          {/* Header */}
          <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-[#1C2321] text-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#3C6E71]" />
              <h2 className="text-base font-display font-bold uppercase tracking-wider">Tu Bolsa de Compras</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white font-mono font-bold">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5 bg-[#F8F7F5]">
            {cart.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 text-gray-400 border border-gray-200 shadow-xs">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-display font-bold uppercase text-[#1C2321]">Tu bolsa está vacía</p>
                <p className="text-xs text-gray-500 mt-1 max-w-xs mb-6 font-sans">
                  Descubre perfumes excepcionales o gira la Ruleta Holux para ganar descuentos antes de tu compra.
                </p>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsWheelOpen(true);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#B85C38] hover:bg-[#a04e2e] text-white text-xs font-display font-bold uppercase tracking-wider shadow-sm transition-all"
                  >
                    🎡 Girar Ruleta de Premios
                  </button>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white text-[#1C2321] text-xs font-display font-bold uppercase tracking-wider border border-gray-300 hover:border-black"
                  >
                    Explorar Fragancias
                  </button>
                </div>
              </div>
            ) : (
              <>
                {cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex gap-3.5 p-3 rounded-xl bg-white border border-gray-200 shadow-2xs items-center"
                  >
                    <div className="relative w-16 h-16 rounded-lg bg-[#F8F7F5] p-1 flex-shrink-0 flex items-center justify-center border border-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="object-contain max-h-14"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] tracking-wider uppercase font-bold text-[#3C6E71] block font-sans">
                        {product.brand}
                      </span>
                      <h4 className="text-xs sm:text-sm font-sans font-bold text-gray-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-950 font-bold font-mono mt-0.5">
                        {formatPriceARS(product.price * quantity)}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center rounded-md bg-gray-50 border border-gray-200 text-xs font-mono">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="px-2 py-0.5 text-gray-600 hover:text-black font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 font-bold text-gray-900">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="px-2 py-0.5 text-gray-600 hover:text-black font-bold"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-1 text-gray-400 hover:text-rose-600 transition-colors ml-auto"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Free Niche Sample Gift Item if GIFTNICHE coupon is active */}
                {appliedCoupon?.code === "GIFTNICHE" && (
                  <div className="flex gap-3.5 p-3 rounded-xl bg-[#3C6E71]/10 border border-[#3C6E71]/40 items-center">
                    <div className="w-16 h-16 rounded-lg bg-white p-2 flex items-center justify-center text-[#B85C38] border border-gray-200 shadow-2xs">
                      <Gift className="w-8 h-8 animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] uppercase font-bold text-[#3C6E71] tracking-wider block font-sans">
                        OBSEQUIO EXCLUSIVO RULETA
                      </span>
                      <h4 className="text-xs sm:text-sm font-sans font-bold text-gray-900">
                        Vial Nicho Xerjoff / Creed 2ml
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs line-through text-gray-400">$18.500</span>
                        <span className="text-xs font-bold text-emerald-600">GRATIS (100% OFF)</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer & Calculations */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-200 bg-white space-y-3.5">
              {/* Coupon input */}
              <div>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Código (ej. WHEEL25, NERDEARLA20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="w-full bg-[#F8F7F5] border border-gray-200 text-[#1C2321] placeholder-gray-400 text-xs rounded-lg pl-8 pr-3 py-2 uppercase font-mono outline-none focus:border-[#3C6E71]"
                    />
                    <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    disabled={couponLoading || !couponInput.trim()}
                    className="px-4 py-2 rounded-lg bg-[#1C2321] hover:bg-neutral-800 text-white text-xs font-display font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                  >
                    {couponLoading ? "..." : "Canjear"}
                  </button>
                </form>

                {couponError && (
                  <p className="text-[11px] text-rose-600 mt-1 pl-1 font-sans">{couponError}</p>
                )}

                {/* Applied Coupon Pill */}
                {appliedCoupon && (
                  <div className="mt-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs font-sans">
                    <div className="flex items-center gap-1.5 text-emerald-800">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        <strong>{appliedCoupon.code}</strong>: {appliedCoupon.description}
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-500 hover:text-rose-700 font-bold ml-2"
                      title="Quitar cupón"
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsWalletOpen(true);
                    }}
                    className="text-[#3C6E71] font-bold hover:underline flex items-center gap-1 font-sans"
                  >
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Ver mis cupones en Monedero VIP
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs pt-3 border-t border-gray-100 font-sans">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-bold font-mono">{formatPriceARS(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Descuento cupón</span>
                    <span className="font-bold font-mono">-{formatPriceARS(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className={isFreeShipping || shippingCost === 0 ? "text-emerald-600 font-bold" : "text-gray-900 font-bold font-mono"}>
                    {isFreeShipping || shippingCost === 0 ? "¡Envío Gratis!" : formatPriceARS(shippingCost)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-sans text-gray-950 pt-2 border-t border-gray-200">
                  <span className="font-bold">Total a Pagar</span>
                  <span className="font-black font-mono text-lg text-[#1C2321]">
                    {formatPriceARS(total)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white font-display text-sm font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>CONTINUAR AL CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
