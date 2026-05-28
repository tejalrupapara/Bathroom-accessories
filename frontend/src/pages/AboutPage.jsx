import { Link } from "react-router-dom";
import BathroomScene3D from "../components/BathroomScene";
import "./AboutPage.css";

const series = [
  { name: "Sky",    code: "01", desc: "Premium dark-framed acrylic with ceramic inserts" },
  { name: "Prism",  code: "02", desc: "Rose gold accents with marble-finish acrylic" },
  { name: "Lume",   code: "03", desc: "Elegant wood-tone brackets with white acrylic" },
  { name: "Vector", code: "04", desc: "Bold black matte finish with clean modern lines" },
  { name: "Nova",   code: "05", desc: "Sleek black accents on white acrylic panels" },
  { name: "Neo",    code: "06", desc: "Minimal copper brackets with white acrylic" },
  { name: "Prime",  code: "07", desc: "Sophisticated dark base with rose gold fittings" },
];

const stats = [
  { num: "7",   label: "Premium Series" },
  { num: "55+", label: "Products" },
  { num: "9",   label: "Acrylic Variants" },
  { num: "3",   label: "Finish Options" },
];

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: "Precision Crafted",
    desc: "Every product is manufactured with high-grade acrylic and premium metal fittings, engineered to last a lifetime.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    title: "Customer First",
    desc: "Always give customers more than what they expect to get. Quality is not an act — it is a habit in Nexxora.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: "Affordable Luxury",
    desc: "Stylish and functional designs at affordable prices — luxury bathroom accessories shouldn't be a privilege.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: "Homes & Hotels",
    desc: "A wonderful range trusted by private homes and leading hotels across India for extraordinary bathrooms.",
  },
];

const finishes = [
  { name: "Black",     color: "#1a1a1a", text: "#fff" },
  { name: "Rose Gold", color: "#b76e79", text: "#fff" },
  { name: "Gold",      color: "#c9a84c", text: "#1a1a1a" },
];

const acrylics = [
  "Zebra Marble","Grey Marble","Black Smock","Blue Marble",
  "Pink Marble","White Marble","Clear","Brown Marble","Milky White"
];

