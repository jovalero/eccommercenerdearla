"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useShop } from "../context/ShopContext";
import {
  ShoppingBag,
  Search,
  Award,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

export default function Header({ searchQuery = "", setSearchQuery, onSelectCategory }) {
  const router = useRouter();
  const {
    cartCount,
    setIsCartOpen,
    setIsWheelOpen,
    setIsWalletOpen,
    vipPoints,
    spinsLeft,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchChange = (val) => {
    setLocalSearch(val);
    if (setSearchQuery) {
      setSearchQuery(val);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      const q = (localSearch || "").trim();
      if (q) {
        router.push(`/catalogo?q=${encodeURIComponent(q)}`);
      } else {
        router.push("/catalogo");
      }
    }
  };

  return (
    <header className="bg-[#1C2321] text-white border-b border-[#3C6E71]/20 shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Left area: Mobile Menu Trigger + Clean Authentic Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#F2EFE9]" /> : <Menu className="w-5 h-5 text-[#F2EFE9]" />}
            </button>

            <Link href="/" className="flex items-center gap-3 select-none group">
              <img
                src="/holuxlogo.png"
                alt="HOLUX"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain brightness-0 invert shrink-0"
              />
              <div className="flex flex-col text-left leading-none">
                <span className="font-display font-black text-xl sm:text-2xl tracking-wider text-white group-hover:text-[#3C6E71] transition-colors uppercase">
                  HOLUX
                </span>
                <span className="text-[9px] font-sans font-bold tracking-[0.22em] text-[#3C6E71] uppercase mt-0.5">
                  Haute Parfumerie
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-display font-bold uppercase tracking-wider text-gray-200">
            <Link
              href="/catalogo"
              className="hover:text-[#3C6E71] transition-colors py-2"
            >
              CATÁLOGO
            </Link>
            <Link
              href="/catalogo?genero=Hombre"
              className="hover:text-[#3C6E71] transition-colors py-2 uppercase"
            >
              HOMBRE
            </Link>
            <Link
              href="/catalogo?genero=Mujer"
              className="hover:text-[#3C6E71] transition-colors py-2 uppercase"
            >
              MUJER
            </Link>

            {/* Special Lucky Wheel Tab */}
            <button
              type="button"
              onClick={() => setIsWheelOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B85C38] text-white hover:bg-[#a04e2e] shadow-sm hover:scale-105 transition-all text-xs font-bold cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span>RULETA VIP 🎡</span>
            </button>
          </nav>

          {/* Search Input Bar */}
          <div className="hidden md:flex flex-1 max-w-xs xl:max-w-sm mx-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar fragancias, notas o marcas (Enter)..."
                value={localSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="w-full bg-white/10 border border-[#3C6E71]/40 rounded-full pl-9 pr-8 py-2 text-xs text-white placeholder-gray-400 outline-none focus:border-[#3C6E71] focus:ring-1 focus:ring-[#3C6E71]/40 transition-all font-sans"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
              {localSearch && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-2 text-xs text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* VIP Club Monedero */}
            <button
              onClick={() => setIsWalletOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 hover:border-[#D4AF37] text-xs font-sans font-semibold text-white transition-all shadow-xs group"
              title="Monedero VIP Club"
            >
              <Award className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <div className="text-left hidden sm:block leading-tight">
                <span className="text-[9px] block text-gray-400 uppercase font-sans">Club VIP</span>
                <span className="font-bold font-mono text-[#ECD88C]">{vipPoints.toLocaleString()} pts</span>
              </div>
              <span className="sm:hidden font-mono font-bold text-xs text-[#ECD88C]">{vipPoints.toLocaleString()}</span>
            </button>

            {/* Cart Drawer Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all shadow-xs cursor-pointer border border-white/10"
              aria-label="Ver Carrito de compras"
            >
              <ShoppingBag className="w-5 h-5 text-[#F2EFE9]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 rounded-full bg-[#B85C38] text-white text-[10px] font-bold font-mono flex items-center justify-center animate-bounce border-2 border-[#1C2321]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar fragancias, notas o marcas (Enter)..."
              value={localSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="w-full bg-white/10 border border-[#3C6E71]/40 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-gray-400 outline-none focus:border-[#3C6E71] font-sans"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 space-y-2 font-display text-sm font-bold uppercase tracking-wider">
            <Link
              href="/catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-white/10"
            >
              Catálogo
            </Link>
            <Link
              href="/catalogo?genero=Hombre"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-white/10 uppercase"
            >
              Hombre
            </Link>
            <Link
              href="/catalogo?genero=Mujer"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-white/10 uppercase"
            >
              Mujer
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsWheelOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg bg-[#B85C38] text-white flex items-center justify-between cursor-pointer"
            >
              <span>Ruleta de la Fortuna Holux 🎡</span>
              <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full">{spinsLeft} giros</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
