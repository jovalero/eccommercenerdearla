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

      // Calculate target angle:
      // Pointer is at the top (270 deg or 0 deg depending on orientation).
      // Each segment covers [i * 60, (i + 1) * 60].
      // To bring segmentIndex to the top pointer:
      const segmentCenter = segmentIndex * segmentDegrees + segmentDegrees / 2;
      // We want needle at top (which corresponds to 360 - segmentCenter in clockwise rotation)
      const targetRotation = 360 * 6 + (360 - segmentCenter);

      // Accumulate with previous rotation
      const newAngle = rotationAngle + targetRotation;
      setRotationAngle(newAngle);

      // Consume 1 spin
      consumeSpin();

      // Wait for spin animation duration (5.5 seconds)
      setTimeout(() => {
        setSpinning(false);
        setWonPrize(prize);

        // Confetti explosion
        triggerCelebration();

        // Process prize
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
    // Luxury gold & emerald confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#3C6E71", "#ECD88C", "#B85C38", "#FFFFFF"],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#D4AF37", "#ECD88C", "#3C6E71"],
      });
      confetti({
        particleCount: 50,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-holux-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-holux-card border border-holux-gold/40 rounded-3xl p-6 sm:p-8 shadow-modal text-center my-auto overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-holux-gold/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => !spinning && setIsWheelOpen(false)}
          disabled={spinning}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-holux-dark/70 hover:bg-holux-dark text-holux-muted hover:text-white border border-holux-border transition-colors disabled:opacity-30"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-holux-cardHover border border-holux-gold/30 text-xs font-semibold uppercase tracking-widest text-holux-gold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ruleta de la Fortuna Holux</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif text-holux-light font-medium">
          Girá y Ganá Premios Exclusivos
        </h2>
        <p className="text-xs text-holux-muted mt-1 max-w-sm mx-auto">
          Obtén hasta un 25% de descuento, envíos sin cargo o muestras de alta perfumería para tu próximo pedido.
        </p>

        {/* Wheel Canvas / SVG Container */}
        <div className="relative my-8 flex items-center justify-center">
          {/* Top Indicator Needle */}
          <div className="absolute -top-3 z-30 flex flex-col items-center pointer-events-none">
            <div className="w-5 h-7 bg-gradient-to-b from-holux-goldLight via-holux-gold to-holux-goldDark shadow-gold-glow clip-triangle transform rotate-180"></div>
            <div className="w-3 h-3 rounded-full bg-holux-gold border-2 border-holux-dark -mt-1 shadow-md"></div>
          </div>

          {/* Golden Outer Bezel */}
          <div className="p-3 rounded-full bg-gradient-to-tr from-holux-goldDark via-holux-goldLight to-holux-gold shadow-gold-glow/40 border border-holux-gold/50">
            {/* Inner Wheel Disk */}
            <div
              ref={wheelRef}
              style={{
                transform: `rotate(${rotationAngle}deg)`,
                transition: spinning ? "transform 5.5s cubic-bezier(0.12, 0.98, 0.28, 1)" : "none",
              }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-inner border-2 border-holux-black/40"
            >
              {/* Render SVG Wheel Segments */}
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
                        stroke="#141817"
                        strokeWidth="0.8"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Segment Labels Overlay */}
              {PRIZE_SEGMENTS.map((segment, index) => {
                const angle = index * 60 + 30; // Midpoint
                return (
                  <div
                    key={segment.id}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{
                      transform: `rotate(${angle}deg)`,
                    }}
                  >
                    <div
                      className="text-center font-sans tracking-tight -translate-y-20 sm:-translate-y-24"
                      style={{ color: segment.textColor }}
                    >
                      <div className="text-base sm:text-lg leading-none mb-0.5">{segment.icon}</div>
                      <div className="text-[11px] sm:text-xs font-bold leading-tight drop-shadow-sm uppercase">
                        {segment.label}
                      </div>
                      <div className="text-[9px] sm:text-[10px] opacity-80 leading-none">
                        {segment.sublabel}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Center Wheel Hub */}
              <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-gradient-to-tr from-holux-dark via-holux-card to-holux-dark border-2 border-holux-gold shadow-md flex items-center justify-center pointer-events-none">
                <span className="text-holux-gold font-serif font-bold text-sm">HOLUX</span>
              </div>
            </div>
          </div>
        </div>

        {/* Won Prize Celebration Card */}
        {wonPrize ? (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-holux-cardHover to-holux-dark border border-holux-gold/60 shadow-gold-glow/20 animate-in zoom-in-95 duration-300">
            <div className="text-2xl mb-1">{wonPrize.icon}</div>
            <h3 className="text-lg sm:text-xl font-serif text-holux-gold font-semibold">
              ¡Felicitaciones! Has ganado: {wonPrize.label}
            </h3>
            <p className="text-xs text-holux-cream mt-1">{wonPrize.description}</p>

            {wonPrize.coupon && (
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-holux-black border border-holux-gold/40 text-sm font-mono font-bold text-holux-gold tracking-wider">
                  {wonPrize.coupon}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-lg bg-holux-cardHover hover:bg-holux-card text-holux-light border border-holux-border hover:border-holux-gold"
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
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-holux-goldDark to-holux-gold text-holux-black font-semibold text-xs uppercase tracking-wider shadow-sm hover:opacity-95"
                >
                  Aplicar al Carrito Ahora
                </button>
              )}
              <button
                onClick={() => setIsWheelOpen(false)}
                className="py-2.5 px-4 rounded-xl bg-holux-cardHover text-holux-cream border border-holux-border hover:border-holux-gold text-xs font-medium"
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
              className="w-full sm:w-64 py-3.5 px-6 rounded-full bg-gradient-to-r from-holux-goldDark via-holux-gold to-holux-goldDark text-holux-black font-semibold text-sm tracking-wider uppercase shadow-gold-glow hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{spinning ? "Girando Ruleta..." : "¡Girar Ruleta!"}</span>
            </button>

            <span className="text-xs text-holux-muted">
              {spinsLeft > 0 ? (
                <>Te quedan <strong className="text-holux-gold">{spinsLeft} giros</strong> disponibles hoy</>
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
