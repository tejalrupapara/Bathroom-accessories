import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuote } from "../context/QuoteContext";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { quoteItems } = useQuote();
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const links = [
    { label: "Home",       path: "/" },
    { label: "Collection", path: "/collection" },
    { label: "Contact",    path: "/contact" },
  ];

  return (
    <header className={`nx-header ${scrolled ? "scrolled" : ""}`}>
      <div className="nx-nav container-xxl">

        {/* Brand */}
        <Link to="/" className="nx-brand">
          <div className="nx-brand-emblem">N</div>
          <div>
            <div className="nx-brand-name">NEXXORA</div>
            <div className="nx-brand-sub">by Greenvolt Enterprise</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="nx-links d-none d-lg-flex">
          {links.map(l => (
            <li key={l.path}>
              <Link to={l.path} className={`nx-link ${location.pathname===l.path?"active":""}`}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="d-flex align-items-center gap-3">
          <Link to="/quote" className="nx-quote-btn d-none d-md-flex">
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            Get Quote
            {quoteItems.length > 0 && <span className="nx-badge">{quoteItems.length}</span>}
          </Link>

          <button className={`nx-hamburger d-lg-none ${menuOpen?"is-open":""}`} onClick={()=>setMenuOpen(!menuOpen)}>
            <span/><span/><span/>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`nx-mobile-menu ${menuOpen?"open":""}`}>
        {links.map(l => (
          <Link key={l.path} to={l.path} className={`nx-mobile-link ${location.pathname===l.path?"active":""}`}>
            {l.label}
          </Link>
        ))}
        <Link to="/quote" className="nx-mobile-quote">
          📋 Get Quote {quoteItems.length > 0 && `(${quoteItems.length})`}
        </Link>
      </div>
    </header>
  );
}