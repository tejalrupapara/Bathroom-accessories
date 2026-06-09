import { useState, useRef, useEffect } from "react";
import "./ContactPage.css";

const accessories = [
  {
    id: "faucet",
    name: "Matte Black Faucet",
    desc: "Ray-traced reflection, electroplated matte black finish, smooth water flow aerator, and ultra-durable ceramic cartridge.",
    x: 48, y: 68,
    price: "Premium",
    spec: "Anti-corrosion, solid brass core, aerated flow"
  },
  {
    id: "towel",
    name: "Golden Towel Holder",
    desc: "Stunning 24k gold vacuum plating brackets combined with highly-polished crystal acrylic rod for towels.",
    x: 22, y: 35,
    price: "Luxury",
    spec: "Scratch-resistant PVD coating, heavy-duty mount"
  },
  {
    id: "soap",
    name: "Soap Dispenser",
    desc: "Countertop luxury soap pump with a crystal clear marble acrylic body and high-precision golden spring pump.",
    x: 34, y: 56,
    price: "Designer",
    spec: "350ml capacity, drip-free nozzle, heavy-base stability"
  },
  {
    id: "shower",
    name: "Premium Shower Set",
    desc: "Cinematic overhead rain shower system with soft silicone nozzles, global illumination aesthetics, and matte black body.",
    x: 76, y: 24,
    price: "Elite",
    spec: "Air-injection rain flow, multi-mode spray"
  },
  {
    id: "mirror",
    name: "Mirror Cabinet",
    desc: "Glossy intelligent mirror cabinet with soft ambient LED backlighting, integrated defogger, and concealed glass shelves.",
    x: 52, y: 26,
    price: "Signature",
    spec: "Smart touch control, 3-color light adjustment"
  },
  {
    id: "sink",
    name: "Ceramic Sink Basin",
    desc: "Vessel basin with smooth glossy marble texture, dirt-resistant nano glazing, and elegant modern organic curves.",
    x: 41, y: 80,
    price: "Imperial",
    spec: "Stain-resistant glaze, seamless drainage integration"
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name:"", email:"", phone:"", city:"", subject:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [activeAcc, setActiveAcc] = useState(accessories[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const showcaseRef = useRef(null);

  useEffect(() => {
    const showcase = showcaseRef.current;
    if (!showcase) return;

    let raf;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const handleMouseMove = (e) => {
      const rect = showcase.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetX = (x / rect.width) * 2 - 1;
      targetY = (y / rect.height) * 2 - 1;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      
      showcase.style.setProperty("--tilt-x", `${-currentY * 14}deg`);
      showcase.style.setProperty("--tilt-y", `${currentX * 14}deg`);
      showcase.style.setProperty("--light-x", `${(currentX + 1) * 50}%`);
      showcase.style.setProperty("--light-y", `${(currentY + 1) * 50}%`);
      
      raf = requestAnimationFrame(tick);
    };

    showcase.addEventListener("mousemove", handleMouseMove);
    showcase.addEventListener("mouseleave", handleMouseLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      showcase.removeEventListener("mousemove", handleMouseMove);
      showcase.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  function handleChange(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || (data.errors && data.errors[0]?.message) || 'Failed to send message.');
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", city: "", subject: "", message: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const contactCards = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      title: "Our Office",
      lines: ["Greenvolt Enterprise", "Rajkot-360022, Gujarat", "India"],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-.52a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      ),
      title: "Phone / WhatsApp",
      lines: ["+91 99986 64704"],
      link: "tel:+919998664704",
      linkLabel: "Call Now",
      whatsapp: `https://wa.me/919998664704?text=Hi%2C%20I%20am%20interested%20in%20Nexxora%20bathroom%20accessories.`,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      title: "Email Us",
      lines: ["greenvolt28@gmail.com"],
      link: "mailto:greenvolt28@gmail.com",
      linkLabel: "Send Email",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: "Working Hours",
      lines: ["Mon – Sat: 8:00 AM – 7:00 PM", "Sunday: By Appointment"],
    },
  ];

  return (
    <div className="contact-page">

      {/* ── Header ── */}
      <div className="contact-header">
        <div className="contact-header-glow" />
        <div className="container-xxl contact-header-inner">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 contact-header-text">
              <p className="cp-breadcrumb">Home / Contact Us</p>
              <img src="/logo.png" alt="Nexxora" className="contact-header-logo" />
              <h1 className="contact-title">Get In Touch</h1>
              <p className="contact-subtitle">
                Have questions or need assistance? Reach out via phone, WhatsApp, or email — we're here to help.
              </p>
              
              {/* Accessory Quick Specs Pill */}
              <div className="contact-acc-pill">
                <span className="cp-pill-badge">Commercial Showcase</span>
                <span className="cp-pill-text">Hover or click hotspots on the 3D interior showcase to view premium accessory details.</span>
              </div>
            </div>
            
            <div className="col-lg-6 d-flex justify-content-center">
              <div className="contact-3d-wrap">
                <div ref={showcaseRef} className="contact-3d-showcase">
                  {/* Backdrop texture */}
                  <div className="c3d-backdrop" />
                  
                  {/* Dynamic light shine reflection */}
                  <div className="c3d-reflection" />
                  
                  {/* Slow motion water droplets overlay */}
                  <div className="c3d-water-layer">
                    <span className="c3d-drop drop-1" />
                    <span className="c3d-drop drop-2" />
                    <span className="c3d-drop drop-3" />
                    <span className="c3d-drop drop-4" />
                    <span className="c3d-drop drop-5" />
                    <span className="c3d-drop drop-6" />
                  </div>
                  
                  {/* 3D Depth Layer Outline */}
                  <div className="c3d-depth-frame" />
                  
                  {/* Hotspots */}
                  {accessories.map(acc => (
                    <button
                      key={acc.id}
                      className={`c3d-hotspot hs-${acc.id} ${activeAcc.id === acc.id ? "active" : ""}`}
                      style={{ top: `${acc.y}%`, left: `${acc.x}%` }}
                      onClick={() => setActiveAcc(acc)}
                      onMouseEnter={() => setActiveAcc(acc)}
                      aria-label={`Highlight ${acc.name}`}
                    >
                      <span className="c3d-hotspot-pulse" />
                      <span className="c3d-hotspot-dot">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      </span>
                    </button>
                  ))}
                  
                  {/* Active details popup banner (inside 3D space) */}
                  <div className="c3d-details-card">
                    <div className="c3d-details-header">
                      <span className="c3d-details-series">{activeAcc.spec}</span>
                      <span className="c3d-details-badge">{activeAcc.price} Selection</span>
                    </div>
                    <h3 className="c3d-details-title">{activeAcc.name}</h3>
                    <p className="c3d-details-desc">{activeAcc.desc}</p>
                    <div className="c3d-details-footer">
                      <span className="c3d-tag">8K Octane Quality</span>
                      <span className="c3d-tag">PVD / Matte Brass</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Contact Cards ── */}
      <section className="contact-cards-section">
        <div className="container-xxl">
          <div className="row g-4">
            {contactCards.map((card, i) => (
              <div key={i} className="col-sm-6 col-xl-3">
                <div className="contact-card">
                  <div className="cc-icon">{card.icon}</div>
                  <h3 className="cc-title">{card.title}</h3>
                  {card.lines.map((line, j) => (
                    <p key={j} className="cc-line">{line}</p>
                  ))}
                  {card.link && (
                    <a href={card.link} className="cc-link">{card.linkLabel} →</a>
                  )}
                  {card.whatsapp && (
                    <a href={card.whatsapp} target="_blank" rel="noopener noreferrer" className="cc-link cc-wa">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                        <path d="M12.001 2C6.478 2 2.001 6.477 2.001 12c0 1.775.468 3.44 1.28 4.887L2 22l5.278-1.267A9.956 9.956 0 0012.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18c-1.66 0-3.218-.453-4.553-1.238l-.326-.196-3.132.752.78-3.038-.21-.339A7.962 7.962 0 014 12c0-4.411 3.589-8 8.001-8C16.41 4 20 7.589 20 12s-3.589 8-7.999 8zm4.39-5.977c-.24-.12-1.42-.699-1.64-.779-.22-.08-.38-.12-.54.12-.16.24-.62.779-.76.939-.14.16-.28.18-.52.06-.24-.12-1-.367-1.907-1.177-.706-.63-1.184-1.408-1.323-1.647-.14-.24 0-.36.105-.47.1-.1.24-.26.36-.39.12-.13.16-.22.24-.38.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.688 2.58 4.1 3.617.573.249 1.02.399 1.37.51.576.18 1.1.155 1.514.094.462-.069 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/>
                      </svg>
                      WhatsApp Us
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Map ── */}
      <section className="contact-main-section">
        <div className="container-xxl">
          <div className="row g-5 align-items-start">

            {/* Form */}
            <div className="col-lg-7">
              <div className="contact-form-card">
                <div className="cfc-header">
                  <span className="section-label">Send a Message</span>
                  <h2 className="cfc-title">We'd Love To Hear From You</h2>
                  <div className="gold-divider left" />
                </div>

                {submitted ? (
                  <div className="cfc-success">
                    <div className="success-icon">✓</div>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. Our team will contact you within 24 hours.</p>
                    <button className="btn btn-teal px-4 py-2 mt-3" onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form className="cfc-form" onSubmit={handleSubmit}>
                    {error && (
                      <div className="cp-error-alert" style={{ color: '#ff4d4d', backgroundColor: 'rgba(255, 77, 77, 0.08)', padding: '12px', borderRadius: '6px', marginBottom: '15px', fontSize: '14px', border: '1px solid rgba(255, 77, 77, 0.15)' }}>
                        ⚠️ {error}
                      </div>
                    )}
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Full Name *</label>
                          <input name="name" type="text" placeholder="Your full name" value={formData.name} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Phone Number *</label>
                          <input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Email Address *</label>
                          <input name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>City</label>
                          <input name="city" type="text" placeholder="Your city" value={formData.city} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label>Subject *</label>
                          <select name="subject" value={formData.subject} onChange={handleChange} required>
                            <option value="">Select a subject</option>
                            <option>Product Inquiry</option>
                            <option>Quote Request</option>
                            <option>Dealer / Distribution</option>
                            <option>Bulk Order</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label>Message *</label>
                          <textarea name="message" rows={5} placeholder="Tell us how we can help you..." value={formData.message} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-gold w-100 py-3" disabled={loading}>
                          {loading ? "Sending Message..." : "Send Message"}
                          {!loading && (
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right side */}
            <div className="col-lg-5">

              {/* Quick contact box */}
              <div className="quick-contact-box mb-4">
                <h3 className="qcb-title">Quick Contact</h3>
                <p className="qcb-sub">Prefer a faster response? Reach us directly.</p>

                <a href="https://wa.me/919998664704?text=Hi%2C%20I%20am%20interested%20in%20Nexxora%20bathroom%20accessories."
                  target="_blank" rel="noopener noreferrer"
                  className="qcb-btn qcb-wa">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                    <path d="M12.001 2C6.478 2 2.001 6.477 2.001 12c0 1.775.468 3.44 1.28 4.887L2 22l5.278-1.267A9.956 9.956 0 0012.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18c-1.66 0-3.218-.453-4.553-1.238l-.326-.196-3.132.752.78-3.038-.21-.339A7.962 7.962 0 014 12c0-4.411 3.589-8 8.001-8C16.41 4 20 7.589 20 12s-3.589 8-7.999 8zm4.39-5.977c-.24-.12-1.42-.699-1.64-.779-.22-.08-.38-.12-.54.12-.16.24-.62.779-.76.939-.14.16-.28.18-.52.06-.24-.12-1-.367-1.907-1.177-.706-.63-1.184-1.408-1.323-1.647-.14-.24 0-.36.105-.47.1-.1.24-.26.36-.39.12-.13.16-.22.24-.38.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.688 2.58 4.1 3.617.573.249 1.02.399 1.37.51.576.18 1.1.155 1.514.094.462-.069 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/>
                  </svg>
                  <div>
                    <div className="qcb-btn-title">Chat on WhatsApp</div>
                    <div className="qcb-btn-sub">+91 99986 64704</div>
                  </div>
                </a>

                <a href="tel:+919998664704" className="qcb-btn qcb-call">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-.52a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <div>
                    <div className="qcb-btn-title">Call Us Directly</div>
                    <div className="qcb-btn-sub">+91 99986 64704</div>
                  </div>
                </a>

                <a href="mailto:greenvolt28@gmail.com" className="qcb-btn qcb-email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <div>
                    <div className="qcb-btn-title">Email Us</div>
                    <div className="qcb-btn-sub">greenvolt28@gmail.com</div>
                  </div>
                </a>
              </div>

              {/* Catalogue download */}
              <div className="catalogue-box">
                <img src="/logo.png" alt="Nexxora" className="cat-box-logo" />
                <div>
                  <h4 className="cat-box-title">Download Catalogue</h4>
                  <p className="cat-box-sub">Browse our full Nexxora product catalogue with all 7 series.</p>
                </div>
                <a href="/NEXXORA_CATALOGUE.pdf" download target="_blank" rel="noopener noreferrer" className="btn btn-gold w-100 mt-3 py-2">
                  Download PDF →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      {/* <section className="newsletter-section">
        <div className="container-xxl">
          <div className="newsletter-box">
            <div className="nl-glow" />
            <div className="row align-items-center gy-4">
              <div className="col-lg-6">
                <span className="section-label" style={{color:"var(--gold)"}}>Stay Updated</span>
                <h2 className="nl-title">Join Our Newsletter</h2>
                <p className="nl-sub">Get the latest product launches, exclusive offers, and design inspiration delivered to your inbox.</p>
              </div>
              <div className="col-lg-6">
                <div className="nl-form">
                  <input type="email" placeholder="Enter your email address" className="nl-input" />
                  <button className="btn btn-gold py-3 px-4">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

    </div>
  );
}