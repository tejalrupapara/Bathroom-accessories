import { useEffect, useRef } from "react";
import "./BathroomScene.css";

export default function BathroomScene3D() {
  const particlesRef = useRef(null);

  useEffect(() => {
    const colors = [
      "rgba(201,168,76,0.55)",
      "rgba(13,107,107,0.55)",
      "rgba(255,255,255,0.3)",
    ];

    function spawnParticle() {
      if (!particlesRef.current) return;
      const p = document.createElement("div");
      p.className = "bs3d-particle";
      const sz = Math.random() * 5 + 2;
      const duration = Math.random() * 4 + 3;
      p.style.cssText = `
        width:${sz}px;height:${sz}px;
        left:${Math.random() * 100}%;
        bottom:${Math.random() * 30}%;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        animation-duration:${duration}s;
        animation-delay:${Math.random() * 2}s;
      `;
      particlesRef.current.appendChild(p);
      setTimeout(() => p.remove(), (duration + 2) * 1000);
    }

    // Initial burst
    for (let i = 0; i < 10; i++) setTimeout(spawnParticle, i * 250);
    const interval = setInterval(spawnParticle, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bs3d-wrap">
      {/* Background decorations */}
      <div className="bs3d-tiles" />
      <div className="bs3d-orb bs3d-orb1" />
      <div className="bs3d-orb bs3d-orb2" />
      <div ref={particlesRef} className="bs3d-particles" />

      {/* 3D shelf scene */}
      <div className="bs3d-scene">
        <div className="bs3d-3d">

          {/* Tiled wall */}
          <div className="bs3d-wall">
            <div className="bs3d-light-beam" />
            {/* Tile grid */}
            {Array.from({ length: 6 }).map((_, row) =>
              Array.from({ length: 12 }).map((_, col) => (
                <div
                  key={`${row}-${col}`}
                  className="bs3d-tile"
                  style={{ left: col * 50 + 2, top: row * 36 + 2 }}
                />
              ))
            )}
          </div>

          {/* Products sitting on shelf */}
          <div className="bs3d-products">
            {/* Toothbrush */}
            <div className="bs3d-toothbrush">
              <div className="bs3d-brush-head" />
            </div>

            {/* Wire / loop holder */}
            <div className="bs3d-wire-holder">
              <svg viewBox="0 0 38 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 6 C6 6 4 18 4 28 C4 40 12 48 19 58 C26 48 34 40 34 28 C34 18 32 6 19 6Z"
                  stroke="#3a7ad4" strokeWidth="2.5"
                  fill="rgba(58,122,212,0.1)" strokeLinejoin="round"
                />
                <circle cx="19" cy="26" r="8"
                  stroke="#3a7ad4" strokeWidth="2"
                  fill="rgba(58,122,212,0.15)"
                />
              </svg>
            </div>

            {/* Tube (Rembrandt-style) */}
            <div className="bs3d-tube bs3d-wobble1">
              <div className="bs3d-tube-cap" />
              <span className="bs3d-tube-label">REMBRANDT</span>
              <div className="bs3d-shine" />
            </div>

            {/* Shampoo bottle */}
            <div className="bs3d-shampoo bs3d-wobble2">
              <div className="bs3d-shampoo-cap" />
              <span className="bs3d-shampoo-brand">PANTENE</span>
              <div className="bs3d-shampoo-emblem" />
              <div className="bs3d-shine" />
            </div>

            {/* Conditioner bottle */}
            <div className="bs3d-conditioner bs3d-wobble1" style={{ animationDelay: "0.8s" }}>
              <div className="bs3d-conditioner-cap" />
              <span className="bs3d-conditioner-label1">ARGAN</span>
              <span className="bs3d-conditioner-label2">OIL</span>
              <div className="bs3d-shine" />
            </div>
          </div>

          {/* Shelf platform */}
          <div className="bs3d-shelf">
            <div className="bs3d-shine" />
          </div>

          {/* Black metal frame posts */}
          <div className="bs3d-frame-left" />
          <div className="bs3d-frame-right" />

          {/* Towel bar + towel */}
          <div className="bs3d-towel-bar" />
          <div className="bs3d-towel" />

          {/* Ground shadow */}
          <div className="bs3d-shadow" />
        </div>
      </div>

      {/* Caption */}
      <div className="bs3d-caption">
        <p className="bs3d-cap-label">◆ Nexxora by Greenvolt Enterprise</p>
        <h3 className="bs3d-cap-title">
          Crafted for <em>Luxury Living</em>
        </h3>
        <p className="bs3d-cap-sub">
          Premium acrylic bathroom accessories — where style meets precision
        </p>
      </div>
    </div>
  );
}