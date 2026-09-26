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
    <div className="fixed inset-0 z-50 overflow-hidden bg-holux-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-holux-card border-l border-holux-border/80 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-holux-border/60 flex items-center justify-between bg-holux-dark/60">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-holux-gold" />
              <h2 className="text-lg font-serif text-holux-light font-medium">Bolsa de Compras</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-holux-cardHover text-holux-muted border border-holux-border">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-holux-cardHover text-holux-muted hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-holux-cardHover flex items-center justify-center mb-4 text-holux-muted border border-holux-border">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-serif text-holux-light">Tu bolsa está vacía</p>
                <p className="text-xs text-holux-muted mt-1 max-w-xs mb-6">
                  Descubre perfumes excepcionales o gira la Ruleta Holux para ganar beneficios antes de tu compra.
                </p>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsWheelOpen(true);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-holux-goldDark to-holux-gold text-holux-black text-xs font-semibold uppercase tracking-wider shadow-gold-glow/20"
                  >
                    🎡 Girar Ruleta de Premios
                  </button>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 px-4 rounded-xl bg-holux-cardHover text-holux-cream text-xs font-medium border border-holux-border hover:border-holux-gold"
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
                    className="flex gap-4 p-3 rounded-2xl bg-holux-dark/40 border border-holux-border/50 items-center"
                  >
                    <div className="relative w-16 h-16 rounded-xl bg-holux-cardHover/80 p-1 flex-shrink-0 flex items-center justify-center border border-holux-border/40">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="object-contain max-h-14"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] tracking-wider uppercase font-semibold text-holux-gold block">
                        {product.brand}
                      </span>
                      <h4 className="text-sm font-serif text-holux-light font-medium truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-holux-light font-semibold mt-1">
                        {formatPriceARS(product.price * quantity)}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center rounded-lg bg-holux-card border border-holux-border/70 text-xs">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="px-2 py-0.5 text-holux-muted hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-2 font-medium text-holux-light">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="px-2 py-0.5 text-holux-muted hover:text-white"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-1 text-holux-muted hover:text-rose-400 transition-colors ml-auto"
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
                  <div className="flex gap-4 p-3 rounded-2xl bg-gradient-to-r from-holux-tealDark/40 to-holux-card border border-holux-teal/60 items-center">
                    <div className="w-16 h-16 rounded-xl bg-holux-cardHover p-2 flex items-center justify-center text-holux-gold border border-holux-gold/30">
                      <Gift className="w-8 h-8 animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] uppercase font-bold text-holux-gold tracking-widest block">
                        OBSEQUIO EXCLUSIVO
                      </span>
                      <h4 className="text-sm font-serif text-holux-light font-medium">
                        Vial Nicho Xerjoff / Creed 2ml
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs line-through text-holux-muted">$18.500</span>
                        <span className="text-xs font-bold text-emerald-400">GRATIS (100% OFF)</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer & Calculations */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-holux-border/80 bg-holux-dark/90 space-y-4">
              {/* Coupon input */}
              <div>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Código (ej. WHEEL25, NERDEARLA20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="w-full bg-holux-card border border-holux-border text-holux-light placeholder-holux-muted text-xs rounded-xl pl-8 pr-3 py-2.5 uppercase focus:outline-none focus:border-holux-gold"
                    />
                    <Tag className="w-3.5 h-3.5 text-holux-muted absolute left-2.5 top-3" />
                  </div>
                  <button
                    type="submit"
                    disabled={couponLoading || !couponInput.trim()}
                    className="px-4 py-2.5 rounded-xl bg-holux-cardHover hover:bg-holux-gold text-holux-cream hover:text-holux-black text-xs font-semibold uppercase tracking-wider border border-holux-border hover:border-holux-gold disabled:opacity-50 transition-all"
                  >
                    {couponLoading ? "..." : "Canjear"}
                  </button>
                </form>

                {couponError && (
                  <p className="text-[11px] text-rose-400 mt-1.5 pl-1">{couponError}</p>
                )}

                {/* Applied Coupon Pill */}
                {appliedCoupon && (
                  <div className="mt-2.5 p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-emerald-300">
                      <Check className="w-3.5 h-3.5" />
                      <span>
                        <strong>{appliedCoupon.code}</strong>: {appliedCoupon.description}
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-400 hover:text-rose-300 ml-2"
                      title="Quitar cupón"
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div className="mt-2 flex items-center justify-between text-[11px] text-holux-muted">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsWalletOpen(true);
                    }}
                    className="text-holux-gold hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" /> Ver mis cupones en Monedero
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs pt-3 border-t border-holux-border/50">
                <div className="flex justify-between text-holux-muted">
                  <span>Subtotal</span>
                  <span className="text-holux-light font-medium">{formatPriceARS(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Descuento cupón</span>
                    <span className="font-semibold">-{formatPriceARS(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-holux-muted">
                  <span>Envío a domicilio</span>
                  <span className={isFreeShipping || shippingCost === 0 ? "text-emerald-400 font-semibold" : "text-holux-light font-medium"}>
                    {isFreeShipping || shippingCost === 0 ? "¡Envío Gratis!" : formatPriceARS(shippingCost)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-serif text-holux-light pt-2 border-t border-holux-border/60">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-holux-gold text-lg">
                    {formatPriceARS(total)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-holux-goldDark via-holux-gold to-holux-goldDark text-holux-black font-semibold text-xs uppercase tracking-widest shadow-gold-glow/40 hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Continuar al Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
