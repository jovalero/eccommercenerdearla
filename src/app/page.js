"use client";

import React, { useState, useRef } from "react";
import InteractiveTicker from "../components/InteractiveTicker";
import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import CategoryBanners from "../components/CategoryBanners";
import ProductCatalog from "../components/ProductCatalog";
import PromoBanner from "../components/PromoBanner";
import Footer from "../components/Footer";
import { useShop } from "../context/ShopContext";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("Todos");
  const catalogRef = useRef(null);
  const { setIsWheelOpen } = useShop();

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
    scrollToCatalog();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F2EFE9] text-[#1C2321]">
      {/* 1. Interactive Marquee Ticker */}
      <InteractiveTicker />

      {/* 2. Brand Header & Navbar */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectCategory={handleSelectBrand}
      />

      {/* 3. Hero Editorial Slider */}
      <HeroSlider
        onOpenWheel={() => setIsWheelOpen(true)}
        onScrollToCatalog={scrollToCatalog}
      />

      {/* 4. Luxury Category Banners (Hombre, Mujer, Oriental) */}
      <CategoryBanners onSelectBrand={handleSelectBrand} />

      {/* 5. Trust Pillars & Gamification Promo Banner */}
      <PromoBanner />

      {/* 6. Product Catalog with Filters & Search */}
      <ProductCatalog
        searchQuery={searchQuery}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        catalogRef={catalogRef}
      />

      {/* 7. Official HOLUX Footer */}
      <Footer />
    </div>
  );
}
