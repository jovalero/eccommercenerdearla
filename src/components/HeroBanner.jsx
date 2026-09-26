"use client";

import React from "react";
import { Sparkles, Compass, ShieldCheck, Gift, ArrowDown } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function HeroBanner({ scrollToCatalog }) {
  const { setIsWheelOpen, spinsLeft } = useShop();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-holux-dark via-holux-card to-holux-dark py-16 sm:py-24 border-b border-holux-border/60">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-holux-gold/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-holux-teal/10 rounded-full blur-3xl pointer-events-none translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Editorial Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-holux-card/80 border border-holux-gold/30 text-xs uppercase tracking-widest text-holux-gold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Experiencia Gamificada Webflow Cloud</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-holux-light tracking-wide max-w-4xl mx-auto leading-tight">
          Alta Perfumería de Nicho &amp;{" "}
          <span className="font-normal italic text-gold-gradient">
            Recompensas Exclusivas
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-holux-muted max-w-2xl mx-auto font-light leading-relaxed">
          Sumérgete en la elegancia de Xerjoff, Tom Ford y Creed. Participa en nuestra
          exclusiva <strong className="text-holux-cream font-medium">Ruleta de la Fortuna Holux</strong> para desbloquear cupones del 25% OFF, envíos bonificados y muestras de cortesía.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setIsWheelOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-holux-goldDark via-holux-gold to-holux-goldDark text-holux-black font-semibold text-sm tracking-wider uppercase shadow-gold-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            <span>Girar Ruleta de Premios</span>
            <span className="px-2 py-0.5 rounded-full bg-holux-black/20 text-xs font-bold">
              {spinsLeft} {spinsLeft === 1 ? 'giro' : 'giros'}
            </span>
          </button>

          <button
            onClick={scrollToCatalog}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-holux-card/70 hover:bg-holux-card border border-holux-border hover:border-holux-gold/50 text-holux-cream text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2"
          >
            <span>Ver Catálogo</span>
            <ArrowDown className="w-4 h-4 text-holux-gold" />
          </button>
        </div>

        {/* Trust & Luxury Highlights */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-holux-border/40 pt-10 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-holux-card/30 border border-holux-border/30">
            <ShieldCheck className="w-6 h-6 text-holux-gold mb-2" />
            <span className="text-xs font-medium text-holux-light">100% Originales</span>
            <span className="text-[11px] text-holux-muted">Decants y botellas cerradas</span>
          </div>

          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-holux-card/30 border border-holux-border/30">
            <Gift className="w-6 h-6 text-holux-gold mb-2" />
            <span className="text-xs font-medium text-holux-light">Premios Reales</span>
            <span className="text-[11px] text-holux-muted">Cupones aplicables al carrito</span>
          </div>

          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-holux-card/30 border border-holux-border/30">
            <Compass className="w-6 h-6 text-holux-gold mb-2" />
            <span className="text-xs font-medium text-holux-light">Pirámides Olfativas</span>
            <span className="text-[11px] text-holux-muted">Notas de salida, corazón y fondo</span>
          </div>

          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-holux-card/30 border border-holux-border/30">
            <Sparkles className="w-6 h-6 text-holux-gold mb-2" />
            <span className="text-xs font-medium text-holux-light">6 Cuotas Sin Interés</span>
            <span className="text-[11px] text-holux-muted">Envíos asegurados a todo el país</span>
          </div>
        </div>
      </div>
    </div>
  );
}
