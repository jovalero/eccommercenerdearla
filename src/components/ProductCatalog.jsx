"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS, BRANDS } from "../data/products";
import ProductCard from "./ProductCard";
import { SlidersHorizontal, Sparkles } from "lucide-react";

export default function ProductCatalog({ searchQuery, selectedBrand, setSelectedBrand, catalogRef }) {
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchBrand =
        !selectedBrand || selectedBrand === "Todos" || item.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.olfactoryPyramid.top.some((n) =>
          n.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        item.olfactoryPyramid.heart.some((n) =>
          n.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        item.olfactoryPyramid.base.some((n) =>
          n.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchBrand && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [selectedBrand, searchQuery, sortBy]);

  return (
    <section ref={catalogRef} id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <span className="text-[10px] font-sans font-bold tracking-widest text-[#3C6E71] uppercase block mb-1">
            HAUTE PARFUMERIE INTERNACIONAL
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-black text-[#1C2321] uppercase tracking-tight">
            PRODUCTOS DESTACADOS
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-sans mt-0.5">
            Una selección especial recomendada por nuestros expertos en perfumería de nicho.
          </p>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 self-start md:self-end">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-xs text-gray-500 font-sans">Ordenar:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-200 text-[#1C2321] text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#3C6E71] font-sans shadow-2xs"
          >
            <option value="featured">Destacados Holux</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="rating">Mayor Calificación</option>
          </select>
        </div>
      </div>

      {/* Brand Filters Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {BRANDS.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-4 py-2 rounded-xl text-xs font-display font-bold tracking-wider uppercase whitespace-nowrap transition-all ${
              selectedBrand === brand
                ? "bg-[#1C2321] text-white shadow-xs"
                : "bg-white text-gray-600 hover:text-black border border-gray-200/90 hover:border-gray-300"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-2xl bg-white border border-gray-200 max-w-lg mx-auto p-8 shadow-xs">
          <p className="text-[#1C2321] font-display text-xl font-bold uppercase mb-2">No se encontraron fragancias</p>
          <p className="text-xs text-gray-500 font-sans mb-6">
            Intenta con otro término de búsqueda o selecciona todas las marcas.
          </p>
          <button
            onClick={() => setSelectedBrand("Todos")}
            className="px-6 py-2.5 rounded-xl bg-[#1C2321] text-white text-xs font-display font-bold tracking-wider uppercase hover:bg-neutral-800"
          >
            Ver Todo el Catálogo
          </button>
        </div>
      )}

      {/* Link to Full Dynamic Catalog with Advanced Filters */}
      <div className="mt-12 text-center">
        <a
          href="/catalogo"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#1C2321] text-white hover:bg-[#3C6E71] transition-all font-display font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md hover:scale-[1.01]"
        >
          <span>EXPLORAR CATÁLOGO COMPLETO & FILTROS AVANZADOS</span>
          <span className="text-[#ECD88C]">→</span>
        </a>
      </div>
    </section>
  );
}
