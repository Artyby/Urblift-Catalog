"use client";
import { Search, Filter, Grid, LayoutGrid } from "lucide-react";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import { categoriesService } from "../../lib/supabase";

export default function CatalogPage({
  products,
  searchTerm,
  setSearchTerm,
  selectedStyleTag,
  setSelectedStyleTag,
  onSelectProduct,
  onAddToCart,
}) {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' o 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [styleTags, setStyleTags] = useState([]);

  // Load categories from Supabase on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoriesService.getAllCategories();
        setStyleTags(data);
      } catch (error) {
        console.error("Error loading categories:", error);
        // Fallback to default categories
        const defaultCategories = [
          { id: "all", name: "Todos", icon: "🎨" },
          { id: "wildstyle", name: "Wildstyle", icon: "🎨" },
          { id: "throw-up", name: "Throw-up", icon: "🖌️" },
          { id: "tag", name: "Tag", icon: "🏷️" },
          { id: "piece", name: "Piece", icon: "🖼️" },
          { id: "abstracto", name: "Abstracto", icon: "🌌" },
        ];
        setStyleTags(defaultCategories);
      }
    };
    loadCategories();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Banner superior con imagen */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1535775/pexels-photo-1535775.jpeg)",
            filter: "brightness(0.4)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/50 to-[#0A0A0A]" />

        <div className="relative z-10 text-center px-4">
          <h1
            className="text-6xl md:text-8xl font-black text-white mb-4 uppercase"
            style={{ textShadow: "6px 6px 0 #FF5722, -2px -2px 0 #76FF03" }}
          >
            Catálogo
          </h1>
          <p className="text-2xl text-[#76FF03] font-black uppercase tracking-widest">
            Encuentra tu estilo único
          </p>
        </div>
      </section>

      {/* Barra de información importante */}
      <div className="bg-gradient-to-r from-[#FF5722]  to-[#000000] py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-[#ffffff] font-black text-sm uppercase">
            <span>🚚 Envío Gratis +$8,000 en RD</span>
            <span>✨ Nuevos Diseños Semanales</span>
            <span>🎁 15% OFF Primera Compra</span>
            <span>🔥 Stock Limitado</span>
          </div>
        </div>
      </div>

      {/* Sección principal del catálogo */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Barra de búsqueda y filtros */}
          <div className="mb-12 space-y-6">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#76FF03] w-6 h-6" />
              <input
                type="text"
                placeholder="BUSCAR PRODUCTOS (ej: camiseta fe, hoodie cruz...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1a1a1a] text-white pl-16 pr-6 py-5 border-4 border-[#76FF03] focus:border-[#FF5722] focus:outline-none font-black uppercase tracking-wider placeholder-gray-600 text-lg"
              />
            </div>

            {/* Filtros en tabs horizontales */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex flex-wrap gap-3">
                {styleTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => setSelectedStyleTag(tag.id)}
                    className={`px-6 py-3 font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                      selectedStyleTag === tag.id
                        ? "bg-[#FF5722] text-white scale-110 border-4 border-[#FF5722]"
                        : "bg-[#1a1a1a] text-white border-4 border-gray-800 hover:border-[#76FF03]"
                    }`}
                  >
                    <span className="text-xl">{tag.icon}</span>
                    {tag.name}
                  </button>
                ))}
              </div>

              {/* Contador de productos */}
              <div className="text-[#76FF03] font-black text-lg">
                {products.length} PRODUCTOS
              </div>
            </div>
          </div>

          {/* Grid de productos mejorado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                  onAddToCart={onAddToCart}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="text-8xl mb-6">😕</div>
                <h3 className="text-3xl font-black text-white mb-4 uppercase">
                  No encontramos productos
                </h3>
                <p className="text-[#76FF03] font-bold text-lg mb-8">
                  Intenta con otros términos de búsqueda
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedStyleTag("all");
                  }}
                  className="bg-[#FF5722] text-white px-8 py-4 font-black uppercase hover:scale-105 transition-transform"
                >
                  Ver Todos los Productos
                </button>
              </div>
            )}
          </div>

          {/* Sección de información adicional */}
          <div className="mt-20 pt-20 border-t-4 border-gray-800 flex flex-col align-items-center">
            <h2
              className="text-4xl md:text-6xl font-black text-white mb-12 uppercase text-center"
              style={{ textShadow: "4px 4px 0 #00BCD4" }}
            >
              Información Importante
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card: Envíos */}
              <div className="bg-[#1a1a1a] border-4 border-[#FF5722] p-8 transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl">🚚</div>
                  <h3 className="text-3xl font-black text-white uppercase">
                    Envíos
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-300 font-bold">
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>Envío gratis en compras mayores a $8,000</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>
                      Despacho entre 24-72 horas hábiles - con tus ideas
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>Cobertura nacional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>Confianza y Seguridad</span>
                  </li>
                </ul>
              </div>

              {/* Card: Promos */}
              <div className="bg-[#1a1a1a] border-4 border-[#76FF03] p-8 transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl">🔥</div>
                  <h3 className="text-3xl font-black text-white uppercase">
                    Promos
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-300 font-bold">
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>
                      15% OFF en tu primera compra con código: NUEVO15
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>Comprá 2 productos y llevá el 3ro con 35% OFF</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>Descuentos especiales para grupos/iglesias</span>
                  </li>
                  {/* <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span></span>
                  </li> */}
                </ul>
              </div>

              {/* Card: Modelos en Proceso */}
              <div className="bg-[#1a1a1a] border-4 border-[#00BCD4] p-8 transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl">⚡</div>
                  <h3 className="text-3xl font-black text-white uppercase">
                    Próximos
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-300 font-bold">
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>Colección nueva - 2026</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>9 Rounds Colleccion Expression</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>Nuevas ideas en proceso...</span>
                  </li>
                  {/* <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>Impresiones por demanda</span>
                  </li> */}
                </ul>
              </div>

              {/* Card: Tallas y Ajustes */}
              <div className="bg-[#1a1a1a] border-4 border-[#FF5722] p-8 transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl">📏</div>
                  <h3 className="text-3xl font-black text-white uppercase">
                    Tallas
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-300 font-bold">
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>Disponibles desde S hasta XXL</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>Guía de tallas detallada disponible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>Fit regular y oversized</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>Cambios sin costo por talla incorrecta</span>
                  </li>
                </ul>
              </div>

              {/* Card: Calidad */}
              <div className="bg-[#1a1a1a] border-4 border-[#76FF03] p-8 transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl">✨</div>
                  <h3 className="text-3xl font-black text-white uppercase">
                    Calidad
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-300 font-bold">
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>100% algodón premium de alta calidad</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>Estampados resistentes al lavado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>Estilo Unico</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>Garantía de satisfacción 15 días</span>
                  </li>
                </ul>
              </div>

              {/* Card: Diseños */}
              <div className="bg-[#1a1a1a] border-4 border-[#00BCD4] p-8 transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl">🎨</div>
                  <h3 className="text-3xl font-black text-white uppercase">
                    Diseños
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-300 font-bold">
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>Diseños exclusivos - Elevamiento Urbano</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>Inspirados en cultura urbana y fe cristiana</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>
                      Nuevos diseños cada semana en nuestro instagram{" "}
                      <code className="text-[#FF5722]">@Urblift</code>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#76FF03] mt-1">✓</span>
                    <span>Personalización bajo pedido disponible</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to action final */}
          <div className="mt-20 text-center bg-gradient-to-r from-[#FF5722] to-[#76FF03] p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
              <div
                className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase">
                ¿Tenés dudas?
              </h3>
              <p className="text-xl text-white font-bold mb-8">
                Contactanos por WhatsApp y te ayudamos a elegir tu estilo
              </p>
              <button
                onClick={() =>
                  window.open("https://wa.me/18295337077", "_blank")
                }
                className="bg-white text-[#0A0A0A] px-12 py-6 text-2xl font-black hover:scale-110 transition-transform uppercase inline-flex items-center gap-3"
              >
                <span>💬</span>
                Chatear Ahora
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
