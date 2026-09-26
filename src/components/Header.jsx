"use client";

import React from "react";
import { useShop } from "../context/ShopContext";
import { ShoppingBag, Sparkles, Award, Gift, Search } from "lucide-react";
import Image from "next/image";

export default function Header({ searchQuery, setSearchQuery }) {
  const {
    cartCount,
    setIsCartOpen,
    setIsWheelOpen,
    setIsWalletOpen,
    vipPoints,
    spinsLeft,
  } = useShop();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-holux-border/80 bg-holux-dark/95 backdrop-blur-md transition-all">
      {/* Top micro banner for Nerdearla */}
      <div className="w-full bg-gradient-to-r from-holux-tealDark via-holux-card to-holux-tealDark border-b border-holux-border/40 py-1.5 px-4 text-center text-xs tracking-wider font-light text-holux-cream flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-holux-gold animate-pulse"></span>
        <span className="font-semibold text-holux-gold">NERDEARLA APP SHOWCASE:</span>
        <span>¡Girá la ruleta y ganá hasta 25% OFF y envíos gratis!</span>
        <button
          onClick={() => setIsWheelOpen(true)}
          className="ml-2 underline font-medium text-holux-goldLight hover:text-white transition-colors"
        >
          Girar ahora &rarr;
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-full border border-holux-gold/40 flex items-center justify-center bg-holux-card overflow-hidden shadow-gold-glow/20">
                <Image
                  src="/holuxlogo.png"
                  alt="HOLUX Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="text-holux-gold font-serif font-bold text-lg select-none">H</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-serif tracking-widest font-semibold text-holux-light group-hover:text-holux-gold transition-colors">
                  HOLUX
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-holux-gold font-medium uppercase">
                  Haute Parfumerie & Rewards
                </span>
              </div>
            </a>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar fragancia, notas o marcas (Xerjoff, Creed, Tom Ford)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-holux-card/70 border border-holux-border text-holux-light placeholder-holux-muted text-sm rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:border-holux-gold/60 focus:ring-1 focus:ring-holux-gold/40 transition-all"
              />
              <Search className="w-4 h-4 text-holux-muted absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-2.5 text-xs text-holux-muted hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action buttons: VIP Wallet, Lucky Wheel, Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* VIP Club Monedero */}
            <button
              onClick={() => setIsWalletOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-holux-card/90 border border-holux-gold/30 hover:border-holux-gold text-xs sm:text-sm text-holux-light hover:text-holux-gold transition-all shadow-sm"
              title="Monedero VIP y Cupones"
            >
              <Award className="w-4 h-4 text-holux-gold" />
              <div className="text-left hidden sm:block">
                <span className="text-[10px] block text-holux-muted leading-tight">Puntos VIP</span>
                <span className="font-semibold text-holux-goldLight">{vipPoints.toLocaleString()}</span>
              </div>
              <span className="sm:hidden font-semibold text-holux-gold">{vipPoints.toLocaleString()}</span>
            </button>

            {/* Lucky Wheel CTA Button */}
            <button
              onClick={() => setIsWheelOpen(true)}
              className="relative group flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-holux-goldDark via-holux-gold to-holux-goldDark hover:opacity-95 text-holux-black font-semibold text-xs sm:text-sm transition-all shadow-gold-glow/40 hover:scale-105"
            >
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="hidden xs:inline">Ruleta VIP</span>
              <span className="xs:hidden">Girar</span>
              {spinsLeft > 0 && (
                <span className="w-5 h-5 rounded-full bg-holux-black text-holux-gold text-[10px] font-bold flex items-center justify-center">
                  {spinsLeft}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-holux-card border border-holux-border hover:border-holux-gold/60 text-holux-light hover:text-holux-gold transition-all"
              aria-label="Ver Carrito de compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 rounded-full bg-holux-rust text-white text-[11px] font-bold flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
