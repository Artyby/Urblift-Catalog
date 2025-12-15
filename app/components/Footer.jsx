export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t-4 border-[#00BCD4] py-12">
      <div className="max-w-7xl mx-auto px-4 text-center  flex flex-col items-center">
        <img
          src="/Logo.svg"
          alt="URBLIFT Logo"
          className="w-15 h-15 md:w-22 md:h-22"
        />
        <h3
          className="text-4xl font-black text-white mb-4 uppercase"
          style={{ textShadow: "6px 6px 0 #00BCD4" }}
        >
          URBLIFT
        </h3>
        {/* <p className="text-[#76FF03] font-black mb-6 uppercase tracking-widest">
          Cultura • Graffiti • Fe
        </p> */}
      </div>
    </footer>
  );
}
