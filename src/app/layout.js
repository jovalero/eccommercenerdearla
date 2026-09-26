import "./globals.css";
import { ShopProvider } from "../context/ShopContext";
import CartDrawer from "../components/CartDrawer";
import LuckyWheelModal from "../components/LuckyWheelModal";
import CouponWalletModal from "../components/CouponWalletModal";
import RewardsModal from "../components/RewardsModal";
import ProductDetailModal from "../components/ProductDetailModal";
import CheckoutModal from "../components/CheckoutModal";
import ToastNotification from "../components/ToastNotification";

export const metadata = {
  title: "HOLUX Rewards | Alta Perfumería de Nicho & Ruleta de Premios",
  description: "E-commerce de lujo con fragancias exclusivas (Xerjoff, Creed, Tom Ford) y sistema gamificado de cupones y premios para Webflow Cloud / Nerdearla.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body className="bg-holux-dark text-holux-light min-h-screen antialiased flex flex-col selection:bg-holux-gold selection:text-holux-black">
        <ShopProvider>
          {children}

          {/* Global Modals & Drawers */}
          <CartDrawer />
          <LuckyWheelModal />
          <CouponWalletModal />
          <RewardsModal />
          <ProductDetailModal />
          <CheckoutModal />
          <ToastNotification />
        </ShopProvider>
      </body>
    </html>
  );
}
