import { useQuote } from "../context/QuoteContext";
import { Link } from "react-router-dom";
import "./QuotePage.css";

export default function QuotePage() {
    const { quoteItems, removeFromQuote } = useQuote();

    if (quoteItems.length === 0) {
        return (
            <div className="quote-page">
                <div className="quote-empty">
                    <div className="empty-icon">🛒</div>
                    <h2>Your quote list is empty</h2>
                    <p>Add products from the collection to request a quote.</p>
                    <Link to="/collection" className="back-btn">
                        Browse Collection
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="quote-page">
            <div className="quote-inner">
                <h1 className="quote-title">Your Quote Request</h1>
                <p className="quote-subtitle">
                    {quoteItems.length} product{quoteItems.length !== 1 ? "s" : ""} selected
                </p>

                <div className="quote-list">
                    {quoteItems.map((item) => (
                        <div key={item.id} className="quote-item">
                            <div className="item-info">
                                <span className="item-id">{item.id}</span>
                                <span className="item-name">{item.name}</span>
                                <span className="item-series">{item.series}</span>
                            </div>
                            <button
                                className="remove-btn"
                                onClick={() => removeFromQuote(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                <div className="quote-form">
                    <h2>Your Details</h2>
                    <input type="text" placeholder="Full Name" />
                    <input type="email" placeholder="Email Address" />
                    <input type="tel" placeholder="Phone Number" />
                    <textarea placeholder="Additional message (optional)" rows={4} />
                    <button className="submit-btn">Send Quote Request</button>
                </div>
            </div>
        </div>
    );
}