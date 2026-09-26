"use client";

import React, { useState, useRef } from "react";
import confetti from "canvas-confetti";
import { useShop } from "../context/ShopContext";
import { PRIZE_SEGMENTS } from "../app/api/spin/route";
import { X, Sparkles, Award, ArrowRight, Copy, Check } from "lucide-react";

export default function LuckyWheelModal() {
  const {
    isWheelOpen,
    setIsWheelOpen,
    spinsLeft,
    consumeSpin,
    addVipPoints,
    unlockCoupon,
    applyCoupon,
    setIsCartOpen,
    showToast,
  } = useShop();

  const [spinning, setSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);
  const [copied, setCopied] = useState(false);

  const wheelRef = useRef(null);

  if (!isWheelOpen) return null;

  const segmentDegrees = 360 / PRIZE_SEGMENTS.length; // 60 deg each

  const handleSpin = async () => {
    if (spinning || spinsLeft <= 0) return;

    setSpinning(true);
    setWonPrize(null);

    try {
      const res = await fetch("/api/spin", { method: "POST" });
      const data = await res.json();

      if (!data.success) {
        showToast("Error al girar la ruleta", "error");
        setSpinning(false);
        return;
      }

      const { segmentIndex, prize } = data;

      const segmentCenter = segmentIndex * segmentDegrees + segmentDegrees / 2;
      const targetRotation = 360 * 6 + (360 - segmentCenter);

      const newAngle = rotationAngle + targetRotation;
      setRotationAngle(newAngle);

      consumeSpin();

      setTimeout(() => {
        setSpinning(false);
        setWonPrize(prize);

        triggerCelebration();

        if (prize.type === "points") {
          addVipPoints(prize.points);
        } else if (prize.coupon) {
          unlockCoupon({
            code: prize.coupon,
            description: prize.description,
            type: prize.type,
            source: "Ruleta de la Fortuna",
          });
        }
      }, 5500);
    } catch (e) {
      setSpinning(false);
      showToast("Hubo un problema de conexión", "error");
    }
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#3C6E71", "#ECD88C", "#B85C38", "#FFFFFF"],
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#D4AF37", "#ECD88C", "#3C6E71"],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#D4AF37", "#ECD88C", "#B85C38"],
      });
    }, 400);
  };

  const handleApplyNow = async () => {
    if (wonPrize?.coupon) {
      await applyCoupon(wonPrize.coupon);
      setIsWheelOpen(false);
      setIsCartOpen(true);
    }
  };

  const handleCopyCode = () => {
    if (wonPrize?.coupon) {
      navigator.clipboard.writeText(wonPrize.coupon);
      setCopied(true);
      showToast(`Código ${wonPrize.coupon} copiado al portapapeles`);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#1C2321] text-white border border-[#3C6E71]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center my-auto overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#3C6E71]/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => !spinning && setIsWheelOpen(false)}
          disabled={spinning}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border border-white/10 transition-colors disabled:opacity-30 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#D4AF37]/40 text-xs font-display font-bold uppercase tracking-widest text-[#ECD88C] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Ruleta de la Fortuna Holux</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
          Girá y Ganá Premios Exclusivos
        </h2>
        <p className="text-xs text-gray-300 font-sans mt-1 max-w-sm mx-auto">
          Obtén hasta un 25% de descuento, envíos bonificados o muestras de alta perfumería para tu próximo pedido.
        </p>

        {/* Wheel SVG Disk Container */}
        <div className="relative my-7 flex items-center justify-center">
          {/* Top Indicator Needle */}
          <div className="absolute -top-3 z-30 flex flex-col items-center pointer-events-none">
            <div className="w-5 h-7 bg-gradient-to-b from-[#ECD88C] via-[#D4AF37] to-[#A6841E] shadow-lg clip-triangle transform rotate-180"></div>
            <div className="w-3 h-3 rounded-full bg-[#D4AF37] border-2 border-[#1C2321] -mt-1 shadow-md"></div>
          </div>

          {/* Golden Outer Bezel */}
          <div className="p-3 rounded-full bg-gradient-to-tr from-[#A6841E] via-[#ECD88C] to-[#D4AF37] shadow-xl border border-[#D4AF37]/50">
            {/* Inner Wheel Disk */}
            <div
              ref={wheelRef}
              style={{
                transform: `rotate(${rotationAngle}deg)`,
                transition: spinning ? "transform 5.5s cubic-bezier(0.12, 0.98, 0.28, 1)" : "none",
              }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-inner border-2 border-black/50"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {PRIZE_SEGMENTS.map((segment, index) => {
                  const startAngle = index * 60;
                  const endAngle = (index + 1) * 60;
                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = (endAngle * Math.PI) / 180;

                  const x1 = 50 + 50 * Math.cos(startRad);
                  const y1 = 50 + 50 * Math.sin(startRad);
                  const x2 = 50 + 50 * Math.cos(endRad);
                  const y2 = 50 + 50 * Math.sin(endRad);

                  const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                  return (
                    <g key={segment.id}>
                      <path
                        d={pathData}
                        fill={segment.color}
                        stroke="#1C2321"
                        strokeWidth="0.8"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Segment Labels Overlay */}
              {PRIZE_SEGMENTS.map((segment, index) => {
                const angle = index * 60 + 30;
                return (
                  <div
                    key={segment.id}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div
                      className="text-center font-sans tracking-tight -translate-y-20 sm:-translate-y-24"
                      style={{ color: segment.textColor }}
                    >
                      <div className="text-base sm:text-lg leading-none mb-0.5">{segment.icon}</div>
                      <div className="text-[11px] sm:text-xs font-display font-black leading-tight drop-shadow-sm uppercase">
                        {segment.label}
                      </div>
                      <div className="text-[9px] sm:text-[10px] opacity-80 leading-none">
                        {segment.sublabel}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Center Wheel Hub with clean Holux emblem */}
              <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#1C2321] border-2 border-[#D4AF37] shadow-md flex items-center justify-center pointer-events-none p-2">
                <img src="/holuxlogo.png" alt="HOLUX" className="h-6 w-auto object-contain brightness-0 invert" />
              </div>
            </div>
          </div>
        </div>

        {/* Won Prize Card */}
        {wonPrize ? (
          <div className="p-4 sm:p-5 rounded-2xl bg-white/10 border border-[#D4AF37]/70 shadow-lg animate-in zoom-in-95 duration-300">
            <div className="text-2xl mb-1">{wonPrize.icon}</div>
            <h3 className="text-lg sm:text-xl font-display font-black text-[#ECD88C] uppercase tracking-wide">
              ¡Felicitaciones! Has ganado: {wonPrize.label}
            </h3>
            <p className="text-xs text-gray-200 font-sans mt-1">{wonPrize.description}</p>

            {wonPrize.coupon && (
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-black border border-[#D4AF37]/50 text-sm font-mono font-bold text-[#ECD88C] tracking-wider">
                  {wonPrize.coupon}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
                  title="Copiar código"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}

            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              {wonPrize.coupon && (
                <button
                  onClick={handleApplyNow}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#3C6E71] hover:bg-[#284B4D] text-white font-display font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                >
                  Aplicar al Carrito Ahora
                </button>
              )}
              <button
                onClick={() => setIsWheelOpen(false)}
                className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 text-xs font-sans font-medium transition-all"
              >
                Cerrar y Seguir Comprando
              </button>
            </div>
          </div>
        ) : (
          /* Spin Action Button */
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={handleSpin}
              disabled={spinning || spinsLeft <= 0}
              className="w-full sm:w-64 py-3.5 px-6 rounded-full bg-[#B85C38] hover:bg-[#a04e2e] text-white font-display font-bold text-sm tracking-wider uppercase shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>{spinning ? "Girando Ruleta..." : "¡GIRAR RULETA!"}</span>
            </button>

            <span className="text-xs text-gray-400 font-sans">
              {spinsLeft > 0 ? (
                <>Te quedan <strong className="text-[#ECD88C] font-mono">{spinsLeft} giros</strong> disponibles hoy</>
              ) : (
                <>Has agotado tus giros por hoy. Vuelve mañana para más premios.</>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
