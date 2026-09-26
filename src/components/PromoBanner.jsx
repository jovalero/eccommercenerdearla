"use client";

import React from "react";
import { Truck, ShieldCheck, Sparkles, Gift } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function PromoBanner() {
  const { setIsWheelOpen, spinsLeft } = useShop();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* 1. Trust Pillars */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10">
        <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#3C6E71]/10 text-[#3C6E71]">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display text-xs font-bold uppercase text-[#1C2321]">Envíos a Todo el País</h4>
            <p className="text-[11px] text-gray-500 font-sans">Despacho seguro y asegurado</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#3C6E71]/10 text-[#3C6E71]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display text-xs font-bold uppercase text-[#1C2321]">100% Originales</h4>
            <p className="text-[11px] text-gray-500 font-sans">Garantía oficial y precintado</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#B85C38]/10 text-[#B85C38]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display text-xs font-bold uppercase text-[#1C2321]">Hasta 6 Cuotas</h4>
            <p className="text-[11px] text-gray-500 font-sans">Sin interés con todas las tarjetas</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display text-xs font-bold uppercase text-[#1C2321]">Ruleta de Premios</h4>
            <p className="text-[11px] text-gray-500 font-sans">Girá y ganá hasta 25% OFF</p>
          </div>
        </div>
      </div>

      {/* 2. Gamified Hero Feature Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-[#1C2321] text-[#F2EFE9] p-8 sm:p-12 border border-[#3C6E71]/30 shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-[10px] sm:text-xs font-display font-bold tracking-widest text-[#B85C38] uppercase bg-white/10 px-3 py-1 rounded-full inline-block">
            EXCLUSIVO NERDEARLA APP SHOWCASE
          </span>
          <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-white leading-tight">
            RECIBÍ TU PERFUME &amp; GANÁ BENEFICIOS AL INSTANTE
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
            Girá nuestra <strong>Ruleta de la Fortuna Holux</strong> para desbloquear cupones promocionales de hasta 25% OFF, bonificación de envío y viales de 2ml de perfumería nicho de regalo.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setIsWheelOpen(true)}
              className="py-3 px-6 bg-[#B85C38] hover:bg-[#a04e2e] text-white font-display text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>GIRAR RULETA VIP ({spinsLeft} DISPONIBLES)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
