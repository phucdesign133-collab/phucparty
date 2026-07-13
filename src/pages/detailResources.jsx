import React from "react";import { useState, useRef } from 'react';
import { useParams, Link } from "react-router-dom";
import { resourcesData } from "../datas/resoucesData";
import "../components/DetailResources.css";
import "../components/SliderSection.css";
import BackgroundText from "../components/backgroundText";
import Breadcrumb from "../components/Breadcrumb";



const DetailResources = () => {
  const { id } = useParams();

  // 1. Tìm đúng tool theo ID (đã kiểm tra kỹ không trùng biến)
  const tool = resourcesData.flatMap((group) => group.tools).find((t) => t.id === parseInt(id));

  // 2. Lấy dữ liệu bài liên quan (lấy những tool khác trong cùng 1 nhóm category)
  const relatedTools = resourcesData.find((group) => group.tools.some((t) => t.id === tool?.id))?.tools.filter((t) => t.id !== tool?.id) || [];

  if (!tool) return <h2>Đang tải...</h2>;
const scrollRef = useRef(null);
const [activeIndex, setActiveIndex] = useState(1);

const handleScroll = () => {
  if (scrollRef.current) {
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = scrollRef.current.offsetWidth;
    // Tính toán ảnh hiện tại dựa trên khoảng cách cuộn
    const index = Math.round(scrollLeft / itemWidth) + 1;
    setActiveIndex(index);
  }
};
  return (
    <div className="detail-res-page">
      <BackgroundText category="resources" />
      <Breadcrumb
        items={[
          { label: "Trang chủ", link: "/" },
          { label: "Tất cả bài viết", link: "/resources" },
          { label: tool.title, link: `/resources/${id}` },
        ]}
      />

     
{/* Thay đoạn Swiper bằng đoạn này, cực gọn */}
<section className="res-hero-container" style={{ position: 'relative' }}>
  {tool.images && tool.images.length > 0 ? (
    <>
      {/* Thêm onScroll và ref vào đây */}
      <div 
        className="scroll-container" 
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ display: 'flex', overflowX: 'auto', gap: '0', scrollSnapType: 'x mandatory' }}
      >
        {tool.images.map((imgUrl, index) => (
          <img 
            key={index}
            src={imgUrl} 
            alt={`${tool.title} ${index + 1}`} 
            style={{ width: '100%', flexShrink: 0, borderRadius: '8px', scrollSnapAlign: 'start' }} 
          />
        ))}
      </div>
      
      {/* Bộ đếm giờ đây đã sống động và cập nhật theo vị trí cuộn */}
      <div className="image-counter" style={{ 
        position: 'absolute', bottom: '10px', right: '10px', 
        background: 'rgba(0,0,0,0.6)', color: 'white', 
        padding: '2px 8px', borderRadius: '12px', fontSize: '12px' 
      }}>
        Ảnh {activeIndex} / {tool.images.length}
      </div>
    </>
  ) : (
    <img src={tool.icon} alt={tool.title} style={{ width: '100%', borderRadius: '8px' }} />
  )}
</section>

      {/* Thông tin */}
      <section className="res-info">
        <h1>{tool.title}</h1>

        {/* Ghi chú hiển thị thông minh */}
        {tool.note && (
          <p>
            <strong>Ghi chú: </strong>
            <span
              style={{
                color: tool.note.toLowerCase().includes("miễn phí") ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {tool.note}
            </span>
          </p>
        )}

        {/* Chức năng: Tự động tách danh sách */}
        <div className="tool-features">
          <strong>Chức năng:</strong>
          {tool.description ? (
            <ul>
              {tool.description.split(/[,\-]/).map((item, index) => {
                const trimmed = item.trim();
                return trimmed ? <li key={index}>{trimmed}</li> : null;
              })}
            </ul>
          ) : (
            <p>Chưa có mô tả</p>
          )}
          {/* Hướng dẫn chi tiết */}
          {tool.guide && (
            <div className="tool-guide">
              <strong>Hướng dẫn chi tiết:</strong>
              <ul>
                {/* Bước 1: Hiển thị cứng dòng hướng dẫn kèm nút Truy cập */}
                <li>
                  Chọn vào nút
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noreferrer"
                    className="res-btn-green"
                    style={{ display: "inline-block", margin: "0 8px", padding: "2px 10px", fontSize: "12px" }}
                  >
                    Truy cập
                  </a>
                  để bắt đầu.
                </li>

                {/* Các bước còn lại: Tách từ dữ liệu guide (nếu có dấu , hoặc -) */}
                {tool.guide.split(/[,\-]/).map((step, index) => {
                  const trimmed = step.trim();
                  return trimmed ? <li key={index + 1}>{trimmed}</li> : null;
                })}
              </ul>
            </div>
          )}
        </div>
      </section>
      {/* Bài viết liên quan */}
      <section className="related-tools">
        <h3 className="section-title">Tài nguyên liên quan</h3>
        <div className="res-slider">
          {/* 1. Tìm danh mục chứa tool hiện tại */}
          {resourcesData
            .find((group) => group.tools.some((t) => t.id === tool.id))
            // 2. Lấy danh sách tools trong danh mục đó
            ?.tools.filter((t) => t.id !== tool.id)
            .map((item) => (
              <div key={item.id} className="res-card">
                <div className="res-icon">
                  <img src={item.icon} alt={item.title} />
                </div>
                <h3>{item.title}</h3>
                <p className="tool-desc">{item.description}</p>
                <div className="res-button-row">
                  <a href={item.link} target="_blank" rel="noreferrer" className="res-btn">
                    Truy cập
                  </a>
                  <Link to={`/resources/${item.id}`} className="res-btn">
                    Chi tiết
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default DetailResources;
