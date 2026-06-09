import { useEffect, useRef } from "react";
import anime from "animejs";
import heroImg from "@/assets/hero-coffee.jpg";
import estateImg from "@/assets/coffee_cherries_hero.png";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    anime
      .timeline({ easing: "easeOutExpo" })
      .add({ targets: ".hero-eyebrow", opacity: [0, 1], translateY: [20, 0], duration: 800 })
      .add({ targets: ".hero-title .word", opacity: [0, 1], translateY: [50, 0], duration: 1000, delay: anime.stagger(120) }, "-=600")
      .add({ targets: ".hero-sub", opacity: [0, 1], translateY: [20, 0], duration: 800 }, "-=600")
      .add({ targets: ".hero-cta", opacity: [0, 1], translateY: [20, 0], duration: 700, delay: anime.stagger(120) }, "-=600")
      .add({ targets: ".hero-stat", opacity: [0, 1], translateY: [20, 0], duration: 700, delay: anime.stagger(100) }, "-=400");

    // floating beans
    anime({
      targets: ".float-bean",
      translateY: [{ value: -30, duration: 2500 }, { value: 0, duration: 2500 }],
      translateX: () => anime.random(-15, 15),
      rotate: () => anime.random(-180, 180),
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
      delay: anime.stagger(300),
    });

    // Estate image zoom effect
    anime({
      targets: ".estate-image",
      scale: [1, 1.08],
      duration: 12000,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine"
    });
  }, []);

  const title = ["Authentic", "Coorg", "Coffee", "Crafted", "in", "the", "Hills"];

  return (
    <section id="home" ref={root} className="relative min-h-screen overflow-hidden bg-gradient-hero">
      <img
        src={heroImg}
        alt="Roasted Coorg coffee beans with rising steam"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/40 via-espresso/60 to-espresso" />

      {/* smoke */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="absolute bottom-0 w-40 h-40 rounded-full bg-cream/10 blur-3xl animate-smoke"
            style={{ left: `${15 + i * 13}%`, animationDelay: `${i * 0.8}s` }}
          />
        ))}
      </div>

      {/* floating beans */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="float-bean absolute w-3 h-5 rounded-full bg-gold/40"
            style={{ left: `${10 + i * 11}%`, top: `${20 + (i % 3) * 25}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-cream">
          <p className="hero-eyebrow inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-gold mb-6">
            <span className="h-px w-10 bg-gold" /> Estate Roasted · Karnataka
          </p>
          <h1 className="hero-title font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6">
            {title.map((w, i) => (
              <span key={i} className="word inline-block mr-3">
                {w === "Coorg" || w === "Hills" ? <span className="text-gradient-gold">{w}</span> : w}
              </span>
            ))}
          </h1>
          <p className="hero-sub text-lg text-cream/75 max-w-xl mb-10">
            Experience the rich aroma, bold flavor, and heritage of Coorg with every cup —
            handpicked from misty plantations of the Western Ghats.
          </p>
          <div className="flex flex-wrap gap-4 mb-14">
            <a
              href="#products"
              className="hero-cta group relative overflow-hidden inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-gold text-espresso font-semibold shadow-gold hover:scale-105 transition-transform"
            >
              <span className="relative z-10">Shop Coffee</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#categories"
              className="hero-cta inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-cream/30 text-cream hover:bg-cream/10 hover:border-gold transition-all"
            >
              Explore Spices
            </a>
          </div>
          <div className="grid grid-cols-3 gap-6 max-w-md">
            {[
              { n: "150+", l: "Estates" },
              { n: "25K+", l: "Happy Cups" },
              { n: "100%", l: "Authentic" },
            ].map((s) => (
              <div key={s.l} className="hero-stat">
                <div className="font-display text-3xl text-gold">{s.n}</div>
                <div className="text-xs uppercase tracking-wider text-cream/60 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[420px] sm:h-[520px] lg:h-[600px] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl shadow-gold/20 border border-gold/20 flex items-center justify-center">
          <div className="absolute inset-0 bg-gold/10 z-10 pointer-events-none mix-blend-overlay" />
          <img 
            src={estateImg} 
            alt="Ripe Coorg Coffee Cherries" 
            className="estate-image w-full h-full object-cover origin-center transform-gpu"
          />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/60 animate-bounce">
        <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 text-gold" />
      </div>
    </section>
  );
}
