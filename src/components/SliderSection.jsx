import React from "react";
import { Link } from "react-router-dom";
import "./SliderSection.css";

const SliderSection = ({ title, tools }) => {
  return (
    <div className="resource-section">
      <h3 className="section-title">{title}</h3>
      
      {/* Grid chỉ còn nhiệm vụ hiển thị, không còn search nội bộ */}
      <div className="res-slider">
        {tools.map((tool) => (
          <div key={tool.id} className="res-card">
            <div className="res-icon"><img src={tool.icon} alt={tool.title} /></div>
            <h3>{tool.title}</h3>
            <p className="tool-desc">{tool.description}</p>
            <div className="res-button-row">
              <a href={tool.link} target="_blank" rel="noreferrer" className="res-btn">Truy cập</a>
              <Link to={`/resources/${tool.id}`} className="res-btn">Chi tiết</Link>
            </div>
          </div>
        ))}
      </div>
      <hr className="section-divider" />
    </div>
  );
};

export default SliderSection;