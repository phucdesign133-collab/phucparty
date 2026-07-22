import React, { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { balloonClubData } from "../datas/balloonClubData";
import "../components/DetailResources.css";
import "../components/SliderSection.css";
import BackgroundText from "../components/backgroundText";
import Breadcrumb from "../components/Breadcrumb";
import ContactSection from "../components/contactSection";

const DetailResources = () => {
  const { id } = useParams();

  // Tìm đúng tool theo ID trong balloonClubData
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

  // Kiểm tra xem bài viết này có phải là tạo hình bong bóng hoặc có cấu trúc level riêng không
  const isBalloonArt = tool.subCategory === "Tạo hình bong bóng" || tool.level;

  return (
    <div className="detail-res-page">
      <BackgroundText category="balloonClub" />
      <Breadcrumb
        items={[
          { label: "Trang chủ", link: "/" },
          { label: "Tất cả bài viết", link: "/balloon-club" },
          { label: tool.title, link: `/balloon-club/${id}` },
        ]}
      />

      <section className="res-hero-container">
        {tool.images && tool.images.length > 0 ? (
          <>
            <div className="scroll-container res-hero-scroll" ref={scrollRef} onScroll={handleScroll}>
              {tool.images.map((imgUrl, index) => (
                <img key={index} src={imgUrl} alt={`${tool.title} ${index + 1}`} />
              ))}
            </div>

            <div className="image-counter">
              Ảnh {activeIndex} / {tool.images.length}
            </div>
          </>
        ) : (
          <img src={tool.icon} alt={tool.title} className="res-hero-single-img" />
        )}
      </section>

      <section className="res-info">
        <h1>{tool.title}</h1>

        {/* PHÂN TÁCH GIAO DIỆN DỰA TRÊN LOẠI BÀI VIẾT */}
        {isBalloonArt ? (
          <>
            {tool.level && (
              <p>
                <strong>Level: </strong>
                <span className="highlight-level">{tool.level.replace(/Level/gi, "").trim()}</span>
              </p>
            )}

            <div className="tool-features">
              <strong>Vật tư chuẩn bị:</strong>
              {tool.materials && tool.materials.length > 0 ? (
                <ul>
                  {tool.materials.map((mat, index) => (
                    <li key={index}>{mat}</li>
                  ))}
                </ul>
              ) : tool.description ? (
                <ul>
                  {tool.description.split(/[,\-]/).map((item, index) => {
                    const trimmed = item.trim();
                    return trimmed ? <li key={index}>{trimmed}</li> : null;
                  })}
                </ul>
              ) : (
                <p>Chưa có thông tin vật tư</p>
              )}

              {/* Phần Mua vật tư */}
              <div className="supplier-section">
                <h3>Chuẩn bị vật tư:</h3>
                <div className="supplier-desc">
                  <p>
                    <strong>Tự túc:</strong> Bạn có thể tự mua sắm theo danh sách gợi ý để tối ưu chi phí.
                  </p>
                  <p>
                    <strong>Ủng hộ hệ sinh thái:</strong> Hoặc chọn nhanh qua các đối tác nhà cung cấp của Phúc Group. Mỗi đơn hàng từ bạn không chỉ
                    giúp công việc suôn sẻ mà còn góp phần đóng góp một phần nhỏ vào các hoạt động vì cộng đồng của tụi mình. Cảm ơn bạn rất nhiều! ❤️
                  </p>
                </div>
                {tool.suppliers && tool.suppliers.length > 0 && (
                  <ul className="supplier-list">
                    {tool.suppliers.map((sup, index) => (
                      <li key={index} className="supplier-item">
                        <span>{sup.name}</span>
                        <a href={sup.link} target="_blank" rel="noreferrer" className="supplier-cta-btn">
                          {sup.ctaText}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Nút hướng dẫn thực tế */}
              <div className="tool-guide-wrapper">
                <strong>Xem clip hướng dẫn:</strong>
                <div style={{ display: "flex", gap: "12px", marginTop: "10px", flexWrap: "wrap" }}>
                  {tool.reelsLink && (
                    <a href={tool.reelsLink} target="_blank" rel="noreferrer" className="reels-action-btn-custom">
                      🎬 Xem thao tác nhanh
                    </a>
                  )}

                  {tool.reelsLink1 && (
                    <a href={tool.reelsLink1} target="_blank" rel="noreferrer" className="reels-action-btn-custom">
                      🐢 Xem thao tác chậm
                    </a>
                  )}
                </div>
              </div>

              {/* Gọi ContactSection với category chính xác */}
              <ContactSection category={tool.category} />
            </div>
          </>
        ) : (
          /* GIAO DIỆN MẶC ĐỊNH CŨ CHO CÁC MỤC KHÁC */
          <>
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

              {tool.guide && (
                <div className="tool-guide">
                  <strong>Hướng dẫn chi tiết:</strong>
                  <ul>
                    <li>
                      Chọn vào nút
                      <a href={tool.link} target="_blank" rel="noreferrer" className="res-btn-green guide-access-btn">
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
          </>
        )}
      </section>

      {/* Tài nguyên liên quan */}
      <section className="related-tools">
        <h3 className="section-title">Tài nguyên liên quan</h3>
        <div className="res-slider">
          {balloonClubData
            .find((group) => group.tools.some((t) => t.id === tool.id))
            ?.tools.filter((t) => t.id !== tool.id && (isBalloonArt ? t.subCategory === tool.subCategory || t.level === tool.level : true))
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
                  <Link to={`/balloon-club/${item.id}`} className="res-btn">
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
