import { useRef } from "react";
import { Link } from "react-router-dom";
import { useQuote } from "../context/QuoteContext";
import "./ProductCard.css";

const seriesColors = {
  Sky:"#2d6a8a", Prism:"#8B4513", Lume:"#5c4a2a",
  Vector:"#1a1a1a", Nova:"#111827", Neo:"#7c3a1e", Prime:"#1a1a2e",
};

export default function ProductCard({ product }) {
  const { addToQuote, removeFromQuote, isInQuote } = useQuote();
  const added  = isInQuote(product.id);
  const accent = seriesColors[product.category] || "#0d6b6b";
  const cardRef = useRef(null);

  /* ── 3D tilt on mouse move ── */
  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width  / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;  // max 7deg
    const rotateY = ((x - centerX) / centerX) *  7;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "";
    card.style.transition = "transform 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s ease, border-color 0.3s ease";
    setTimeout(() => {
      if (card) card.style.transition = "";
    }, 500);
  }

  return (
    <div
      className="pc-card"
      style={{"--accent": accent}}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="pc-img-link">
        <div className="pc-img">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="pc-real-img"
              loading="lazy"
              onError={e => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div className="pc-fallback" style={{display: product.image ? "none" : "flex"}}>
            <BathIcon category={product.category}/>
          </div>
          {product.badge && (
            <span className={`pc-badge pc-badge-${product.badge}`}>
              {product.badge === "new" ? "New" : "Hot"}
            </span>
          )}
          <div className="pc-overlay">
            <span className="pc-overlay-text">View Details</span>
          </div>
        </div>
      </Link>

      {/* Body */}
      <div className="pc-body">
        <div className="pc-meta">
          <span className="pc-id">{product.id}</span>
          <span className="pc-series">{product.category}</span>
        </div>
        <Link to={`/product/${product.id}`} className="pc-name-link">
          <h3 className="pc-name">{product.name}</h3>
        </Link>
        {product.price > 0 && (
          <div className="pc-price">₹{product.price.toLocaleString("en-IN")}</div>
        )}
        <div className="pc-btn-row">
          <Link to={`/product/${product.id}`} className="pc-view-btn">
            View Details
          </Link>
          <button
            className={`pc-quote-btn ${added ? "added" : ""}`}
            onClick={() => added ? removeFromQuote(product.id) : addToQuote(product)}
            title={added ? "Remove from quote" : "Add to quote"}
          >
            {added ? <CheckIcon/> : <PlusIcon/>}
          </button>
        </div>
      </div>
    </div>
  );
}

function BathIcon({ category }) {
  const icons = {
    Sky:    <circle cx="32" cy="32" r="18" fill="#93c5fd" opacity=".7"/>,
    Prism:  <rect x="14" y="14" width="36" height="36" rx="8" fill="#fca5a5" opacity=".7"/>,
    Lume:   <polygon points="32,10 54,50 10,50" fill="#86efac" opacity=".7"/>,
    Vector: <rect x="10" y="10" width="44" height="44" rx="4" fill="#6b7280" opacity=".7"/>,
    Nova:   <ellipse cx="32" cy="32" rx="22" ry="14" fill="#a5b4fc" opacity=".7"/>,
    Neo:    <polygon points="32,10 54,32 32,54 10,32" fill="#fdba74" opacity=".7"/>,
    Prime:  <circle cx="32" cy="32" r="20" fill="#c084fc" opacity=".7"/>,
  };
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="50%" height="50%">
      {icons[category] || icons.Sky}
    </svg>
  );
}

const PlusIcon  = () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>;
const CheckIcon = () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>;