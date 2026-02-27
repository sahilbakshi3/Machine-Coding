import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import LogoBar from "./components/LogoBar/LogoBar";
import Features from "./components/Features/Features";
import Bento from "./components/Bento/Bento";
import Testimonials from "./components/Testimonials/Testimonials";
import CTA from "./components/CTA/CTA";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <LogoBar />
        <Features />
        <Bento />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;
