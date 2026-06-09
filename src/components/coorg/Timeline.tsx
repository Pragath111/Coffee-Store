import { useReveal } from "./Reveal";

const steps = [
  { y: "1670", t: "Origins in India", d: "Baba Budan brings seven coffee beans from Yemen to the hills of Karnataka." },
  { y: "1854", t: "Coorg Plantations", d: "British planters establish the first commercial coffee estates in Coorg." },
  { y: "1947", t: "Family Estates", d: "Indian families take ownership, preserving shade-grown traditions for generations." },
  { y: "Today", t: "Modern Roastery", d: "Slow-roasted in small batches, balancing heritage methods with modern precision." },
];

export default function Timeline() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="timeline" ref={ref} className="py-12 sm:py-16 bg-background">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-gold mb-4">Heritage</p>
          <h2 className="reveal font-display text-4xl sm:text-5xl text-espresso">
            A <span className="text-gradient-gold italic">Centuries-Old</span> Craft
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/0 via-gold to-gold/0" />
          {steps.map((s, i) => (
            <div key={s.y} className="reveal relative grid sm:grid-cols-2 gap-6 mb-12">
              {i % 2 === 0 ? (
                <>
                  <div className="pl-12 sm:pl-0 sm:text-right sm:pr-12 ltr">
                    <div className="font-display text-5xl text-gradient-gold mb-2">{s.y}</div>
                    <h3 className="font-display text-2xl text-espresso mb-2">{s.t}</h3>
                    <p className="text-muted-foreground">{s.d}</p>
                  </div>
                  <div className="hidden sm:block" />
                </>
              ) : (
                <>
                  <div className="hidden sm:block" />
                  <div className="pl-12 sm:pl-0 sm:text-left sm:pr-12 ltr">
                    <div className="font-display text-5xl text-gradient-gold mb-2">{s.y}</div>
                    <h3 className="font-display text-2xl text-espresso mb-2">{s.t}</h3>
                    <p className="text-muted-foreground">{s.d}</p>
                  </div>
                </>
              )}
              <span className="absolute left-4 sm:left-1/2 top-3 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-gold shadow-gold" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
