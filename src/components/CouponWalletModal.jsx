"use client";

import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { X, Award, Copy, Check, Sparkles, Tag, ShieldCheck, ArrowRight } from "lucide-react";

export default function CouponWalletModal() {
  const {
    isWalletOpen,
    setIsWalletOpen,
    vipPoints,
    unlockedCoupons,
    applyCoupon,
    setIsCartOpen,
    setIsWheelOpen,
    spinsLeft,
    showToast,
  } = useShop();

  const [copiedCode, setCopiedCode] = useState(null);

  if (!isWalletOpen) return null;

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Cupón ${code} copiado al portapapeles`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleApply = async (code) => {
    await applyCoupon(code);
    setIsWalletOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-holux-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-holux-card border border-holux-gold/40 rounded-3xl p-6 sm:p-8 shadow-modal text-left my-auto">
        {/* Close Button */}
        <button
          onClick={() => setIsWalletOpen(false)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-holux-dark/70 hover:bg-holux-dark text-holux-muted hover:text-white border border-holux-border transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-holux-gold" />
          <h2 className="text-xl font-serif text-holux-light font-medium">
            Monedero VIP &amp; Cupones
          </h2>
        </div>

        {/* VIP Membership Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-tr from-holux-dark via-holux-cardHover to-holux-dark border border-holux-gold/50 p-5 shadow-gold-glow/20 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-holux-gold font-semibold block">
                Membresía Oficial
              </span>
              <h3 className="font-serif text-lg text-holux-light font-medium">HOLUX CLUB PRIVÉ</h3>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-holux-gold/20 border border-holux-gold/40 text-[10px] text-holux-gold font-semibold uppercase tracking-wider">
                Socio Black Tier
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-holux-card border border-holux-gold flex items-center justify-center text-holux-gold font-serif font-bold text-lg">
              H
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-holux-border/60 flex items-end justify-between">
            <div>
              <span className="text-[10px] text-holux-muted block">Saldo Acumulado</span>
              <div className="flex items-baseline gap-1 text-2xl font-bold text-holux-gold">
                <span>{vipPoints.toLocaleString()}</span>
                <span className="text-xs text-holux-cream font-normal">Puntos VIP</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsWalletOpen(false);
                setIsWheelOpen(true);
              }}
              className="text-xs font-semibold text-holux-gold hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Girar Ruleta ({spinsLeft})</span>
            </button>
          </div>
        </div>

        {/* Unlocked Coupons List */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-holux-cream flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-holux-gold" />
              <span>Tus Cupones Disponibles ({unlockedCoupons.length})</span>
            </h4>
          </div>

          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {unlockedCoupons.map((coupon, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-holux-dark/50 border border-holux-border/60 hover:border-holux-gold/50 transition-colors flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-holux-cardHover border border-holux-gold/40 text-xs font-mono font-bold text-holux-gold">
                      {coupon.code}
                    </span>
                    {coupon.source && (
                      <span className="text-[10px] text-holux-muted">({coupon.source})</span>
                    )}
                  </div>
                  <p className="text-xs text-holux-light font-medium mt-1">
                    {coupon.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="p-2 rounded-lg bg-holux-card hover:bg-holux-cardHover text-holux-muted hover:text-white border border-holux-border transition-colors"
                    title="Copiar código"
                  >
                    {copiedCode === coupon.code ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => handleApply(coupon.code)}
                    className="px-3 py-1.5 rounded-lg bg-holux-gold/20 hover:bg-holux-gold text-holux-gold hover:text-holux-black border border-holux-gold/50 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Explanatory Box */}
        <div className="p-3.5 rounded-xl bg-holux-cardHover/40 border border-holux-border/50 text-xs text-holux-muted leading-relaxed">
          <div className="flex items-center gap-1.5 font-semibold text-holux-cream mb-1">
            <ShieldCheck className="w-4 h-4 text-holux-gold" />
            <span>Beneficios del Club Holux Rewards:</span>
          </div>
          <p>
            Por cada compra realizada en Holux acumulas el 10% en Puntos VIP para canjear en futuras adquisiciones o en viales exclusivos de decants.
          </p>
        </div>
      </div>
    </div>
  );
}
