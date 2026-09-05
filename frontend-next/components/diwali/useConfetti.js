"use client";
import { useCallback, useEffect, useRef } from "react";

const COLORS = ["#F5C542", "#E8855A", "#FFE9A8", "#C9A84C", "#FFFFFF", "#7C4DBC"];
const PIECES = 70;
const LIFETIME = 2600;

/**
 * One-shot festive confetti burst — deliberately hand-rolled on a canvas
 * rather than pulling in an animation library.
 *
 * Fire it only at genuine moments of celebration (a completed enquiry),
 * never as ambient decoration. No-ops entirely under
 * `prefers-reduced-motion`.
 */
export default function useConfetti() {
  const cleanupRef = useRef(null);

  const stop = useCallback(() => {
    cleanupRef.current?.();
    cleanupRef.current = null;
  }, []);

  useEffect(() => stop, [stop]);

  const fire = useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    stop();

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    Object.assign(canvas.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "10000",
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas.remove();
      return;
    }
    ctx.scale(dpr, dpr);

    const pieces = Array.from({ length: PIECES }, () => ({
      x: width / 2 + (Math.random() - 0.5) * width * 0.5,
      y: height * 0.45 + (Math.random() - 0.5) * 60,
      vx: (Math.random() - 0.5) * 9,
      vy: Math.random() * -11 - 4,
      size: Math.random() * 6 + 4,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.25,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    let frame = 0;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      if (elapsed > LIFETIME) {
        cleanup();
        return;
      }

      const fade = Math.max(0, 1 - elapsed / LIFETIME);
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = fade;

      pieces.forEach((p) => {
        p.vy += 0.32;          // gravity
        p.vx *= 0.995;         // drag
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.spin;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      });

      frame = requestAnimationFrame(tick);
    };

    const cleanup = () => {
      cancelAnimationFrame(frame);
      canvas.remove();
      cleanupRef.current = null;
    };

    cleanupRef.current = cleanup;
    frame = requestAnimationFrame(tick);
  }, [stop]);

  return fire;
}
