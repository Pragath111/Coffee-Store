import { useEffect, useState } from "react";
import logo from "../../assets/logo.jpg";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/#about", label: "Our Story" },
  { href: "/#timeline", label: "Heritage" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 glass-dark" : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <img src={logo} alt="Coorg Coffee Logo" className="h-14 w-14 sm:h-16 sm:w-16 object-contain rounded-xl shadow-gold" />
          <span className="font-display text-cream text-xl tracking-wide hidden sm:block">
            Coorg <span className="text-gradient-gold">Coffee</span>
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-cream/80 hover:text-gold transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/products"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-gold text-espresso text-sm font-semibold shadow-gold hover:scale-105 transition-transform"
        >
          Shop Now
        </a>
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-cream w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        >
          <span className={`block h-0.5 w-6 bg-cream transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-cream ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-cream transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>
      {open && (
        <div className="md:hidden glass-dark mt-3 mx-5 rounded-2xl p-5 flex flex-col gap-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-cream/90 py-2">
              {l.label}
            </a>
          ))}
          <a href="/products" onClick={() => setOpen(false)} className="mt-2 text-center py-2.5 rounded-full bg-gradient-gold text-espresso font-semibold">
            Shop Now
          </a>
        </div>
      )}
    </header>
  );
}
