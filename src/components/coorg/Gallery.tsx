import { useState } from "react";
import { useReveal } from "./Reveal";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const imgs = [
  { src: g1, alt: "Red coffee cherries on the branch", span: "row-span-2" },
  { src: g2, alt: "Espresso being poured into a cup", span: "" },
  { src: g3, alt: "Hands holding roasted beans", span: "" },
  { src: g4, alt: "Aerial view of misty Coorg estate", span: "row-span-2" },
  { src: g5, alt: "Indian spices in wooden spoons", span: "" },
  { src: g6, alt: "Coffee roasting machine glowing", span: "" },
];

export default function Gallery() {
  const ref = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="gallery" ref={ref} className="py-12 sm:py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-gold mb-3">Gallery</p>
          <h2 className="reveal font-display text-4xl sm:text-5xl text-espresso">
            A Visual <span className="text-gradient-gold italic">Journey</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-4">
          {imgs.map((im, i) => (
            <button
              key={i}
              onClick={() => setOpen(im.src)}
              className={`reveal relative rounded-2xl overflow-hidden group ${im.span}`}
            >
              <img src={im.src} alt={im.alt} loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/30 transition-colors" />
            </button>
          ))}
        </div>
      </div>
      {open && (
        <div
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[100] bg-espresso/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in"
        >
          <img src={open} alt="Enlarged gallery" className="max-w-full max-h-[90vh] rounded-2xl shadow-soft" />
          <button onClick={() => setOpen(null)} className="absolute top-6 right-6 w-12 h-12 rounded-full glass-dark text-cream text-2xl">×</button>
        </div>
      )}
    </section>
  );
}
