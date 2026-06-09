import { useReveal } from "./Reveal";
import { Leaf, ShieldCheck, Sprout, Award, Truck, Coffee } from "lucide-react";

const items = [
  { i: Coffee, t: "100% Authentic", d: "Single-origin Coorg estates, verified at source." },
  { i: Sprout, t: "Farm Fresh", d: "From harvest to roast in under 14 days." },
  { i: Leaf, t: "Handpicked", d: "Only ripe cherries selected by trained pickers." },
  { i: Award, t: "Premium Quality", d: "Cupped & graded above 84 SCA points." },
  { i: Truck, t: "Secure Delivery", d: "Vacuum-sealed pouches for peak freshness." },
  { i: ShieldCheck, t: "Natural Processing", d: "Sun-dried, chemical-free, traceable." },
];

export default function WhyUs() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="py-12 sm:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-gold mb-3">Why Coorg Coffee</p>
          <h2 className="reveal font-display text-4xl sm:text-5xl text-espresso">
            Six Promises in Every <span className="text-gradient-gold italic">Cup</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.t} className="reveal group p-7 rounded-3xl bg-card border border-border/60 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center text-espresso mb-5 group-hover:rotate-6 transition-transform shadow-gold">
                <it.i className="w-7 h-7" strokeWidth={1.8} />
              </div>
              <h3 className="font-display text-xl text-espresso mb-2">{it.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
