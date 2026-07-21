import React, { useState, useMemo } from "react";
import { balloonClubData } from "../datas/balloonClubData";
import BackgroundText from "../components/backgroundText";
import SliderSection from "../components/SliderSection";
import "../components/BalloonClub.css";

const BalloonClub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [levelFilters, setLevelFilters] = useState({});

  const removeDiacritics = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  };

  const filteredData = useMemo(() => {
    const cleanKw = removeDiacritics(searchTerm);

    return balloonClubData.map((group) => {
      let tools = group.tools.filter(
        (tool) =>
          removeDiacritics(tool.title).includes(cleanKw) ||
          removeDiacritics(tool.description).includes(cleanKw) ||
          tool.tags.some((tag) => removeDiacritics(tag).includes(cleanKw)),
      );

      const activeSub = filters[group.category];
      if (activeSub && activeSub !== "Tất cả") {
        tools = tools.filter((tool) => tool.subCategory === activeSub);
      }

      if (activeSub === "Tạo hình bong bóng") {
        const activeLevel = levelFilters[group.category];
        if (activeLevel && activeLevel !== "Tất cả") {
          tools = tools.filter((tool) => tool.level === activeLevel);
        }
      }

      return { ...group, tools };
    });
  }, [searchTerm, filters, levelFilters]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const levelDescriptions = {
    "Tất cả": "Hiển thị tất cả các mẫu tạo hình từ cơ bản đến nâng cao.",
    "Level 1": "Level 01 — Nhập môn: từ 1 đến 3 bóng, mẫu dễ",
    "Level 2": "Level 02 — Cơ bản: nhiều thao tác hơn, kỹ thuật bắt đầu nâng cao",
    "Level 3": "Level 03 — Nâng cao: 1 bóng xoay nhiều chi tiết hoặc trên 4 bóng",
    "Level 4": "Level 04 — Chuyên gia: mẫu khó nhất, nhiều công đoạn và kỹ thuật phức tạp",
  };
  return (
    <div className="club-page">
      <BackgroundText category="balloonClub" />

      <div className="club-search-wrapper">
        <input className="club-search-input" placeholder="Tìm trong Balloon Club..." value={searchTerm} onChange={handleSearchChange} />
      </div>

      <div className="club-content">
        {filteredData.map((group, index) => {
          const currentSub = filters[group.category] || "Tất cả";

          return (
            <div key={index} className="club-group-wrapper">
              {/* Header: Tiêu đề và Dropdown chính */}
              <div className="club-group-header">
                <h3>{group.category}</h3>

                <select
                  className="club-select"
                  value={currentSub}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFilters((prev) => ({ ...prev, [group.category]: val }));
                    setLevelFilters((prev) => ({ ...prev, [group.category]: "Tất cả" }));
                  }}
                >
                  <option value="Tất cả">Tất cả</option>
                  {group.subCategories?.map((sub, i) => (
                    <option key={i} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              {/* HÀNG ĐỘC LẬP BÊN DƯỚI: Dropdown chọn độ khó (Bằng chiều rộng thanh search) */}
              {currentSub === "Tạo hình bong bóng" && (
                <div className="level-select-wrapper level-select-animation">
                  <select
                    className="club-level-select-full"
                    value={levelFilters[group.category] || "Tất cả"}
                    onChange={(e) => setLevelFilters((prev) => ({ ...prev, [group.category]: e.target.value }))}
                  >
                    <option value="Tất cả">Tất cả độ khó</option>
                    <option value="Level 1">🌱 Level 01 — Nhập môn</option>
                    <option value="Level 2">🎈 Level 02 — Cơ bản</option>
                    <option value="Level 3">🔥 Level 03 — Nâng cao</option>
                    <option value="Level 4">👑 Level 04 — Chuyên gia</option>
                  </select>
                  {/* DÒNG MÔ TẢ SUB BÊN DƯỚI */}
                  <p className="level-sub-desc">💡 {levelDescriptions[levelFilters[group.category] || "Tất cả"]}</p>
                </div>
              )}

              {group.tools.length > 0 ? (
                <SliderSection title="" tools={group.tools} basePath="/balloon-club" />
              ) : (
                <p className="club-empty">Dữ liệu đang được cập nhật... ⏳</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BalloonClub;
