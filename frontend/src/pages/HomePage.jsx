import { Link } from "react-router-dom";
import { products, seriesInfo } from "../data/products";
import "./HomePage.css";

const series = ["Sky","Prism","Lume","Vector","Nova","Neo","Prime"];
const finishes = [
  { name:"Black",    color:"#1a1a1a", text:"#fff",      desc:"Bold & Modern"    },
  { name:"Rose Gold",color:"#b76e79", text:"#fff",      desc:"Warm & Romantic"  },
  { name:"Gold",     color:"#c9a84c", text:"#1a1a1a",   desc:"Luxe & Timeless"  },
];
const acrylic = ["Zebra Marble","Grey Marble","Black Smock","Blue Marble","Pink Marble","White Marble","Clear","Brown Marble","Milky White"];
const features = [
  { icon:"◈", title:"Precision Crafted",  desc:"High-grade acrylic with premium metal fittings engineered for lasting elegance." },
  { icon:"✦", title:"9 Acrylic Variants", desc:"A palette of textures from Zebra Marble to Milky White — beauty on every wall." },
  { icon:"⬡", title:"3 Finish Options",   desc:"Black, Rose Gold, and Gold brackets to perfectly match your bathroom's character." },
  { icon:"◎", title:"Hotels & Homes",     desc:"Trusted by leading hotels and private residences across India." },
];

