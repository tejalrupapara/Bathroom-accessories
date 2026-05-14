import { categories, products } from "../data/products";
import "./CategorySidebar.css";

export default function CategorySidebar({ activeCategory, onCategoryChange }) {
  function getCount(cat) {
    if (cat === "All") return products.length;
    return products.filter((p) => p.category === cat).length;
  }

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Categories</h2>
      <ul className="category-list">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => onCategoryChange(cat)}
            >
              <span className="cat-label">{cat}</span>
              <span className="cat-count">{getCount(cat)}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}