"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useShop } from "../context/ShopContext";
import { formatPriceARS } from "../utils/formatters";
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Truck, 
  Sparkles, 
  Upload, 
  Copy, 
  Check, 
  FileText, 
  ImageIcon 
} from "lucide-react";

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
    createOrder,
    showToast,
  } = useShop();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const [bankReference, setBankReference] = useState("");
  const [receiptImage, setReceiptImage] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState("");
  const [pointsEarned, setPointsEarned] = useState(0);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast(`${fieldName} copiado al portapapeles`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleReceiptUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Por favor subí una imagen válida (JPG, PNG, WebP)", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setReceiptImage(event.target.result);
      showToast("Comprobante adjuntado correctamente", "success");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.address) {
      showToast("Por favor completa los datos obligatorios de entrega", "error");
      return;
    }

    if (!receiptImage) {
      showToast("Por favor adjunta la foto o captura del comprobante de transferencia", "error");
      return;
    }

    const generatedId = `HLX-${Math.floor(10000 + Math.random() * 90000)}`;
    const earned = Math.round(total * 0.05);

    // Create order for Admin panel
    createOrder({
      id: generatedId,
      customer: formData,
      items: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        brand: item.product.brand,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
        isGift: !!item.product.isGift,
      })),
      subtotal,
      discountAmount,
      shippingCost,
      total,
      paymentMethod: "Transferencia Bancaria",
      receiptImage: receiptImage,
      bankReference: bankReference || "Sin referencia informada",
      status: "Pendiente",
    });

    setCreatedOrderNumber(generatedId);
    setPointsEarned(earned);
    setOrderConfirmed(true);

    addVipPoints(earned);

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.5 },
        colors: ["#3C6E71", "#B85C38", "#1C2321", "#D4AF37"],
      });
    } catch (err) {}

    clearCart();
  };

  const handleFinish = () => {
    setOrderConfirmed(false);
    setReceiptImage(null);
    setBankReference("");
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl text-left my-auto text-[#1C2321] max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        {!orderConfirmed && (
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-black transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {orderConfirmed ? (
          /* Confirmation Success Screen */
          <div className="text-center py-6 animate-in zoom-in-95 duration-300 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#3C6E71]/10 text-xs font-sans font-bold uppercase tracking-wider text-[#3C6E71] mb-1">
                COMPROBANTE RECIBIDO
              </span>
              <h3 className="text-2xl font-display font-black text-gray-900 uppercase tracking-tight">
                ¡PEDIDO REGISTRADO CON ÉXITO!
              </h3>
              <p className="text-xs text-gray-600 font-sans max-w-md mx-auto mt-1 leading-relaxed">
                Tu comprobante de transferencia fue enviado a nuestro equipo de administración para su verificación. Te llegará la confirmación a tu correo.
              </p>
            </div>

            {/* Order Card Summary */}
            <div className="bg-[#F8F7F5] border border-gray-200 rounded-2xl p-4 sm:p-5 text-left max-w-md mx-auto space-y-2.5">
              <div className="flex justify-between items-center text-xs font-sans border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Número de Pedido:</span>
                <span className="font-mono font-bold text-gray-900 text-sm">{createdOrderNumber}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-sans border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Titular:</span>
                <span className="font-bold text-gray-900">{formData.fullName}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-sans border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Estado del Pago:</span>
                <span className="font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-[10px]">
                  En Verificación por el Admin
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-sans pt-1">
                <span className="text-gray-500 font-medium">Puntos VIP Ganados:</span>
                <span className="font-mono font-bold text-[#3C6E71]">+{pointsEarned.toLocaleString()} pts</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleFinish}
                className="w-full max-w-md py-3.5 px-6 rounded-xl bg-[#1C2321] hover:bg-[#3C6E71] text-white font-sans text-xs font-bold tracking-wider uppercase transition-colors shadow-xs cursor-pointer"
              >
                Volver a la Tienda
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            {/* Modal Header */}
            <div className="border-b border-gray-100 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#F2EFE9] text-[#3C6E71]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-black text-gray-900 uppercase tracking-wide">
                    FINALIZAR COMPRA • TRANSFERENCIA
                  </h3>
                  <p className="text-xs text-gray-500 font-sans mt-0.5">
                    15% OFF abonando por transferencia bancaria directa.
                  </p>
                </div>
              </div>
            </div>

            {/* Cart Quick Summary */}
            <div className="bg-[#F8F7F5] border border-gray-200/80 rounded-2xl p-4 mb-5 space-y-2">
              <div className="flex justify-between text-xs font-sans text-gray-600">
                <span>Subtotal ({cart.length} productos):</span>
                <span>{formatPriceARS(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-xs font-sans text-emerald-700 font-medium">
                  <span>Descuento Aplicado:</span>
                  <span>-{formatPriceARS(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs font-sans text-gray-600">
                <span>Envío a Domicilio:</span>
                <span className={shippingCost === 0 ? "text-emerald-700 font-bold" : ""}>
                  {shippingCost === 0 ? "GRATIS" : formatPriceARS(shippingCost)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between items-baseline text-sm font-bold text-gray-900">
                <span>Total a Transferir:</span>
                <span className="text-xl font-black font-mono text-gray-950">
                  {formatPriceARS(total)}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* 1. Shipping Information */}
              <div>
                <h4 className="text-xs font-display font-bold uppercase tracking-wider text-[#3C6E71] mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>1. Datos de Entrega</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                  <div>
                    <label className="block text-gray-700 mb-1 text-[11px] font-bold">Nombre Completo *</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Ej. Juan Pérez"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#F8F7F5] border border-gray-300 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:border-[#3C6E71] font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-[11px] font-bold">Email de Contacto *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="juan@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#F8F7F5] border border-gray-300 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:border-[#3C6E71] font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-[11px] font-bold">Teléfono / WhatsApp *</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+54 9 11 ..."
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#F8F7F5] border border-gray-300 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:border-[#3C6E71] font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-[11px] font-bold">Ciudad y Código Postal *</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Rosario, CP 2000"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#F8F7F5] border border-gray-300 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:border-[#3C6E71] font-sans"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-gray-700 mb-1 text-[11px] font-bold">Dirección y Altura (Calle, Depto) *</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Av. Pellegrini 1450, Piso 4"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#F8F7F5] border border-gray-300 rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:border-[#3C6E71] font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Official Bank Details Box */}
              <div>
                <h4 className="text-xs font-display font-bold uppercase tracking-wider text-[#3C6E71] mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>2. Datos de Cuenta Bancaria Oficial</span>
                </h4>

                <div className="bg-[#1C2321] text-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
                  <div className="flex justify-between items-start border-b border-white/10 pb-2.5">
                    <div>
                      <span className="text-[10px] text-gray-400 font-sans uppercase">Entidad Bancaria</span>
                      <div className="text-sm font-bold font-sans">Banco Santander Río / Galicia</div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                      Cuenta Oficial Holux
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                    <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block">Alias de Transferencia:</span>
                        <span className="font-mono font-bold text-amber-300 text-xs">HOLUX.PERFUMES.VIP</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy("HOLUX.PERFUMES.VIP", "Alias")}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                        title="Copiar Alias"
                      >
                        {copiedField === "Alias" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block">CBU:</span>
                        <span className="font-mono font-bold text-gray-200 text-[11px]">0720000788000036291410</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy("0720000788000036291410", "CBU")}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                        title="Copiar CBU"
                      >
                        {copiedField === "CBU" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="text-[11px] text-gray-400 font-sans pt-1">
                    Titular: <span className="text-white font-medium">HOLUX Haute Parfumerie S.A.</span> • CUIT: <span className="text-white font-medium">30-71829401-8</span>
                  </div>
                </div>
              </div>

              {/* 3. Upload Receipt */}
              <div>
                <h4 className="text-xs font-display font-bold uppercase tracking-wider text-[#3C6E71] mb-2 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>3. Adjuntar Comprobante de Transferencia *</span>
                </h4>

                <div className="space-y-3">
                  {receiptImage ? (
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={receiptImage}
                          alt="Comprobante cargado"
                          className="w-14 h-14 object-cover rounded-xl border border-emerald-300 shadow-2xs"
                        />
                        <div>
                          <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Comprobante cargado listo</span>
                          </div>
                          <p className="text-[11px] text-emerald-700 mt-0.5 font-sans">
                            La imagen será enviada al panel de administración para su aprobación.
                          </p>
                        </div>
                      </div>

                      <label className="text-xs text-emerald-800 font-bold underline cursor-pointer hover:text-black">
                        Cambiar foto
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleReceiptUpload}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-gray-300 hover:border-[#3C6E71] bg-[#F8F7F5] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                      <div className="p-3 rounded-full bg-white shadow-2xs group-hover:scale-105 transition-transform mb-2">
                        <ImageIcon className="w-6 h-6 text-[#3C6E71]" />
                      </div>
                      <span className="text-xs font-bold text-gray-800 font-sans">
                        Hacé clic para subir la captura o foto del comprobante
                      </span>
                      <span className="text-[10px] text-gray-500 font-sans mt-0.5">
                        Formatos soportados: JPG, PNG, WEBP (Hasta 10MB)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleReceiptUpload}
                        required
                        className="sr-only"
                      />
                    </label>
                  )}

                  {/* Optional reference */}
                  <div>
                    <label className="block text-gray-600 text-[11px] font-sans font-medium mb-1">
                      Nro. de Operación / Referencia (Opcional):
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Transf. 9812948 Santander"
                      value={bankReference}
                      onChange={(e) => setBankReference(e.target.value)}
                      className="w-full bg-[#F8F7F5] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#3C6E71] font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!receiptImage}
                  className={`w-full py-4 px-6 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md ${
                    receiptImage
                      ? "bg-[#1C2321] hover:bg-[#3C6E71] text-white cursor-pointer active:scale-98"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>Confirmar Pedido y Enviar Comprobante</span>
                </button>
                {!receiptImage && (
                  <p className="text-[10px] text-amber-700 text-center font-sans mt-1.5">
                    * Es necesario adjuntar la foto del comprobante para confirmar la orden.
                  </p>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
