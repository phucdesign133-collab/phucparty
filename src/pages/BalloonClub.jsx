import React, { useState, useMemo } from "react";
import { balloonClubData } from "../datas/balloonClubData"; // Đảm bảo bạn tạo file data này
import BackgroundText from "../components/backgroundText";
import SliderSection from "../components/SliderSection";
import "../components/BalloonClub.css"; // Nhớ tạo file CSS này

const BalloonClub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // State để lưu lựa chọn của từng nhóm: { "Balloon Academy": "Tất cả", ... }
  const [filters, setFilters] = useState({});

  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
  };

  // 1. Thay đổi logic lọc để nó chạy "độc lập" cho mỗi group
const filteredData = useMemo(() => {
  const cleanKw = removeDiacritics(searchTerm);
  
  return balloonClubData.map(group => {
    // Lọc theo từ khóa tìm kiếm
    let tools = group.tools.filter(tool => 
      removeDiacritics(tool.title).includes(cleanKw) ||
      removeDiacritics(tool.description).includes(cleanKw) ||
      tool.tags.some(tag => removeDiacritics(tag).includes(cleanKw))
    );

    // Lọc theo subCategory nội bộ
    const activeSub = filters[group.category];
    if (activeSub && activeSub !== "Tất cả") {
      // Chỉ lọc những tool có subCategory khớp với lựa chọn
      tools = tools.filter(tool => tool.subCategory === activeSub);
    }

    return { ...group, tools };
  });
}, [searchTerm, filters]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    // ... (Giữ nguyên logic tìm kiếm gợi ý của bạn, chỉ cần đổi data nguồn)
  };

  return (
    <div className="club-page">
      <BackgroundText category="balloonClub" />
      
      <div className="club-search-wrapper">
        <input 
          className="club-search-input"
          placeholder="Tìm trong Balloon Club..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
      </div>

      {/* // 2. Cập nhật phần hiển thị (JSX) */}
<div className="club-content">
  {filteredData.map((group, index) => (
    <div key={index} className="club-group-wrapper">
      <div className="club-group-header">
        <h3>{group.category}</h3>
        <select 
          className="club-select"
          onChange={(e) => setFilters(prev => ({...prev, [group.category]: e.target.value}))}
        >
          <option value="Tất cả">Tất cả</option>
          {group.subCategories?.map((sub, i) => <option key={i} value={sub}>{sub}</option>)}
        </select>
      </div>

      {group.tools.length > 0 ? (
        <SliderSection title="" tools={group.tools} />
      ) : (
        <p className="club-empty">Dữ liệu đang được cập nhật... ⏳</p>
      )}
    </div>
  ))}
</div>
    </div>
  );
};

export default BalloonClub;