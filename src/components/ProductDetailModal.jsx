"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useShop } from "../context/ShopContext";
import { formatPriceARS, calculateCuotas } from "../utils/formatters";
import { X, Sparkles, Clock, Wind, Award, ShoppingBag, Check } from "lucide-react";

export default function ProductDetailModal() {
  const { selectedProduct, setSelectedProduct, addToCart } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setIsAdded(false);
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const cuotaAmount = calculateCuotas(selectedProduct.price, selectedProduct.installments);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-holux-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-holux-card border border-holux-gold/30 rounded-3xl shadow-modal overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-holux-dark/70 hover:bg-holux-dark text-holux-muted hover:text-white border border-holux-border transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Column */}
          <div className="relative aspect-square md:aspect-auto bg-gradient-to-b from-holux-cardHover to-holux-dark p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-holux-border/50">
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              width={450}
              height={450}
              className="object-contain max-h-80 w-auto drop-shadow-2xl"
              priority
            />
            {selectedProduct.badge && (
              <span className="absolute top-6 left-6 px-3 py-1 rounded-full bg-holux-black/80 border border-holux-gold/40 text-xs font-semibold uppercase tracking-wider text-holux-gold">
                {selectedProduct.badge}
              </span>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center justify-between text-xs text-holux-muted mb-2">
                <span className="uppercase tracking-widest text-holux-gold font-semibold">
                  {selectedProduct.brand}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-holux-cardHover border border-holux-border/50 text-[11px]">
                  {selectedProduct.category}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl sm:text-3xl font-serif text-holux-light font-medium">
                {selectedProduct.name}
              </h2>
              <p className="text-sm text-holux-muted mt-1">{selectedProduct.subtitle}</p>

              {/* Price & Cuotas */}
              <div className="mt-4 p-4 rounded-2xl bg-holux-dark/50 border border-holux-border/40">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-holux-light">
                    {formatPriceARS(selectedProduct.price)}
                  </span>
                  <span className="text-xs text-emerald-400 font-medium">
                    +{selectedProduct.pointsReward} Pts VIP
                  </span>
                </div>
                <p className="text-xs text-holux-teal font-medium mt-1">
                  {selectedProduct.installments} cuotas sin interés de{" "}
                  <strong className="text-holux-light">{formatPriceARS(cuotaAmount)}</strong>
                </p>
              </div>

              {/* Olfactory Pyramid (Star feature) */}
              <div className="mt-6">
                <h4 className="text-xs uppercase tracking-widest text-holux-gold font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Pirámide Olfativa Completa</span>
                </h4>

                <div className="space-y-2 text-xs">
                  {/* Top Notes */}
                  <div className="p-2.5 rounded-xl bg-holux-cardHover/60 border border-holux-border/40">
                    <span className="font-semibold text-holux-goldLight block text-[11px] mb-1">
                      Salida (Primeros 15 min):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.olfactoryPyramid.top.map((note, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full bg-holux-dark/80 text-holux-cream text-[11px] border border-holux-border/60">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Heart Notes */}
                  <div className="p-2.5 rounded-xl bg-holux-cardHover/60 border border-holux-border/40">
                    <span className="font-semibold text-holux-goldLight block text-[11px] mb-1">
                      Corazón (Cuerpo de la fragancia):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.olfactoryPyramid.heart.map((note, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full bg-holux-dark/80 text-holux-cream text-[11px] border border-holux-border/60">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Base Notes */}
                  <div className="p-2.5 rounded-xl bg-holux-cardHover/60 border border-holux-border/40">
                    <span className="font-semibold text-holux-goldLight block text-[11px] mb-1">
                      Fondo (Fijación y estela):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.olfactoryPyramid.base.map((note, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full bg-holux-dark/80 text-holux-cream text-[11px] border border-holux-border/60">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Specs badges: Longevity & Sillage */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-holux-dark/40 border border-holux-border/40 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-holux-gold" />
                  <div>
                    <span className="text-[10px] text-holux-muted block">Longevidad</span>
                    <span className="font-medium text-holux-cream">{selectedProduct.longevity}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-holux-dark/40 border border-holux-border/40 flex items-center gap-2">
                  <Wind className="w-4 h-4 text-holux-gold" />
                  <div>
                    <span className="text-[10px] text-holux-muted block">Estela</span>
                    <span className="font-medium text-holux-cream">{selectedProduct.sillage}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs text-holux-muted leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-holux-border/50 flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center rounded-xl bg-holux-dark border border-holux-border p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-holux-muted hover:text-white hover:bg-holux-card"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-semibold text-holux-light">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-holux-muted hover:text-white hover:bg-holux-card"
                >
                  +
                </button>
              </div>

              {/* Add to cart CTA */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-gradient-to-r from-holux-goldDark via-holux-gold to-holux-goldDark text-holux-black shadow-gold-glow/40 hover:opacity-95"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Agregado al Carrito!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Añadir {quantity > 1 ? `(${quantity})` : ""} al Carrito</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
