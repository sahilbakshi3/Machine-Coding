import React from "react";
import Banner from "./components/Banner/Banner";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import LogoGrid from "./components/LogoGrid/LogoGrid";
import Testimonial from "./components/Testimonial/Testimonial";
import ProductTabs from "./components/ProductTabs/ProductTabs";
import Features from "./components/Features/Features";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="app">
      <Banner />
      <Navbar />
      <main>
        <Hero />
        <LogoGrid />
        <Testimonial
          quote="We chose PlanetScale to host our most demanding Vitess and Postgres workloads, doing millions of queries per second on hundreds of terabytes of data."
          author="Sualeh Asif - Chief Product Officer @Anysphere (Cursor)"
        />
        <ProductTabs />
        <Testimonial
          quote="Our migration to Vitess is more than just a technological upgrade; it's a strategic move to future-proof our database architecture for the next decade and beyond."
          author="Ryan Sherlock @Intercom"
        />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default App;
