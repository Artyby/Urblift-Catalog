"use client";
import { X, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) return null;

  const sizes = product.sizes || ["XS", "S", "M", "L", "XL", "XXL"];
  const images =
    product.images && product.images.length > 0
      ? product.images.map((url) => ({ image_url: url }))
      : [{ image_url: product.main_image_url }];

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedSize,
      quantity,
      cartId: `${product.id}-${selectedSize}`, // ID único por producto + talla
    });
    onClose();
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#1a1a1a] max-w-6xl w-full max-h-[95vh] overflow-y-auto border-4 border-[#FF5722]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Columna de imagen con slider */}
          <div className="bg-[#0A0A0A] p-4 md:p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-[#FF5722] text-white p-3 hover:scale-110 transition-transform rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Slider principal */}
            <div className="relative mb-4 group">
              <div className="relative h-[400px] md:h-[550px] bg-[#0A0A0A] flex items-center justify-center overflow-hidden rounded-lg">
                <img
                  src={
                    images[selectedImageIndex]?.image_url ||
                    product.main_image_url
                  }
                  alt={`${product.name} - imagen ${selectedImageIndex + 1}`}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                />

                {/* Indicador de imagen actual */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#0A0A0A]/80 text-white px-4 py-2 rounded-full font-black text-sm">
                  {selectedImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Botones de navegación */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#FF5722] text-white p-3 rounded-full hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                    disabled={selectedImageIndex === 0}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#FF5722] text-white p-3 rounded-full hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                    disabled={selectedImageIndex === images.length - 1}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Miniaturas */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`border-4 transition-all overflow-hidden rounded-lg hover:scale-105 ${
                      selectedImageIndex === idx
                        ? "border-[#FF5722] scale-105"
                        : "border-gray-700 hover:border-[#76FF03]"
                    }`}
                  >
                    <img
                      src={img.image_url}
                      alt={`${product.name} miniatura ${idx + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Swipe indicators para mobile */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4 md:hidden">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      selectedImageIndex === idx
                        ? "bg-[#FF5722] w-8"
                        : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Columna de información */}
          <div className="p-6 md:p-8 bg-[#1a1a1a]">
            {/* Badge de categoría */}
            <div className="inline-block bg-[#76FF03] text-[#0A0A0A] px-4 py-2 mb-4 font-black uppercase text-sm transform -rotate-1 shadow-lg">
              {product.style_tag}
            </div>

            {product.is_new && (
              <div className="inline-block bg-[#FF5722] text-white px-4 py-2 mb-4 ml-2 font-black uppercase text-sm transform rotate-1 shadow-lg">
                NUEVO
              </div>
            )}

            {/* Nombre del producto */}
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase leading-tight">
              {product.name}
            </h2>

            {/* Descripción */}
            <p className="text-gray-300 text-base md:text-lg mb-6 font-bold leading-relaxed">
              {product.description}
            </p>

            {/* Precio */}
            <div className="mb-8 flex items-baseline gap-4">
              <span className="text-5xl md:text-6xl font-black text-[#FF5722]">
                ${product.price}
              </span>
              {product.old_price && (
                <>
                  <span className="text-2xl text-gray-500 line-through font-bold">
                    ${product.old_price}
                  </span>
                  <span className="bg-[#76FF03] text-[#0A0A0A] px-3 py-1 font-black text-sm uppercase rounded">
                    AHORRÁ ${(product.old_price - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Selector de tallas */}
            <div className="mb-8">
              <label className="block text-white font-black uppercase text-sm mb-3 tracking-wider">
                Selecciona tu talla:
              </label>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 font-black text-lg uppercase transition-all border-2 rounded-lg ${
                      selectedSize === size
                        ? "bg-[#FF5722] text-white border-[#FF5722] scale-110 shadow-lg"
                        : "bg-[#0A0A0A] text-white border-gray-700 hover:border-[#76FF03] hover:scale-105"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-2 font-bold">
                Talla seleccionada:{" "}
                <span className="text-[#76FF03]">{selectedSize}</span>
              </p>
            </div>

            {/* Selector de cantidad */}
            <div className="mb-8">
              <label className="block text-white font-black uppercase text-sm mb-3 tracking-wider">
                Cantidad:
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-[#0A0A0A] text-white p-4 hover:bg-[#FF5722] transition-colors border-2 border-gray-700 rounded-lg hover:scale-110"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-white font-black text-3xl min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-[#0A0A0A] text-white p-4 hover:bg-[#76FF03] hover:text-[#0A0A0A] transition-colors border-2 border-gray-700 rounded-lg hover:scale-110"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Información adicional */}
            <div className="mb-8 p-4 bg-[#0A0A0A] border-l-4 border-[#76FF03] rounded-r-lg">
              <ul className="space-y-2 text-gray-300 font-bold text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[#76FF03]">✓</span>
                  Envío gratis en compras mayores a $50
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#76FF03]">✓</span>
                  Material 100% algodón premium
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#76FF03]">✓</span>
                  Diseño exclusivo URBLIFT
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#76FF03]">✓</span>
                  Garantía de satisfacción 30 días
                </li>
              </ul>
            </div>

            {/* Botones de acción */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#FF5722] text-white py-6 text-xl md:text-2xl font-black hover:scale-105 transition-transform uppercase rounded-lg shadow-lg"
                style={{
                  clipPath: "polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)",
                }}
              >
                Agregar al Carrito - ${(product.price * quantity).toFixed(2)}
              </button>

              <button
                onClick={onClose}
                className="w-full border-4 border-[#76FF03] text-[#76FF03] py-4 text-lg font-black hover:bg-[#76FF03] hover:text-[#0A0A0A] transition-all uppercase rounded-lg"
              >
                Seguir Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
