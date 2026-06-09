import { Counter, useReveal } from "./Reveal";
import landscape from "@/assets/coorg-landscape.jpg";

export default function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="about" ref={ref} className="relative py-12 sm:py-16 overflow-hidden bg-espresso text-cream">
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover opacity-30"
        style={{ backgroundImage: `url(${landscape})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-espresso/70 to-espresso" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="reveal text-xs tracking-[0.3em] uppercase text-gold mb-4">Our Story</p>
          <h2 className="reveal font-display text-4xl sm:text-5xl mb-6">
            Where the <span className="text-gradient-gold italic">Mist</span> Meets the Bean
          </h2>
          <p className="reveal text-cream/75 mb-5 leading-relaxed">
            Nestled in the Western Ghats of Karnataka, Coorg — "the Scotland of India" — is a land of
            rolling hills, ancient forests and shade-grown coffee. Cool monsoons, mineral-rich soil and
            generations of expertise come together in every harvest.
          </p>
          <p className="reveal text-cream/75 mb-10 leading-relaxed">
            We work hand-in-hand with small estate farmers who treat each cherry like a craft —
            from the first bloom to the final roast.
          </p>
          <div className="reveal grid grid-cols-3 gap-6">
            {[
              { n: 1200, s: "+", l: "Acres" },
              { n: 48, s: "yrs", l: "Heritage" },
              { n: 25000, s: "+", l: "Customers" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-5">
                <div className="font-display text-3xl text-gold">
                  <Counter to={s.n} suffix={s.s} />
                </div>
                <div className="text-xs uppercase tracking-wider text-cream/60 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal relative aspect-[4/5] rounded-3xl overflow-hidden shadow-soft">
          <img
            src={landscape}
            alt="Misty Coorg coffee plantation at sunrise"
            loading="lazy"
            width={1600}
            height={1000}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 glass-dark rounded-2xl p-5 text-cream">
            <p className="font-display text-xl">"Every cup tells a story of these hills."</p>
            <p className="text-xs uppercase tracking-wider text-gold mt-2">— Estate Manager, Madikeri</p>
          </div>
        </div>
      </div>
    </section>
  );
}
