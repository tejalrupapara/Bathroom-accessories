import { createContext, useContext, useState } from "react";
const QuoteContext = createContext();
export function QuoteProvider({ children }) {
  const [quoteItems, setQuoteItems] = useState([]);
  const addToQuote     = p => setQuoteItems(prev => prev.find(x => x.id===p.id) ? prev : [...prev, p]);
  const removeFromQuote= id=> setQuoteItems(prev => prev.filter(p => p.id!==id));
  const isInQuote      = id=> quoteItems.some(p => p.id===id);
  const clearQuote     = () => setQuoteItems([]);
  return (
    <QuoteContext.Provider value={{quoteItems,addToQuote,removeFromQuote,isInQuote,clearQuote}}>
      {children}
    </QuoteContext.Provider>
  );
}
export const useQuote = () => useContext(QuoteContext);