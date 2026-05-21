import { useState, useMemo } from "react";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./CollectionPage.css";

export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery]       = useState("");
  const [sortBy, setSortBy]                 = useState("default");

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const matchCat    = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
    if (sortBy === "name")       list = [...list].sort((a,b) => a.name.localeCompare(b.name));
    if (sortBy === "price-asc")  list = [...list].sort((a,b) => a.price - b.price);
    if (sortBy === "price-desc") list = [...list].sort((a,b) => b.price - a.price);
    return list;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="collection-page">

      {/* Page header */}
      <div className="cp-header">
        <div className="cp-header-glow"/>
        <div className="container-xxl cp-header-inner">
          <p className="cp-breadcrumb">Home / Collection</p>
          <h1 className="cp-title">Our Collection</h1>
          <p className="cp-subtitle">Premium acrylic bathroom accessories — 7 series, crafted to perfection</p>
        </div>
      </div>

      <div className="container-xxl cp-body">
        <div className="row g-0">

          {/* ── Sidebar ── */}
          <div className="col-lg-3 col-xl-2">
            <aside className="cp-sidebar">
              <h2 className="cp-sidebar-title">Series</h2>
              <ul className="cp-cat-list">
                {categories.map(cat => {
                  const count = cat === "All" ? products.length : products.filter(p=>p.category===cat).length;
                  return (
                    <li key={cat}>
                      <button
                        className={`cp-cat-btn ${activeCategory===cat?"active":""}`}
                        onClick={() => setActiveCategory(cat)}
                      >
                        <span className="cp-cat-label">{cat}</span>
                        <span className="cp-cat-count">{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>

          {/* ── Main ── */}
          <div className="col-lg-9 col-xl-10">
            <div className="cp-main">

              {/* Toolbar */}
              <div className="cp-toolbar">
                <div className="cp-search-wrap">
                  <svg className="cp-search-icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                  <input
                    className="cp-search"
                    type="text"
                    placeholder="Search products or codes..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button className="cp-search-clear" onClick={()=>setSearchQuery("")}>✕</button>
                  )}
                </div>

                <select className="cp-sort" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
                  <option value="default">Sort: Default</option>
                  <option value="name">Name A–Z</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>

                <div className="cp-result-count">
                  <span className="cp-count-num">{filtered.length}</span> products
                </div>
              </div>

              {/* Grid */}
              {filtered.length === 0 ? (
                <div className="cp-empty">
                  <div className="cp-empty-icon">🔎</div>
                  <h3>No products found</h3>
                  <p>Try a different category or search term</p>
                  <button className="btn btn-teal px-4 py-2 mt-3" onClick={()=>{setSearchQuery("");setActiveCategory("All");}}>
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="cp-grid">
                  {filtered.map(p => <ProductCard key={p.id} product={p}/>)}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}