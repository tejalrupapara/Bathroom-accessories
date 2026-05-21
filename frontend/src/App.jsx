import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuoteProvider } from "./context/QuoteContext";
import Navbar from "./components/Navbar";
import FloatingButtons from "./components/FloatingButtons";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import QuotePage from "./pages/QuotePage";

function App() {
  return (
    <QuoteProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/"           element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/quote"      element={<QuotePage />} />
          <Route path="/contact"    element={<HomePage />} />
        </Routes>

        {/* Appears on EVERY page */}
        <FloatingButtons />

      </BrowserRouter>
    </QuoteProvider>
  );
}

export default App;