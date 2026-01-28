"use client";
import { Search } from "lucide-react";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import { categoriesService } from "../../lib/supabase";

export default function CatalogPage({
  products,
  searchTerm,
  setSearchTerm,
  selectedStyleTag,
  setSelectedStyleTag,
  setSelectedProduct,
}) {
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
          { id: "all", name: "Todos", icon: "" },
          { id: "wildstyle", name: "Wildstyle", icon: "" },
          { id: "throw-up", name: "Throw-up", icon: "" },
          { id: "tag", name: "Tag", icon: "" },
          { id: "piece", name: "Piece", icon: "" },
          { id: "abstracto", name: "Abstracto", icon: "" },
        ];
        setStyleTags(defaultCategories);
      }
    };
    loadCategories();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Banner superior minimalista */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1535775/pexels-photo-1535775.jpeg)",
            filter: "brightness(0.4) contrast(1.2)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 to-[#0A0A0A]" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="text-[#FF5722] text-sm font-black uppercase tracking-[0.3em] mb-4 block">
            SHOP
          </span>
          <h1
            className="text-6xl md:text-8xl font-black text-white mb-6 uppercase"
            style={{
              fontFamily: "var(--font-boomster)",
              textShadow: "5px 5px 0 #FF5722",
            }}
          >
            CATÁLOGO
          </h1>
          <p className="text-white/70 text-lg font-medium">
            Encuentra tu próxima pieza única
          </p>
        </div>

        {/* Línea decorativa abajo */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF5722] via-[#76FF03] to-[#00BCD4]" />
      </section>

      {/* Barra de información - SIN EMOJIS */}
      <div className="bg-[#FF5722] py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-white font-black text-sm uppercase">
            <span>ENVÍO GRATIS +$150 EN RD</span>
            <span className="text-white/50">|</span>
            <span>NUEVOS DISEÑOS SEMANALES</span>
            <span className="text-white/50">|</span>
            <span>15% OFF PRIMERA COMPRA</span>
            <span className="text-white/50">|</span>
            <span>STOCK LIMITADO</span>
          </div>
        </div>
      </div>

      {/* Sección principal del catálogo */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Barra de búsqueda y filtros - PROFESIONAL */}
          <div className="mb-16 space-y-8">
            {/* Búsqueda minimalista */}
            <div className="relative max-w-3xl mx-auto">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1a1a1a] text-white pl-14 pr-6 py-5 border border-white/10 focus:border-[#FF5722] focus:outline-none font-medium tracking-wide placeholder-white/40 text-base transition-all"
              />
            </div>

            {/* Filtros en línea - CLEAN */}
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex flex-wrap gap-3">
                {styleTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => setSelectedStyleTag(tag.id)}
                    className={`px-6 py-3 font-black uppercase tracking-wider text-sm transition-all ${
                      selectedStyleTag === tag.id
                        ? "bg-[#FF5722] text-white border border-[#FF5722]"
                        : "bg-transparent text-white/70 border border-white/20 hover:border-[#76FF03] hover:text-white"
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>

              {/* Contador minimalista */}
              <div className="text-white/50 font-medium text-sm">
                <span className="text-[#76FF03] font-black">
                  {products.length}
                </span>{" "}
                productos
              </div>
            </div>
          </div>

          {/* Grid de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-32">
                <h3 className="text-3xl font-black text-white mb-4 uppercase">
                  Sin resultados
                </h3>
                <p className="text-white/60 font-medium text-lg mb-8">
                  Intenta con otros términos de búsqueda
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedStyleTag("all");
                  }}
                  className="bg-[#FF5722] text-white px-10 py-4 font-black uppercase hover:scale-105 transition-transform"
                >
                  Ver Todos
                </button>
              </div>
            )}
          </div>

          {/* Sección de información - PROFESIONAL */}
          <div className="mt-32 pt-20 border-t border-white/10">
            <div className="mb-16 text-center">
              <span className="text-[#FF5722] text-sm font-black uppercase tracking-[0.3em] mb-4 block">
                INFO
              </span>
              <h2
                className="text-4xl md:text-6xl font-black text-white uppercase"
                style={{
                  fontFamily: "var(--font-boomster)",
                  textShadow: "3px 3px 0 #FF5722",
                }}
              >
                LO QUE NECESITAS SABER
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {/* Card: Envíos */}
              <div className="group p-10 bg-[#0A0A0A] border border-white/10 hover:border-[#FF5722] transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#FF5722] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-wider">
                    ENVÍOS
                  </h3>
                  <ul className="space-y-3 text-white/60 text-sm font-medium leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Envío gratis en compras mayores a $150</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Entrega entre 24-72 horas hábiles</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Cobertura nacional completa</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Seguimiento en tiempo real</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card: Promos */}
              <div className="group p-10 bg-[#0A0A0A] border border-white/10 hover:border-[#76FF03] transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#76FF03] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-wider">
                    PROMOCIONES
                  </h3>
                  <ul className="space-y-3 text-white/60 text-sm font-medium leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>15% OFF primera compra - código: NUEVO15</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Comprá 2 productos y llevá el 3ro con 35% OFF</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Envío gratis primera compra +$100</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Descuentos exclusivos por newsletter</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card: Próximos Lanzamientos */}
              <div className="group p-10 bg-[#0A0A0A] border border-white/10 hover:border-[#00BCD4] transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#00BCD4] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-wider">
                    PRÓXIMOS
                  </h3>
                  <ul className="space-y-3 text-white/60 text-sm font-medium leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Nueva colección 2026</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>9 Rounds - Expression Collection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Colaboraciones especiales</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Drops limitados mensuales</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card: Tallas */}
              <div className="group p-10 bg-[#0A0A0A] border border-white/10 hover:border-[#FF5722] transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#FF5722] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-wider">
                    TALLAS
                  </h3>
                  <ul className="space-y-3 text-white/60 text-sm font-medium leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Disponibles desde XS hasta XXL</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Guía de tallas detallada</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Fit regular y oversized</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Cambios sin costo por talla incorrecta</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card: Calidad */}
              <div className="group p-10 bg-[#0A0A0A] border border-white/10 hover:border-[#76FF03] transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#76FF03] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-wider">
                    CALIDAD
                  </h3>
                  <ul className="space-y-3 text-white/60 text-sm font-medium leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>100% algodón premium</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Estampados resistentes al lavado</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Control de calidad riguroso</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Garantía de satisfacción</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card: Diseños */}
              <div className="group p-10 bg-[#0A0A0A] border border-white/10 hover:border-[#00BCD4] transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#00BCD4] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-wider">
                    DISEÑOS
                  </h3>
                  <ul className="space-y-3 text-white/60 text-sm font-medium leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Diseños exclusivos - Elevamiento Urbano</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Inspirados en cultura urbana y fe</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Nuevos diseños semanales - @Urblift</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#76FF03] mt-1 text-xs">■</span>
                      <span>Personalización bajo pedido</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA final - PROFESIONAL */}
          <div className="mt-24 relative overflow-hidden bg-[#FF5722] p-12">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
              <div
                className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase">
                ¿Necesitas ayuda?
              </h3>
              <p className="text-white/90 text-lg font-medium mb-8">
                Contactanos por WhatsApp y te ayudamos a elegir el modelo
                perfecto
              </p>
              <button
                className="bg-white text-[#FF5722] px-12 py-5 text-xl font-black hover:scale-105 transition-transform uppercase inline-flex items-center gap-3"
                onClick={() =>
                  window.open("https://wa.me/18295237077", "_blank")
                }
              >
                <span>CHATEAR AHORA</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
