"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useShop } from "../context/ShopContext";
import { formatPriceARS } from "../utils/formatters";
import { X, CheckCircle2, ShieldCheck, CreditCard, Truck, Sparkles, ArrowRight } from "lucide-react";

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    subtotal,
    discountAmount,
    shippingCost,
    total,
    appliedCoupon,
    addVipPoints,
    showToast,
  } = useShop();

  // Form fields
  const [formData, setFormData] = useState({
    fullName: "Nicolás Valero",
    email: "valero.fragrances@holux.com",
    phone: "+54 9 11 5829-4412",
    address: "Av. Alvear 1890, Piso 4",
    city: "Buenos Aires",
    zipCode: "C1014",
    paymentMethod: "credit-card",
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [pointsEarned, setPointsEarned] = useState(0);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.address) {
      showToast("Por favor completa los campos requeridos", "error");
      return;
    }

    // Generate random order ID
    const generatedOrderNumber = `HLX-${Math.floor(10000 + Math.random() * 90000)}`;
    const earned = Math.round(total * 0.05); // 5% in points

    setOrderNumber(generatedOrderNumber);
    setPointsEarned(earned);
    setOrderConfirmed(true);

    // Add points
    addVipPoints(earned);

    // Confetti
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#D4AF37", "#3C6E71", "#FFFFFF"],
    });

    // Clear cart
    clearCart();
  };

  const handleFinish = () => {
    setOrderConfirmed(false);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-holux-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-holux-card border border-holux-gold/40 rounded-3xl p-6 sm:p-8 shadow-modal text-left my-auto">
        {/* Close Button */}
        {!orderConfirmed && (
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-holux-dark/70 hover:bg-holux-dark text-holux-muted hover:text-white border border-holux-border transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {orderConfirmed ? (
          /* Confirmation Success Screen */
          <div className="text-center py-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-holux-cardHover border border-holux-gold/40 text-[11px] font-semibold uppercase tracking-widest text-holux-gold mb-2">
              Orden Confirmada
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-holux-light font-medium">
              ¡Gracias por tu compra en HOLUX!
            </h2>
            <p className="text-sm text-holux-muted mt-2 max-w-md mx-auto">
              Hemos enviado los detalles y el código de seguimiento a{" "}
              <strong className="text-holux-cream">{formData.email}</strong>.
            </p>

            {/* Order Summary Receipt Box */}
            <div className="mt-6 p-5 rounded-2xl bg-holux-dark/70 border border-holux-border/60 max-w-md mx-auto text-left space-y-3">
              <div className="flex justify-between items-center text-xs pb-3 border-b border-holux-border/40">
                <span className="text-holux-muted">Número de Pedido:</span>
                <span className="font-mono font-bold text-holux-gold">{orderNumber}</span>
              </div>

              <div className="flex justify-between items-center text-xs pb-3 border-b border-holux-border/40">
                <span className="text-holux-muted">Destinatario:</span>
                <span className="font-medium text-holux-light">{formData.fullName}</span>
              </div>

              <div className="flex justify-between items-center text-xs pb-3 border-b border-holux-border/40">
                <span className="text-holux-muted">Dirección de Entrega:</span>
                <span className="font-medium text-holux-light">{formData.address}, {formData.city}</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-holux-muted">Recompensa VIP acreditada:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-holux-gold" />
                  +{pointsEarned.toLocaleString()} Puntos VIP
                </span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="mt-8 px-8 py-3.5 rounded-full bg-gradient-to-r from-holux-goldDark via-holux-gold to-holux-goldDark text-holux-black font-semibold text-xs uppercase tracking-widest shadow-gold-glow hover:opacity-95"
            >
              Volver a la Boutique
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-5 h-5 text-holux-gold" />
              <h2 className="text-xl sm:text-2xl font-serif text-holux-light font-medium">
                Finalizar Pedido Exclusivo
              </h2>
            </div>

            <form onSubmit={handleSimulatePayment} className="space-y-6">
              {/* Shipping Information */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-holux-gold mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>1. Datos de Entrega</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-holux-muted mb-1 text-[11px]">Nombre y Apellido</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-holux-dark/70 border border-holux-border rounded-xl px-3 py-2 text-holux-light focus:outline-none focus:border-holux-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-holux-muted mb-1 text-[11px]">Correo Electrónico</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-holux-dark/70 border border-holux-border rounded-xl px-3 py-2 text-holux-light focus:outline-none focus:border-holux-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-holux-muted mb-1 text-[11px]">Dirección y Número</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-holux-dark/70 border border-holux-border rounded-xl px-3 py-2 text-holux-light focus:outline-none focus:border-holux-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-holux-muted mb-1 text-[11px]">Ciudad / Localidad</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-holux-dark/70 border border-holux-border rounded-xl px-3 py-2 text-holux-light focus:outline-none focus:border-holux-gold"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-holux-gold mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>2. Método de Pago</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <label
                    className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                      formData.paymentMethod === "credit-card"
                        ? "border-holux-gold bg-holux-cardHover"
                        : "border-holux-border bg-holux-dark/40 text-holux-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === "credit-card"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="font-semibold text-holux-light">6 Cuotas Sin Interés</span>
                    <span className="text-[10px] text-holux-teal mt-1">Visa / Master / Amex</span>
                  </label>

                  <label
                    className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                      formData.paymentMethod === "mercadopago"
                        ? "border-holux-gold bg-holux-cardHover"
                        : "border-holux-border bg-holux-dark/40 text-holux-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mercadopago"
                      checked={formData.paymentMethod === "mercadopago"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="font-semibold text-holux-light">Mercado Pago</span>
                    <span className="text-[10px] text-holux-muted mt-1">Dinero en cuenta o QR</span>
                  </label>

                  <label
                    className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                      formData.paymentMethod === "transfer"
                        ? "border-holux-gold bg-holux-cardHover"
                        : "border-holux-border bg-holux-dark/40 text-holux-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={formData.paymentMethod === "transfer"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <span className="font-semibold text-holux-light">Transferencia</span>
                    <span className="text-[10px] text-emerald-400 mt-1">Acreditación instantánea</span>
                  </label>
                </div>
              </div>

              {/* Order Summary Breakdown */}
              <div className="p-4 rounded-2xl bg-holux-dark/60 border border-holux-border/60 space-y-2 text-xs">
                <div className="flex justify-between text-holux-muted">
                  <span>Productos ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                  <span className="text-holux-light">{formatPriceARS(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Descuento aplicado ({appliedCoupon?.code})</span>
                    <span>-{formatPriceARS(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-holux-muted">
                  <span>Envío</span>
                  <span className="text-holux-light">
                    {shippingCost === 0 ? "Bonificado $0" : formatPriceARS(shippingCost)}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-holux-border/50 text-sm">
                  <span className="font-serif font-bold text-holux-light">Total a Pagar</span>
                  <span className="font-bold text-holux-gold text-lg">{formatPriceARS(total)}</span>
                </div>

                <div className="pt-2 text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-holux-gold" />
                  <span>Esta compra acreditará <strong>+{Math.round(total * 0.05).toLocaleString()} Puntos VIP</strong> a tu cuenta.</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-holux-goldDark via-holux-gold to-holux-goldDark text-holux-black font-semibold text-xs uppercase tracking-widest shadow-gold-glow hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Confirmar Orden &amp; Simular Pago</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
