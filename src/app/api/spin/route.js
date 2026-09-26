import { NextResponse } from "next/server";

export const PRIZE_SEGMENTS = [
  {
    id: "wheel25",
    label: "25% OFF",
    sublabel: "Toda la tienda",
    coupon: "WHEEL25",
    type: "coupon",
    points: 0,
    icon: "🏷️",
    color: "#B85C38", // Holux Rust
    textColor: "#FFFFFF",
    description: "¡Descuento colosal del 25% en todo tu carrito!",
  },
  {
    id: "freeship",
    label: "Envío Gratis",
    sublabel: "Sin mínimo",
    coupon: "FREESHIP",
    type: "coupon",
    points: 0,
    icon: "🚚",
    color: "#1C2321", // Holux Noir
    textColor: "#F8F6F2",
    description: "¡Envío bonificado a cualquier punto del país!",
  },
  {
    id: "points500",
    label: "500 Pts VIP",
    sublabel: "Club Holux",
    coupon: null,
    type: "points",
    points: 500,
    icon: "💎",
    color: "#D4AF37", // Holux Gold
    textColor: "#141817",
    description: "¡Se han sumado 500 Puntos VIP a tu monedero Holux!",
  },
  {
    id: "lucky15",
    label: "15% OFF",
    sublabel: "Inmediato",
    coupon: "LUCKY15",
    type: "coupon",
    points: 0,
    icon: "🏷️",
    color: "#3C6E71", // Holux Teal
    textColor: "#FFFFFF",
    description: "¡15% de descuento instantáneo en tu orden!",
  },
  {
    id: "giftniche",
    label: "Muestra Nicho",
    sublabel: "Vial 2ml Gratis",
    coupon: "GIFTNICHE",
    type: "gift",
    points: 0,
    icon: "🎁",
    color: "#284B4D", // Holux Deep Teal
    textColor: "#ECD88C",
    description: "¡Muestra de alta gama de 2ml incluida de regalo en tu compra!",
  },
  {
    id: "tryagain",
    label: "50 Pts Bono",
    sublabel: "Cortesía VIP",
    coupon: null,
    type: "points",
    points: 50,
    icon: "💫",
    color: "#2A3632", // Holux Charcoal
    textColor: "#ECD88C",
    description: "¡Sigue participando! Te regalamos 50 Puntos de cortesía.",
  },
];

export async function POST() {
  try {
    // Weighted selection or fair randomized wheel index (0 to 5)
    // All prizes are genuine and rewarding
    const selectedIndex = Math.floor(Math.random() * PRIZE_SEGMENTS.length);
    const prize = PRIZE_SEGMENTS[selectedIndex];

    return NextResponse.json({
      success: true,
      segmentIndex: selectedIndex,
      prize,
      timestamp: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error al girar la ruleta" },
      { status: 500 }
    );
  }
}
