import React from "react";
import { galleryData } from "../datas/galleryData"; // Import mảng dữ liệu

const Gallery = ({ category }) => {
  // Lọc bài viết theo category truyền vào từ AllPost
  const filtered = galleryData.filter((item) => item.category === category);

  // Kiểm tra nếu không có dữ liệu
  if (filtered.length === 0) return <h3 style={{ textAlign: "center" }}>Chưa có dữ liệu</h3>;
  return (
    <div className="gallery-grid">
      {filtered.map((item) => (
        <div key={item.id} className="gallery-item">
          {/* src trỏ trực tiếp đến file trong public */}
          <img src={item.src} alt={item.title} />
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
