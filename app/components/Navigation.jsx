"use client";
import { ShoppingCart, Menu, Package, Phone, Settings } from "lucide-react";
import Image from "next/image";

export default function Navigation({
  currentPage,
  setCurrentPage,
  cart,
  setIsCartOpen,
  isAdmin,
}) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A] border-b-4 border-[#FF5722] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage("landing")}
            className="flex items-center gap-3 hover:scale-105 transition-transform"
          >
            <span
              className="text-4xl md:text-5xl font-black text-white uppercase"
              style={{ textShadow: "3px 3px 0 #FF5722" }}
            >
              URBLIFT
            </span>
            <img
              src="/Logo.svg"
              alt="URBLIFT Logo"
              className="w-15 h-15 md:w-22 md:h-22"
            />
          </button>

          {/* Nav desktop */}
          <nav className="hidden md:flex gap-4 items-center">
            <button
              onClick={() => setCurrentPage("catalog")}
              className="text-white hover:text-[#76FF03] font-black uppercase flex items-center gap-2 transition-colors px-4 py-2 rounded-lg hover:bg-[#1a1a1a]"
            >
              <Package className="w-5 h-5" />
              CATÁLOGO
            </button>
            <button
              onClick={() => setCurrentPage("contact")}
              className="text-white hover:text-[#76FF03] font-black uppercase flex items-center gap-2 transition-colors px-4 py-2 rounded-lg hover:bg-[#1a1a1a]"
            >
              <Phone className="w-5 h-5" />
              CONTACTO
            </button>
            {isAdmin && (
              <button
                onClick={() => setCurrentPage("admin")}
                className="text-white hover:text-[#00BCD4] font-black uppercase flex items-center gap-2 transition-colors px-4 py-2 rounded-lg hover:bg-[#1a1a1a]"
              >
                <Settings className="w-5 h-5" />
                ADMIN
              </button>
            )}
          </nav>

          {/* Carrito */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-[#FF5722] text-white px-6 py-3 font-black uppercase flex items-center gap-2 hover:bg-[#76FF03] hover:text-[#0A0A0A] transition-all rounded-lg shadow-lg"
            style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">CARRITO</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#76FF03] text-[#0A0A0A] w-7 h-7 rounded-full flex items-center justify-center text-sm font-black animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
