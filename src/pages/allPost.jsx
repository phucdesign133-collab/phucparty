import React, { useState, useRef, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import "../components/allPost.css";
import BackToTop from "../components/BackToTop";
import BackgroundText from "../components/BackgroundText";
import Breadcrumb from "../components/Breadcrumb";
import EventSection from "../components/eventSection";
import { data as rawData } from "../datas/galleryData"; // Nhập dữ liệu thô

const AllPost = () => {
  const [searchParams] = useSearchParams();
  const filterFromUrl = searchParams.get("filter");

  const tabConfigs = useMemo(
    () => [
      { id: "events", label: "Sự kiện", category: "su-kien" },
      { id: "designs", label: "Thiết kế", category: "thiet-ke" },
      { id: "pricing", label: "Bảng giá", category: "bang-gia" },
    ],
    [],
  );

  // 1. Gộp và xử lý dữ liệu: chuyển object thành mảng và sắp xếp logic
  const sortedGalleryData = useMemo(() => {
    // Chuyển object data thành mảng để dễ lọc/sort
    const allItems = [...Object.values(rawData.events || {}), ...Object.values(rawData.designs || {}), ...Object.values(rawData.pricing || {})];

    return allItems.sort((a, b) => {
      const timeA = a.time || a.date || a.contactInfo?.date || "2000-01-01";
      const timeB = b.time || b.date || b.contactInfo?.date || "2000-01-01";
      return new Date(timeB) - new Date(timeA); // Mới nhất lên đầu
    });
  }, []);

  // 2. Hàm helper tìm tab chuẩn xác dựa trên dữ liệu đã sort
  const findTabByFilter = (filter) => {
    if (!filter) return null;
    return tabConfigs.find((tab) =>
      sortedGalleryData.some((item) => {
        const subCats = Array.isArray(item.subCategory) ? item.subCategory : [item.subCategory].filter(Boolean);
        return item.category === tab.category && subCats.includes(filter);
      }),
    );
  };

  const [activeTabId, setActiveTabId] = useState(() => findTabByFilter(filterFromUrl)?.id || "events");
  const [activeFilter, setActiveFilter] = useState(() => filterFromUrl || "all");
  const tabsContainerRef = useRef(null);

  useEffect(() => {
    if (filterFromUrl) {
      const foundTab = findTabByFilter(filterFromUrl);
      if (foundTab) setActiveTabId(foundTab.id);
      setActiveFilter(filterFromUrl);
    }
  }, [filterFromUrl, tabConfigs, sortedGalleryData]);

  return (
    <div className="all-post-main-layout">
      <BackgroundText />
      <Breadcrumb
        items={[
          { label: "Trang chủ", link: "/" },
          { label: "Tất cả bài viết", link: "/all-post" },
        ]}
      />

      <div className="tabs-container-row">
        {tabConfigs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-header ${activeTabId === tab.id ? "active" : ""}`}
            onClick={() => {
              setActiveTabId(tab.id);
              setActiveFilter("all");
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="gallery-allpost-container" ref={tabsContainerRef}>
        <EventSection
          data={sortedGalleryData}
          category={tabConfigs.find((t) => t.id === activeTabId)?.category || "su-kien"}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>
      <BackToTop />
    </div>
  );
};

export default AllPost;
