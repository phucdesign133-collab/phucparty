import React, { useState } from "react";
import { Link } from "react-router-dom";
import { data } from "../datas/galleryData"; // 1. Import đúng nguồn dữ liệu

const UpComing = () => {
  // 4 & 5. Hàm format ngày tháng và lấy 6 bài mới nhất
  const formatDisplayDate = (isoDate) => {
    if (!isoDate) return "";
    const [y, m, d] = isoDate.split("-");
    return d === "15" ? `Tháng ${m}/${y}` : `${d}/${m}/${y}`;
  };

  // Lấy tất cả events, sort theo thời gian mới nhất và lấy 6 bài
  const allEvents = Object.values(data.events || {});
  const sortedItems = [...allEvents].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 6);

  const [items, setItems] = useState(sortedItems);
  const [displayIndex, setDisplayIndex] = useState(1);

  const handlePrev = () => {
    setItems((prevItems) => {
      const lastItem = prevItems[prevItems.length - 1];
      const remainingItems = prevItems.slice(0, -1);
      return [lastItem, ...remainingItems];
    });
    setDisplayIndex((prev) => (prev === 1 ? sortedItems.length : prev - 1));
  };

  const handleNext = () => {
    setItems((prevItems) => {
      const [firstItem, ...remainingItems] = prevItems;
      return [...remainingItems, firstItem];
    });
    setDisplayIndex((prev) => (prev === sortedItems.length ? 1 : prev + 1));
  };

  return (
    <div className="up-container">
      <div className="up-inner">
        <div className="up-text">
          {/* 3. Tiêu đề và mô tả hấp dẫn hơn */}
          <h6 className="up-title">Khoảnh Khắc</h6>
          <p className="up-desc">Những khoảnh khắc tâm đắc nhất vừa được cập nhật.</p>
          <div className="up-nav">
            <button onClick={handlePrev} className="up-btn">
              ‹
            </button>
            <span className="up-count">
              {displayIndex} / {sortedItems.length}
            </span>
            <button onClick={handleNext} className="up-btn">
              ›
            </button>
          </div>
        </div>

        <div className="up-slider">
          <div className="up-track">
            {items.map((item, index) => (
              <Link
                key={item.slug}
                to={`/post/${item.slug}`}
                className={`up-card ${index >= 2 ? "dim" : ""}`}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                {/* Lấy ảnh đầu tiên trong mảng files hoặc ảnh mặc định */}
                <img src={`/phucparty/img/${item.files?.[0] || "default.jpg"}`} alt={item.title} />
                <div className="up-overlay">
                  <span>{formatDisplayDate(item.time)}</span>
                  <h4>{item.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="up-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,30 C400,110 1040,10 1440,40 L1440,120 L0,120 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* 2. Giữ nguyên CSS cũ */}
      <style>{`
        .up-container { 
          background: linear-gradient(135deg, #1e0b36, #0f051d);
          padding: 20px 0 80px;
          position: relative;
          width: 100%;
          overflow: hidden;
          contain: content;
        }
        .up-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          gap: 50px;
        }
        .up-text { flex: 0 0 300px; color: #fff; }
        .up-title { font-size: 2.7rem; margin: 12px 0; }
        .up-desc{font-size:0.9rem;}
        .up-nav { display: flex; align-items: center; gap: 15px; }
        .up-btn {
          width: 44px; height: 44px; border: 1px solid rgba(255,255,255,0.3);
          border-radius: 50%; background: none; color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center; font-size: 1.5rem;
        }
        .up-slider { flex: 1; overflow: hidden; }
        .up-track { display: flex; gap: 28px; }
        .up-card {
          width: 290px; height: 400px; border-radius: 24px;
          position: relative; overflow: hidden; flex-shrink: 0;
        }
        .up-card img { width: 100%; height: 100%; object-fit: cover; }
        .up-overlay { width:100%;position: absolute; bottom: 0; padding: 40px 25px 25px;   background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%); color: #fff; }
        .up-overlay h4{margin:0;}
        .dim { opacity: 0.45; filter: blur(1px); }
        .up-wave { position: absolute; bottom: -1px; width: 100%; line-height: 0; }
        @media (max-width: 768px) {
          .up-inner { flex-direction: column; align-items: flex-start; }
          .up-text { flex: none; width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default UpComing;
