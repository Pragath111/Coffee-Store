import { useEffect, useState } from "react";
import { useReveal } from "./Reveal";

const reviews = [
  { n: "Aanya R.", c: "Bengaluru", r: 5, t: "The aroma alone is worth it. Every morning feels like a holiday in Coorg." },
  { n: "Vikram S.", c: "Mumbai", r: 5, t: "Best Indian coffee I've ever ordered. The gift box was stunning — bought 3 more." },
  { n: "Priya M.", c: "London", r: 5, t: "Authentic taste that takes me back home. The spice trio is magical." },
  { n: "Rahul K.", c: "Delhi", r: 5, t: "Premium quality, premium feel. Packaging, taste, delivery — all perfect." },
];

export default function Reviews() {
  const ref = useReveal<HTMLDivElement>();
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section ref={ref} className="py-12 sm:py-16 bg-espresso text-cream relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-coffee rounded-full blur-3xl" />
      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <p className="reveal text-xs tracking-[0.3em] uppercase text-gold mb-3">Loved by Connoisseurs</p>
        <h2 className="reveal font-display text-4xl sm:text-5xl mb-12">
          Words from our <span className="text-gradient-gold italic">Community</span>
        </h2>
        <div className="relative h-64">
          {reviews.map((r, idx) => (
            <div
              key={r.n}
              className={`absolute inset-0 glass rounded-3xl p-8 sm:p-12 transition-all duration-700 ${
                idx === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
              }`}
            >
              <div className="text-gold text-2xl mb-4 tracking-widest">{"★".repeat(r.r)}</div>
              <p className="font-display text-xl sm:text-2xl leading-snug mb-6">"{r.t}"</p>
              <p className="text-sm text-cream/70">
                <span className="text-gold">{r.n}</span> · {r.c}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Review ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-10 bg-gold" : "w-2 bg-cream/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
