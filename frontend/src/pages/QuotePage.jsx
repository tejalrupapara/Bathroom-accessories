import { useQuote } from "../context/QuoteContext";
import { Link } from "react-router-dom";
import "./QuotePage.css";

export default function QuotePage() {
  const { quoteItems, removeFromQuote } = useQuote();

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
              <div className="qp-form">
                <div className="qp-field">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your name"/>
                </div>
                <div className="qp-field">
                  <label>Email Address</label>
                  <input type="email" placeholder="your@email.com"/>
                </div>
                <div className="qp-field">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX"/>
                </div>
                <div className="qp-field">
                  <label>City / Location</label>
                  <input type="text" placeholder="Your city"/>
                </div>
                <div className="qp-field">
                  <label>Message <span style={{color:"var(--text-muted)",fontWeight:400}}>(optional)</span></label>
                  <textarea rows={3} placeholder="Any special requirements..."/>
                </div>
                <button className="btn btn-gold w-100 py-3">
                  Send Quote Request →
                </button>
                <p className="qp-note">Our team will contact you within 24 hours.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}