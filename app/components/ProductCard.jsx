export default function ProductCard({ product, onSelect, onAddToCart }) {
  const allImages =
    product.images && product.images.length > 0
      ? [product.main_image_url, ...product.images]
      : [product.main_image_url];

  return (
    <div
      className="group cursor-pointer relative"
      onClick={() => onSelect(product)}
    >
      <div className="relative bg-[#1a1a1a] overflow-hidden border-4 border-[#0A0A0A] group-hover:border-[#FF5722] transition-all duration-300">
        {/* Imagen del producto con carousel si hay múltiples */}
        <div className="relative h-[450px] overflow-hidden bg-[#0A0A0A]">
          {allImages.length > 1 ? (
            <div className="relative w-full h-full">
              {allImages.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`${product.name} - imagen ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
                    index === 0
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  } ${index === 1 ? "group-hover:delay-300" : ""} ${
                    index > 1 ? "hidden group-hover:block" : ""
                  }`}
                  style={{
                    animation:
                      allImages.length > 1
                        ? `fade-${index} 3s infinite`
                        : "none",
                  }}
                />
              ))}

              {/* Indicador de múltiples imágenes */}
              <div className="absolute bottom-2 right-2 bg-[#0A0A0A]/80 text-white px-2 py-1 rounded-full font-black text-xs">
                {allImages.length} 📸
              </div>
            </div>
          ) : (
            <img
              src={product.main_image_url}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
            />
          )}

          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badge de estilo */}
          <div className="absolute top-4 right-4 bg-[#76FF03] text-[#0A0A0A] px-3 py-1 font-black text-xs uppercase transform rotate-2 shadow-lg">
            {product.style_tag}
          </div>

          {/* Badge de nuevo/promo */}
          {product.is_new && (
            <div className="absolute top-4 left-4 bg-[#FF5722] text-white px-3 py-1 font-black text-xs uppercase transform -rotate-2 shadow-lg">
              NUEVO
            </div>
          )}
        </div>

        {/* Info del producto */}
        <div className="p-6 bg-[#0A0A0A]">
          <h3 className="text-white text-xl font-black uppercase mb-2 group-hover:text-[#76FF03] transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm font-bold mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-[#FF5722] text-3xl font-black">
                ${product.price}
              </span>
              {product.old_price && (
                <span className="text-gray-500 text-lg font-bold line-through ml-2">
                  ${product.old_price}
                </span>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="bg-[#FF5722] text-white px-6 py-3 font-black text-sm uppercase hover:bg-[#76FF03] hover:text-[#0A0A0A] transition-all transform hover:scale-110"
              style={{
                clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
              }}
            >
              Agregar
            </button>
          </div>
        </div>

        {/* Hover info adicional */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-[#FF5722] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white font-black text-center uppercase text-sm">
            Click para ver detalles →
          </p>
        </div>
      </div>
    </div>
  );
}
