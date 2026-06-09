import { useRef, useEffect, useState } from "react";
import { useReveal } from "./Reveal";
import { useStoreProducts, Product } from "@/lib/store";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "@tanstack/react-router";

const wa = (p: Product) =>
  `https://wa.me/918904453918?text=${encodeURIComponent(
    `Hi Coorg Coffee, I'd like to order: ${p.name} (${p.price})`
  )}`;

function Card({ p }: { p: Product }) {
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = "perspective(1000px) rotateY(0) rotateX(0) translateY(0)";
  };
  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="reveal tilt-card group relative rounded-3xl bg-card shadow-card overflow-hidden border border-border/60 flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl bg-muted group/carousel z-0">
        {p.images && p.images.length > 1 ? (
          <Carousel className="w-full h-full" opts={{ loop: true }}>
            <CarouselContent className="h-full ml-0">
              {p.images.map((img, idx) => (
                <CarouselItem key={idx} className="relative w-full h-full pl-0">
                  <img
                    src={img}
                    alt={`${p.name} - ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity pointer-events-none">
              <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 h-8 w-8 bg-background/60 hover:bg-background border-none pointer-events-auto" />
              <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 h-8 w-8 bg-background/60 hover:bg-background border-none pointer-events-auto" />
            </div>
          </Carousel>
        ) : (
          <img
            src={p.images && p.images[0] ? p.images[0] : ""}
            alt={p.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs glass-dark text-cream pointer-events-none z-10">
          {p.stock} in stock
        </span>
        {p.category && (
          <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-amber-950 pointer-events-none z-10">
            {p.category}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl text-espresso mb-1 hover:text-gold transition-colors">
          <Link to={`/products/${p.id}`}>{p.name}</Link>
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{p.desc}</p>
        <div className="flex items-center justify-between mb-5">
          <span className="font-display text-2xl text-coffee">{p.price}</span>
          <span className="text-xs uppercase tracking-wider text-gold">In Stock</span>
        </div>
        <div className="flex gap-2">
          <Link 
            to={`/products/${p.id}`}
            className="flex flex-1 items-center justify-center py-2.5 rounded-full bg-coffee text-cream text-sm font-medium text-center hover:bg-espresso transition-colors"
          >
            View Details
          </Link>
          <a
            href={wa(p)}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center py-2.5 rounded-full bg-gradient-gold text-espresso text-sm font-semibold text-center hover:scale-[1.03] transition-transform"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Products() {
  const ref = useReveal<HTMLDivElement>();
  const { products, isLoaded } = useStoreProducts();
  
  // Custom hook might re-render, ensure hydration matches if needed, but since it's client-only, it's fine.
  
  return (
    <section id="products" ref={ref} className="py-12 sm:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-gold mb-4">Featured Selection</p>
          <h2 className="reveal font-display text-4xl sm:text-5xl text-espresso mb-4">
            Crafted with <span className="text-gradient-gold italic">Care</span>
          </h2>
          <p className="reveal text-muted-foreground max-w-2xl mx-auto">
            Small-batch coffee, spices and accessories — sourced directly from the families who grow them.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {isLoaded && products.filter(p => p.isActive).map((p) => <Card key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}
