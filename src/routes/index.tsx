import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/coorg/Navbar";
import Hero from "@/components/coorg/Hero";
import Products from "@/components/coorg/Products";
import About from "@/components/coorg/About";
import Timeline from "@/components/coorg/Timeline";
import Categories from "@/components/coorg/Categories";
import WhyUs from "@/components/coorg/WhyUs";
import Reviews from "@/components/coorg/Reviews";
import Gallery from "@/components/coorg/Gallery";
import Contact from "@/components/coorg/Contact";
import Footer from "@/components/coorg/Footer";
import ScrollToTop from "@/components/coorg/ScrollToTop";
import FloatingWhatsApp from "@/components/coorg/FloatingWhatsApp";
import Chatbot from "@/components/coorg/Chatbot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Coorg Coffee — Authentic Estate-Roasted Coffee from Karnataka" },
      { name: "description", content: "Premium single-origin Coorg coffee, handpicked spices, gift boxes and accessories from the misty hills of the Western Ghats." },
      { property: "og:title", content: "Coorg Coffee — Crafted in the Hills of Karnataka" },
      { property: "og:description", content: "Heritage-roasted Indian coffee, premium spices and luxury gift boxes." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
      />
      <Navbar />
      <main>
        <Hero />
        <Products />
        <About />
        <Timeline />
        <Categories />
        <WhyUs />
        <Reviews />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingWhatsApp />
      <Chatbot />
    </>
  );
}
