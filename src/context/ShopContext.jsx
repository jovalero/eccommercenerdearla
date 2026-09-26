"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { calculateDiscount } from "../utils/formatters";

const ShopContext = createContext();

const DEFAULT_COUPONS = [
  {
    code: "NERDEARLA20",
    description: "20% OFF Showcase Nerdearla",
    type: "percentage",
    value: 20,
    source: "Promoción Especial",
  },
  {
    code: "BIENVENIDA10",
    description: "10% OFF Bienvenida a HOLUX",
    type: "percentage",
    value: 10,
    source: "Registro",
  },
];

const DEFAULT_INITIAL_ORDERS = [
  {
    id: "HLX-94821",
    date: new Date(Date.now() - 3600000 * 2.5).toISOString(),
    customer: {
      fullName: "Santiago Gómez",
      email: "santiago.gomez@gmail.com",
      phone: "+54 9 11 4452-9810",
      address: "Av. Del Libertador 2450, Piso 6B",
      city: "CABA",
      zipCode: "C1425",
    },
    items: [
      {
        name: "Naxos 1861",
        brand: "Xerjoff",
        price: 425000,
        quantity: 1,
        image: "/uploads/19ce47fa-b481-4bc7-b1c7-374b4afe2afc.jpg",
      },
      {
        name: "Vial Decant 2ml - Tom Ford Ombré Leather (Regalo VIP)",
        brand: "Tom Ford",
        price: 0,
        quantity: 1,
        isGift: true,
        image: "/uploads/ff1a23de-ee09-4ad6-80f8-25da1e29370a.jpg",
      },
    ],
    subtotal: 425000,
    discountAmount: 63750,
    shippingCost: 0,
    total: 361250,
    paymentMethod: "Transferencia Bancaria",
    receiptImage: "/uploads/19ce47fa-b481-4bc7-b1c7-374b4afe2afc.jpg", // initial preview sample
    status: "Pendiente",
    bankReference: "TR-Santander-9921",
  },
  {
    id: "HLX-81204",
    date: new Date(Date.now() - 3600000 * 24).toISOString(),
    customer: {
      fullName: "Mariana Soria",
      email: "mariana.soria@hotmail.com",
      phone: "+54 9 341 512-7788",
      address: "Bv. Oroño 1120",
      city: "Rosario",
      zipCode: "S2000",
    },
    items: [
      {
        name: "Soleil Blanc",
        brand: "Tom Ford",
        price: 490000,
        quantity: 1,
        image: "/uploads/c0f82ff9-759d-484b-a47c-1186bbb54537.jpg",
      },
    ],
    subtotal: 490000,
    discountAmount: 73500,
    shippingCost: 0,
    total: 416500,
    paymentMethod: "Transferencia Bancaria",
    receiptImage: "/uploads/c0f82ff9-759d-484b-a47c-1186bbb54537.jpg",
    status: "Aprobado",
    bankReference: "TR-Galicia-4412",
  },
];