export default function AboutPage() {
  return (
    <div className="about-page">

      {/* ══ HERO ══ */}
      <section className="about-hero">
        <div className="about-hero-orb orb-a" />
        <div className="about-hero-orb orb-b" />
        <div className="about-hero-orb orb-c" />
        <div className="container-xxl about-hero-inner">
          <div className="row align-items-center g-5">

            {/* Left — text */}
            <div className="col-lg-6">
              <p className="cp-breadcrumb">Home / About Us</p>
              <span className="section-label">About Nexxora</span>
              <h1 className="about-hero-title">
                Precision Crafted<br/>
                <em className="about-hero-italic">Acrylic Bathware</em>
              </h1>
              <p className="about-hero-desc">
                In a short span of time, <strong>NEXXORA</strong> has made its presence in the
                sanitary industry specializing in bathroom accessories — with stylish and functional
                designs, high quality, and affordable prices for consumers.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/collection" className="btn btn-gold btn-lg px-4 py-3">
                  Explore Collection →
                </Link>
                <Link to="/contact" className="btn btn-outline-white btn-lg px-4 py-3">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right — 3D animated bathroom scene */}
            <div className="col-lg-6 d-flex justify-content-center">
              <div style={{ width: "100%", maxWidth: 480 }}>
                <BathroomScene3D />
              </div>
            </div>

          </div>
        </div>
        <div className="about-hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="var(--off-white)"/>
          </svg>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="about-stats-section">
        <div className="container-xxl">
          <div className="about-stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="about-stat-card">
                <div className="asc-num">{s.num}</div>
                <div className="asc-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT US / STORY ══ */}
      <section className="about-story-section">
        <div className="container-xxl">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <div className="about-story-visual">
                <div className="asv-card asv-card-1">
                  <div className="asv-icon">◈</div>
                  <div className="asv-card-title">About Us</div>
                  <p>
                    NEXXORA has made its presence in the sanitary industry specializing in
                    bathroom accessories. With stylish and functional designs, high quality
                    and affordable prices for consumers.
                  </p>
                </div>
                <div className="asv-card asv-card-2">
                  <div className="asv-icon text-gold">✦</div>
                  <div className="asv-card-title">Our Mission</div>
                  <p>
                    Always give customers more than what they expect to get.
                    Quality is not an act — it is a habit in Nexxora Bath Accessories.
                  </p>
                </div>
                <div className="asv-floating-badge">
                  <span>7 Series</span>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <span className="section-label">Our Story</span>
              <h2 className="section-heading">A Fabulous Range For Every Style</h2>
              <div className="gold-divider left"/>
              <p className="about-body-text mt-3">
                A fabulous range of bathroom accessories with every possible style you can imagine!
                Whether you are looking for Nexxora Bath Accessories — we have a range for you!
              </p>
              <p className="about-body-text">
                The culmination of superb products, passion for design, craftsmanship, and the
                finest quality materials, have resulted in a wonderful range of extraordinary and
                beautiful bathrooms for private homes &amp; leading hotels.
              </p>
              <p className="about-body-text">
                Nexxora is <strong>Powered by Greenvolt Enterprise</strong> — a company committed
                to delivering excellence in every product, from the first sketch to the final
                fitting on your wall.
              </p>
              <div className="about-values-grid mt-4">
                {values.map((v, i) => (
                  <div key={i} className="about-value-card">
                    <div className="avc-icon">{v.icon}</div>
                    <div>
                      <h4 className="avc-title">{v.title}</h4>
                      <p className="avc-desc">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7 SERIES INDEX ══ */}
      <section className="about-series-section">
        <div className="container-xxl">
          <div className="text-center mb-5">
            <span className="section-label">Product Index</span>
            <h2 className="section-heading">7 Premium Series</h2>
            <div className="gold-divider"/>
            <p className="section-sub mt-3">
              Each series features a unique aesthetic, finish character, and acrylic palette
            </p>
          </div>
          <div className="row g-3">
            {series.map((s, i) => (
              <div key={s.name} className="col-sm-6 col-lg-3">
                <div className="abs-card" style={{"--idx": i}}>
                  <div className="abs-number">{s.code}</div>
                  <h3 className="abs-name">{s.name}</h3>
                  <p className="abs-desc">{s.desc}</p>
                  <Link to="/collection" className="abs-link">View Series →</Link>
                </div>
              </div>
            ))}
            <div className="col-sm-6 col-lg-3">
              <Link to="/collection" className="abs-card abs-cta-card">
                <div className="abs-cta-icon">✦</div>
                <h3>All Products</h3>
                <p>Browse the full Nexxora catalogue</p>
                <span className="abs-link">Browse All →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MATERIALS ══ */}
      <section className="about-materials-section">
        <div className="am-bg"/>
        <div className="container-xxl am-inner">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <span
                className="section-label"
                style={{color:"#fff",borderColor:"rgba(255,255,255,0.25)",background:"rgba(255,255,255,0.08)"}}
              >
                Materials
              </span>
              <h2 className="section-heading" style={{color:"#fff"}}>
                Crafted From The<br/>Finest Materials
              </h2>
              <div className="gold-divider left"/>
              <p style={{color:"rgba(255,255,255,0.6)",lineHeight:"1.75",marginTop:"1rem",fontSize:"0.95rem"}}>
                Every Nexxora product uses premium high-grade acrylic sheets paired with
                precision-engineered metal brackets — available in multiple finish colours
                to match any bathroom design.
              </p>
            </div>
            <div className="col-lg-7">
              <div className="am-section-title">3 Bracket Finishes</div>
              <div className="am-finishes">
                {finishes.map(f => (
                  <div key={f.name} className="am-finish-card" style={{"--fc": f.color,"--ft": f.text}}>
                    <div className="am-finish-orb" style={{background: f.color}}/>
                    <span className="am-finish-name">{f.name}</span>
                  </div>
                ))}
              </div>
              <div className="am-section-title mt-4">9 Acrylic Sheet Variants</div>
              <div className="am-acrylic-chips">
                {acrylics.map(a => (
                  <span key={a} className="am-acrylic-chip">{a}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ GREENVOLT ══ */}
      <section className="about-company-section">
        <div className="container-xxl">
          <div className="about-company-box">
            <div className="acb-glow"/>
            <div className="row align-items-center gy-4">
              <div className="col-lg-2 text-center">
                <img src="/logo.png" alt="Nexxora" className="acb-logo-img" />
              </div>
              <div className="col-lg-7">
                <div className="acb-powered">Powered By</div>
                <h2 className="acb-company">Greenvolt Enterprise</h2>
                <p className="acb-desc">
                  Greenvolt Enterprise is the driving force behind Nexxora, dedicated to bringing
                  world-class acrylic bathroom accessories to Indian homes and hotels. Our commitment
                  to quality, innovation, and customer satisfaction is at the heart of everything we do.
                </p>
              </div>
              <div className="col-lg-3">
                <div className="acb-contact-list">
                  <a href="tel:+919998664704" className="acb-contact-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-.52a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    +91 99986 64704
                  </a>
                  <a href="mailto:greenvolt28@gmail.com" className="acb-contact-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    greenvolt28@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="about-cta-section">
        <div className="container-xxl text-center">
          <span className="section-label">Ready to Transform?</span>
          <h2 className="section-heading mt-2">
            Make Your Bathroom<br/>
            <em className="text-gold" style={{fontStyle:"italic",fontFamily:"var(--font-display)"}}>Amazing.</em>
          </h2>
          <div className="gold-divider"/>
          <p className="section-sub mt-3 mb-4">
            Browse our full collection and request a custom quote from Greenvolt Enterprise.
          </p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <Link to="/collection" className="btn btn-gold btn-lg px-5 py-3">Browse Collection</Link>
            <Link to="/contact"    className="btn btn-teal btn-lg px-5 py-3">Contact Us</Link>
            <a
              href="/NEXXORA_CATALOGUE.pdf"
              download target="_blank" rel="noopener noreferrer"
              className="btn btn-outline-gold btn-lg px-5 py-3"
            >
              Download Catalogue
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}