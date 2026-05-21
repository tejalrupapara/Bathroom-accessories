import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuote } from "../context/QuoteContext";
import "./Navbar.css";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { quoteItems } = useQuote();
    const location = useLocation();

    const navLinks = [
        { label: "Home", path: "/" },
        { label: "Collection", path: "/collection" },
        { label: "Products", path: "/products" },
        { label: "Contact", path: "/contact" },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                {/* Logo */}
                <Link to="/" className="brand">
                    <span className="brand-icon">◈</span>
                    AquaBath
                </Link>

                {/* Desktop nav links */}
                <ul className="nav-links">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={location.pathname === link.path ? "active" : ""}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Quote button */}
                <Link to="/quote" className="quote-btn">
                    <span className="quote-icon">🛒</span>
                    <span>Quote</span>
                    {quoteItems.length > 0 && (
                        <span className="quote-badge">{quoteItems.length}</span>
                    )}
                </Link>

                {/* Hamburger (mobile) */}
                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="mobile-menu">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={location.pathname === link.path ? "active" : ""}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link to="/quote" className="mobile-quote" onClick={() => setMenuOpen(false)}>
                        🛒 Quote ({quoteItems.length})
                    </Link>
                </div>
            )}
        </nav>
    );
}