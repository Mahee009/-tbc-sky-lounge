import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Menu from "./components/Menu";
import Events from "./components/Events";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Reservation from "./components/Reservation";
import Footer from "./components/Footer";

function HomePage() {
  return (
    <div className="relative bg-[#0b0f0e] text-[#E5E7EB] overflow-x-hidden" data-testid="home-page">
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Menu />
        <Events />
        <Gallery />
        <Reviews />
        <Reservation />
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "rgba(11, 15, 14, 0.92)",
            border: "1px solid rgba(34, 197, 94, 0.35)",
            color: "#E5E7EB",
            backdropFilter: "blur(18px)",
            fontFamily: "Outfit, sans-serif",
            letterSpacing: "0.02em",
          },
          className: "tbc-toast",
        }}
      />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