export function ShopProvider({ children }) {
  // Cart state
  const [cart, setCart] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  // VIP & Gamification state
  const [vipPoints, setVipPoints] = useState(22500);
  const [unlockedCoupons, setUnlockedCoupons] = useState(DEFAULT_COUPONS);
  const [spinsLeft, setSpinsLeft] = useState(3);

  // Orders list state for Admin
  const [orders, setOrders] = useState(DEFAULT_INITIAL_ORDERS);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWheelOpen, setIsWheelOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Toast notification
  const [toast, setToast] = useState(null);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("holux_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedPoints = localStorage.getItem("holux_points");
      if (savedPoints) setVipPoints(Number(savedPoints));

      const savedCoupons = localStorage.getItem("holux_unlocked_coupons");
      if (savedCoupons) setUnlockedCoupons(JSON.parse(savedCoupons));

      const savedSpins = localStorage.getItem("holux_spins_left");
      if (savedSpins) setSpinsLeft(Number(savedSpins));

      const savedOrders = localStorage.getItem("holux_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch (e) {
      console.error("Error loading localStorage", e);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("holux_cart", JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("holux_points", vipPoints.toString());
    } catch (e) {}
  }, [vipPoints]);

  useEffect(() => {
    try {
      localStorage.setItem("holux_unlocked_coupons", JSON.stringify(unlockedCoupons));
    } catch (e) {}
  }, [unlockedCoupons]);

  useEffect(() => {
    try {
      localStorage.setItem("holux_spins_left", spinsLeft.toString());
    } catch (e) {}
  }, [spinsLeft]);

  useEffect(() => {
    try {
      localStorage.setItem("holux_orders", JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  // Toast helper
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`"${product.name}" añadido al carrito`, "success");
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + (Number(item.product.price) || 0) * item.quantity,
    0
  );

  // Standard shipping cost: $8.500 (Free over $400.000 or with FREESHIP coupon)
  const baseShippingCost = subtotal > 0 ? (subtotal >= 400000 ? 0 : 8500) : 0;

  // Coupon calculations
  const { discountAmount, isFreeShipping } = calculateDiscount(
    subtotal,
    appliedCoupon
  );

  const shippingCost = isFreeShipping ? 0 : baseShippingCost;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  // Apply Coupon via API
  const applyCoupon = async (code) => {
    if (!code) return { success: false, message: "Ingresa un código" };
    setCouponLoading(true);
    setCouponError("");

    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, subtotal }),
      });

      const data = await res.json();
      setCouponLoading(false);

      if (data.valid) {
        setAppliedCoupon(data.coupon);
        showToast(`Cupón ${data.coupon.code} aplicado con éxito`, "success");
        return { success: true, message: data.message };
      } else {
        setCouponError(data.message || "Cupón inválido");
        return { success: false, message: data.message };
      }
    } catch (err) {
      setCouponLoading(false);
      setCouponError("Error al validar el cupón");
      return { success: false, message: "Error al conectar con el servidor" };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
    showToast("Cupón removido", "info");
  };

  // VIP & Wallet operations
  const addVipPoints = (amount) => {
    setVipPoints((prev) => prev + amount);
    showToast(`+${amount} Puntos VIP agregados a tu cuenta`, "success");
  };

  const unlockCoupon = (couponObj) => {
    setUnlockedCoupons((prev) => {
      const exists = prev.some((c) => c.code === couponObj.code);
      if (exists) return prev;
      return [couponObj, ...prev];
    });
  };

  const consumeSpin = () => {
    setSpinsLeft((prev) => Math.max(0, prev - 1));
  };

  // Redeem Rewards by VIP Points
  const redeemReward = (reward) => {
    if (vipPoints < reward.pointsCost) {
      showToast(
        `Te faltan ${(reward.pointsCost - vipPoints).toLocaleString()} pts para canjear este premio`,
        "error"
      );
      return false;
    }

    setVipPoints((prev) => Math.max(0, prev - reward.pointsCost));

    if (reward.type === "gift_cart" && reward.giftProduct) {
      addToCart(reward.giftProduct, 1);
      showToast(`¡"${reward.giftProduct.name}" agregado a tu carrito a $0!`, "success");
    } else if (reward.type === "coupon") {
      unlockCoupon({
        code: reward.couponCode,
        description: reward.couponDiscount,
        type: reward.couponCode.includes("25") ? "percentage" : "fixed",
        value: reward.couponCode.includes("25") ? 25 : (reward.couponCode.includes("15K") ? 15000 : 8500),
        source: "Premio Canjeado",
      });
      showToast(`¡Cupón ${reward.couponCode} desbloqueado en tu monedero!`, "success");
    } else if (reward.type === "spin") {
      setSpinsLeft((prev) => prev + 1);
      showToast(`¡+1 Giro adicional agregado a tu Ruleta VIP!`, "success");
    }

    try {
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#3C6E71", "#B85C38", "#1C2321", "#D4AF37"],
      });
    } catch (e) {}

    return true;
  };

  // Orders creation and management
  const createOrder = (orderData) => {
    const newOrder = {
      id: orderData.id || `HLX-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString(),
      status: "Pendiente",
      ...orderData,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Pedido ${orderId} marcado como "${newStatus}"`, "info");
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        shippingCost,
        discountAmount,
        isFreeShipping,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,

        appliedCoupon,
        applyCoupon,
        removeCoupon,
        couponError,
        couponLoading,

        vipPoints,
        addVipPoints,
        unlockedCoupons,
        unlockCoupon,
        spinsLeft,
        consumeSpin,
        redeemReward,

        orders,
        createOrder,
        updateOrderStatus,

        isCartOpen,
        setIsCartOpen,
        isWheelOpen,
        setIsWheelOpen,
        isWalletOpen,
        setIsWalletOpen,
        isRewardsOpen,
        setIsRewardsOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProduct,
        setSelectedProduct,

        toast,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
