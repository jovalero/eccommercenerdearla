"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS, BRANDS } from "../data/products";
import ProductCard from "./ProductCard";
import { SlidersHorizontal, Sparkles } from "lucide-react";

export default function ProductCatalog({ searchQuery, catalogRef }) {
  const [selectedBrand, setSelectedBrand] = useState("Todos");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchBrand =
        selectedBrand === "Todos" || item.brand === selectedBrand;
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
      return 0; // default featured
    });
  }, [selectedBrand, searchQuery, sortBy]);

  return (
    <section ref={catalogRef} id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-holux-gold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Colección Seleccionada</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-light text-holux-light">
            Fragancias de Alta Gama &amp; Nicho
          </h2>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-4 h-4 text-holux-muted" />
          <span className="text-xs text-holux-muted">Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-holux-card border border-holux-border text-holux-light text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-holux-gold"
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
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all ${
              selectedBrand === brand
                ? "bg-holux-gold text-holux-black font-semibold shadow-gold-glow/30"
                : "bg-holux-card/80 text-holux-muted hover:text-holux-light border border-holux-border/60 hover:border-holux-border"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-2xl bg-holux-card/30 border border-holux-border/40 max-w-lg mx-auto p-8">
          <p className="text-holux-light font-serif text-lg mb-2">No se encontraron fragancias</p>
          <p className="text-xs text-holux-muted mb-6">
            Intenta con otro término de búsqueda o selecciona todas las marcas.
          </p>
          <button
            onClick={() => {
              setSelectedBrand("Todos");
            }}
            className="px-6 py-2.5 rounded-full bg-holux-gold text-holux-black text-xs font-semibold tracking-wider uppercase hover:opacity-90"
          >
            Ver Todo el Catálogo
          </button>
        </div>
      )}
    </section>
  );
}
