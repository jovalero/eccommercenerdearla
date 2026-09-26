"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useShop } from "../context/ShopContext";
import { formatPriceARS, calculateCuotas } from "../utils/formatters";
import { X, Sparkles, Clock, Wind, ShoppingBag, Check } from "lucide-react";

export default function ProductDetailModal() {
  const { selectedProduct, setSelectedProduct, addToCart, setIsCartOpen } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setIsAdded(false);
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const installments = selectedProduct.installments || 6;
  const cuotaAmount = calculateCuotas(selectedProduct.price, installments);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setSelectedProduct(null);
      setIsCartOpen(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto text-[#1C2321]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-black border border-gray-200 transition-colors shadow-xs"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Column */}
          <div className="relative aspect-square md:aspect-auto bg-[#F8F7F5] p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              width={420}
              height={420}
              className="object-contain max-h-80 w-auto drop-shadow-md"
              priority
            />
            {selectedProduct.badge && (
              <span className="absolute top-6 left-6 px-3 py-1 rounded-full bg-[#1C2321] text-white text-xs font-display font-bold uppercase tracking-wider">
                {selectedProduct.badge}
              </span>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5 font-sans">
                <span className="uppercase tracking-widest text-[#3C6E71] font-bold">
                  {selectedProduct.brand}
                </span>
                <span className="px-2 py-0.5 rounded bg-gray-100 font-bold text-[10px] text-gray-600">
                  {selectedProduct.category}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-xl sm:text-2xl font-display font-black text-gray-950 uppercase tracking-tight">
                {selectedProduct.name}
              </h2>
              <p className="text-xs text-gray-500 font-sans mt-0.5">{selectedProduct.subtitle}</p>

              {/* Price & Cuotas */}
              <div className="mt-4 p-4 rounded-xl bg-[#F8F7F5] border border-gray-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black font-sans text-gray-950">
                    {formatPriceARS(selectedProduct.price)}
                  </span>
                  <span className="text-xs text-[#3C6E71] font-bold font-mono">
                    +{selectedProduct.pointsReward} Pts VIP
                  </span>
                </div>
                <div className="mt-1">
                  <span className="bg-[#EBDCF0] text-[#7E3793] text-[10px] font-extrabold px-2 py-0.5 rounded tracking-tight uppercase inline-block font-sans">
                    {installments} cuotas sin interés de {formatPriceARS(cuotaAmount)}
                  </span>
                </div>
              </div>

              {/* Olfactory Pyramid (Star feature) */}
              <div className="mt-5">
                <h4 className="text-xs font-display font-bold uppercase tracking-wider text-[#1C2321] mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#3C6E71]" />
                  <span>Pirámide Olfativa Completa</span>
                </h4>

                <div className="space-y-2 text-xs font-sans">
                  {/* Top Notes */}
                  <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200">
                    <span className="font-bold text-[#3C6E71] block text-[11px] mb-1">
                      Salida (Primeros 15 min):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.olfactoryPyramid.top.map((note, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full bg-white text-gray-700 text-[11px] border border-gray-200 shadow-2xs">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Heart Notes */}
                  <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200">
                    <span className="font-bold text-[#3C6E71] block text-[11px] mb-1">
                      Corazón (Cuerpo de la fragancia):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.olfactoryPyramid.heart.map((note, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full bg-white text-gray-700 text-[11px] border border-gray-200 shadow-2xs">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Base Notes */}
                  <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200">
                    <span className="font-bold text-[#3C6E71] block text-[11px] mb-1">
                      Fondo (Fijación y estela):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.olfactoryPyramid.base.map((note, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full bg-white text-gray-700 text-[11px] border border-gray-200 shadow-2xs">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Longevity & Sillage */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-sans">
                <div className="p-2.5 rounded-lg bg-[#F8F7F5] border border-gray-200 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#3C6E71]" />
                  <div>
                    <span className="text-[10px] text-gray-500 block">Longevidad</span>
                    <span className="font-bold text-gray-800">{selectedProduct.longevity}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F8F7F5] border border-gray-200 flex items-center gap-2">
                  <Wind className="w-4 h-4 text-[#3C6E71]" />
                  <div>
                    <span className="text-[10px] text-gray-500 block">Estela</span>
                    <span className="font-bold text-gray-800">{selectedProduct.sillage}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="mt-3.5 text-xs text-gray-600 font-sans leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex items-center gap-3">
              <div className="flex items-center rounded-xl bg-gray-100 border border-gray-300 p-1 font-mono">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 hover:bg-white font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 hover:bg-white font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 bg-[#1C2321] text-white hover:bg-neutral-800 shadow-md cursor-pointer"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>¡AGREGADO!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>AÑADIR {quantity > 1 ? `(${quantity})` : ""} A LA BOLSA</span>
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
