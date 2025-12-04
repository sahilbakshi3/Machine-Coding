import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import Breadcrumbs from "./components/Breadcrumbs";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Breadcrumbs</h1>
        {/* breadcrumbs */}
        <Breadcrumbs />
        {/* Routes */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
