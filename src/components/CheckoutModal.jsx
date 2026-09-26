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

  const [formData, setFormData] = useState({
    fullName: "Nicolás Valero",
    email: "valero.fragrances@holux.com",
    phone: "+54 9 11 5829-4412",
    address: "Av. Pellegrini 1840",
    city: "Rosario, Santa Fe",
    zipCode: "S2000",
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

    const generatedOrderNumber = `HLX-${Math.floor(10000 + Math.random() * 90000)}`;
    const earned = Math.round(total * 0.05);

    setOrderNumber(generatedOrderNumber);
    setPointsEarned(earned);
    setOrderConfirmed(true);

    addVipPoints(earned);

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.5 },
      colors: ["#3C6E71", "#B85C38", "#1C2321", "#D4AF37"],
    });

    clearCart();
  };

  const handleFinish = () => {
    setOrderConfirmed(false);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl text-left my-auto text-[#1C2321]">
        {/* Close Button */}
        {!orderConfirmed && (
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {orderConfirmed ? (
          /* Confirmation Success Screen */
          <div className="text-center py-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-[11px] font-display font-bold uppercase tracking-wider text-[#3C6E71] mb-2">
              Orden Confirmada
            </span>

            <h2 className="text-2xl sm:text-3xl font-display font-black text-gray-900 uppercase">
              ¡Gracias por tu compra en HOLUX!
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-md mx-auto font-sans">
              Hemos enviado los detalles y el código de seguimiento a{" "}
              <strong className="text-black font-semibold">{formData.email}</strong>.
            </p>

            <div className="mt-6 p-5 rounded-xl bg-[#F8F7F5] border border-gray-200 max-w-md mx-auto text-left space-y-3 font-sans">
              <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-200">
                <span className="text-gray-500">Número de Pedido:</span>
                <span className="font-mono font-bold text-black">{orderNumber}</span>
              </div>

              <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-200">
                <span className="text-gray-500">Destinatario:</span>
                <span className="font-bold text-gray-900">{formData.fullName}</span>
              </div>

              <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-200">
                <span className="text-gray-500">Dirección de Entrega:</span>
                <span className="font-bold text-gray-900">{formData.address}, {formData.city}</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Recompensa VIP acreditada:</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  +{pointsEarned.toLocaleString()} Puntos VIP
                </span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="mt-8 px-8 py-3.5 rounded-xl bg-[#1C2321] hover:bg-neutral-800 text-white font-display text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              Volver a la Tienda
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <ShieldCheck className="w-5 h-5 text-[#3C6E71]" />
              <h2 className="text-xl sm:text-2xl font-display font-black text-gray-950 uppercase tracking-tight">
                Finalizar Compra Segura
              </h2>
            </div>

            <form onSubmit={handleSimulatePayment} className="space-y-6">
              {/* Shipping Information */}
              <div>
                <h4 className="text-xs font-display font-bold uppercase tracking-wider text-[#3C6E71] mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>1. Datos de Entrega</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                  <div>
                    <label className="block text-gray-600 mb-1 text-[11px] font-medium">Nombre y Apellido</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#F8F7F5] border border-gray-200 rounded-lg px-3 py-2 text-black focus:outline-none focus:border-[#3C6E71]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1 text-[11px] font-medium">Correo Electrónico</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#F8F7F5] border border-gray-200 rounded-lg px-3 py-2 text-black focus:outline-none focus:border-[#3C6E71]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1 text-[11px] font-medium">Dirección y Número</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#F8F7F5] border border-gray-200 rounded-lg px-3 py-2 text-black focus:outline-none focus:border-[#3C6E71]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1 text-[11px] font-medium">Ciudad / Localidad</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#F8F7F5] border border-gray-200 rounded-lg px-3 py-2 text-black focus:outline-none focus:border-[#3C6E71]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h4 className="text-xs font-display font-bold uppercase tracking-wider text-[#3C6E71] mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>2. Método de Pago</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-sans">
                  <label
                    className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                      formData.paymentMethod === "credit-card"
                        ? "border-[#1C2321] bg-gray-50 shadow-2xs"
                        : "border-gray-200 bg-white text-gray-500"
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
                    <span className="font-bold text-gray-900">6 Cuotas Sin Interés</span>
                    <span className="text-[10px] text-[#3C6E71] mt-1 font-semibold">Visa / Master / Amex</span>
                  </label>

                  <label
                    className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                      formData.paymentMethod === "mercadopago"
                        ? "border-[#1C2321] bg-gray-50 shadow-2xs"
                        : "border-gray-200 bg-white text-gray-500"
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
                    <span className="font-bold text-gray-900">Mercado Pago</span>
                    <span className="text-[10px] text-gray-500 mt-1">Dinero o QR</span>
                  </label>

                  <label
                    className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                      formData.paymentMethod === "transfer"
                        ? "border-[#1C2321] bg-gray-50 shadow-2xs"
                        : "border-gray-200 bg-white text-gray-500"
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
                    <span className="font-bold text-gray-900">Transferencia</span>
                    <span className="text-[10px] text-emerald-600 font-semibold mt-1">Acreditación inmediata</span>
                  </label>
                </div>
              </div>

              {/* Order Summary Breakdown */}
              <div className="p-4 rounded-xl bg-[#F8F7F5] border border-gray-200 space-y-2 text-xs font-sans">
                <div className="flex justify-between text-gray-600">
                  <span>Productos ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                  <span className="font-bold font-mono text-gray-900">{formatPriceARS(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Descuento aplicado ({appliedCoupon?.code})</span>
                    <span className="font-bold font-mono">-{formatPriceARS(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="font-bold font-mono text-gray-900">
                    {shippingCost === 0 ? "Bonificado $0" : formatPriceARS(shippingCost)}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-gray-200 text-sm">
                  <span className="font-bold text-gray-900">Total Final</span>
                  <span className="font-black font-mono text-lg text-black">{formatPriceARS(total)}</span>
                </div>

                <div className="pt-2 text-[11px] text-[#3C6E71] flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Esta compra acreditará <strong>+{Math.round(total * 0.05).toLocaleString()} Puntos VIP</strong> a tu cuenta.</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white font-display text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>CONFIRMAR Y SIMULAR PAGO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
