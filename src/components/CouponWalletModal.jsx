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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white text-[#1C2321] border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl text-left my-auto">
        {/* Close Button */}
        <button
          onClick={() => setIsWalletOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-black transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-4">
          <div className="p-2 rounded-xl bg-[#F2EFE9] text-[#3C6E71]">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-display font-black text-gray-900 uppercase tracking-wide">
              Monedero VIP &amp; Cupones
            </h2>
            <span className="text-xs text-gray-500 font-sans block mt-0.5">
              Tus recompensas exclusivas en HOLUX Rewards
            </span>
          </div>
        </div>

        {/* VIP Membership Card (Minimalist Luxury Black Card) */}
        <div className="relative overflow-hidden rounded-2xl bg-[#1C2321] text-white p-5 sm:p-6 shadow-md mb-6 border border-gray-800">
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/[0.03] pointer-events-none" />

          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold font-sans block">
                MEMBRESÍA OFICIAL
              </span>
              <h3 className="font-display font-black text-xl text-white tracking-wider uppercase mt-0.5">
                HOLUX CLUB PRIVÉ
              </h3>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] text-gray-200 font-bold uppercase tracking-wider font-sans border border-white/10">
                SOCIO BLACK TIER
              </span>
            </div>

            {/* Official Clean Logo Emblem */}
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <img
                src="/holuxlogo.png"
                alt="HOLUX"
                className="h-7 w-auto object-contain brightness-0 invert opacity-90"
              />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-end justify-between relative z-10">
            <div>
              <span className="text-[10px] text-gray-400 font-sans block uppercase tracking-wide">Saldo Acumulado</span>
              <div className="flex items-baseline gap-1.5 text-3xl font-black font-mono text-white tracking-tight mt-0.5">
                <span>{vipPoints.toLocaleString()}</span>
                <span className="text-xs text-gray-400 font-normal font-sans">Pts VIP</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsWalletOpen(false);
                setIsWheelOpen(true);
              }}
              className="text-xs font-sans font-bold text-[#1C2321] bg-[#F2EFE9] hover:bg-white flex items-center gap-1.5 py-2 px-3.5 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B85C38]" />
              <span>Girar Ruleta ({spinsLeft})</span>
            </button>
          </div>
        </div>

        {/* Unlocked Coupons List */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-[#3C6E71]" />
              <span>Tus Cupones Disponibles ({unlockedCoupons.length})</span>
            </h4>
          </div>

          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {unlockedCoupons.map((coupon, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#F8F7F5] border border-gray-200/80 hover:border-gray-300 transition-all flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-gray-300 text-xs font-mono font-bold text-gray-900 shadow-2xs">
                      {coupon.code}
                    </span>
                    {coupon.source && (
                      <span className="text-[10px] text-gray-500 font-sans font-medium">({coupon.source})</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-700 font-sans font-medium mt-1.5">
                    {coupon.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 text-gray-500 hover:text-black transition-colors cursor-pointer shadow-2xs"
                    title="Copiar código"
                  >
                    {copiedCode === coupon.code ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => handleApply(coupon.code)}
                    className="px-4 py-2 rounded-xl bg-[#1C2321] hover:bg-neutral-800 text-white text-xs font-sans font-bold tracking-wider uppercase transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Explanatory Box */}
        <div className="p-4 rounded-2xl bg-[#F2EFE9]/70 border border-gray-200/90 text-xs text-gray-600 font-sans leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-gray-900 mb-1">
            <ShieldCheck className="w-4 h-4 text-[#3C6E71]" />
            <span className="font-sans text-xs uppercase tracking-wide">Beneficios del Club Holux Rewards:</span>
          </div>
          <p className="text-[11px] text-gray-600 leading-normal">
            Por cada compra realizada en HOLUX acumulas el 10% en Puntos VIP para canjear en futuras adquisiciones o en viales exclusivos de decants.
          </p>
        </div>
      </div>
    </div>
  );
}
