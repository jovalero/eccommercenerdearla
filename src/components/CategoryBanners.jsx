"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const CATEGORY_CARDS = [
  {
    title: "FRAGANCIAS HOMBRE",
    span: "ELEGANCIA Y CARÁCTER",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80",
    brandFilter: "Tom Ford",
  },
  {
    title: "FRAGANCIAS MUJER",
    span: "SOFISTICACIÓN Y FRESCURA",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&auto=format&fit=crop&q=80",
    brandFilter: "Xerjoff",
  },
  {
    title: "EXCLUSIVIDAD Y TENDENCIA",
    span: "JOYAS DE LA PERFUMERÍA ORIENTAL",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&auto=format&fit=crop&q=80",
    brandFilter: "Nishane",
  },
];

export default function CategoryBanners({ onSelectBrand }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {CATEGORY_CARDS.map((card, idx) => (
          <div
            key={idx}
            onClick={() => onSelectBrand && onSelectBrand(card.brandFilter)}
            className="group relative w-full h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-200"
          >
            {/* Background Image */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Dark gradient overlay for perfect readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity group-hover:from-black/90"></div>

            {/* Content text */}
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white select-none">
              <span className="text-[10px] sm:text-xs font-sans font-bold tracking-widest text-[#ECD88C] bg-black/40 border border-white/15 backdrop-blur-xs px-3 py-1 rounded-full inline-block w-fit mb-2 uppercase">
                {card.span}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight drop-shadow-sm">
                {card.title}
              </h3>
              <div className="mt-4 flex items-center gap-2 text-xs font-display font-bold tracking-wider text-white/90 group-hover:text-[#ECD88C] transition-colors">
                <span>VER COLECCIÓN</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
