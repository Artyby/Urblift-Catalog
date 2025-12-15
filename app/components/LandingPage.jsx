export default function LandingPage({ setCurrentPage }) {
  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero principal con imagen de fondo */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg)",
            filter: "brightness(0.4)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/50 to-[#0A0A0A]" />

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <div className="mb-8 inline-block">
            <span className="bg-[#FF5722] text-white px-6 py-2 font-black text-sm uppercase tracking-wider transform -rotate-2 inline-block">
              Nueva Colección 2025
            </span>
          </div>

          <h1
            className="text-6xl md:text-9xl font-black text-white mb-6 uppercase leading-none"
            style={{
              textShadow: "8px 8px 0 #FF5722, -3px -3px 0 #76FF03",
              WebkitTextStroke: "3px #000",
            }}
          >
            URBAN UPLIFTED
          </h1>

          <p className="text-2xl md:text-4xl text-[#76FF03] font-black mb-4 uppercase tracking-widest">
            Fe • Cultura • Streetwear
          </p>

          <p className="text-white text-lg md:text-xl font-bold mb-12 max-w-2xl mx-auto">
            Expresá tu fe con estilo. Ropa urbana con mensaje que impacta.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage("catalog")}
              className="bg-[#FF5722] text-white px-12 py-6 text-2xl font-black hover:scale-105 transition-transform uppercase"
              style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
            >
              Ver Colección
            </button>
            <button
              onClick={() => setCurrentPage("contact")}
              className="border-4 border-[#76FF03] text-[#76FF03] px-12 py-6 text-2xl font-black hover:bg-[#76FF03] hover:text-[#0A0A0A] transition-all uppercase"
            >
              Contactar
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-1 h-16 bg-gradient-to-b from-[#FF5722] to-transparent" />
        </div>
      </section>

      {/* Sección de destacados con imágenes */}
      <section className="py-20 px-4 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF5722] via-[#76FF03] to-[#00BCD4]" />

        <div className="max-w-7xl mx-auto">
          <h2
            className="text-5xl md:text-7xl font-black text-white mb-4 uppercase text-center"
            style={{ textShadow: "4px 4px 0 #FF5722" }}
          >
            Lo Más Reciente
          </h2>
          <p className="text-center text-[#76FF03] font-black text-xl mb-16 uppercase tracking-wider">
            Diseños que hablan, estilo que impacta
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div
              className="group relative overflow-hidden cursor-pointer"
              onClick={() => setCurrentPage("catalog")}
            >
              <div className="relative h-[500px] overflow-hidden">
                <img
                  src="https://i.pinimg.com/1200x/95/55/c8/9555c895b3b806e25e15ecc762c16bde.jpg"
                  alt="Camisetas"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-3xl font-black uppercase mb-2">
                    Camisetas
                  </h3>
                  <p className="text-[#76FF03] font-bold">
                    Diseños únicos con mensaje
                  </p>
                </div>
                <div className="absolute top-4 right-4 bg-[#FF5722] text-white px-4 py-2 font-black text-sm uppercase transform rotate-3">
                  NUEVO
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="group relative overflow-hidden cursor-pointer"
              onClick={() => setCurrentPage("catalog")}
            >
              <div className="relative h-[500px] overflow-hidden">
                <img
                  src="https://i.pinimg.com/1200x/60/b2/b2/60b2b2dbc1c2fdf4cc8a8921a5c28162.jpg"
                  alt="Hoodies"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-3xl font-black uppercase mb-2">
                    Hoodies
                  </h3>
                  <p className="text-[#76FF03] font-bold">
                    Comodidad con estilo
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="group relative overflow-hidden cursor-pointer"
              onClick={() => setCurrentPage("catalog")}
            >
              <div className="relative h-[500px] overflow-hidden">
                <img
                  src="https://i.pinimg.com/1200x/80/6b/f5/806bf5d074f563eb942b5f081a5b41bf.jpg"
                  alt="Accesorios"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-3xl font-black uppercase mb-2">
                    Accesorios
                  </h3>
                  <p className="text-[#76FF03] font-bold">Completa tu look</p>
                </div>
                <div className="absolute top-4 right-4 bg-[#76FF03] text-[#0A0A0A] px-4 py-2 font-black text-sm uppercase transform -rotate-3">
                  HOT
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de valores/info */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0A0A0A] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-8 border-4 border-[#FF5722] bg-[#0A0A0A] transform hover:scale-105 transition-transform">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-2xl font-black text-white uppercase mb-2">
                Envíos
              </h3>
              <p className="text-[#76FF03] font-bold">Rápidos a todo el país</p>
            </div>

            <div className="text-center p-8 border-4 border-[#76FF03] bg-[#0A0A0A] transform hover:scale-105 transition-transform">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-2xl font-black text-white uppercase mb-2">
                Calidad
              </h3>
              <p className="text-[#76FF03] font-bold">Materiales premium</p>
            </div>

            <div className="text-center p-8 border-4 border-[#00BCD4] bg-[#0A0A0A] transform hover:scale-105 transition-transform">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-2xl font-black text-white uppercase mb-2">
                Diseños
              </h3>
              <p className="text-[#76FF03] font-bold">Exclusivos y únicos</p>
            </div>

            <div className="text-center p-8 border-4 border-[#FF5722] bg-[#0A0A0A] transform hover:scale-105 transition-transform">
              <div className="text-6xl mb-4">🙏</div>
              <h3 className="text-2xl font-black text-white uppercase mb-2">
                Fe
              </h3>
              <p className="text-[#76FF03] font-bold">Mensaje que inspira</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1647121/pexels-photo-1647121.jpeg)",
            filter: "brightness(0.3)",
          }}
        />
        <div className="absolute inset-0 bg-[#FF5722]/20" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2
            className="text-5xl md:text-7xl font-black text-white mb-6 uppercase"
            style={{ textShadow: "6px 6px 0 #FF5722" }}
          >
            Unite al Movimiento
          </h2>
          <p className="text-2xl text-white font-bold mb-12">
            Ropa que habla, estilo que transforma
          </p>
          <button
            onClick={() => setCurrentPage("catalog")}
            className="bg-[#76FF03] text-[#0A0A0A] px-16 py-8 text-3xl font-black hover:scale-110 transition-transform uppercase"
            style={{ clipPath: "polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)" }}
          >
            Comprar Ahora
          </button>
        </div>
      </section>
    </div>
  );
}
