"use client";

import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { REWARDS } from "../data/rewards";
import { X, Gift, Sparkles, Truck, Tag, Percent, Award, CheckCircle2, ArrowRight } from "lucide-react";

export default function RewardsModal() {
  const {
    isRewardsOpen,
    setIsRewardsOpen,
    vipPoints,
    redeemReward,
    setIsCartOpen,
  } = useShop();

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [redeemedId, setRedeemedId] = useState(null);

  if (!isRewardsOpen) return null;

  const categories = ["Todos", "Muestras de Nicho", "Descuentos", "Ruleta", "Envíos"];

  const filteredRewards = selectedCategory === "Todos"
    ? REWARDS
    : REWARDS.filter((r) => r.category === selectedCategory);

  const handleRedeem = (reward) => {
    const success = redeemReward(reward);
    if (success) {
      setRedeemedId(reward.id);
      setTimeout(() => setRedeemedId(null), 2500);

      if (reward.type === "gift_cart") {
        setTimeout(() => {
          setIsRewardsOpen(false);
          setIsCartOpen(true);
        }, 1200);
      }
    }
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Sparkles": return <Sparkles className="w-5 h-5 text-amber-500" />;
      case "Truck": return <Truck className="w-5 h-5 text-[#3C6E71]" />;
      case "Tag": return <Tag className="w-5 h-5 text-[#B85C38]" />;
      case "Percent": return <Percent className="w-5 h-5 text-[#3C6E71]" />;
      case "Award": return <Award className="w-5 h-5 text-amber-500" />;
      case "Gift":
      default:
        return <Gift className="w-5 h-5 text-[#3C6E71]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white text-[#1C2321] border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl text-left my-auto max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setIsRewardsOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-black transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#F2EFE9] text-[#3C6E71]">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-black text-gray-900 uppercase tracking-wide">
                CATÁLOGO DE PREMIOS VIP
              </h2>
              <p className="text-xs text-gray-500 font-sans mt-0.5">
                Canjeá tus puntos por viales de cortesía a $0, cupones y beneficios.
              </p>
            </div>
          </div>

          {/* User Points Badge */}
          <div className="bg-[#1C2321] text-white px-4 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-xs shrink-0 self-start sm:self-auto">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <div>
              <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-sans">Tu Saldo</span>
              <span className="text-base font-black font-mono text-[#ECD88C]">
                {vipPoints.toLocaleString()} <span className="text-xs text-gray-300 font-normal font-sans">pts</span>
              </span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 shrink-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#3C6E71] text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto pr-1 flex-1 py-1">
          {filteredRewards.map((reward) => {
            const hasEnough = vipPoints >= reward.pointsCost;
            const progress = Math.min(100, Math.round((vipPoints / reward.pointsCost) * 100));
            const isRedeemed = redeemedId === reward.id;

            return (
              <div
                key={reward.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between relative ${
                  hasEnough
                    ? "bg-[#F8F7F5] border-gray-200 hover:border-gray-400 hover:shadow-sm"
                    : "bg-gray-50/70 border-gray-200/60 opacity-80"
                }`}
              >
                <div>
                  {/* Top row: Icon & Badge */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="p-2 rounded-xl bg-white shadow-2xs border border-gray-200/80">
                      {getIcon(reward.icon)}
                    </div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-gray-200 text-gray-700 shadow-2xs">
                      {reward.badge}
                    </span>
                  </div>

                  {/* Title & Cost */}
                  <h3 className="font-display font-bold text-base text-gray-900 leading-snug">
                    {reward.title}
                  </h3>
                  <div className="text-sm font-mono font-bold text-[#3C6E71] mt-0.5 mb-2">
                    {reward.pointsCost.toLocaleString()} Pts VIP
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 font-sans leading-relaxed mb-3">
                    {reward.description}
                  </p>
                </div>

                {/* Progress & Action Button */}
                <div className="space-y-2 pt-2 border-t border-gray-200/80">
                  {!hasEnough && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-sans text-gray-500 font-medium">
                        <span>Progreso para desbloquear</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#3C6E71] h-full rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleRedeem(reward)}
                    disabled={!hasEnough || isRedeemed}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-sans font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-xs ${
                      isRedeemed
                        ? "bg-emerald-600 text-white"
                        : hasEnough
                        ? "bg-[#1C2321] hover:bg-[#3C6E71] text-white cursor-pointer active:scale-98"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isRedeemed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>¡CANJEADO CON ÉXITO!</span>
                      </>
                    ) : hasEnough ? (
                      <>
                        <span>CANJEAR PREMIO</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <span>TE FALTAN {(reward.pointsCost - vipPoints).toLocaleString()} PTS</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer Tip */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-sans shrink-0">
          <span>💡 Acumulás 10% en puntos con cada compra en el e-commerce.</span>
          <button
            onClick={() => setIsRewardsOpen(false)}
            className="text-[#3C6E71] font-bold hover:underline cursor-pointer"
          >
            Continuar Explorando
          </button>
        </div>
      </div>
    </div>
  );
}
