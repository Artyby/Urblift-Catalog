export default function ContactPage({
  contactForm,
  setContactForm,
  sendContactForm,
}) {
  return (
    <section className="min-h-screen bg-[#0A0A0A] py-20 px-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-20 left-10 text-[#FF5722] text-[25rem] font-black pointer-events-none"
          style={{ fontFamily: "var(--font-boomster)" }}
        >
          X
        </div>
        <div
          className="absolute bottom-10 right-10 text-[#76FF03] text-[20rem] font-black pointer-events-none"
          style={{ fontFamily: "var(--font-boomster)" }}
        >
          +
        </div>
      </div>

      {/* Grid decorativo */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
          linear-gradient(#FF5722 1px, transparent 1px),
          linear-gradient(90deg, #76FF03 1px, transparent 1px)
        `,
          backgroundSize: "100px 100px",
        }}
      />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Header con arte */}
        <div className="text-center mb-16">
          <span className="text-[#FF5722] text-sm font-black uppercase tracking-[0.3em] mb-4 block">
            CONECTA CON NOSOTROS
          </span>
          <h2
            className="text-6xl md:text-8xl font-black text-white mb-6 uppercase"
            style={{
              fontFamily: "var(--font-boomster)",
              textShadow: "6px 6px 0 #FF5722, -3px -3px 0 #76FF03",
            }}
          >
            HABLEMOS
          </h2>
          <p className="text-white/70 text-lg font-medium max-w-2xl mx-auto">
            ¿Tienes preguntas? ¿Ideas? ¿Colaboraciones? Estamos aquí para
            escucharte.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Columna izquierda - Info de contacto */}
          <div className="space-y-8">
            {/* Card de WhatsApp */}
            <div className="group bg-[#0A0A0A] border-2 border-[#76FF03] p-8 relative overflow-hidden hover:border-[#FF5722] transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#76FF03] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white uppercase mb-3 tracking-wider">
                  WHATSAPP
                </h3>
                <p className="text-white/70 mb-4 font-medium">
                  Respuesta rápida y directa
                </p>
                <a
                  href="https://wa.me/18295237077"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#76FF03] text-[#0A0A0A] px-6 py-3 font-black uppercase text-sm hover:scale-105 transition-all"
                >
                  <span>CHATEAR AHORA</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Card de Instagram */}
            <div className="group bg-[#0A0A0A] border-2 border-[#FF5722] p-8 relative overflow-hidden hover:border-[#76FF03] transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#FF5722] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white uppercase mb-3 tracking-wider">
                  INSTAGRAM
                </h3>
                <p className="text-white/70 mb-4 font-medium">
                  Síguenos para nuevos drops
                </p>
                <a
                  href="https://instagram.com/elevacion_urbana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#FF5722] text-white px-6 py-3 font-black uppercase text-sm hover:scale-105 transition-all"
                >
                  <span>@URBLIFT</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Card de Email */}
            <div className="group bg-[#0A0A0A] border-2 border-[#00BCD4] p-8 relative overflow-hidden hover:border-[#76FF03] transition-all duration-300">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#00BCD4] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white uppercase mb-3 tracking-wider">
                  EMAIL
                </h3>
                <p className="text-white/70 mb-2 font-medium">
                  Para consultas detalladas
                </p>
                <a
                  href="mailto:urbanuplifted@gmail.com"
                  className="text-[#00BCD4] font-bold hover:text-white transition-colors"
                >
                  UrbanUplifted@gmail.com
                </a>
              </div>
            </div>

            {/* Horarios */}
            <div className="bg-gradient-to-br from-[#FF5722] to-[#0A0A0A] p-1">
              <div className="bg-[#0A0A0A] p-6">
                <h3 className="text-xl font-black text-white uppercase mb-3">
                  HORARIOS DE ATENCIÓN
                </h3>
                <div className="space-y-2 text-white/70 text-sm font-medium">
                  <p>Lunes - Viernes: 9:00 AM - 5:00 PM</p>
                  <p>Sábados: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Formulario */}
          <div className="bg-[#1a1a1a] border-2 border-white/10 relative overflow-hidden">
            {/* Barra superior decorativa */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF5722] via-[#76FF03] to-[#00BCD4]" />

            <div className="p-8 pt-12">
              <h3 className="text-3xl font-black text-white uppercase mb-2">
                ENVÍANOS UN MENSAJE
              </h3>
              <p className="text-white/50 mb-8 font-medium">
                Te responderemos lo antes posible
              </p>

              <div className="space-y-6">
                {/* Input Nombre */}
                <div className="relative">
                  <label className="block text-white/70 text-xs font-black uppercase mb-2 tracking-wider">
                    NOMBRE
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre completo"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    className="w-full bg-[#0A0A0A] border-2 border-white/20 focus:border-[#FF5722] text-white px-4 py-4 font-medium focus:outline-none transition-all placeholder-white/30"
                  />
                </div>

                {/* Input Email */}
                <div className="relative">
                  <label className="block text-white/70 text-xs font-black uppercase mb-2 tracking-wider">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    className="w-full bg-[#0A0A0A] border-2 border-white/20 focus:border-[#76FF03] text-white px-4 py-4 font-medium focus:outline-none transition-all placeholder-white/30"
                  />
                </div>

                {/* Textarea Mensaje */}
                <div className="relative">
                  <label className="block text-white/70 text-xs font-black uppercase mb-2 tracking-wider">
                    MENSAJE
                  </label>
                  <textarea
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    rows="6"
                    className="w-full bg-[#0A0A0A] border-2 border-white/20 focus:border-[#00BCD4] text-white px-4 py-4 font-medium focus:outline-none transition-all placeholder-white/30 resize-none"
                  />
                </div>

                {/* Botón Submit */}
                <button
                  onClick={sendContactForm}
                  disabled={
                    !contactForm.name ||
                    !contactForm.email ||
                    !contactForm.message
                  }
                  className="w-full bg-[#FF5722] text-white py-5 font-black uppercase text-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#76FF03] hover:text-[#0A0A0A] transition-all hover:scale-105 disabled:hover:scale-100 disabled:hover:bg-[#FF5722] disabled:hover:text-white"
                  style={{
                    clipPath: "polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)",
                  }}
                >
                  ENVIAR VÍA WHATSAPP
                </button>

                <p className="text-white/40 text-xs text-center font-medium">
                  Al enviar, serás redirigido a WhatsApp para completar el envío
                </p>
              </div>
            </div>

            {/* Decoración inferior */}
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-white/10" />
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-16 grid grid-cols-3 gap-6 text-center">
          <div className="p-6 border-2 border-white/10 hover:border-[#FF5722] transition-all">
            <div className="text-4xl font-black text-[#FF5722] mb-2">24/7</div>
            <div className="text-white/60 text-sm font-medium uppercase">
              Respuesta
            </div>
          </div>
          <div className="p-6 border-2 border-white/10 hover:border-[#76FF03] transition-all">
            <div className="text-4xl font-black text-[#76FF03] mb-2">100%</div>
            <div className="text-white/60 text-sm font-medium uppercase">
              Soporte
            </div>
          </div>
          <div className="p-6 border-2 border-white/10 hover:border-[#00BCD4] transition-all">
            <div className="text-4xl font-black text-[#00BCD4] mb-2">RD</div>
            <div className="text-white/60 text-sm font-medium uppercase">
              Nacional
            </div>
          </div>
        </div>
      </div>

      {/* Decoraciones de esquina */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#FF5722] opacity-30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#76FF03] opacity-30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[#00BCD4] opacity-30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#FF5722] opacity-30" />
    </section>
  );
}
