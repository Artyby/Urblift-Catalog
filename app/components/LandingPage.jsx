export default function LandingPage({ setCurrentPage }) {
  return (
    <div className="bg-[#0A0A0A]">
      {/* ==================== HERO - INTOCABLE ==================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background con overlay más intenso */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg)",
            filter: "brightness(0.3) contrast(1.2)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/40 to-[#0A0A0A]" />

        {/* Decoración urbana - esquinas */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-[#FF5722] opacity-60" />
        <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-[#76FF03] opacity-60" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-[#00BCD4] opacity-60" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-[#FF5722] opacity-60" />

        <div className="relative z-10 text-center px-4 max-w-6xl">
          {/* Badge superior */}
          <div className="mb-8 inline-block animate-pulse">
            <div className="relative">
              <div className="absolute inset-0 bg-[#FF5722] blur-lg opacity-50" />
              <span className="relative bg-[#FF5722] text-white px-8 py-3 font-black text-base uppercase tracking-widest transform -rotate-2 inline-block shadow-2xl border-2 border-white">
                DROP 2026 DISPONIBLE
              </span>
            </div>
          </div>

          {/* Título principal - DOMINANTE */}
          <h1
            className="text-7xl md:text-[10rem] lg:text-[12rem] font-black text-white mb-8 uppercase leading-none tracking-tight"
            style={{
              fontFamily: "var(--font-boomster)",
              textShadow: `
                8px 8px 0 #FF5722,
                -4px -4px 0 #76FF03,
                12px 12px 0 #000000
              `,
              WebkitTextStroke: "2px #000",
            }}
          >
            URBAN
            <br />
            UPLIFTED
          </h1>

          {/* Tagline */}
          <div className="mb-6">
            <p className="text-3xl md:text-5xl text-[#76FF03] font-black uppercase tracking-[0.2em] mb-3">
              FE / CALLE / IDENTIDAD
            </p>
            <div className="w-24 h-1 bg-[#FF5722] mx-auto mb-6" />
          </div>

          {/* Copy principal */}
          <p className="text-white text-2xl md:text-3xl font-black mb-12 max-w-3xl mx-auto uppercase leading-tight">
            La fe también se viste en la calle
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <button
              onClick={() => setCurrentPage("catalog")}
              className="group relative bg-[#FF5722] text-white px-14 py-7 text-2xl font-black uppercase overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl"
              style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
            >
              <span className="relative z-10 flex items-center gap-3">
                VER COLECCIÓN
              </span>
              <div className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[#FF5722] font-black z-20 transition-opacity duration-300">
                VER COLECCIÓN
              </span>
            </button>

            <button
              onClick={() => setCurrentPage("contact")}
              className="border-4 border-[#76FF03] text-[#76FF03] px-14 py-7 text-2xl font-black hover:bg-[#76FF03] hover:text-[#0A0A0A] transition-all uppercase hover:scale-105 hover:shadow-2xl"
            >
              CONTACTAR
            </button>
          </div>

          {/* Proof social */}
          <div className="flex items-center justify-center gap-4 text-white/60 text-sm font-bold">
            <span>Envíos a todo RD</span>
            <span className="text-[#76FF03]">•</span>
            <span>Diseños exclusivos</span>
            <span className="text-[#FF5722]">•</span>
            <span>Mensaje que impacta</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-1 h-20 bg-gradient-to-b from-[#FF5722] via-[#76FF03] to-transparent" />
        </div>
      </section>

      {/* ==================== COLECCIÓN DESTACADA - PROFESIONAL ==================== */}
      <section className="py-32 px-4 bg-[#0A0A0A] relative overflow-hidden">
        {/* Barra superior */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF5722] via-[#76FF03] to-[#00BCD4]" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header minimalista */}
          <div className="mb-20 text-center">
            <div className="inline-block mb-6">
              <span className="text-[#FF5722] text-sm font-black uppercase tracking-[0.3em]">
                NUEVA COLECCIÓN
              </span>
            </div>
            <h2
              className="text-5xl md:text-7xl font-black text-white uppercase mb-6 leading-tight"
              style={{
                fontFamily: "var(--font-boomster)",
                textShadow: "4px 4px 0 #FF5722",
              }}
            >
              EXPRESSION
              <br />
              <span className="text-[#76FF03]">SERIES</span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto font-medium">
              Diseños que reflejan identidad, fe y cultura urbana en cada
              prenda.
            </p>
          </div>

          {/* Grid de productos con fotos reales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Producto 1 - Good Pastor Green */}
            <div className="group relative overflow-hidden bg-[#0A0A0A] border border-white/10 hover:border-[#76FF03] transition-all duration-500">
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src="https://ik.imagekit.io/urblift/LAMBANDLION/REDEEMED%20DUALITY%20Hoodies/ChatGPT%20Image%203%20feb%202026,%2006_29_51%20p.m..png"
                  alt="Good Pastor Tee - Green"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />

                {/* Tag flotante */}
                <div className="absolute top-6 right-6">
                  <span className="bg-[#76FF03] text-[#0A0A0A] px-4 py-2 text-xs font-black uppercase">
                    NUEVO
                  </span>
                </div>
              </div>

              {/* Info del producto */}
              <div className="p-6">
                <h3 className="text-white text-xl font-black uppercase mb-2">
                  Good Pastor Tee
                </h3>
                <p className="text-white/60 text-sm mb-4 font-medium">
                  Expression Series II
                </p>
                <button
                  onClick={() => setCurrentPage("catalog")}
                  className="w-full bg-transparent border-2 border-[#76FF03] text-[#76FF03] py-3 font-black uppercase text-sm hover:bg-[#76FF03] hover:text-[#0A0A0A] transition-all"
                >
                  Ver Producto
                </button>
              </div>
            </div>

            {/* Producto 2 - Good Pastor Black */}
            <div className="group relative overflow-hidden bg-[#0A0A0A] border border-white/10 hover:border-[#FF5722] transition-all duration-500">
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src="https://ik.imagekit.io/Glatevix/UrbLift/ExpresssionWhiteTeeModelOne.jpeg?updatedAt=1766895667630"
                  alt="Good Pastor Tee - Black"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-6">
                <h3 className="text-white text-xl font-black uppercase mb-2">
                  Good Pastor Tee
                </h3>
                <p className="text-white/60 text-sm mb-4 font-medium">
                  Expression Series II
                </p>
                <button
                  onClick={() => setCurrentPage("catalog")}
                  className="w-full bg-transparent border-2 border-[#FF5722] text-[#FF5722] py-3 font-black uppercase text-sm hover:bg-[#FF5722] hover:text-white transition-all"
                >
                  Ver Producto
                </button>
              </div>
            </div>

            {/* Producto 3 - Expression Models */}
            <div className="group relative overflow-hidden bg-[#0A0A0A] border border-white/10 hover:border-[#00BCD4] transition-all duration-500">
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src="https://ik.imagekit.io/Glatevix/UrbLift/URBLIFTNEWLOGO.png?updatedAt=1769988506525"
                  alt="Expression Collection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-6">
                <h3 className="text-white text-xl font-black uppercase mb-2">
                  Expression Tee
                </h3>
                <p className="text-white/60 text-sm mb-4 font-medium">
                  Multiple Styles
                </p>
                <button
                  onClick={() => setCurrentPage("catalog")}
                  className="w-full bg-transparent border-2 border-[#00BCD4] text-[#00BCD4] py-3 font-black uppercase text-sm hover:bg-[#00BCD4] hover:text-[#0A0A0A] transition-all"
                >
                  Ver Producto
                </button>
              </div>
            </div>
          </div>

          {/* CTA para ver toda la colección */}
          <div className="mt-16 text-center">
            <button
              onClick={() => setCurrentPage("catalog")}
              className="inline-flex items-center gap-3 bg-white text-[#0A0A0A] px-12 py-5 font-black uppercase text-lg hover:scale-105 transition-all"
            >
              <span>VER COLECCIÓN COMPLETA</span>
              <span className="text-[#FF5722]">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ==================== VALORES DE MARCA - MINIMALISTA ==================== */}
      <section className="py-32 px-4 bg-gradient-to-b from-[#0A0A0A] to-[#0f0f0f] relative">
        <div className="max-w-7xl mx-auto">
          {/* Grid de 4 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {/* Envíos */}
            <div className="group p-10 bg-[#0A0A0A] border border-white/10 hover:border-[#FF5722] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#FF5722] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <div className="relative z-10">
                <h3 className="text-xl font-black text-white uppercase mb-3 tracking-wider">
                  ENVÍOS
                </h3>
                <p className="text-white/60 text-sm font-medium leading-relaxed">
                  Entrega rápida a todo República Dominicana con seguimiento en
                  tiempo real.
                </p>
              </div>
            </div>

            {/* Calidad */}
            <div className="group p-10 bg-[#0A0A0A] border border-white/10 hover:border-[#76FF03] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#76FF03] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <div className="relative z-10">
                <h3 className="text-xl font-black text-white uppercase mb-3 tracking-wider">
                  CALIDAD
                </h3>
                <p className="text-white/60 text-sm font-medium leading-relaxed">
                  Materiales premium seleccionados con estándares
                  internacionales.
                </p>
              </div>
            </div>

            {/* Diseño */}
            <div className="group p-10 bg-[#0A0A0A] border border-white/10 hover:border-[#00BCD4] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#00BCD4] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <div className="relative z-10">
                <h3 className="text-xl font-black text-white uppercase mb-3 tracking-wider">
                  DISEÑO
                </h3>
                <p className="text-white/60 text-sm font-medium leading-relaxed">
                  Piezas únicas que combinan arte urbano con mensaje profundo.
                </p>
              </div>
            </div>

            {/* Fe */}
            <div className="group p-10 bg-[#0A0A0A] border border-white/10 hover:border-[#FF5722] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#FF5722] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <div className="relative z-10">
                <h3 className="text-xl font-black text-white uppercase mb-3 tracking-wider">
                  FE
                </h3>
                <p className="text-white/60 text-sm font-medium leading-relaxed">
                  Cada prenda lleva un mensaje que trasciende la moda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LOOKBOOK - IMAGEN GRANDE ==================== */}
      <section className="relative h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://ik.imagekit.io/Glatevix/UrbLift/ExpresssionWhiteTeeModelOne.jpeg?updatedAt=1766895667630)",
            filter: "brightness(0.7) contrast(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 to-transparent" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-xl">
              <span className="text-[#FF5722] text-sm font-black uppercase tracking-[0.3em] mb-4 block">
                URBLIFT LIFESTYLE
              </span>
              <h2
                className="text-5xl md:text-7xl font-black text-white uppercase mb-6 leading-tight"
                style={{
                  fontFamily: "var(--font-boomster)",
                  textShadow: "3px 3px 0 #FF5722",
                }}
              >
                VIVE TU
                <br />
                IDENTIDAD
              </h2>
              <p className="text-white/80 text-lg mb-8 font-medium leading-relaxed">
                Más que ropa. Es una declaración de quién eres y en qué crees.
              </p>
              <button
                onClick={() => setCurrentPage("catalog")}
                className="bg-[#FF5722] text-white px-10 py-4 font-black uppercase hover:scale-105 transition-all inline-flex items-center gap-3"
              >
                <span>EXPLORAR LOOKBOOK</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA FINAL - CLEAN & POWERFUL ==================== */}
      <section className="py-32 px-4 relative overflow-hidden bg-[#0A0A0A]">
        {/* Grid decorativo sutil */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
            linear-gradient(#FF5722 1px, transparent 1px),
            linear-gradient(90deg, #FF5722 1px, transparent 1px)
          `,
            backgroundSize: "100px 100px",
          }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <span className="text-[#76FF03] text-sm font-black uppercase tracking-[0.3em] mb-6 block">
            NO TE QUEDES ATRÁS
          </span>

          <h2
            className="text-6xl md:text-8xl font-black text-white mb-8 uppercase leading-none"
            style={{
              fontFamily: "var(--font-boomster)",
              textShadow: "6px 6px 0 #FF5722",
            }}
          >
            ÚNETE AL
            <br />
            MOVIMIENTO
          </h2>

          <p className="text-2xl text-white/70 font-medium mb-12">
            Streetwear con propósito eterno
          </p>

          <button
            onClick={() => setCurrentPage("catalog")}
            className="group relative bg-[#FF5722] text-white px-16 py-6 text-xl font-black uppercase overflow-hidden transition-all duration-300 hover:scale-105"
            style={{ clipPath: "polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)" }}
          >
            <span className="relative z-10">COMPRAR AHORA</span>
            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[#FF5722] font-black z-20 transition-opacity duration-300">
              COMPRAR AHORA
            </span>
          </button>

          {/* Stats minimalistas */}
          <div className="mt-20 grid grid-cols-3 gap-12 max-w-2xl mx-auto pt-12 border-t border-white/10">
            <div>
              <div className="text-3xl font-black text-[#FF5722] mb-2">
                100%
              </div>
              <div className="text-white/60 text-sm font-medium uppercase tracking-wider">
                Exclusivo
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#76FF03] mb-2">
                24/7
              </div>
              <div className="text-white/60 text-sm font-medium uppercase tracking-wider">
                Soporte
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#00BCD4] mb-2">RD</div>
              <div className="text-white/60 text-sm font-medium uppercase tracking-wider">
                Nacional
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
