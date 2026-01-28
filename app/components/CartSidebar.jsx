"use client";
import { X } from "lucide-react";

export default function CartSidebar({
  cart,
  isCartOpen,
  setIsCartOpen,
  updateQuantity,
  removeFromCart,
  calculateTotal,
  sendWhatsAppOrder,
}) {
  if (!isCartOpen) return null;

  const onClose = () => setIsCartOpen(false);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-[#0A0A0A]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="sticky top-0 bg-[#0A0A0A] p-6 z-10 border-b border-white/20">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black text-white uppercase">
              CARRITO
            </h3>
            <button
              onClick={onClose}
              className="bg-[#FF5722] text-white p-2 rounded-full hover:scale-110 transition-transform"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6 text-gray-300">
                <svg
                  className="w-32 h-32 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <p className="text-xl text-gray-500 font-black uppercase mb-2">
                TU CARRITO ESTÁ VACÍO
              </p>
              <p className="text-gray-400 font-medium">
                Agrega productos para comenzar
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.cartId}
                    className="border border-gray-200 p-4 flex gap-4 bg-gray-50"
                  >
                    <img
                      src={item.main_image_url}
                      alt={item.name}
                      className="w-24 h-24 object-cover"
                    />

                    <div className="flex-1">
                      <h4 className="font-black text-[#0A0A0A] uppercase text-sm mb-1">
                        {item.name}
                      </h4>

                      {/* Mostrar talla seleccionada */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#76FF03] text-[#0A0A0A] px-2 py-1 font-black text-xs uppercase">
                          TALLA: {item.selectedSize}
                        </span>
                      </div>

                      <p className="text-[#FF5722] font-black text-lg mb-2">
                        ${item.price} c/u
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.cartId, -1)}
                          className="bg-[#0A0A0A] text-white w-8 h-8 font-black hover:bg-[#FF5722] transition-colors"
                        >
                          -
                        </button>
                        <span className="font-black text-black px-4 text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, 1)}
                          className="bg-[#0A0A0A] text-white w-8 h-8 font-black hover:bg-[#76FF03] hover:text-[#0A0A0A] transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="ml-auto text-[#FF5722] hover:text-red-700 font-black text-sm uppercase"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <p className="text-gray-600 font-bold text-sm mt-2">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-gray-200 pt-6 mb-6">
                <div className="flex justify-between mb-6">
                  <span className="text-2xl font-black text-black uppercase">
                    TOTAL
                  </span>
                  <span className="text-5xl font-black text-[#FF5722]">
                    ${calculateTotal()}
                  </span>
                </div>

                <button
                  onClick={sendWhatsAppOrder}
                  className="w-full bg-[#76FF03] text-[#0A0A0A] py-6 text-xl font-black uppercase hover:scale-105 transition-transform shadow-lg"
                >
                  FINALIZAR POR WHATSAPP
                </button>

                <p className="text-center text-gray-500 text-xs mt-4 font-medium">
                  Serás redirigido a WhatsApp para completar tu pedido
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
