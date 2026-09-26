"use client";

import React from "react";
import { useShop } from "../context/ShopContext";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function ToastNotification() {
  const { toast } = useShop();

  if (!toast) return null;

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 duration-300 pointer-events-none">
      <div
        className={`px-4 py-3 rounded-2xl shadow-luxury border flex items-center gap-2.5 text-xs font-medium backdrop-blur-md ${
          isSuccess
            ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-200"
            : isError
            ? "bg-rose-950/90 border-rose-500/50 text-rose-200"
            : "bg-holux-card/90 border-holux-gold/40 text-holux-light"
        }`}
      >
        {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
        {isError && <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
        {!isSuccess && !isError && <Info className="w-4 h-4 text-holux-gold flex-shrink-0" />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
