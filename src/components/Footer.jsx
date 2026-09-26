"use client";

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 4000);
  };

  return (
    <footer className="bg-[#1C2321] text-[#F2EFE9] border-t border-[#3C6E71]/20 pt-10 pb-16 sm:py-14 select-none w-full text-left font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#3C6E71]/20">
          
          {/* Column 1: Newsletter Signup & Brand Info */}
          <div className="md:col-span-12 lg:col-span-5 space-y-4">
            <h2 className="font-display text-lg sm:text-2xl font-black text-white tracking-tight leading-tight uppercase">
              ¡RECIBÍ NUESTRAS OFERTAS <br className="hidden sm:inline" />
              Y NOVEDADES POR MAIL!
            </h2>

            {subscribed ? (
              <div className="p-3 bg-[#3C6E71]/30 border border-[#3C6E71] rounded-lg text-xs text-white">
                ¡Gracias por suscribirte a las novedades exclusivas de HOLUX!
              </div>
            ) : (
              <form 
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1 max-w-lg"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo Electrónico"
                  className="px-3.5 py-2.5 bg-white/10 border border-[#3C6E71]/40 rounded-lg text-xs text-white placeholder-gray-400 outline-none focus:border-[#3C6E71] transition-all flex-1 shadow-sm font-sans"
                />
                <button
                  type="submit"
                  className="py-2.5 px-4 bg-black hover:bg-neutral-800 text-white rounded-lg transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1 border border-white/20 text-xs font-bold font-display uppercase tracking-wider shrink-0"
                >
                  <span>SUSCRIBIRME</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>
            )}

            <div className="pt-2 space-y-1">
              <span className="font-display text-sm sm:text-base font-bold tracking-wider text-white flex items-center gap-2 uppercase">
                <span className="w-6 h-6 rounded-full bg-white text-[#1C2321] flex items-center justify-center text-xs font-black">H</span>
                <span>Holux Haute Parfumerie &amp; Rewards</span>
              </span>
              <p className="text-[10px] text-gray-400 font-sans leading-tight">
                Holux S.A. Av. Pellegrini 1840, Rosario, Santa Fe. CUIT: 30-64270999-9
              </p>
            </div>
          </div>

          {/* Column 2 & 3: Links */}
          <div className="md:col-span-7 lg:col-span-4 grid grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-3">
              <h3 className="font-display text-xs font-bold text-[#3C6E71] uppercase tracking-wider">
                ACERCA DE NOSOTROS
              </h3>
              <ul className="space-y-2 text-xs text-gray-300 font-medium font-sans">
                <li><a href="#catalogo" className="hover:text-white transition-colors block">Perfumes Nicho</a></li>
                <li><a href="#catalogo" className="hover:text-white transition-colors block">Nuestros Locales</a></li>
                <li><a href="#catalogo" className="hover:text-white transition-colors block">Eventos Exclusivos</a></li>
                <li><a href="#catalogo" className="hover:text-white transition-colors block">Garantía de Origen</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-xs font-bold text-[#3C6E71] uppercase tracking-wider">
                CENTRO DE AYUDA
              </h3>
              <ul className="space-y-2 text-xs text-gray-300 font-medium font-sans">
                <li><a href="#catalogo" className="hover:text-white transition-colors block">Seguimiento de Envío</a></li>
                <li><a href="#catalogo" className="hover:text-white transition-colors block">Preguntas Frecuentes</a></li>
                <li><a href="#catalogo" className="hover:text-white transition-colors block">Envíos y Pagos</a></li>
                <li><a href="#catalogo" className="hover:text-white transition-colors block">Canjear Cupón</a></li>
              </ul>
            </div>
          </div>

          {/* Column 4: Social & Certifications */}
          <div className="md:col-span-5 lg:col-span-3 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <h3 className="font-display text-xs font-bold text-[#3C6E71] uppercase tracking-wider">
                PROGRAMA DE FIDELIDAD
              </h3>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Cada compra en HOLUX acumula <strong>Puntos VIP</strong> canjeables por cupones de descuento y decants exclusivos de 2ml sin cargo.
              </p>
            </div>

            <div className="pt-2 border-t border-[#3C6E71]/20">
              <span className="text-[10px] text-gray-400 font-sans block">
                Optimizado para Webflow Cloud &bull; Nerdearla 2026 Showcase
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400 font-sans">
          <p>© {new Date().getFullYear()} HOLUX Parfumerie. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span>6 Cuotas Sin Interés</span>
            <span>•</span>
            <span>100% Originales</span>
            <span>•</span>
            <span>Envíos Asegurados</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
