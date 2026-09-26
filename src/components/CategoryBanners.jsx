"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const CATEGORY_CARDS = [
  {
    title: "FRAGANCIAS HOMBRE",
    span: "ELEGANCIA Y CARÁCTER",
    image: "/banners/626f05d5-d503-48d9-aa07-daa0f2901b90.jpg",
    brandFilter: "Tom Ford",
  },
  {
    title: "FRAGANCIAS MUJER",
    span: "SOFISTICACIÓN Y FRESCURA",
    image: "/banners/5a3091ff-8cf1-4622-96a2-ddc75f228075.jpg",
    brandFilter: "Xerjoff",
  },
  {
    title: "EXCLUSIVIDAD Y TENDENCIA",
    span: "JOYAS DE LA PERFUMERÍA ORIENTAL",
    image: "/banners/89ada2e8-6101-48ce-9853-73762e7bddc0.jpg",
    brandFilter: "Nishane",
  },
];

export default function CategoryBanners({ onSelectBrand }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {CATEGORY_CARDS.map((card, idx) => (
          <div
            key={idx}
            onClick={() => onSelectBrand && onSelectBrand(card.brandFilter)}
            className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-200"
          >
            {/* Background Image */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* Content text */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white select-none">
              <span className="text-[10px] sm:text-xs font-sans font-bold tracking-widest text-[#3C6E71] bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full inline-block w-fit mb-2">
                {card.span}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-tight">
                {card.title}
              </h3>
              <div className="mt-3 flex items-center gap-1.5 text-xs font-display font-bold tracking-wider text-white/90 group-hover:text-white transition-colors">
                <span>VER COLECCIÓN</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
