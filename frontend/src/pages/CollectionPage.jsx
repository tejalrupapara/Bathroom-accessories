import { useState, useMemo } from "react";
import { products } from "../data/products";
import CategorySidebar from "../components/CategorySidebar";
import ProductCard from "../components/ProductCard";
import "./CollectionPage.css";

export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat =
        activeCategory === "All" || p.category === activeCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (sortBy === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "id") list = [...list].sort((a, b) => a.id.localeCompare(b.id));

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="collection-page">
      {/* Page header */}
      <div className="page-header">
        <div className="page-header-inner">
          <p className="breadcrumb">Home / Collection</p>
          <h1 className="page-title">Our Collection</h1>
          <p className="page-subtitle">
            Premium bathroom fittings crafted for lasting quality
          </p>
        </div>
      </div>

      {/* Main layout */}
      <div className="collection-layout">
        {/* Sidebar */}
        <CategorySidebar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Content */}
        <div className="collection-main">
          {/* Filter bar */}
          <div className="filter-bar">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-btn" onClick={() => setSearchQuery("")}>
                  ✕
                </button>
              )}
            </div>

            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort: Default</option>
              <option value="name">Name A–Z</option>
              <option value="id">Product ID</option>
            </select>

            <span className="results-count">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Product grid */}
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔎</div>
              <h3>No products found</h3>
              <p>Try a different category or search term</p>
              <button
                className="reset-btn"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}