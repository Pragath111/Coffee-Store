import { useReveal } from "./Reveal";
import powder from "@/assets/product-coffee-powder.jpg";
import spices from "@/assets/product-spices.jpg";
import gift from "@/assets/product-giftbox.jpg";
import acc from "@/assets/product-accessories.jpg";

const cats = [
  { t: "Coffee Powder", n: "12 blends", img: powder },
  { t: "Premium Spices", n: "20 varieties", img: spices },
  { t: "Gift Boxes", n: "8 curations", img: gift },
  { t: "Accessories", n: "15 essentials", img: acc },
];

export default function Categories() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="categories" ref={ref} className="py-12 sm:py-16 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <p className="reveal text-xs tracking-[0.3em] uppercase text-gold mb-3">Browse</p>
            <h2 className="reveal font-display text-4xl sm:text-5xl text-espresso">
              Shop by <span className="text-gradient-gold italic">Category</span>
            </h2>
          </div>
          <a href="/products" className="reveal text-sm text-coffee underline-offset-4 hover:underline">View all →</a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cats.map((c) => (
            <a key={c.t} href="/products" className="reveal group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-card block">
              <img src={c.img} alt={c.t} loading="lazy" width={800} height={1000}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                <p className="text-xs uppercase tracking-[0.25em] text-gold mb-2">{c.n}</p>
                <h3 className="font-display text-2xl">{c.t}</h3>
                <span className="mt-3 inline-flex items-center gap-2 text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  Explore →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
