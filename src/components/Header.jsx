"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useShop } from "../context/ShopContext";
import {
  ShoppingBag,
  Search,
  Heart,
  Award,
  Sparkles,
  Menu,
  X,
  ChevronDown
} from "lucide-react";

export default function Header({ searchQuery, setSearchQuery, onSelectCategory }) {
  const {
    cartCount,
    setIsCartOpen,
    setIsWheelOpen,
    setIsWalletOpen,
    vipPoints,
    spinsLeft,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { label: "TODOS", value: "Todos" },
    { label: "PERFUMES HOMBRE", value: "hombre" },
    { label: "PERFUMES MUJER", value: "mujer" },
    { label: "NICHO & AUTOR", value: "nicho" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F2EFE9] border-b border-[#1C2321]/15 text-[#1C2321] transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#1C2321]/5 text-[#1C2321]"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a href="#" className="flex items-center gap-2.5 group select-none">
              <div className="relative w-10 h-10 rounded-full border border-[#1C2321]/20 flex items-center justify-center bg-white overflow-hidden shadow-xs">
                <Image
                  src="/holuxlogo.png"
                  alt="HOLUX Logo"
                  width={34}
                  height={34}
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="text-[#1C2321] font-display font-black text-xl">H</span>
              </div>
              <div className="leading-none">
                <span className="font-display font-black text-2xl tracking-wider text-[#1C2321] group-hover:text-[#3C6E71] transition-colors uppercase">
                  HOLUX
                </span>
                <span className="block text-[9px] font-sans font-bold tracking-[0.2em] text-[#3C6E71] uppercase">
                  Haute Parfumerie
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-display font-bold uppercase tracking-wider text-[#1C2321]">
            <a
              href="#catalogo"
              onClick={() => onSelectCategory && onSelectCategory("Todos")}
              className="hover:text-[#3C6E71] transition-colors py-2"
            >
              CATÁLOGO
            </a>
            <button
              onClick={() => onSelectCategory && onSelectCategory("Xerjoff")}
              className="hover:text-[#3C6E71] transition-colors py-2 cursor-pointer uppercase"
            >
              XERJOFF NICHE
            </button>
            <button
              onClick={() => onSelectCategory && onSelectCategory("Tom Ford")}
              className="hover:text-[#3C6E71] transition-colors py-2 cursor-pointer uppercase"
            >
              TOM FORD
            </button>
            <button
              onClick={() => onSelectCategory && onSelectCategory("Creed")}
              className="hover:text-[#3C6E71] transition-colors py-2 cursor-pointer uppercase"
            >
              CREED
            </button>

            {/* Special Lucky Wheel Tab */}
            <button
              onClick={() => setIsWheelOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B85C38] text-white hover:bg-[#a04e2e] shadow-sm hover:scale-105 transition-all text-xs font-bold"
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
                placeholder="Buscar fragancias, notas o marcas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#1C2321]/20 rounded-full pl-9 pr-4 py-2 text-xs text-[#1C2321] placeholder-gray-500 outline-none focus:border-[#3C6E71] focus:ring-1 focus:ring-[#3C6E71]/30 transition-all font-sans"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2 text-xs text-gray-400 hover:text-gray-700"
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#1C2321]/15 hover:border-[#D4AF37] text-xs font-sans font-semibold text-[#1C2321] transition-all shadow-xs group"
              title="Monedero VIP Club"
            >
              <Award className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <div className="text-left hidden sm:block leading-tight">
                <span className="text-[9px] block text-gray-500 uppercase font-sans">Club VIP</span>
                <span className="font-bold font-mono text-[#1C2321]">{vipPoints.toLocaleString()} pts</span>
              </div>
              <span className="sm:hidden font-mono font-bold text-xs">{vipPoints.toLocaleString()}</span>
            </button>

            {/* Cart Drawer Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#1C2321] text-white hover:bg-neutral-800 transition-all shadow-xs cursor-pointer"
              aria-label="Ver Carrito de compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 rounded-full bg-[#B85C38] text-white text-[10px] font-bold font-mono flex items-center justify-center animate-bounce border-2 border-white">
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
              placeholder="Buscar fragancias, notas o marcas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#1C2321]/20 rounded-full pl-9 pr-4 py-2 text-xs text-[#1C2321] placeholder-gray-500 outline-none focus:border-[#3C6E71] font-sans"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#1C2321]/10 space-y-2 font-display text-sm font-bold uppercase tracking-wider">
            <a
              href="#catalogo"
              onClick={() => {
                onSelectCategory && onSelectCategory("Todos");
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 rounded-lg hover:bg-[#1C2321]/5"
            >
              Catálogo Completo
            </a>
            <button
              onClick={() => {
                onSelectCategory && onSelectCategory("Xerjoff");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#1C2321]/5 uppercase"
            >
              Xerjoff Niche
            </button>
            <button
              onClick={() => {
                onSelectCategory && onSelectCategory("Tom Ford");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#1C2321]/5 uppercase"
            >
              Tom Ford
            </button>
            <button
              onClick={() => {
                setIsWheelOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg bg-[#B85C38] text-white flex items-center justify-between"
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
