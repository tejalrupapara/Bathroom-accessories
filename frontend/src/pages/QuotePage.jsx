import { useState } from "react";
import { useQuote } from "../context/QuoteContext";
import { Link } from "react-router-dom";
import "./QuotePage.css";

export default function QuotePage() {
  const { quoteItems, removeFromQuote, clearQuote } = useQuote();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (quoteItems.length === 0) {
      setError("Please add at least one product to your quote list.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://bathroom-accessories.onrender.com/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.city, // maps frontend City to backend Company field
          message: formData.message,
          selectedProducts: quoteItems
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || (data.errors && data.errors[0]?.message) || 'Failed to submit quote request.');
      }

      setSubmitted(true);
      clearQuote();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="qp-page">
        <div className="qp-header">
          <div className="container-xxl qp-header-inner">
            <h1 className="qp-title">Quote Request Submitted</h1>
            <p className="qp-subtitle">Your request has been successfully recorded</p>
          </div>
        </div>
        <div className="container-xxl qp-body d-flex justify-content-center">
          <div className="qp-card qp-success-card text-center" style={{ maxWidth: '550px', width: '100%', margin: '40px auto', padding: '40px', borderRadius: '12px', border: '1px solid var(--gold)', backgroundColor: 'var(--card-bg)' }}>
            <div className="success-icon-wrap" style={{ fontSize: '50px', color: 'var(--gold)', marginBottom: '20px' }}>✓</div>
            <h2 style={{ color: 'var(--text-light)', marginBottom: '15px' }}>Thank You!</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.6' }}>
              Your quote request has been sent successfully. We have dispatched a confirmation email to you. Our commercial team will review your selections and contact you via phone/WhatsApp within 24 hours.
            </p>
            <div style={{ margin: '30px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '15px 0' }}>
              <span style={{ color: 'var(--gold)', fontWeight: 'bold', letterSpacing: '1px' }}>NEXXORA PREMIUM SERVICE</span>
            </div>
            <Link to="/collection" className="btn btn-gold px-5 py-3">
              Browse More Accessories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (quoteItems.length === 0) return (
    <div className="qp-empty-page">
      <div className="qp-empty-box">
        <div className="qp-empty-icon">📋</div>
        <h2>Your quote list is empty</h2>
        <p>Add products from our collection to request a custom quote.</p>
        <Link to="/collection" className="btn btn-gold px-4 py-3 mt-2">
          Browse Collection →
        </Link>
      </div>
    </div>
  );

  return (
    <div className="qp-page">
      <div className="qp-header">
        <div className="container-xxl qp-header-inner">
          <h1 className="qp-title">Quote Request</h1>
          <p className="qp-subtitle">{quoteItems.length} product{quoteItems.length!==1?"s":""} selected</p>
        </div>
      </div>

      <div className="container-xxl qp-body">
        <div className="row g-4">

          {/* Products list */}
          <div className="col-lg-7">
            <div className="qp-card">
              <h2 className="qp-card-title">Selected Products</h2>
              <div className="qp-items">
                {quoteItems.map(item => (
                  <div key={item.id} className="qp-item">
                    <div className="qp-item-color" style={{background: `hsl(${item.id.length*30},40%,70%)`}}/>
                    <div className="qp-item-info">
                      <div className="qp-item-series">{item.series}</div>
                      <div className="qp-item-name">{item.name}</div>
                      <div className="qp-item-id">{item.id}</div>
                    </div>
                    <div className="qp-item-price">₹{item.price.toLocaleString("en-IN")}</div>
                    <button className="qp-remove" onClick={()=>removeFromQuote(item.id)} title="Remove">✕</button>
                  </div>
                ))}
              </div>
              <div className="qp-total">
                <span>Estimated Total</span>
                <span className="qp-total-num">
                  ₹{quoteItems.reduce((s,p)=>s+p.price,0).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="col-lg-5">
            <div className="qp-card qp-form-card">
              <h2 className="qp-card-title">Your Details</h2>
              <form onSubmit={handleSubmit} className="qp-form">
                {error && (
                  <div className="qp-error-alert" style={{ color: '#ff4d4d', backgroundColor: 'rgba(255, 77, 77, 0.08)', padding: '12px', borderRadius: '6px', marginBottom: '15px', fontSize: '14px', border: '1px solid rgba(255, 77, 77, 0.15)' }}>
                    ⚠️ {error}
                  </div>
                )}
                <div className="qp-field">
                  <label>Full Name *</label>
                  <input name="name" type="text" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="qp-field">
                  <label>Email Address *</label>
                  <input name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="qp-field">
                  <label>Phone Number *</label>
                  <input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="qp-field">
                  <label>City / Location</label>
                  <input name="city" type="text" placeholder="Your city" value={formData.city} onChange={handleChange} />
                </div>
                <div className="qp-field">
                  <label>Message <span style={{color:"var(--text-muted)",fontWeight:400}}>(optional)</span></label>
                  <textarea name="message" rows={3} placeholder="Any special requirements..." value={formData.message} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-gold w-100 py-3" disabled={loading}>
                  {loading ? "Sending Quote Request..." : "Send Quote Request →"}
                </button>
                <p className="qp-note">Our team will contact you within 24 hours.</p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}