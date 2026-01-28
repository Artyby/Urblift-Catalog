export default function Footer({ setCurrentPage }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden">
      {/* Barra superior decorativa */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF5722] via-[#76FF03] to-[#00BCD4]" />

      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute bottom-0 left-1/4 text-[#FF5722] text-[15rem] font-black pointer-events-none"
          style={{ fontFamily: "var(--font-boomster)" }}
        >
          URBLIFT
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Columna 1 - Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img src="/Logo.svg" alt="URBLIFT Logo" className="w-16 h-16" />
              <h3
                className="text-4xl font-black text-white uppercase"
                style={{
                  fontFamily: "var(--font-boomster)",
                  textShadow: "3px 3px 0 #FF5722",
                }}
              >
                URBLIFT
              </h3>
            </div>
            <p className="text-white/60 font-medium text-sm mb-6 leading-relaxed">
              Streetwear con propósito. Diseños exclusivos que combinan fe,
              cultura urbana y arte. República Dominicana.
            </p>
            <div className="flex items-center gap-3 text-sm font-black uppercase text-[#76FF03]">
              <span>FE</span>
              <span className="text-white/30">•</span>
              <span>CALLE</span>
              <span className="text-white/30">•</span>
              <span>IDENTIDAD</span>
            </div>
          </div>

          {/* Columna 2 - Links rápidos */}
          <div>
            <h4 className="text-white text-xl font-black uppercase mb-6 tracking-wider">
              NAVEGACIÓN
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => setCurrentPage && setCurrentPage("landing")}
                  className="text-white/60 hover:text-[#FF5722] font-medium text-sm transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage && setCurrentPage("catalog")}
                  className="text-white/60 hover:text-[#76FF03] font-medium text-sm transition-colors"
                >
                  Catálogo
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage && setCurrentPage("contact")}
                  className="text-white/60 hover:text-[#00BCD4] font-medium text-sm transition-colors"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Redes Sociales */}
          <div>
            <h4 className="text-white text-xl font-black uppercase mb-6 tracking-wider">
              SÍGUENOS
            </h4>
            <div className="space-y-4">
              {/* Instagram */}
              <a
                href="https://instagram.com/elevacion_urbana"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 border-2 border-white/10 hover:border-[#FF5722] transition-all"
              >
                <div className="w-10 h-10 bg-[#FF5722] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-black text-sm">INSTAGRAM</div>
                  <div className="text-white/50 text-xs">@urblift</div>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/18295237077"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 border-2 border-white/10 hover:border-[#76FF03] transition-all"
              >
                <div className="w-10 h-10 bg-[#76FF03] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5 text-[#0A0A0A]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-black text-sm">WHATSAPP</div>
                  <div className="text-white/50 text-xs">+1 829-523-7077</div>
                </div>
              </a>

              {/* TikTok - opcional */}
              <a
                href="https://tiktok.com/@urblift"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 border-2 border-white/10 hover:border-[#00BCD4] transition-all"
              >
                <div className="w-10 h-10 bg-[#00BCD4] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-black text-sm">TIKTOK</div>
                  <div className="text-white/50 text-xs">@urblift</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-12 p-8 border-2 border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF5722] to-[#76FF03]" />
          <div className="relative z-10">
            <h4 className="text-white text-2xl font-black uppercase mb-2">
              ÚNETE A LA COMUNIDAD
            </h4>
            <p className="text-white/60 mb-6 font-medium text-sm">
              Recibe nuevos drops, ofertas exclusivas y contenido directo a tu
              WhatsApp
            </p>
            <a
              href="https://wa.me/18295237077?text=Hola! Quiero unirme a la comunidad URBLIFT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#FF5722] text-white px-8 py-4 font-black uppercase hover:scale-105 transition-all"
            >
              <span>UNIRME AHORA</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm font-medium">
              © {currentYear} URBLIFT. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-xs font-medium text-white/40">
              <a href="#" className="hover:text-[#FF5722] transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="hover:text-[#76FF03] transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-[#00BCD4] transition-colors">
                Envíos y Devoluciones
              </a>
            </div>
          </div>
        </div>

        {/* Made with love */}
        <div className="mt-8 text-center">
          <p className="text-white/30 text-xs font-medium">
            Hecho con <span className="text-[#FF5722]">■</span> en República
            Dominicana
          </p>
        </div>
      </div>

      {/* Decoraciones de esquina */}
      <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-[#FF5722] opacity-20" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-[#76FF03] opacity-20" />
    </footer>
  );
}
