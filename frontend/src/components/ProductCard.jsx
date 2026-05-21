import { useQuote } from "../context/QuoteContext";
import "./ProductCard.css";

// Simple SVG placeholder icons per category
const categoryIcons = {
  Faucets: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="10" width="24" height="8" rx="4" fill="#93c5fd" />
      <rect x="28" y="18" width="8" height="20" rx="2" fill="#60a5fa" />
      <path d="M20 38 Q32 50 44 38" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="32" cy="52" r="4" fill="#93c5fd" opacity="0.6" />
    </svg>
  ),
  Showers: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="26" y="8" width="12" height="4" rx="2" fill="#93c5fd" />
      <rect x="24" y="12" width="16" height="10" rx="3" fill="#60a5fa" />
      <circle cx="26" cy="28" r="2" fill="#3b82f6" />
      <circle cx="32" cy="28" r="2" fill="#3b82f6" />
      <circle cx="38" cy="28" r="2" fill="#3b82f6" />
      <circle cx="29" cy="34" r="2" fill="#93c5fd" />
      <circle cx="35" cy="34" r="2" fill="#93c5fd" />
      <circle cx="26" cy="40" r="2" fill="#bfdbfe" />
      <circle cx="32" cy="40" r="2" fill="#bfdbfe" />
      <circle cx="38" cy="40" r="2" fill="#bfdbfe" />
    </svg>
  ),
  Accessories: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="28" width="40" height="8" rx="4" fill="#60a5fa" />
      <rect x="14" y="20" width="6" height="8" rx="2" fill="#93c5fd" />
      <rect x="44" y="20" width="6" height="8" rx="2" fill="#93c5fd" />
    </svg>
  ),
  "Soap & Holders": (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="24" width="28" height="28" rx="6" fill="#93c5fd" />
      <rect x="24" y="16" width="16" height="10" rx="4" fill="#60a5fa" />
      <circle cx="32" cy="20" r="3" fill="#bfdbfe" />
      <path d="M26 34 Q32 42 38 34" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  ),
};

export default function ProductCard({ product }) {
  const { addToQuote, removeFromQuote, isInQuote } = useQuote();
  const added = isInQuote(product.id);

  function handleQuote() {
    if (added) {
      removeFromQuote(product.id);
    } else {
      addToQuote(product);
    }
  }

  return (
    <div className="product-card">
      <div className="card-image">
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <div className="product-icon">
            {categoryIcons[product.category] || categoryIcons["Faucets"]}
          </div>
        )}
        {product.badge && (
          <span className={`badge badge-${product.badge}`}>
            {product.badge === "new" ? "New" : "Hot"}
          </span>
        )}
      </div>

      <div className="card-body">
        <p className="product-id">{product.id}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-series">{product.series}</p>
        <button
          className={`quote-btn ${added ? "added" : ""}`}
          onClick={handleQuote}
        >
          {added ? "✓ Added" : "+ Add to Quote"}
        </button>
      </div>
    </div>
  );
}