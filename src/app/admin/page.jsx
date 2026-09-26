"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useShop } from "../../context/ShopContext";
import { formatPriceARS } from "../../utils/formatters";
import { 
  Building2, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  X, 
  ArrowLeft, 
  ShoppingBag, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Filter
} from "lucide-react";

export default function AdminPage() {
  const { orders, updateOrderStatus } = useShop();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const matchStatus =
      filterStatus === "Todos" ||
      order.status?.toLowerCase() === filterStatus.toLowerCase();

    const query = searchTerm.toLowerCase().trim();
    const matchQuery =
      !query ||
      order.id?.toLowerCase().includes(query) ||
      order.customer?.fullName?.toLowerCase().includes(query) ||
      order.customer?.email?.toLowerCase().includes(query) ||
      order.bankReference?.toLowerCase().includes(query);

    return matchStatus && matchQuery;
  });

  // Stats calculation
  const totalRevenue = orders
    .filter((o) => o.status === "Aprobado")
    .reduce((acc, o) => acc + (Number(o.total) || 0), 0);

  const pendingCount = orders.filter((o) => o.status === "Pendiente").length;
  const approvedCount = orders.filter((o) => o.status === "Aprobado").length;

  return (
    <div className="min-h-screen bg-[#F2EFE9] text-[#1C2321] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-[#1C2321] text-white border-b border-[#3C6E71]/30 py-4 px-4 sm:px-8 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Tienda</span>
            </Link>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <img
                src="/holuxlogo.png"
                alt="HOLUX"
                className="h-6 w-auto object-contain brightness-0 invert"
              />
              <span className="font-display font-black text-lg uppercase tracking-wider text-white">
                PANEL DE ADMINISTRACIÓN
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-mono font-bold border border-emerald-500/30">
              ● Sistema Operativo
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full flex-1 space-y-6">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase mb-1">
              <span>Total de Pedidos</span>
              <ShoppingBag className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-gray-900">
              {orders.length}
            </div>
            <div className="text-[11px] text-gray-500 mt-1 font-sans">
              {pendingCount} pendientes de revisión
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase mb-1">
              <span>Pagos por Verificar</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-600">
              {pendingCount}
            </div>
            <div className="text-[11px] text-gray-500 mt-1 font-sans">
              Comprobantes de transferencia adjuntados
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase mb-1">
              <span>Facturación Aprobada</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-700">
              {formatPriceARS(totalRevenue)}
            </div>
            <div className="text-[11px] text-gray-500 mt-1 font-sans">
              {approvedCount} pedidos confirmados
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {["Todos", "Pendiente", "Aprobado", "Rechazado"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  filterStatus.toLowerCase() === status.toLowerCase()
                    ? "bg-[#1C2321] text-white shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Buscar por cliente, pedido o ref..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F8F7F5] border border-gray-300 rounded-xl pl-8 pr-7 py-2 text-xs text-gray-900 outline-none focus:border-[#3C6E71] focus:bg-white transition-all font-sans"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-2 text-xs text-gray-400 hover:text-black"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Orders List / Cards */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-200/90 rounded-2xl p-5 sm:p-6 shadow-xs transition-all hover:border-gray-300 space-y-4"
              >
                {/* Order Header: ID, Date, Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-xl bg-gray-900 text-white font-mono font-bold text-xs">
                      {order.id}
                    </span>
                    <span className="text-xs text-gray-500 font-sans">
                      {new Date(order.date).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="text-xs text-gray-400 hidden sm:inline">•</span>
                    <span className="text-xs text-gray-600 font-medium hidden sm:inline">
                      {order.paymentMethod}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold font-sans ${
                        order.status === "Aprobado"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                          : order.status === "Rechazado"
                          ? "bg-rose-50 text-rose-700 border border-rose-300"
                          : "bg-amber-50 text-amber-700 border border-amber-300"
                      }`}
                    >
                      ● {order.status === "Pendiente" ? "Pendiente de Verificación" : order.status}
                    </span>
                  </div>
                </div>

                {/* Main Order Details: Customer & Items */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Customer Info */}
                  <div className="space-y-1.5 text-xs text-gray-600 font-sans">
                    <div className="font-bold text-gray-900 uppercase text-[11px] tracking-wide mb-1 text-[#3C6E71]">
                      Datos del Comprador
                    </div>
                    <div><span className="text-gray-400">Cliente:</span> <strong className="text-gray-900">{order.customer?.fullName}</strong></div>
                    <div><span className="text-gray-400">Email:</span> {order.customer?.email}</div>
                    <div><span className="text-gray-400">Teléfono:</span> <strong className="text-gray-900">{order.customer?.phone}</strong></div>
                    <div><span className="text-gray-400">Dirección:</span> {order.customer?.address}, {order.customer?.city}</div>
                    {order.bankReference && (
                      <div className="pt-1">
                        <span className="text-gray-400">Referencia Bancaria:</span>{" "}
                        <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-[11px] text-gray-800 font-bold">
                          {order.bankReference}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Items List */}
                  <div className="md:col-span-1 space-y-2 border-t md:border-t-0 md:border-l md:border-r border-gray-100 md:px-4 pt-3 md:pt-0">
                    <div className="font-bold text-gray-900 uppercase text-[11px] tracking-wide mb-1 text-[#3C6E71]">
                      Productos ({order.items?.length || 0})
                    </div>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs font-sans">
                          <span className="truncate pr-2">
                            {item.quantity}x {item.name}
                            {item.isGift && (
                              <span className="ml-1 text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded font-bold">
                                REGALO VIP
                              </span>
                            )}
                          </span>
                          <span className="font-mono font-bold text-gray-900 shrink-0">
                            {item.price === 0 ? "Gratis" : formatPriceARS(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 pt-1.5 flex justify-between text-sm font-bold text-gray-900">
                      <span>Total Pagado:</span>
                      <span className="font-mono text-base font-black text-gray-950">
                        {formatPriceARS(order.total)}
                      </span>
                    </div>
                  </div>

                  {/* Receipt Image Column & Actions */}
                  <div className="space-y-3 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <div className="font-bold text-gray-900 uppercase text-[11px] tracking-wide mb-1 text-[#3C6E71]">
                      Comprobante de Transferencia
                    </div>

                    {order.receiptImage ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={order.receiptImage}
                          alt="Comprobante"
                          onClick={() => setSelectedReceipt(order.receiptImage)}
                          className="w-16 h-16 object-cover rounded-xl border border-gray-300 shadow-2xs hover:scale-105 cursor-pointer transition-transform"
                          title="Hacé clic para ver en tamaño completo"
                        />
                        <button
                          type="button"
                          onClick={() => setSelectedReceipt(order.receiptImage)}
                          className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-sans text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver Foto</span>
                        </button>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400 italic font-sans">
                        No se adjuntó comprobante fotográfico.
                      </div>
                    )}

                    {/* Admin Approval Actions */}
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateOrderStatus(order.id, "Aprobado")}
                        disabled={order.status === "Aprobado"}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center gap-1 ${
                          order.status === "Aprobado"
                            ? "bg-emerald-100 text-emerald-800 cursor-default"
                            : "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-xs active:scale-95"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{order.status === "Aprobado" ? "Pago Aprobado" : "Aprobar Pago"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => updateOrderStatus(order.id, "Rechazado")}
                        disabled={order.status === "Rechazado"}
                        className={`py-2 px-3 rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center gap-1 ${
                          order.status === "Rechazado"
                            ? "bg-rose-100 text-rose-800 cursor-default"
                            : "bg-gray-100 hover:bg-rose-600 hover:text-white text-gray-700 cursor-pointer"
                        }`}
                        title="Rechazar comprobante"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Rechazar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center shadow-xs">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-display font-bold text-lg text-gray-900 uppercase">
                No hay pedidos que coincidan
              </h3>
              <p className="text-xs text-gray-500 font-sans mt-1">
                Probá con otro término de búsqueda o seleccioná el estado "Todos".
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Fullscreen Receipt Modal Viewer */}
      {selectedReceipt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedReceipt(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-4 text-center my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3">
              <span className="text-xs font-bold uppercase text-gray-900 font-sans">
                Inspección de Comprobante Bancario
              </span>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-auto rounded-xl flex items-center justify-center bg-[#F8F7F5] p-2">
              <img
                src={selectedReceipt}
                alt="Comprobante ampliado"
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-sm"
              />
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="py-2 px-4 rounded-xl bg-gray-900 text-white text-xs font-bold uppercase"
              >
                Cerrar Visor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