export default function HomePage() {
  return (
    <div className="home-page">

      {/* ══════ HERO ══════ */}
      <section className="hero-section">
        {/* Decorative orbs */}
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="hero-orb orb-3" />

        <div className="container-xxl hero-inner">
          <div className="row align-items-center g-5">

            {/* Left text */}
            <div className="col-lg-6">
              <div className="anim-up">
                <span className="section-label">Precision Crafted Acrylic Bathware</span>
              </div>
              <h1 className="hero-title anim-up-1">
                Make Your<br/>
                Bathroom<br/>
                <span className="hero-italic">Amazing.</span>
              </h1>
              <p className="hero-desc anim-up-2">
                Premium bathroom accessories by <strong>Greenvolt Enterprise</strong> — 7 exclusive series, 9 acrylic variants, 3 premium finishes. Crafted for homes and hotels that demand the finest.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-5 anim-up-3">
                <Link to="/collection" className="btn btn-gold btn-lg px-4 py-3">
                  Explore Collection
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <Link to="/quote" className="btn btn-outline-white btn-lg px-4 py-3">
                  Get Quote
                </Link>
              </div>

              {/* Stats */}
              <div className="hero-stats anim-up-4">
                {[
                  { n:`${products.length}+`, l:"Products" },
                  { n:"7",  l:"Series"   },
                  { n:"9",  l:"Variants" },
                  { n:"3",  l:"Finishes" },
                ].map((s,i) => (
                  <div key={i} className="hero-stat">
                    <span className="hero-stat-num">{s.n}</span>
                    <span className="hero-stat-lbl">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right visual card */}
            <div className="col-lg-6 d-flex justify-content-center anim-scale">
              <div className="hero-visual anim-float">
                <div className="hv-top">
                  <img src="/logo.png" alt="Nexxora" className="hv-logo" />
                  <span className="hv-tag">Premium Bathware</span>
                </div>
                <div className="hv-grid">
                  {series.map(s => (
                    <div key={s} className="hv-chip"
                      style={{background: seriesInfo[s].bg, color: seriesInfo[s].accent}}>
                      <span className="hv-dot" style={{background: seriesInfo[s].accent}}/>
                      {s}
                    </div>
                  ))}
                </div>
                <div className="hv-finishes">
                  {finishes.map(f => (
                    <div key={f.name} className="hv-finish" style={{background:f.color,color:f.text}}>
                      {f.name}
                    </div>
                  ))}
                </div>
                <div className="hv-footer">
                  Powered by Greenvolt Enterprise · +91 99986 64704
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="hero-wave">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,45 C480,90 960,0 1440,45 L1440,90 L0,90 Z" fill="var(--off-white)"/>
          </svg>
        </div>
      </section>

      {/* ══════ SERIES ══════ */}
      <section className="series-section">
        <div className="container-xxl">
          <div className="text-center mb-5">
            <span className="section-label">Our Collections</span>
            <h2 className="section-heading">7 Premium Series</h2>
            <div className="gold-divider"/>
            <p className="section-sub mt-3">Each series crafted with a unique aesthetic, material palette, and character</p>
          </div>

          <div className="row g-3">
            {series.map((s,i) => {
              const info  = seriesInfo[s];
              const count = products.filter(p => p.category===s).length;
              return (
                <div key={s} className="col-6 col-md-4 col-xl-3">
                  <Link to="/collection" className="series-card"
                    style={{"--acc":info.accent,"--cbg":info.bg}}>
                    <div className="sc-number">0{i+1}</div>
                    <h3 className="sc-name">{s}</h3>
                    <p className="sc-desc">{info.desc}</p>
                    <div className="sc-footer">
                      <span className="sc-count">{count} items</span>
                      <span className="sc-arrow">→</span>
                    </div>
                  </Link>
                </div>
              );
            })}
            <div className="col-6 col-md-4 col-xl-3">
              <Link to="/collection" className="series-card series-all-card">
                <div className="sa-icon">✦</div>
                <h3>All Products</h3>
                <p>{products.length}+ items across 7 series</p>
                <span className="sa-btn">Browse All →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ WHY NEXXORA ══════ */}
      <section className="why-section">
        <div className="container-xxl">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <span className="section-label">Why Nexxora</span>
              <h2 className="section-heading text-start">Quality Is Not<br/>An Act —<br/><em className="text-gold">It's A Habit.</em></h2>
              <div className="gold-divider left"/>
              <p className="section-sub text-start mt-3">
                In a short span of time Nexxora has made its mark in the sanitary industry, blending stylish design, high quality materials, and affordable prices for every consumer.
              </p>
              <div className="why-contact mt-4">
                <div className="why-contact-item">
                  <span className="wci-icon">📞</span>
                  <div>
                    <div className="wci-label">Call Us</div>
                    <a href="tel:+919998664704" className="wci-value">+91 99986 64704</a>
                  </div>
                </div>
                <div className="why-contact-item">
                  <span className="wci-icon">✉️</span>
                  <div>
                    <div className="wci-label">Email</div>
                    <a href="mailto:greenvolt28@gmail.com" className="wci-value">greenvolt28@gmail.com</a>
                  </div>
                </div>
              </div>
              <Link to="/collection" className="btn btn-teal mt-4 px-4 py-3">
                Browse Collection →
              </Link>
            </div>

            <div className="col-lg-7">
              <div className="row g-3">
                {features.map((f,i) => (
                  <div key={i} className="col-sm-6">
                    <div className="feature-card">
                      <div className="fc-icon">{f.icon}</div>
                      <h4 className="fc-title">{f.title}</h4>
                      <p className="fc-desc">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FINISHES ══════ */}
      <section className="finishes-section">
        <div className="finishes-bg"/>
        <div className="container-xxl finishes-inner">
          <div className="text-center mb-5">
            <span className="section-label" style={{color:"#fff",borderColor:"rgba(255,255,255,0.25)",background:"rgba(255,255,255,0.08)"}}>
              Materials & Finishes
            </span>
            <h2 className="section-heading" style={{color:"#fff"}}>Customise Your Style</h2>
            <div className="gold-divider"/>
            <p className="section-sub" style={{color:"rgba(255,255,255,0.6)"}}>Pick the finish and acrylic variant that matches your bathroom's personality</p>
          </div>

          {/* Finish cards */}
          <div className="row g-4 justify-content-center mb-5">
            {finishes.map(f => (
              <div key={f.name} className="col-md-4">
                <div className="finish-card" style={{"--fc":f.color,"--ft":f.text}}>
                  <div className="finish-orb" style={{background:f.color}}/>
                  <h3 className="finish-name">{f.name}</h3>
                  <p className="finish-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Acrylic chips */}
          <div className="text-center">
            <p className="acrylic-label">9 Acrylic Sheet Variants</p>
            <div className="acrylic-chips">
              {acrylic.map(v => <span key={v} className="acrylic-chip">{v}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="cta-section">
        <div className="container-xxl">
          <div className="cta-box">
            <div className="cta-glow"/>
            <div className="row align-items-center gy-4">
              <div className="col-lg-7">
                <span className="section-label">Ready to Transform?</span>
                <h2 className="cta-heading">Upgrade Your Bathroom<br/><em>Today.</em></h2>
                <p className="cta-sub">Browse our full catalogue and request a custom quote — no commitment needed.</p>
              </div>
              <div className="col-lg-5 d-flex flex-wrap gap-3 justify-content-lg-end">
                <Link to="/collection" className="btn btn-gold btn-lg px-4 py-3">Browse Collection</Link>
                <Link to="/quote"      className="btn btn-outline-gold btn-lg px-4 py-3">Get Quote</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="nx-footer">
        <div className="container-xxl">
          <div className="row gy-5 footer-top">
            <div className="col-lg-4">
              <div className="footer-brand-row">
                <img src="/logo.png" alt="Nexxora" className="footer-logo-img" />
                <div>
                  <div className="footer-brand-name">NEXXORA</div>
                  <div className="footer-brand-sub">by Greenvolt Enterprise</div>
                </div>
              </div>
              <p className="footer-tagline">Precision Crafted Acrylic Bathware — transforming bathrooms across India since day one.</p>
              <div className="footer-contact-pills">
                <a href="tel:+919998664704" className="fcp">📞 +91 99986 64704</a>
                <a href="mailto:greenvolt28@gmail.com" className="fcp">✉️ greenvolt28@gmail.com</a>
              </div>
            </div>

            <div className="col-6 col-lg-2 offset-lg-1">
              <h5 className="footer-heading">Navigate</h5>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/collection">Collection</Link></li>
                <li><Link to="/quote">Get Quote</Link></li>
              </ul>
            </div>

            <div className="col-6 col-lg-2">
              <h5 className="footer-heading">Series</h5>
              <ul className="footer-links">
                {series.map(s => <li key={s}><span className="footer-series-item">{s}</span></li>)}
              </ul>
            </div>

            <div className="col-lg-3">
              <h5 className="footer-heading">About</h5>
              <p className="footer-about">
                Nexxora specializes in premium bathroom accessories with stylish, functional designs and affordable prices for consumers and hotels alike.
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2025 Nexxora — Greenvolt Enterprise. All rights reserved.</span>
            <span>Precision Crafted Bathware</span>
          </div>
        </div>
      </footer>
    </div>
  );
}