import React, { useState, useMemo } from "react";
import { resourcesData } from "../datas/resoucesData";
import BackgroundText from "../components/backgroundText";
import SliderSection from "../components/SliderSection";
import "../components/Resources.css";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
  };

  // Logic lọc dữ liệu tổng: Title + Description + Tags
  const filteredData = useMemo(() => {
    const cleanKw = removeDiacritics(searchTerm);
    return resourcesData.map(category => ({
      ...category,
      tools: category.tools.filter(tool => 
        removeDiacritics(tool.title).includes(cleanKw) ||
        removeDiacritics(tool.description).includes(cleanKw) ||
        tool.tags.some(tag => removeDiacritics(tag).includes(cleanKw))
      )
    })).filter(category => category.tools.length > 0);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
  const val = e.target.value;
  setSearchTerm(val);

  if (val.trim()) {
    const cleanKw = removeDiacritics(val);
    let found = [];
    
    resourcesData.forEach(cat => {
      cat.tools.forEach(t => {
        const titleMatch = removeDiacritics(t.title).includes(cleanKw);
        const descMatch = removeDiacritics(t.description).includes(cleanKw);
        
        if (titleMatch || descMatch) {
          found.push({ 
            title: t.title, 
            desc: t.description,
            // Tính điểm: titleMatch được ưu tiên (điểm cao hơn)
            score: titleMatch ? 2 : 1 
          });
        }
      });
    });

    // Sắp xếp theo score giảm dần (2 trước, 1 sau)
    const sortedSuggestions = found.sort((a, b) => b.score - a.score);
    
    setSuggestions(sortedSuggestions.slice(0, 5));
  } else {
    setSuggestions([]);
  }
};

  return (
    <div className="res-page">
      <BackgroundText category="resources" />
      
      {/* Search Container mới với class tiền tố res- */}
      <div className="res-search-wrapper">
        <input 
          className="res-search-input"
          placeholder="Tìm kiếm công cụ (tên, chức năng...)" 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
       {suggestions.length > 0 && (
  <div className="res-suggestions">
    {suggestions.map((item, i) => (
      <div 
        key={i} 
        className="res-suggestion-item" 
        onClick={() => { setSearchTerm(item.title); setSuggestions([]); }}
      >
        <span className="res-sugg-title">{item.title}</span>
        <span className="res-sugg-desc"> - {item.desc}</span>
      </div>
    ))}
  </div>
)}
      </div>

      <div className="res-content">
        {filteredData.map((group, index) => (
          <SliderSection key={index} title={group.category} tools={group.tools} />
        ))}
      </div>
    </div>
  );
};

export default Resources;