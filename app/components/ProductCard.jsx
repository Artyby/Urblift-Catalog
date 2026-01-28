export default function ProductCard({ product, onSelect }) {
  const allImages =
    product.images && product.images.length > 0
      ? [product.main_image_url, ...product.images]
      : [product.main_image_url];

  const handleShare = async (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}?product=${product.id}`;
    try {
      await navigator.clipboard.writeText(url);
      const Swal = (await import("sweetalert2")).default;
      Swal.fire({
        title: "Enlace copiado",
        text: "El link del producto ha sido copiado",
        icon: "success",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#FF5722",
        confirmButtonText: "Perfecto",
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  return (
    <div
      className="group cursor-pointer relative bg-[#0A0A0A] border border-white/10 hover:border-[#FF5722] transition-all duration-500 overflow-hidden"
      onClick={() => onSelect(product)}
    >
      {/* Imagen del producto */}
      <div className="relative h-[400px] overflow-hidden bg-[#0A0A0A]">
        {allImages.length > 1 ? (
          <div className="relative w-full h-full">
            {allImages.slice(0, 2).map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`${product.name} - imagen ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  index === 0
                    ? "opacity-100 group-hover:opacity-0"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />
            ))}

            {/* Indicador de múltiples imágenes */}
            <div className="absolute bottom-3 right-3 bg-[#0A0A0A]/80 text-white px-3 py-1 rounded-full font-black text-xs">
              {allImages.length} FOTOS
            </div>
          </div>
        ) : (
          <img
            src={product.main_image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        )}

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />

        {/* Badge de estilo - Superior derecho */}
        <div className="absolute top-4 right-4 bg-[#76FF03] text-[#0A0A0A] px-3 py-2 font-black text-xs uppercase">
          {product.style_tag}
        </div>

        {/* Badge de nuevo - Superior izquierdo */}
        {product.is_new && (
          <div className="absolute top-4 left-4 bg-[#FF5722] text-white px-3 py-2 font-black text-xs uppercase">
            NUEVO
          </div>
        )}
      </div>

      {/* Info del producto */}
      <div className="p-6 bg-[#0A0A0A]">
        <h3 className="text-white text-lg font-black uppercase mb-2 group-hover:text-[#76FF03] transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-white/50 text-sm font-medium mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-[#FF5722] text-2xl font-black">
              ${product.price}
            </span>
            {product.old_price && (
              <span className="text-white/30 text-sm font-bold line-through">
                ${product.old_price}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare(e);
            }}
            className="bg-transparent border-2 border-[#76FF03] text-[#76FF03] px-4 py-2 font-black text-xs uppercase hover:bg-[#76FF03] hover:text-[#0A0A0A] transition-all"
          >
            COMPARTIR
          </button>
        </div>
      </div>

      {/* Hover overlay con CTA */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-[#FF5722] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between">
        <p className="text-white font-black uppercase text-sm">VER DETALLES</p>
        <span className="text-white text-xl">→</span>
      </div>
    </div>
  );
}
