"use client";

import React, { useState, memo } from "react";
import Image from "next/image";
import { Heart, Star, Zap, Eye, Check, Sparkles } from "lucide-react";
import { useShop } from "../context/ShopContext";

export const ProductCard = memo(function ProductCard({ product }) {
  const { addToCart, setIsCartOpen, setSelectedProduct } = useShop();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const price = Number(product.price) || 0;
  const originalPrice = Math.round(price * 1.15); // simulated regular price with 15% discount
  const discount = 15;
  const installments = product.installments || 6;
  const installmentAmount = Math.round(price / installments);
  const netPrice = Math.round(price * 0.79);

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setIsCartOpen(true);
    }, 400);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div className="group bg-white border border-gray-200/90 rounded-xl sm:rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-gray-300 transition-all duration-300 relative text-left h-full">
      {/* 1. Imagen del producto (Uniforme aspect-[4/5] con fondo neutro) */}
      <div
        onClick={() => setSelectedProduct(product)}
        className="relative bg-[#F8F7F5] aspect-[4/5] w-full overflow-hidden border-b border-gray-100 group-hover:bg-[#F2EFE9]/60 transition-colors cursor-pointer flex items-center justify-center p-4"
      >
        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#3C6E71] text-white text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider px-2.5 py-0.5 rounded-full shadow-xs z-10 select-none border border-white/10">
            {discount}% OFF
          </span>
        )}

        {/* VIP Points Chip */}
        <span className="absolute top-2.5 left-20 sm:top-3 sm:left-22 bg-[#1C2321]/90 backdrop-blur-xs text-[#ECD88C] text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full shadow-xs z-10 flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
          +{product.pointsReward} pts
        </span>

        {/* Botón de Favoritos */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all duration-200 z-20 cursor-pointer shadow-xs ${
            isFavorite
              ? "bg-rose-50 text-rose-600 border border-rose-200 scale-105"
              : "bg-white/90 text-gray-400 hover:text-rose-500 hover:bg-white border border-gray-200/90 hover:scale-105"
          }`}
          title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
              isFavorite ? "fill-rose-500 text-rose-500" : "text-gray-500"
            }`}
          />
        </button>

        {/* Product Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={320}
            height={320}
            className="object-contain max-h-56 w-auto group-hover:scale-105 transition-all duration-500"
            priority={false}
          />
        </div>

        {/* Reviews Badge */}
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 bg-white/95 backdrop-blur-xs border border-gray-200/90 shadow-xs px-2 py-0.5 rounded-full flex items-center gap-1 text-[9px] sm:text-[10px] text-gray-700 font-sans font-bold select-none">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span>{product.rating}</span>
          <span className="hidden xs:inline text-gray-400">({product.reviewsCount})</span>
        </div>
      </div>

      {/* 2. Información del producto organizada */}
      <div className="p-3 sm:p-4 md:p-5 flex-grow flex flex-col justify-between space-y-2.5 sm:space-y-3.5">
        <div className="space-y-1 sm:space-y-1.5">
          {/* Categoría y Marca */}
          <div className="text-[9px] sm:text-[10px] text-[#3C6E71] font-bold uppercase tracking-wider font-sans truncate">
            {product.brand.toUpperCase()} • {product.category.toUpperCase()}
          </div>

          {/* Nombre del producto */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="font-sans font-bold text-gray-900 text-xs sm:text-sm md:text-base leading-snug line-clamp-1 hover:text-[#3C6E71] transition-colors cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Olfactory top notes pill */}
          <div className="flex flex-wrap gap-1 pt-0.5">
            {product.olfactoryPyramid.top.slice(0, 3).map((note, i) => (
              <span
                key={i}
                className="text-[9px] px-1.5 py-0.5 bg-[#F8F7F5] border border-gray-200 text-gray-600 rounded font-sans"
              >
                {note}
              </span>
            ))}
          </div>

          {/* Descripción */}
          {product.description && (
            <p className="text-[10px] sm:text-[11px] text-gray-500 line-clamp-2 leading-relaxed font-sans pt-0.5">
              {product.description}
            </p>
          )}
        </div>

        {/* 3. Precio e Información Fiscal */}
        <div className="space-y-1.5 pt-1.5 border-t border-gray-100">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-sm sm:text-lg md:text-xl font-black text-gray-950 font-sans tracking-tight">
              ${Math.round(price).toLocaleString("es-AR")}
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 line-through font-sans">
              ${Math.round(originalPrice).toLocaleString("es-AR")}
            </span>
          </div>

          {/* Cartel Morado de Cuotas Fijas (Original Holux Style) */}
          <div>
            <span className="bg-[#EBDCF0] text-[#7E3793] text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded tracking-tight uppercase inline-block font-sans">
              {installments} cuotas fijas de ${installmentAmount.toLocaleString("es-AR")}
            </span>
          </div>

          <div className="space-y-0.5 text-gray-400 font-sans text-[8.5px] sm:text-[9.5px] leading-tight">
            <div>CFTA: 0%</div>
            <div>Precio sin impuestos nacionales: ${netPrice.toLocaleString("es-AR")}</div>
          </div>
        </div>

        {/* 4. Botones de Acción */}
        <div className="pt-1 flex gap-2">
          <button
            type="button"
            onClick={handleBuyNow}
            className="flex-1 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-sans text-[10px] sm:text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs bg-black text-white hover:bg-neutral-800 active:scale-[0.99]"
          >
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
            <span>{isAdded ? "¡AGREGADO!" : "COMPRAR"}</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedProduct(product)}
            className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-gray-200 text-gray-600 hover:text-black hover:border-gray-400 transition-colors"
            title="Ver pirámide olfativa completa"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
