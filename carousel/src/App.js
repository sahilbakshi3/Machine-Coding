import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length ? 0 : prev + 1));
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) {
          throw new Error("failed to fetch data");
        }
        const data = await res.json();

        const imgs = data.products.map((item) => ({
          src: item.thumbnail,
          title: item.title,
        }));

        setImages(imgs);
        setCurrentIndex(0);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!images.length) return <div>No images</div>;

  return (
    <div className="carousel-container">
      <h2>Product Carousel</h2>

      <div className="carousel">
        <button className="nav-button" onClick={goToPrev}>
          {"<"}
        </button>

        <div className="carousel-window">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((img, index) => (
              <div key={index} className="slide">
                <img src={img.src} alt={img.title} className="carousel-image" />
                <p className="caption">{img.title}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="nav-button" onClick={goToNext}>
          {">"}
        </button>
      </div>
      <div className="dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
