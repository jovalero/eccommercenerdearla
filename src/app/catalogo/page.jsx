"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Filter, 
  SlidersHorizontal, 
  Search, 
  X, 
  RotateCcw, 
  ChevronRight, 
  Home, 
  Grid2X2, 
  LayoutGrid, 
  Sparkles, 
  Percent, 
  Award,
  Users
} from "lucide-react";
import InteractiveTicker from "../../components/InteractiveTicker";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { PRODUCTS } from "../../data/products";

function CatalogContent() {
  const searchParams = useSearchParams();

  // URL search params initialization
  const initialBrandParam = searchParams.get("marca") || searchParams.get("brand") || "Todos";
  const initialGenderParam = searchParams.get("genero") || searchParams.get("gender") || "Todos";
  const initialQueryParam = searchParams.get("q") || "";

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialQueryParam);
  const [selectedBrand, setSelectedBrand] = useState(initialBrandParam);
  const [selectedGender, setSelectedGender] = useState(initialGenderParam);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [priceMax, setPriceMax] = useState(550000);
  const [onlyHighPoints, setOnlyHighPoints] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [sortBy, setSortBy] = useState("relevance");
  const [gridCols, setGridCols] = useState(3); // 3 or 4 columns on large screens
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Sync with searchParams if they change
  useEffect(() => {
    const brand = searchParams.get("marca") || searchParams.get("brand");
    if (brand) setSelectedBrand(brand);
    const genero = searchParams.get("genero") || searchParams.get("gender");
    if (genero) setSelectedGender(genero);
    const q = searchParams.get("q");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Available brands and counts
  const brandCounts = useMemo(() => {
    const counts = { Todos: PRODUCTS.length };
    PRODUCTS.forEach((p) => {
      counts[p.brand] = (counts[p.brand] || 0) + 1;
    });
    return counts;
  }, []);

  const uniqueBrands = ["Todos", "Xerjoff", "Tom Ford", "Nishane", "Montale", "Paris Corner", "Creed"];

  // Available categories
  const categories = ["Todas", "Nicho Italiano", "Lujo Americano", "Nicho Turco", "Nicho Parisino", "Gourmand Oriental"];

  // Popular olfactory notes
  const popularNotes = [
    "Vainilla",
    "Bergamota",
    "Tabaco",
    "Cuero",
    "Café",
    "Sal marina",
    "Jazmín",
    "Almizcle",
    "Miel pura",
    "Coco cremoso",
    "Pistacho",
    "Rosa aterciopelada"
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Gender filter
      if (selectedGender !== "Todos") {
        const g = selectedGender.toLowerCase();
        const prodG = (product.gender || "").toLowerCase();
        if (g === "hombre" && prodG !== "hombre" && prodG !== "unisex") {
          return false;
        }
        if (g === "mujer" && prodG !== "mujer" && prodG !== "unisex") {
          return false;
        }
        if (g === "unisex" && prodG !== "unisex") {
          return false;
        }
      }

      // 2. Brand filter
      if (selectedBrand !== "Todos" && product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }

      // 3. Category filter
      if (selectedCategory !== "Todas" && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // 4. Price filter
      if (product.price > priceMax) {
        return false;
      }

      // 5. Benefit toggles
      if (onlyHighPoints && product.pointsReward < 4000) {
        return false;
      }

      // 6. Olfactory note filter
      if (selectedNote) {
        const allNotes = [
          ...product.olfactoryPyramid.top,
          ...product.olfactoryPyramid.heart,
          ...product.olfactoryPyramid.base
        ].join(" ").toLowerCase();
        if (!allNotes.includes(selectedNote.toLowerCase())) {
          return false;
        }
      }

      // 7. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const allNotes = [
          ...product.olfactoryPyramid.top,
          ...product.olfactoryPyramid.heart,
          ...product.olfactoryPyramid.base
        ].join(" ").toLowerCase();

        const matchName = product.name.toLowerCase().includes(query);
        const matchBrand = product.brand.toLowerCase().includes(query);
        const matchCat = product.category.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        const matchNotes = allNotes.includes(query);

        if (!matchName && !matchBrand && !matchCat && !matchDesc && !matchNotes) {
          return false;
        }
      }

      return true;
    });
  }, [selectedGender, selectedBrand, selectedCategory, priceMax, onlyHighPoints, selectedNote, searchQuery]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating-desc":
        return list.sort((a, b) => b.rating - a.rating);
      case "points-desc":
        return list.sort((a, b) => b.pointsReward - a.pointsReward);
      case "name-asc":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "relevance":
      default:
        return list;
    }
  }, [filteredProducts, sortBy]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedGender !== "Todos") count++;
    if (selectedBrand !== "Todos") count++;
    if (selectedCategory !== "Todas") count++;
    if (priceMax < 550000) count++;
    if (onlyHighPoints) count++;
    if (selectedNote) count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [selectedGender, selectedBrand, selectedCategory, priceMax, onlyHighPoints, selectedNote, searchQuery]);

  const handleResetFilters = () => {
    setSelectedGender("Todos");
    setSelectedBrand("Todos");
    setSelectedCategory("Todas");
    setPriceMax(550000);
    setOnlyHighPoints(false);
    setSelectedNote(null);
    setSearchQuery("");
    setSortBy("relevance");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F2EFE9] text-[#1C2321]">
      {/* Sticky top wrapper with Ticker + Header */}
      <div className="sticky top-0 z-40 flex flex-col">
        <InteractiveTicker />
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* Breadcrumbs Navigation */}
      <div className="bg-white/80 backdrop-blur-xs border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs font-sans text-gray-500">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="flex items-center gap-1 hover:text-[#3C6E71] transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Inicio</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link href="/catalogo" onClick={handleResetFilters} className="font-bold text-gray-900 hover:text-[#3C6E71]">
              Catálogo de Fragancias
            </Link>
            {selectedGender !== "Todos" && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[#3C6E71] font-bold">Colección: {selectedGender}</span>
              </>
            )}
            {selectedBrand !== "Todos" && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-700 font-bold">{selectedBrand}</span>
              </>
            )}
            {selectedNote && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[#B85C38] font-bold">Nota: {selectedNote}</span>
              </>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#3C6E71] font-bold bg-[#3C6E71]/10 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3 text-[#B85C38]" />
            <span>ENVÍO SIN CARGO A TODO EL PAÍS</span>
          </div>
        </div>
      </div>

      {/* Editorial Header Banner */}
      <div className="bg-[#1C2321] text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-[#3C6E71]/30 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#3C6E71]/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#B85C38]/10 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#ECD88C] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest border border-white/10">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>ALTA PERFUMERÍA • 100% ORIGINAL CON SELLO DE GARANTÍA</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-wide uppercase text-white leading-tight">
              CATÁLOGO DE <span className="text-[#3C6E71]">ELIXIRES DE AUTOR</span>
            </h1>
            <p className="font-sans text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              Explora nuestra colección selecta de fragancias para hombre, mujer y unisex. Acordes embotellados en concentración pura con envío asegurado y recompensa de puntos VIP.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-md shrink-0 flex flex-col justify-center text-left max-w-xs">
            <div className="text-[10px] text-gray-400 uppercase font-sans font-bold tracking-wider">BENEFICIO EXCLUSIVO</div>
            <div className="text-lg font-display font-black text-[#ECD88C] mt-0.5">HASTA 4.900 PTS VIP</div>
            <div className="text-[11px] text-gray-300 font-sans mt-1">
              Multiplicá tus puntos en cada pedido y canjealos por cupones de hasta 25% OFF en la Ruleta.
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog View: Sidebar + Product Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* Top Control Bar: Active filters & sorting */}
        <div className="bg-white rounded-2xl border border-gray-200/90 p-4 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
          {/* Results count & active filter chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-sans font-bold text-sm text-gray-900">
              {sortedProducts.length} {sortedProducts.length === 1 ? "fragancia" : "fragancias"}
            </span>
            <span className="text-gray-400 text-xs hidden sm:inline">•</span>

            {/* Active filters count badge */}
            {activeFiltersCount > 0 ? (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs bg-[#3C6E71]/15 text-[#3C6E71] font-bold px-2 py-0.5 rounded-full font-sans">
                  {activeFiltersCount} {activeFiltersCount === 1 ? "filtro activo" : "filtros activos"}
                </span>

                {selectedGender !== "Todos" && (
                  <button
                    onClick={() => setSelectedGender("Todos")}
                    className="text-xs bg-[#3C6E71] text-white px-2 py-0.5 rounded-full flex items-center gap-1 font-sans cursor-pointer transition-colors"
                  >
                    <span>Para: {selectedGender}</span>
                    <X className="w-3 h-3 text-white" />
                  </button>
                )}

                {selectedBrand !== "Todos" && (
                  <button
                    onClick={() => setSelectedBrand("Todos")}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full flex items-center gap-1 font-sans cursor-pointer transition-colors"
                  >
                    <span>{selectedBrand}</span>
                    <X className="w-3 h-3 text-gray-500" />
                  </button>
                )}

                {selectedCategory !== "Todas" && (
                  <button
                    onClick={() => setSelectedCategory("Todas")}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full flex items-center gap-1 font-sans cursor-pointer transition-colors"
                  >
                    <span>{selectedCategory}</span>
                    <X className="w-3 h-3 text-gray-500" />
                  </button>
                )}

                {selectedNote && (
                  <button
                    onClick={() => setSelectedNote(null)}
                    className="text-xs bg-[#B85C38]/15 hover:bg-[#B85C38]/25 text-[#B85C38] px-2 py-0.5 rounded-full flex items-center gap-1 font-sans cursor-pointer transition-colors"
                  >
                    <span>{selectedNote}</span>
                    <X className="w-3 h-3 text-[#B85C38]" />
                  </button>
                )}

                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full flex items-center gap-1 font-sans cursor-pointer transition-colors"
                  >
                    <span>"{searchQuery}"</span>
                    <X className="w-3 h-3 text-gray-500" />
                  </button>
                )}

                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#B85C38] hover:underline font-sans font-bold ml-1 cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Limpiar todo</span>
                </button>
              </div>
            ) : (
              <span className="text-xs text-gray-500 font-sans hidden sm:inline">
                Mostrando colección completa disponible
              </span>
            )}
          </div>

          {/* Right controls: Mobile Filter Trigger, Sort Selector, Grid Columns */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold font-sans shadow-xs hover:bg-gray-800 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtros {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-sans text-gray-500 hidden md:inline">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs font-sans font-bold text-gray-800 outline-none focus:border-[#3C6E71] focus:ring-1 focus:ring-[#3C6E71] cursor-pointer"
              >
                <option value="relevance">Destacados Holux</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="rating-desc">Mejor Puntuados (★)</option>
                <option value="points-desc">Mayor Recompensa VIP</option>
                <option value="name-asc">Nombre: A - Z</option>
              </select>
            </div>

            {/* Grid Column Selector (Desktop only) */}
            <div className="hidden xl:flex items-center border border-gray-200 rounded-xl p-0.5 bg-gray-50">
              <button
                type="button"
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded-lg transition-colors ${
                  gridCols === 3 ? "bg-white text-gray-900 shadow-xs" : "text-gray-400 hover:text-gray-700"
                }`}
                title="3 Columnas (Detallado)"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded-lg transition-colors ${
                  gridCols === 4 ? "bg-white text-gray-900 shadow-xs" : "text-gray-400 hover:text-gray-700"
                }`}
                title="4 Columnas (Compacto)"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* DESKTOP SIDEBAR FILTERS (Column 1) */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs sticky top-28 space-y-6 max-h-[calc(100vh-140px)] overflow-y-auto">
              
              {/* Header of Sidebar */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 font-display font-bold text-base text-gray-900 uppercase tracking-wide">
                  <Filter className="w-4 h-4 text-[#3C6E71]" />
                  <span>FILTROS</span>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-[#B85C38] hover:underline font-sans font-bold cursor-pointer"
                  >
                    Restablecer
                  </button>
                )}
              </div>

              {/* 1. Quick Search Inside Catalog */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase font-sans tracking-wide block">
                  Buscar en catálogo
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Perfume, acorde o nota..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#F8F7F5] border border-gray-200 rounded-xl pl-8 pr-7 py-2 text-xs text-gray-900 placeholder-gray-400 outline-none focus:border-[#3C6E71] focus:bg-white transition-all font-sans"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-2 text-xs text-gray-400 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Gender / Collection Filter */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-700 uppercase font-sans tracking-wide block">
                  Colección / Género
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {["Todos", "Hombre", "Mujer", "Unisex"].map((gen) => {
                    const isSelected = selectedGender.toLowerCase() === gen.toLowerCase();
                    return (
                      <button
                        key={gen}
                        type="button"
                        onClick={() => setSelectedGender(gen)}
                        className={`py-2 px-3 rounded-xl text-xs font-sans font-bold transition-all text-center cursor-pointer ${
                          isSelected
                            ? "bg-[#3C6E71] text-white shadow-xs"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {gen}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Brand Filter */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 uppercase font-sans tracking-wide">
                    Marcas de Autor
                  </label>
                  <span className="text-[10px] text-gray-400 font-mono">({PRODUCTS.length})</span>
                </div>
                <div className="space-y-1">
                  {uniqueBrands.map((brand) => {
                    const count = brandCounts[brand] || 0;
                    const isSelected = selectedBrand.toLowerCase() === brand.toLowerCase();
                    return (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => setSelectedBrand(brand)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-sans font-semibold transition-all text-left cursor-pointer ${
                          isSelected
                            ? "bg-[#1C2321] text-white shadow-xs"
                            : "text-gray-600 hover:bg-[#F2EFE9] hover:text-gray-900"
                        }`}
                      >
                        <span>{brand}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                            isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Category Filter */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-700 uppercase font-sans tracking-wide block">
                  Categoría Olfativa
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#3C6E71] text-white font-bold shadow-xs"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Interactive Price Range Slider */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 uppercase font-sans tracking-wide">
                    Precio Máximo
                  </label>
                  <span className="text-xs font-mono font-bold text-[#3C6E71]">
                    ${priceMax.toLocaleString("es-AR")}
                  </span>
                </div>
                <input
                  type="range"
                  min={150000}
                  max={550000}
                  step={10000}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#3C6E71] cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                  <span>$150.000</span>
                  <span>$550.000</span>
                </div>
              </div>

              {/* 6. Olfactory Notes Pills */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-700 uppercase font-sans tracking-wide">
                    Notas Destacadas
                  </label>
                  {selectedNote && (
                    <button
                      onClick={() => setSelectedNote(null)}
                      className="text-[10px] text-[#B85C38] hover:underline font-bold"
                    >
                      Quitar nota
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {popularNotes.map((note) => {
                    const isSelected = selectedNote === note;
                    return (
                      <button
                        key={note}
                        type="button"
                        onClick={() => setSelectedNote(isSelected ? null : note)}
                        className={`px-2 py-1 rounded-md text-[10px] font-sans transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#B85C38] text-white font-bold shadow-xs"
                            : "bg-[#F8F7F5] border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-black"
                        }`}
                      >
                        {note}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 7. Special VIP Benefit Toggles */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-700 uppercase font-sans tracking-wide block">
                  Beneficios Club VIP
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-sans text-gray-700 hover:text-black">
                  <input
                    type="checkbox"
                    checked={onlyHighPoints}
                    onChange={(e) => setOnlyHighPoints(e.target.checked)}
                    className="rounded text-[#3C6E71] focus:ring-[#3C6E71] h-3.5 w-3.5 cursor-pointer"
                  />
                  <span>Recompensa Alta (+4.000 pts)</span>
                </label>
              </div>
            </div>
          </aside>

          {/* MAIN PRODUCT GRID (Columns 2-4) */}
          <section className="lg:col-span-3">
            {sortedProducts.length > 0 ? (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  gridCols === 4 ? "xl:grid-cols-4" : "xl:grid-cols-3"
                } gap-5 sm:gap-6`}
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* Luxury Empty State */
              <div className="bg-white rounded-3xl border border-gray-200/90 p-12 text-center shadow-xs flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto mt-6">
                <div className="w-16 h-16 rounded-full bg-[#F2EFE9] flex items-center justify-center text-gray-400">
                  <Search className="w-8 h-8 text-[#3C6E71]" />
                </div>
                <h3 className="font-display font-black text-xl text-gray-900 uppercase tracking-wide">
                  No encontramos fragancias con esos filtros
                </h3>
                <p className="font-sans text-xs text-gray-500 max-w-xs leading-relaxed">
                  Intenta ajustar el género seleccionado, el rango de precio o remover las notas olfativas filtradas.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-[#1C2321] text-white font-sans text-xs font-bold tracking-wider hover:bg-[#3C6E71] transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESTABLECER TODOS LOS FILTROS</span>
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* MOBILE FILTER DRAWER */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl z-10 flex flex-col p-5 overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2 font-display font-bold text-base text-gray-900 uppercase">
                <SlidersHorizontal className="w-4 h-4 text-[#3C6E71]" />
                <span>FILTROS AVANZADOS</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Gender */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-800 uppercase font-sans">Colección / Género</label>
              <div className="grid grid-cols-2 gap-1.5">
                {["Todos", "Hombre", "Mujer", "Unisex"].map((gen) => (
                  <button
                    key={gen}
                    type="button"
                    onClick={() => setSelectedGender(gen)}
                    className={`py-2 px-2 rounded-lg text-xs font-sans text-center ${
                      selectedGender.toLowerCase() === gen.toLowerCase()
                        ? "bg-[#3C6E71] text-white font-bold"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {gen}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Brand */}
            <div className="space-y-2 border-t border-gray-100 pt-3">
              <label className="text-xs font-bold text-gray-800 uppercase font-sans">Marcas</label>
              <div className="flex flex-wrap gap-1.5">
                {uniqueBrands.map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-sans ${
                      selectedBrand.toLowerCase() === brand.toLowerCase()
                        ? "bg-[#1C2321] text-white font-bold"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price */}
            <div className="space-y-2 border-t border-gray-100 pt-3">
              <div className="flex justify-between text-xs font-bold">
                <span>Precio Máximo</span>
                <span className="text-[#3C6E71] font-mono">${priceMax.toLocaleString("es-AR")}</span>
              </div>
              <input
                type="range"
                min={150000}
                max={550000}
                step={10000}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#3C6E71]"
              />
            </div>

            {/* Mobile Action Buttons */}
            <div className="mt-auto pt-4 border-t border-gray-100 space-y-2">
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="w-full py-3 bg-[#1C2321] text-white rounded-xl text-xs font-bold uppercase tracking-wider font-sans shadow-xs"
              >
                VER {sortedProducts.length} RESULTADOS
              </button>
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full py-2.5 border border-gray-200 text-gray-700 rounded-xl text-xs font-bold font-sans"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Holux Footer */}
      <Footer />
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F2EFE9] flex items-center justify-center">
        <div className="text-[#3C6E71] font-display font-black text-xl animate-pulse">
          CARGANDO CATÁLOGO HOLUX...
        </div>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
