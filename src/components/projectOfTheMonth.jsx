import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./projectOfTheMonth.css";
import { TAB_DATA } from "../datas/data";

const ProjectOfTheMonth = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    setVisibleCount(4);
  }, [activeIndex]);

  return (
    <div className="projects-wrapper">
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>All Projects</h1>

      <div className="tabs-header">
        {TAB_DATA.map((tab, index) => (
          <button key={index} className={activeIndex === index ? "active" : ""} onClick={() => setActiveIndex(index)}>
            {tab.title}
          </button>
        ))}
      </div>

      <div className="tabs-content-full-width">
        {TAB_DATA[activeIndex]?.projects?.length > 0 ? (
          <>
            <div className="project-grid">
              {TAB_DATA[activeIndex].projects.slice(0, visibleCount).map((project, index) => (
                <div key={project.id || index} className="project-item">
                  {/* Cập nhật Link: dẫn về route /post/:id */}
                  <Link to={`/post/${project.id}`} className="project-link">
                    <div className="square-img-box">
                      {/* Xử lý hiển thị ảnh linh hoạt giữa thumbnail hoặc src */}
                      <img src={project.thumbnail || project.src} alt={project.title} />
                    </div>
                  </Link>

                  <div className="project-info">
                    {/* Có thể bọc thêm Link vào tiêu đề nếu muốn */}
                    <Link to={`/post/${project.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <h3>{project.title}</h3>
                    </Link>
                    <p>{project.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < (TAB_DATA[activeIndex]?.projects?.length || 0) && (
              <div className="load-more-container">
                <button className="load-more-btn" onClick={() => setVisibleCount((prev) => prev + 4)}>
                  Xem thêm
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <img src="https://cdn-icons-png.flaticon.com/512/7486/7486754.png" alt="No data" className="empty-icon" />
            <p>Tháng này chưa có dữ liệu</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectOfTheMonth;
