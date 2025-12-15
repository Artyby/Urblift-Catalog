export default function ContactPage({
  contactForm,
  setContactForm,
  sendContactForm,
}) {
  return (
    <section className="min-h-screen bg-[#0A0A0A] py-20 px-4 flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        <h2
          className="text-5xl font-black text-white mb-12 uppercase text-center"
          style={{ textShadow: "4px 4px 0 #00BCD4" }}
        >
          CONTACTO
        </h2>
        <div className="bg-gradient-to-br from-[#000000] to-[#ec5c30] p-8 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF5722]  to-[#000000]"></div>
          <div className="border-2 border-dashed border-white p-6">
            <h3 className="text-3xl font-black text-white uppercase text-center mb-6">
              URBLIFT
            </h3>
            <input
              type="text"
              placeholder="Tu nombre"
              value={contactForm.name}
              onChange={(e) =>
                setContactForm({ ...contactForm, name: e.target.value })
              }
              className="w-full border-b-2 border-white px-2 py-2 font-bold mb-4 text-white placeholder-white focus:outline-none"
            />
            <input
              type="email"
              placeholder="tu@email.com"
              value={contactForm.email}
              onChange={(e) =>
                setContactForm({ ...contactForm, email: e.target.value })
              }
              className="w-full border-b-2 border-white px-2 py-2 font-bold mb-4 text-white placeholder-white focus:outline-none"
            />
            <textarea
              placeholder="Tu mensaje"
              value={contactForm.message}
              onChange={(e) =>
                setContactForm({ ...contactForm, message: e.target.value })
              }
              rows="5"
              className="w-full border-2 border-white px-2 py-2 font-bold mb-4 text-white placeholder-white focus:outline-none"
            />
            <button
              onClick={sendContactForm}
              disabled={
                !contactForm.name || !contactForm.email || !contactForm.message
              }
              className="w-full bg-[#0A0A0A] text-white py-4 font-black uppercase disabled:opacity-50 hover:bg-[#FF5722] transition-colors"
            >
              Enviar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
