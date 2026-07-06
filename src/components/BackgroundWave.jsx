import React, { useState, useEffect } from "react";
import "./BackgroundWave.css";
import { GALLERY_DATA } from "../datas/data";

const BackgroundWave = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển ảnh mỗi 5 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GALLERY_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="wave-carousel-container">
      {/* 1. Nền dưới cùng */}
      <div className="thumbnail-layer"></div>

      {/* 2. Carousel ở giữa */}
      <div className="carousel-layer">
        {GALLERY_DATA.map((item, index) => (
          <div
            key={item.id}
            className={`wave-slide ${index === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${item.thumbnail})` }}
          />
        ))}
      </div>

      {/* 3. MASK NẰM TRÊN CÙNG để che toàn bộ */}
      <div className="wave-mask"></div>
    </div>
  );
};

export default BackgroundWave;
