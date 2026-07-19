import React, { useState, useRef } from 'react';
import { useParams, Link } from "react-router-dom";
// Thay đổi import data ở đây
import { balloonClubData } from "../datas/balloonClubData"; 
import "../components/DetailResources.css";
import "../components/SliderSection.css";
import BackgroundText from "../components/backgroundText";
import Breadcrumb from "../components/Breadcrumb";

const DetailResources = () => {
  const { id } = useParams();

  // 1. Tìm đúng tool theo ID trong balloonClubData
  const tool = balloonClubData.flatMap((group) => group.tools).find((t) => t.id === parseInt(id));

  if (!tool) return <h2>Đang tải...</h2>;

  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.offsetWidth;
      const index = Math.round(scrollLeft / itemWidth) + 1;
      setActiveIndex(index);
    }
  };

  return (
    <div className="detail-res-page">
      <BackgroundText category="balloonClub" />
      <Breadcrumb
        items={[
          { label: "Trang chủ", link: "/" },
          { label: "Tất cả bài viết", link: "/balloon-club" },
          { label: tool.title, link: `/balloon-club/${id}` }, // Cập nhật link Breadcrumb
        ]}
      />

      <section className="res-hero-container" style={{ position: 'relative' }}>
        {tool.images && tool.images.length > 0 ? (
          <>
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

      <section className="res-info">
        <h1>{tool.title}</h1>
        {tool.note && (
          <p>
            <strong>Ghi chú: </strong>
            <span style={{
                color: tool.note.toLowerCase().includes("miễn phí") ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {tool.note}
            </span>
          </p>
        )}

        <div className="tool-features">
          <strong>Chức năng:</strong>
          {tool.description ? (
            <ul>
              {tool.description.split(/[,\-]/).map((item, index) => {
                const trimmed = item.trim();
                return trimmed ? <li key={index}>{trimmed}</li> : null;
              })}
            </ul>
          ) : <p>Chưa có mô tả</p>}
          
          {tool.guide && (
            <div className="tool-guide">
              <strong>Hướng dẫn chi tiết:</strong>
              <ul>
                <li>
                  Chọn vào nút
                  <a href={tool.link} target="_blank" rel="noreferrer" className="res-btn-green" style={{ display: "inline-block", margin: "0 8px", padding: "2px 10px", fontSize: "12px" }}>
                    Truy cập
                  </a>
                  để bắt đầu.
                </li>
                {tool.guide.split(/[,\-]/).map((step, index) => {
                  const trimmed = step.trim();
                  return trimmed ? <li key={index + 1}>{trimmed}</li> : null;
                })}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="related-tools">
        <h3 className="section-title">Tài nguyên liên quan</h3>
        <div className="res-slider">
          {balloonClubData // Sử dụng balloonClubData
            .find((group) => group.tools.some((t) => t.id === tool.id))
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
                  <Link to={`/balloon-club/${item.id}`} className="res-btn"> {/* Cập nhật link */}
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