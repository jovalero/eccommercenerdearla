import { NextResponse } from "next/server";

// Valid coupon definitions for HOLUX
const VALID_COUPONS = {
  WHEEL25: {
    code: "WHEEL25",
    type: "percentage",
    value: 25,
    description: "25% OFF en toda la tienda (Premio Ruleta)",
    minPurchase: 0,
  },
  FREESHIP: {
    code: "FREESHIP",
    type: "freeship",
    value: 0,
    description: "Envío Bonificado a todo el país",
    minPurchase: 0,
  },
  LUCKY15: {
    code: "LUCKY15",
    type: "percentage",
    value: 15,
    description: "15% OFF en tu compra (Premio Ruleta)",
    minPurchase: 0,
  },
  GIFTNICHE: {
    code: "GIFTNICHE",
    type: "gift",
    value: 0,
    description: "Muestra Vial de Nicho 2ml de Obsequio",
    minPurchase: 0,
  },
  NERDEARLA20: {
    code: "NERDEARLA20",
    type: "percentage",
    value: 20,
    description: "20% OFF Exclusivo Comunidad Nerdearla",
    minPurchase: 0,
  },
  BIENVENIDA10: {
    code: "BIENVENIDA10",
    type: "percentage",
    value: 10,
    description: "10% OFF en tu primera orden",
    minPurchase: 0,
  },
};

export async function POST(request) {
  try {
    const { code, subtotal } = await request.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { valid: false, message: "Código de cupón requerido" },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase();
    const coupon = VALID_COUPONS[cleanCode];

    if (!coupon) {
      return NextResponse.json(
        { valid: false, message: "Cupón inválido o expirado" },
        { status: 404 }
      );
    }

    let discountAmount = 0;
    let isFreeShipping = false;

    if (coupon.type === "percentage") {
      discountAmount = Math.round(((subtotal || 0) * coupon.value) / 100);
    } else if (coupon.type === "fixed") {
      discountAmount = Math.min(coupon.value, subtotal || 0);
    } else if (coupon.type === "freeship") {
      isFreeShipping = true;
    }

    return NextResponse.json({
      valid: true,
      coupon: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        description: coupon.description,
        discountAmount,
        isFreeShipping,
      },
      message: `¡Cupón ${coupon.code} aplicado con éxito!`,
    });
  } catch (error) {
    return NextResponse.json(
      { valid: false, message: "Error al procesar el cupón" },
      { status: 500 }
    );
  }
}
