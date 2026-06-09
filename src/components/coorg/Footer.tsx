import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import logo from "../../assets/logo.jpg";

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img src={logo} alt="Coorg Coffee Logo" className="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-2xl shadow-gold" />
              <span className="font-display text-2xl">Coorg <span className="text-gradient-gold">Coffee</span></span>
            </div>
            <p className="text-cream/70 max-w-sm mb-6">
              Heritage-roasted Indian coffee, premium spices and accessories — straight from the misty hills of Coorg.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((I, i) => (
                <a key={i} href="#" aria-label="Social" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold hover:text-espresso transition-colors">
                  <I className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm text-cream/75">
              {["Home", "Shop", "Our Story", "Gallery", "Contact"].map((l) => (
                <li key={l}><a href="#" className="hover:text-gold transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold mb-5">Categories</h4>
            <ul className="space-y-3 text-sm text-cream/75">
              {["Coffee Powder", "Premium Spices", "Gift Boxes", "Accessories"].map((l) => (
                <li key={l}><a href="#" className="hover:text-gold transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold mb-5">Newsletter</h4>
            <p className="text-sm text-cream/70 mb-4">Brew stories & offers in your inbox.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }} className="flex w-full glass rounded-full p-1">
              <input type="email" required placeholder="you@email.com" className="flex-1 min-w-0 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-cream/40" />
              <button className="shrink-0 px-4 py-2 rounded-full bg-gradient-gold text-espresso text-sm font-semibold">Join</button>
            </form>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-xs text-cream/50 text-center md:text-left">
            © {new Date().getFullYear()} Coorg Coffee Store all Rights reserved
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full glass hover:shadow-gold transition-all duration-500"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-5 text-gold group-hover:rotate-12 transition-transform" fill="currentColor" aria-hidden="true">
              <ellipse cx="12" cy="12" rx="5" ry="9" />
              <path d="M12 3v18" stroke="#2D1B12" strokeWidth="1" />
            </svg>
            <span className="font-display text-sm tracking-wide text-cream/80 group-hover:text-gold transition-colors">
              Brewed by <span className="text-gradient-gold font-semibold">Pragath</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
