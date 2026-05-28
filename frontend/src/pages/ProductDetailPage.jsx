import { useParams, Link, useNavigate } from "react-router-dom";
import { products, seriesInfo } from "../data/products";
import { useQuote } from "../context/QuoteContext";
import "./ProductDetailPage.css";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToQuote, removeFromQuote, isInQuote } = useQuote();

  const product = products.find(p => p.id === id);

  // Related products - same category, exclude current
  const related = products
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="pdp-not-found">
        <h2>Product not found</h2>
        <Link to="/collection" className="btn btn-gold px-4 py-2">← Back to Collection</Link>
      </div>
    );
  }

  const added  = isInQuote(product.id);
  const series = seriesInfo[product.category] || {};

  return (
    <div className="pdp-page">

      {/* ── Breadcrumb ── */}
      <div className="pdp-breadcrumb-bar">
        <div className="container-xxl pdp-breadcrumb-inner">
          <button className="pdp-back-btn" onClick={() => navigate(-1)}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back
          </button>
          <span className="pdp-breadcrumb-path">
            <Link to="/">Home</Link> /
            <Link to="/collection"> Collection</Link> /
            <span> {product.name}</span>
          </span>
        </div>
      </div>

      {/* ── Main Product Section ── */}
      <div className="container-xxl pdp-main">
        <div className="row g-5 align-items-start">

          {/* Left — Image */}
          <div className="col-lg-6">
            <div className="pdp-image-card">
              {product.badge && (
                <span className={`pdp-badge pdp-badge-${product.badge}`}>
                  {product.badge === "new" ? "✦ New Arrival" : "🔥 Bestseller"}
                </span>
              )}
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="pdp-main-image"
                />
              ) : (
                <div className="pdp-no-image">
                  <svg viewBox="0 0 64 64" width="80" height="80" fill="none">
                    <circle cx="32" cy="32" r="20" fill="rgba(201,168,76,0.2)"/>
                    <text x="32" y="38" textAnchor="middle" fill="#c9a84c" fontSize="18" fontWeight="bold">N</text>
                  </svg>
                </div>
              )}

              {/* Series tag */}
              <div className="pdp-series-tag" style={{background: series.bg, color: series.accent}}>
                {product.category} Series
              </div>
            </div>
          </div>

          {/* Right — Details */}
          <div className="col-lg-6">
            <div className="pdp-details">

              {/* Series label */}
              <span className="section-label">{product.series}</span>

              {/* Product name */}
              <h1 className="pdp-title">{product.name}</h1>

              {/* Product ID */}
              <div className="pdp-id-row">
                <span className="pdp-id-label">Product Code:</span>
                <code className="pdp-id-code">{product.id}</code>
              </div>

              {/* Price */}
              {product.price > 0 && (
                <div className="pdp-price-box">
                  <span className="pdp-price">₹{product.price.toLocaleString("en-IN")}</span>
                  <span className="pdp-price-label">M.R.P (Incl. of all taxes)</span>
                </div>
              )}

              {/* Divider */}
              <div className="gold-divider left"/>

              {/* Key details */}
              <div className="pdp-specs">
                <div className="pdp-spec-row">
                  <span className="pdp-spec-label">Series</span>
                  <span className="pdp-spec-value">{product.series}</span>
                </div>
                <div className="pdp-spec-row">
                  <span className="pdp-spec-label">Category</span>
                  <span className="pdp-spec-value">{product.category}</span>
                </div>
                <div className="pdp-spec-row">
                  <span className="pdp-spec-label">Material</span>
                  <span className="pdp-spec-value">Premium Acrylic</span>
                </div>
                <div className="pdp-spec-row">
                  <span className="pdp-spec-label">Finish Options</span>
                  <span className="pdp-spec-value">Black · Rose Gold · Gold</span>
                </div>
                <div className="pdp-spec-row">
                  <span className="pdp-spec-label">Acrylic Variants</span>
                  <span className="pdp-spec-value">9 variants available</span>
                </div>
                <div className="pdp-spec-row">
                  <span className="pdp-spec-label">Brand</span>
                  <span className="pdp-spec-value">Nexxora by Greenvolt Enterprise</span>
                </div>
              </div>

              {/* Finish chips */}
              <div className="pdp-finishes">
                <p className="pdp-finishes-label">Available Finishes:</p>
                <div className="pdp-finish-chips">
                  {[{n:"Black",c:"#1a1a1a",t:"#fff"},{n:"Rose Gold",c:"#b76e79",t:"#fff"},{n:"Gold",c:"#c9a84c",t:"#1a1a1a"}].map(f=>(
                    <span key={f.n} className="pdp-finish-chip" style={{background:f.c,color:f.t}}>
                      {f.n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pdp-actions">
                <button
                  className={`pdp-quote-btn ${added ? "added" : ""}`}
                  onClick={() => added ? removeFromQuote(product.id) : addToQuote(product)}
                >
                  {added ? (
                    <><CheckIcon/> Added to Quote</>
                  ) : (
                    <><PlusIcon/> Add to Quote</>
                  )}
                </button>

                <a
                  href={`https://wa.me/919998664704?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}%20(${product.id})%20from%20Nexxora.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdp-wa-btn"
                >
                  <WaIcon/> Enquire on WhatsApp
                </a>
              </div>

              {/* Trust badges */}
              <div className="pdp-trust">
                <div className="pdp-trust-item">
                  <span className="pdp-trust-icon">✦</span>
                  <span>Premium Quality</span>
                </div>
                <div className="pdp-trust-item">
                  <span className="pdp-trust-icon">◈</span>
                  <span>Precision Crafted</span>
                </div>
                <div className="pdp-trust-item">
                  <span className="pdp-trust-icon">◎</span>
                  <span>Trusted by Hotels</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <section className="pdp-related">
          <div className="container-xxl">
            <div className="pdp-related-header">
              <h2 className="section-heading">More from {product.category} Series</h2>
              <Link to="/collection" className="pdp-view-all">View All →</Link>
            </div>
            <div className="pdp-related-grid">
              {related.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="pdp-related-card">
                  <div className="pdp-related-img">
                    {p.image
                      ? <img src={p.image} alt={p.name} loading="lazy"/>
                      : <div className="pdp-related-fallback">N</div>
                    }
                  </div>
                  <div className="pdp-related-body">
                    <span className="pdp-related-id">{p.id}</span>
                    <h4 className="pdp-related-name">{p.name}</h4>
                    {p.price > 0 && (
                      <span className="pdp-related-price">₹{p.price.toLocaleString("en-IN")}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

// Icons
const PlusIcon  = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>;
const CheckIcon = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>;
const WaIcon    = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12.001 2C6.478 2 2.001 6.477 2.001 12c0 1.775.468 3.44 1.28 4.887L2 22l5.278-1.267A9.956 9.956 0 0012.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18c-1.66 0-3.218-.453-4.553-1.238l-.326-.196-3.132.752.78-3.038-.21-.339A7.962 7.962 0 014 12c0-4.411 3.589-8 8.001-8C16.41 4 20 7.589 20 12s-3.589 8-7.999 8zm4.39-5.977c-.24-.12-1.42-.699-1.64-.779-.22-.08-.38-.12-.54.12-.16.24-.62.779-.76.939-.14.16-.28.18-.52.06-.24-.12-1-.367-1.907-1.177-.706-.63-1.184-1.408-1.323-1.647-.14-.24 0-.36.105-.47.1-.1.24-.26.36-.39.12-.13.16-.22.24-.38.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.688 2.58 4.1 3.617.573.249 1.02.399 1.37.51.576.18 1.1.155 1.514.094.462-.069 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/>
  </svg>
);