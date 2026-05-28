import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuoteProvider } from "./context/QuoteContext";
import Navbar from "./components/Navbar";
import FloatingButtons from "./components/FloatingButtons";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import QuotePage from "./pages/QuotePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <QuoteProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"                element={<HomePage />} />
          <Route path="/collection"      element={<CollectionPage />} />
          <Route path="/product/:id"     element={<ProductDetailPage />} />
          <Route path="/quote"           element={<QuotePage />} />
          <Route path="/contact"         element={<ContactPage />} />
          <Route path="/about"           element={<AboutPage />} />
        </Routes>
        <FloatingButtons />
      </BrowserRouter>
    </QuoteProvider>
  );
}

export default App;