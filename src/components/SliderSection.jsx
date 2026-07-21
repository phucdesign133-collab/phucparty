import React from "react";
import { Link } from "react-router-dom";
import "./SliderSection.css";

const SliderSection = ({ title, tools, basePath }) => {
  return (
    <div className="resource-section">
      <h3 className="section-title">{title}</h3>

      {/* Grid hiển thị */}
      <div className="res-slider">
        {tools.map((tool) => {
          // Ưu tiên dùng reelsLink nếu có (dành cho Balloon Academy), nếu không thì dùng link gốc (dành cho AI/Tool khác)
          const targetLink = tool.reelsLink || tool.link;

          return (
            <div key={tool.id} className="res-card">
              <div className="res-icon">
                <img src={tool.icon} alt={tool.title} />
              </div>
              <h3>{tool.title}</h3>
              <p className="tool-desc">{tool.description}</p>
              <div className="res-button-row">
                <a
                  href={targetLink}
                  target="_blank"
                  rel="noreferrer"
                  className="res-btn"
                >
                  {tool.reelsLink ? "Xem Reels" : "Truy cập"}
                </a>

                {/* Sử dụng basePath và biến tool đã sửa */}
                <Link to={`${basePath}/${tool.id}`} className="res-btn">
                  Chi tiết
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <hr className="section-divider" />
    </div>
  );
};

export default SliderSection;