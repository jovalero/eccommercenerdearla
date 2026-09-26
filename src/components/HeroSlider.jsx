"use client";

import React, { useState, useEffect, useRef, memo } from 'react';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

const SLIDES = [
  {
    span: "FRAGANCIAS EXCLUSIVAS Y DE AUTOR",
    title: "PERFUMES DE LUJO",
    highlight: "100% ORIGINALES",
    desc: "Descubrí nuestra exclusiva selección de perfumería internacional importada de primeras marcas para hombre y mujer con garantía de autenticidad.",
    cta: "VER PERFUMERÍA",
    action: "catalog",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1600&q=80"
  },
  {
    span: "NERDEARLA APP SHOWCASE 2026",
    title: "RULETA DE LA FORTUNA",
    highlight: "HASTA 25% OFF",
    desc: "Participa de la experiencia gamificada en Webflow Cloud. Desbloquea cupones de descuento inmediato, envíos bonificados y muestras de nicho de cortesía.",
    cta: "GIRAR RULETA VIP 🎡",
    action: "wheel",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1600&q=80"
  },
  {
    span: "ALTA GAMA EUROPEA",
    title: "XERJOFF & CREED",
    highlight: "PIRÁMIDES OLFATIVAS",
    desc: "Notas de salida, corazón y fondo detalladas en cada ficha. Descubre la alquimia de Naxos, Aventus, Erba Pura y Soleil Blanc.",
    cta: "EXPLORAR NICHO",
    action: "catalog",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1600&q=80"
  }
];

export const HeroSlider = memo(function HeroSlider({
  onOpenWheel,
  onScrollToCatalog,
  autoPlayInterval = 6000
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHoveredRef.current) {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      }
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handleAction = (slide) => {
    if (slide.action === "wheel" && onOpenWheel) {
      onOpenWheel();
    } else if (onScrollToCatalog) {
      onScrollToCatalog();
    }
  };

  return (
    <div
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
      className="group relative overflow-hidden bg-[#1C2321] text-[#F2EFE9] h-[480px] sm:h-[540px] md:h-[580px] lg:h-[620px] flex items-center border-b border-[#3C6E71]/20 select-none"
    >
      {/* Background Images with crossfade */}
      {SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center filter brightness-[0.45] scale-105 transition-transform duration-7000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C2321]/95 via-[#1C2321]/60 to-transparent"></div>
        </div>
      ))}

      {/* Slide Text Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3C6E71]/30 border border-[#3C6E71]/50 text-xs font-display tracking-widest text-[#F2EFE9] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{SLIDES[currentSlide].span}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none text-white">
            {SLIDES[currentSlide].title} <br />
            <span className="text-[#3C6E71]">{SLIDES[currentSlide].highlight}</span>
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed max-w-lg">
            {SLIDES[currentSlide].desc}
          </p>

          <div className="pt-2">
            <button
              onClick={() => handleAction(SLIDES[currentSlide])}
              className="py-3 px-7 bg-[#B85C38] hover:bg-[#a04e2e] text-white font-display text-sm font-bold tracking-wider uppercase rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer border border-white/20"
            >
              <span>{SLIDES[currentSlide].cta}</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>

      {/* Nav Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Slide siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentSlide
                ? "w-8 bg-[#3C6E71]"
                : "w-2 bg-white/40 hover:bg-white/80"
            }`}
            aria-label={`Ir al slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
});

export default HeroSlider;
