import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SliderSection.css";

// Hàm hỗ trợ loại bỏ dấu tiếng Việt
const removeDiacritics = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
};

const HighlightText = ({ text, highlight }) => {
  if (!highlight.trim()) return <span>{text}</span>;
  // Sử dụng biểu thức chính quy để highlight cả chữ có dấu và không dấu
  const cleanText = removeDiacritics(text);
  const cleanHighlight = removeDiacritics(highlight);
  
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) => 
        removeDiacritics(part) === cleanHighlight ? (
          <b key={i} style={{ color: 'var(--primary-dark-red)' }}>{part}</b>
        ) : (
          part
        )
      )}
    </span>
  );
};

const SliderSection = ({ title, tools }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim().length > 0) {
      const cleanKw = removeDiacritics(value);
      const all = new Set();
      
      tools.forEach(t => {
        if (removeDiacritics(t.title).includes(cleanKw)) all.add(t.title);
        t.tags.forEach(tag => { 
          if (removeDiacritics(tag).includes(cleanKw)) all.add(tag); 
        });
      });
      setSuggestions(Array.from(all).slice(0, 5));
    } else { setSuggestions([]); }
  };

  return (
    <div className="resource-section">
      <h3 className="section-title">{title}</h3>
      <div className="search-wrapper">
        <input 
          className="res-search-input" 
          placeholder="Tìm kiếm..." 
          value={searchTerm} 
          onChange={handleSearch} 
        />
        
        {suggestions.length > 0 && (
          <div className="suggestions-list">
            {suggestions.map((item, i) => (
              <div key={i} className="suggestion-item" onClick={() => { setSearchTerm(item); setSuggestions([]); }}>
                <HighlightText text={item} highlight={searchTerm} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="res-slider">
        {tools.filter(t => {
          const cleanKw = removeDiacritics(searchTerm);
          return searchTerm === "" || 
                 removeDiacritics(t.title).includes(cleanKw) || 
                 t.tags.some(tag => removeDiacritics(tag).includes(cleanKw));
        }).map((tool) => (
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