import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import Deities from "./pages/Deities";
import PoojaFestival from "./pages/PoojaFestival";
import Gallery from "./pages/Gallery";
import Donation from "./pages/Donation";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen key="loader" />}</AnimatePresence>

      <a href="#main-content" className="sr-only">Skip to main content</a>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/deities" element={<Deities />} />
          <Route path="/pooja-festival" element={<PoojaFestival />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
