import { useReveal } from "./Reveal";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Dynamically import sweetalert2 to avoid Server-Side Rendering (SSR) issues
    const Swal = (await import("sweetalert2")).default;

    Swal.fire({
      title: 'Sending...',
      text: 'Please wait while we send your message.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const response = await fetch("https://formsubmit.co/ajax/chittiappa11@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // We include _template: "box" to make the email look much cleaner
        body: JSON.stringify({ ...data, _template: "box" }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Thank you for reaching out. We will get back to you shortly.',
          confirmButtonColor: '#d4af37',
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
        confirmButtonColor: '#3d251e',
      });
    }
  };

  return (
    <section id="contact" ref={ref} className="py-12 sm:py-16 bg-espresso relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-espresso to-espresso pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="text-center mb-14">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-gold mb-3">Get in Touch</p>
          <h2 className="reveal font-display text-4xl sm:text-5xl text-cream">
            Let's <span className="text-gradient-gold italic">Talk</span> Coffee
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <form
            onSubmit={handleSubmit}
            className="reveal glass-dark rounded-3xl p-8 sm:p-10 space-y-5 text-cream"
          >
            {/* Disable FormSubmit Captcha for better UX */}
            <input type="hidden" name="_captcha" value="false" />
            {/* Subject for the email */}
            <input type="hidden" name="_subject" value="New Enquiry from Coorg Coffee Luxe!" />
            
            <div>
              <label className="text-xs uppercase tracking-widest text-gold">Name</label>
              <input name="name" required className="mt-2 w-full bg-transparent border-b border-cream/30 py-3 focus:border-gold outline-none" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-gold">Email</label>
              <input type="email" name="email" required className="mt-2 w-full bg-transparent border-b border-cream/30 py-3 focus:border-gold outline-none" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-gold">Message</label>
              <textarea name="message" rows={4} required className="mt-2 w-full bg-transparent border-b border-cream/30 py-3 focus:border-gold outline-none resize-none" />
            </div>
            <button type="submit" className="mt-4 w-full py-3.5 rounded-full bg-gradient-gold text-espresso font-semibold shadow-gold hover:scale-[1.02] transition-transform">
              Send Message
            </button>
          </form>
          <div className="space-y-5">
            {[
              { i: Phone, l: "Phone", v: "+91 8904453918" },
              { i: Mail, l: "Email", v: "coorgcoffee@gmail.com" },
              { i: MessageCircle, l: "WhatsApp", v: "Chat with us instantly", href: "https://wa.me/918904453918" },
              { i: MapPin, l: "Estate", v: "Madikeri, Coorg, Karnataka 571201" },
            ].map((c) => (
              <a
                key={c.l}
                href={c.href ?? "#"}
                className="reveal flex items-start gap-4 p-6 rounded-2xl bg-cream/5 border border-cream/10 hover:border-gold/50 hover:bg-cream/10 hover:-translate-y-1 transition-all group"
              >
                <span className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center text-espresso shrink-0 group-hover:scale-110 transition-transform">
                  <c.i className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold">{c.l}</p>
                  <p className="text-cream/90 mt-1">{c.v}</p>
                </div>
              </a>
            ))}
            <div className="reveal rounded-2xl overflow-hidden border border-cream/10 shadow-2xl aspect-video relative">
              <div className="absolute inset-0 bg-gold/10 pointer-events-none mix-blend-overlay" />
              <iframe
                title="Coorg location"
                loading="lazy"
                className="w-full h-full"
                src="https://www.google.com/maps?q=Madikeri,Coorg,Karnataka&output=embed"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
