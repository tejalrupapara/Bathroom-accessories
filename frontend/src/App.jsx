import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QuoteProvider } from "./context/QuoteContext";
import Navbar from "./components/Navbar";
import CollectionPage from "./pages/CollectionPage";
import QuotePage from "./pages/QuotePage";

function App() {
  return (
    <QuoteProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/collection" replace />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/quote" element={<QuotePage />} />
        </Routes>
      </BrowserRouter>
    </QuoteProvider>
  );
}

export default App;