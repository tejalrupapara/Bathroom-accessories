import { createContext, useContext, useState } from "react";

const QuoteContext = createContext();

export function QuoteProvider({ children }) {
    const [quoteItems, setQuoteItems] = useState([]);

    function addToQuote(product) {
        setQuoteItems((prev) =>
            prev.find((p) => p.id === product.id) ? prev : [...prev, product]
        );
    }

    function removeFromQuote(id) {
        setQuoteItems((prev) => prev.filter((p) => p.id !== id));
    }

    function isInQuote(id) {
        return quoteItems.some((p) => p.id === id);
    }

    return (
        <QuoteContext.Provider
            value={{ quoteItems, addToQuote, removeFromQuote, isInQuote }}
        >
            {children}
        </QuoteContext.Provider>
    );
}

export function useQuote() {
    return useContext(QuoteContext);
}