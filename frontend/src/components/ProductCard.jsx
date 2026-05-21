import { useQuote } from "../context/QuoteContext";
import "./ProductCard.css";

const seriesColors = {
  Sky:    "#2d6a8a", Prism:"#8B4513", Lume:"#5c4a2a",
  Vector: "#1a1a1a", Nova:"#111827",  Neo:"#7c3a1e", Prime:"#1a1a2e",
};

export default function ProductCard({ product }) {
  const { addToQuote, removeFromQuote, isInQuote } = useQuote();
  const added = isInQuote(product.id);
  const accent = seriesColors[product.category] || "#0d6b6b";

  return (
    <div className="pc-card" style={{"--accent": accent}}>
      {/* Image area */}
      <div className="pc-img">
        <div className="pc-img-inner">
          <div className="pc-icon-wrap">
            <BathIcon category={product.category}/>
          </div>
        </div>
        {product.badge && (
          <span className={`pc-badge pc-badge-${product.badge}`}>
            {product.badge === "new" ? "New" : "Hot"}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="pc-body">
        <div className="pc-meta">
          <span className="pc-id">{product.id}</span>
          <span className="pc-series">{product.category}</span>
        </div>
        <h3 className="pc-name">{product.name}</h3>
        <div className="pc-price">₹{product.price.toLocaleString("en-IN")}</div>
        <button
          className={`pc-btn ${added ? "added" : ""}`}
          onClick={() => added ? removeFromQuote(product.id) : addToQuote(product)}
        >
          {added
            ? <><CheckIcon/> Added</>
            : <><PlusIcon/> Add to Quote</>
          }
        </button>
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
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="60%" height="60%">
      {icons[category] || icons.Sky}
    </svg>
  );
}
const PlusIcon  = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>;
const CheckIcon = () => <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>;