"use client";

import React, { useState, useRef } from "react";
import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import ProductCatalog from "../components/ProductCatalog";
import { useShop } from "../context/ShopContext";
import { Sparkles, Award, Shield, Gift, Heart, ArrowUpRight } from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const catalogRef = useRef(null);
  const { setIsWheelOpen, setIsWalletOpen } = useShop();

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Navbar */}
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Hero Section */}
      <HeroBanner scrollToCatalog={scrollToCatalog} />

      {/* Main Catalog with Filters & Pyramid Modals */}
      <ProductCatalog searchQuery={searchQuery} catalogRef={catalogRef} />

      {/* Gamification Spotlight Banner */}
      <section className="bg-gradient-to-r from-holux-dark via-holux-card to-holux-dark border-y border-holux-border/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-b from-holux-cardHover/80 to-holux-dark p-8 sm:p-12 border border-holux-gold/30 shadow-luxury relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-holux-gold/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-holux-dark/80 border border-holux-gold/40 text-xs font-semibold uppercase tracking-widest text-holux-gold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gamificación Webflow Cloud</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-light text-holux-light leading-tight">
                El Arte de Premiar Tu Pasión por la{" "}
                <span className="text-gold-gradient font-normal italic">Alta Perfumería</span>
              </h2>

              <p className="mt-4 text-sm text-holux-muted leading-relaxed">
                Cada interacción en HOLUX te recompensa. Gira la ruleta diaria, acumula Puntos VIP con cada pedido y desbloquea muestras de nicho exclusivas creadas por las casas más prestigiosas del mundo.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => setIsWheelOpen(true)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-holux-goldDark via-holux-gold to-holux-goldDark text-holux-black font-semibold text-xs uppercase tracking-wider shadow-gold-glow/40 hover:opacity-95 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Probar la Ruleta Ahora</span>
                </button>

                <button
                  onClick={() => setIsWalletOpen(true)}
                  className="px-6 py-3 rounded-full bg-holux-card hover:bg-holux-cardHover text-holux-light border border-holux-border hover:border-holux-gold text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-holux-gold" />
                  <span>Consultar Monedero VIP</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-holux-black border-t border-holux-border/80 py-12 text-xs text-holux-muted mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-holux-border/40">
            <div className="text-center md:text-left">
              <span className="font-serif text-lg tracking-widest text-holux-light font-semibold block">
                HOLUX REWARDS
              </span>
              <span className="text-[11px] text-holux-gold tracking-wider uppercase">
                Edición Especial Webflow Cloud &bull; Nerdearla App Showcase
              </span>
            </div>

            <div className="flex items-center gap-6 text-holux-cream text-xs">
              <button onClick={() => setIsWheelOpen(true)} className="hover:text-holux-gold transition-colors">
                Ruleta de Premios
              </button>
              <button onClick={() => setIsWalletOpen(true)} className="hover:text-holux-gold transition-colors">
                Monedero VIP
              </button>
              <button onClick={scrollToCatalog} className="hover:text-holux-gold transition-colors">
                Catálogo de Fragancias
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-holux-muted/80">
            <p>&copy; {new Date().getFullYear()} HOLUX Parfums. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1">
              Desarrollado para la comunidad de <strong className="text-holux-cream">Nerdearla 2026</strong> &bull; Optimizado para Webflow Cloud.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
