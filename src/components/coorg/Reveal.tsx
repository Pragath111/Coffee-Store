import { useEffect, useRef } from "react";
import anime from "animejs";

export function useReveal<T extends HTMLElement>(selector = ".reveal") {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll(selector);
    items.forEach((el) => el.classList.add("reveal-init"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            anime({
              targets: e.target,
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 900,
              easing: "easeOutExpo",
            });
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
  return ref;
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const obj = { v: 0 };
            anime({
              targets: obj,
              v: to,
              round: 1,
              duration: 1800,
              easing: "easeOutExpo",
              update: () => { el.textContent = obj.v.toLocaleString() + suffix; },
            });
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}
