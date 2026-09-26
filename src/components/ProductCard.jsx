"use client";

import React, { useState } from "react";
import Image from "next/image";
import { formatPriceARS, calculateCuotas } from "../utils/formatters";
import { useShop } from "../context/ShopContext";
import { Eye, ShoppingBag, Star, Sparkles, Check } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart, setSelectedProduct } = useShop();
  const [addedAnimation, setAddedAnimation] = useState(false);

  const cuotaAmount = calculateCuotas(product.price, product.installments);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group cursor-pointer rounded-2xl bg-holux-card border border-holux-border/80 hover:border-holux-gold/50 transition-all duration-300 hover:shadow-luxury flex flex-col overflow-hidden relative"
    >
      {/* Top badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {product.badge ? (
          <span className="px-2.5 py-1 rounded-full bg-holux-black/80 backdrop-blur-md border border-holux-gold/40 text-[10px] uppercase tracking-wider font-semibold text-holux-gold">
            {product.badge}
          </span>
        ) : <div></div>}
        
        <span className="px-2 py-0.5 rounded-full bg-holux-tealDark/80 backdrop-blur-md border border-holux-teal/40 text-[10px] text-white flex items-center gap-1 font-medium">
          <Sparkles className="w-2.5 h-2.5 text-holux-gold" />
          +{product.pointsReward} pts
        </span>
      </div>

      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-gradient-to-b from-holux-cardHover to-holux-card overflow-hidden flex items-center justify-center p-6">
        <Image
          src={product.image}
          alt={product.name}
          width={350}
          height={350}
          className="object-contain w-full h-full max-h-56 group-hover:scale-105 transition-transform duration-500 ease-out"
          priority={false}
        />
        
        {/* Quick view button overlay */}
        <div className="absolute inset-0 bg-holux-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-4 py-2 rounded-full bg-holux-card/90 text-holux-light border border-holux-gold/50 text-xs tracking-wider uppercase font-medium flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-holux-gold" />
            Pirámide Olfativa
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-holux-muted mb-1">
            <span className="tracking-widest uppercase font-medium text-holux-gold/90">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
              <span className="text-[11px] text-holux-muted">{product.rating}</span>
            </div>
          </div>

          <h3 className="font-serif text-lg text-holux-light font-medium group-hover:text-holux-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-holux-muted mt-0.5 line-clamp-1">{product.subtitle}</p>

          {/* Scent notes pill preview */}
          <div className="mt-3 flex flex-wrap gap-1">
            {product.olfactoryPyramid.top.slice(0, 2).map((note, idx) => (
              <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-holux-cardHover text-holux-cream/80 border border-holux-border/50">
                {note}
              </span>
            ))}
            {product.olfactoryPyramid.top.length > 2 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-holux-cardHover text-holux-muted">
                +{product.olfactoryPyramid.top.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="mt-5 pt-3 border-t border-holux-border/50">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-xl font-semibold text-holux-light">
              {formatPriceARS(product.price)}
            </span>
          </div>

          <p className="text-[11px] text-holux-teal font-medium mb-3">
            {product.installments} cuotas sin interés de <span className="font-bold">{formatPriceARS(cuotaAmount)}</span>
          </p>

          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              addedAnimation
                ? "bg-emerald-600 text-white"
                : "bg-holux-cardHover hover:bg-holux-gold text-holux-light hover:text-holux-black border border-holux-border hover:border-holux-gold"
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>¡Agregado!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Añadir al Carrito</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
