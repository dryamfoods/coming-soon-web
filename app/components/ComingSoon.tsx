"use client";

import { useEffect, useRef, useState } from "react";

const LOGO_URL = "/dryam-logo.png";
const FALLBACK_REMOTE_LOGO = "https://dryamfoods-web.vercel.app/dryam-logo.png";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



export default function ComingSoon() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const [logoFailed, setLogoFailed] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // L1 — powder particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const COLORS: [number, number, number][] = [
      [232, 168, 58], // amber
      [196, 86, 42], // paprika
      [244, 237, 225], // cream
    ];

    type Particle = {
      x: number;
      y: number;
      baseX: number;
      r: number;
      color: [number, number, number];
      baseAlpha: number;
      speed: number;
      swayAmp: number;
      swayFreq: number;
      phase: number;
    };

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let rafId: number | null = null;
    let t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function particleCount() {
      return mobileQuery.matches ? 45 : 96;
    }

    function makeParticle(): Particle {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const x = Math.random() * width;
      return {
        x,
        baseX: x,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 1.8,
        color,
        baseAlpha: 0.08 + Math.random() * 0.14,
        speed: 0.08 + Math.random() * 0.27,
        swayAmp: 8 + Math.random() * 22,
        swayFreq: 0.2 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      };
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = particleCount();
      particles = Array.from({ length: count }, makeParticle);
    }

    function drawFrame() {
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        const sway = Math.sin(t * p.swayFreq + p.phase) * p.swayAmp;
        const flicker = 0.72 + 0.28 * Math.sin(t * 1.4 + p.phase);
        const alpha = p.baseAlpha * flicker;
        ctx!.beginPath();
        ctx!.arc(p.baseX + sway, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${alpha.toFixed(3)})`;
        ctx!.fill();
      }
    }

    function tick() {
      t += 0.016;
      for (const p of particles) {
        p.y -= p.speed;
        if (p.y < -10) {
          p.y = height + 10;
          p.baseX = Math.random() * width;
        }
      }
      drawFrame();
      rafId = requestAnimationFrame(tick);
    }

    function startAnimation() {
      if (rafId) return;
      if (reduceMotionQuery.matches) {
        drawFrame();
        return;
      }
      tick();
    }

    function stopAnimation() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    resize();
    startAnimation();

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const wasRunning = !!rafId;
        stopAnimation();
        resize();
        if (wasRunning || reduceMotionQuery.matches) startAnimation();
      }, 150);
    }

    function onVisibilityChange() {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    }

    function onMotionPrefChange() {
      stopAnimation();
      startAnimation();
    }

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reduceMotionQuery.addEventListener("change", onMotionPrefChange);

    return () => {
      stopAnimation();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reduceMotionQuery.removeEventListener("change", onMotionPrefChange);
    };
  }, []);

  // L4 — cursor spotlight (fine pointers only)
  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    const reduceMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const fineHoverQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    if (!fineHoverQuery.matches || reduceMotionQuery.matches || mobileQuery.matches) {
      return;
    }

    let sx = window.innerWidth / 2;
    let sy = window.innerHeight / 2;
    let tx = sx;
    let ty = sy;
    let rafId: number | null = null;

    function loop() {
      sx += (tx - sx) * 0.12;
      sy += (ty - sy) * 0.12;
      spotlight!.style.transform = `translate(${sx}px,${sy}px)`;
      rafId = requestAnimationFrame(loop);
    }

    function onMouseMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
      spotlight!.classList.add("isActive");
    }
    function onMouseLeave() {
      spotlight!.classList.remove("isActive");
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    loop();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();

    if (!value) {
      setError("Please enter your email address.");
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setError("That email address doesn't look right.");
      return;
    }

    setError("");
    setSuccess(true);
  }

  return (
    <>
      {/* L2 aurora blobs */}
      <div className="aurora" aria-hidden="true">
        <div className="auroraBlob auroraAmber" />
        <div className="auroraBlob auroraPaprika" />
        <div className="auroraBlob auroraSage" />
      </div>

      {/* L1 particle canvas */}
      <canvas ref={canvasRef} className="particles" aria-hidden="true" />

      {/* L4 cursor spotlight */}
      <div ref={spotlightRef} className="spotlight" aria-hidden="true" />

      {/* L3 grain overlay */}
      <svg className="grain" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <filter id="grainFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.85}
            numOctaves={2}
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainFilter)" />
      </svg>

      {/* Hairline frame with corner ticks */}
      <div className="frame" aria-hidden="true">
        <span className="tick tickTl" />
        <span className="tick tickTr" />
        <span className="tick tickBl" />
        <span className="tick tickBr" />
      </div>


      <main className="content">
        <div className="brand">
          <div className="logoWrap">
            <svg className="logoRing" viewBox="0 0 96 96" aria-hidden="true">
              <circle
                cx="48"
                cy="48"
                r="45"
                fill="none"
                stroke="#E8A83A"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                opacity={0.6}
              />
            </svg>
            <div className="logoBadge">
              {!logoFailed ? (
                <img
                  className="logoImg"
                  src={logoFailed ? FALLBACK_REMOTE_LOGO : LOGO_URL}
                  alt="DRYAM FOODS Logo"
                  width={110}
                  height={110}
                  onError={() => {
                    if (!logoFailed) {
                      setLogoFailed(true);
                    }
                  }}
                />
              ) : (
                <span className="logoFallback">D</span>
              )}
            </div>
          </div>
          <p className="wordmark">DRYAM FOODS</p>
        </div>

        <p className="eyebrow">Est. Surat, Gujarat — Global Export</p>

        <h1 className="headline">
          <span className="line line1">
            <span>
              COMING <em>SOON.</em>
            </span>
          </span>
        </h1>

        <p className="subcopy">
          <span className="subcopyText">
            The new <strong>DRYAM FOODS</strong>{" "}experience is being crafted —
            premium garlic, onion, fried products &amp; vegetable powders.
          </span>
        </p>

        <div className={`notifyWrap${success ? " isSuccess" : ""}`}>
          <form className="notifyForm" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="notifyEmail" className="visuallyHidden">
                Email address
              </label>
              <input
                type="email"
                id="notifyEmail"
                name="email"
                placeholder="you@company.com"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
              />
            </div>
            <button type="submit" className="notifyBtn">
              Notify me
            </button>
          </form>
          <p className="formMsg" role="alert">
            {error}
          </p>
          <a className="mailtoFallback" href="mailto:info@dryamfoods.com" title="info@dryamfoods.com">
            <span className="defaultText">or email us directly</span>
            <span className="hoverText">info@dryamfoods.com</span>
          </a>

          <p className="notifySuccess" role="status">
            <span className="dot" aria-hidden="true" />
            <span>You&rsquo;re on the list. We&rsquo;ll write when we open.</span>
          </p>
        </div>



        <footer className="footer">
          <span>Surat, Gujarat, India</span>
          <span className="op">&middot;</span>
          <a href="mailto:info@dryamfoods.com">Bulk &amp; export inquiries</a>
          <span className="op">&middot;</span>
          <span>&copy; 2026 DRYAM FOODS</span>
        </footer>
      </main>
    </>
  );
}
