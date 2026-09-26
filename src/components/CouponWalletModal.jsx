"use client";

import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { X, Award, Copy, Check, Sparkles, Tag, ShieldCheck } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#1C2321] text-white border border-[#3C6E71]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-left my-auto">
        {/* Close Button */}
        <button
          onClick={() => setIsWalletOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-5 border-b border-white/10 pb-3">
          <Award className="w-6 h-6 text-[#D4AF37]" />
          <div>
            <h2 className="text-xl font-display font-black text-white uppercase tracking-wider">
              Monedero VIP &amp; Cupones
            </h2>
            <span className="text-[10px] text-gray-400 font-sans block">
              Tus recompensas exclusivas en HOLUX Rewards
            </span>
          </div>
        </div>

        {/* VIP Membership Card (High Contrast Luxury Black & Gold) */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-tr from-[#121716] via-[#1A2320] to-[#284B4D] border border-[#D4AF37]/50 p-5 sm:p-6 shadow-lg mb-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#ECD88C] font-bold font-sans block">
                MEMBRESÍA OFICIAL
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-wider uppercase mt-0.5">
                HOLUX CLUB PRIVÉ
              </h3>
              <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[10px] text-[#ECD88C] font-bold uppercase tracking-wider font-sans">
                SOCIO BLACK TIER
              </span>
            </div>

            {/* Official Clean Logo Emblem */}
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <img
                src="/holuxlogo.png"
                alt="HOLUX"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/15 flex items-end justify-between">
            <div>
              <span className="text-[10px] text-gray-300 font-sans block">Saldo Acumulado</span>
              <div className="flex items-baseline gap-1.5 text-3xl font-black font-mono text-[#D4AF37]">
                <span>{vipPoints.toLocaleString()}</span>
                <span className="text-xs text-gray-300 font-normal font-sans">Pts VIP</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsWalletOpen(false);
                setIsWheelOpen(true);
              }}
              className="text-xs font-display font-bold uppercase tracking-wider text-[#ECD88C] hover:text-white flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Girar Ruleta ({spinsLeft})</span>
            </button>
          </div>
        </div>

        {/* Unlocked Coupons List */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-display font-bold uppercase tracking-wider text-gray-200 flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Tus Cupones Disponibles ({unlockedCoupons.length})</span>
            </h4>
          </div>

          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {unlockedCoupons.map((coupon, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#3C6E71] transition-all flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-black/60 border border-[#D4AF37]/60 text-xs font-mono font-bold text-[#ECD88C]">
                      {coupon.code}
                    </span>
                    {coupon.source && (
                      <span className="text-[10px] text-gray-400 font-sans font-medium">({coupon.source})</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-200 font-sans font-medium mt-1">
                    {coupon.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                    title="Copiar código"
                  >
                    {copiedCode === coupon.code ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => handleApply(coupon.code)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#3C6E71] hover:bg-[#284B4D] text-white text-xs font-display font-bold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Explanatory Box */}
        <div className="p-4 rounded-xl bg-white/5 border border-[#3C6E71]/40 text-xs text-gray-300 font-sans leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-[#ECD88C] mb-1">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-display uppercase tracking-wide">Beneficios del Club Holux Rewards:</span>
          </div>
          <p>
            Por cada compra realizada en HOLUX acumulas el 10% en Puntos VIP para canjear en futuras adquisiciones o en viales exclusivos de decants.
          </p>
        </div>
      </div>
    </div>
  );
}
