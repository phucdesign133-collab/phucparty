import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { galleryData } from "../datas/galleryData";
import BackgroundText from "../components/BackgroundText";
import ContactSection from "../components/ContactSection";
import Breadcrumb from "../components/Breadcrumb";
import AdditionalSections from "../components/AdditionalSections";
import "../components/detailPost.css";

const DetailPost = () => {
  const { slug } = useParams();
  const project = galleryData.find((item) => item.slug === slug);

  // Khai báo đầy đủ các state
  const [mainImage, setMainImage] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 1. Ép cuộn lên đầu trang mỗi khi slug thay đổi
    const scrollTimer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 0);

    // 2. Cập nhật dữ liệu ảnh
    if (project && project.files && project.files.length > 0) {
      setMainImage(project.files[0]);
      setMainImageIndex(0);
    }

    return () => clearTimeout(scrollTimer);
  }, [slug, project]);

  // Hàm chuyển ảnh có logic vòng lặp
  const changeImage = (newIndex) => {
    if (!project || !project.files) return;
    const count = project.files.length;
    const safeIndex = (newIndex + count) % count;
    setMainImageIndex(safeIndex);
    setMainImage(project.files[safeIndex]);
  };

  if (!project) return <div>Không tìm thấy bài viết này!</div>;

  // Logic xác định nhãn động dựa trên category
  const getLabels = (category) => {
    switch (category) {
      case "su-kien":
        return { address: "Địa điểm tổ chức", date: "Ngày tổ chức", brand: "Phúc Party" };
      case "thiet-ke":
        return { address: "Địa chỉ cửa hàng", date: "Ngày hoàn thành", brand: "Phúc Design" };
      default:
        return { address: "Địa chỉ", date: "Ngày", brand: "Phúc Design" };
    }
  };

  const labels = getLabels(project.category);

  return (
    <div className="detail-post-container">
      <BackgroundText />
      <Breadcrumb
        items={[
          { label: "Trang chủ", link: "/" },
          { label: "Tất cả bài viết", link: "/all-post" },
          { label: project.title, link: `/post/${slug}` },
        ]}
      />
      <h1 className="post-title">{project.title}</h1>

      {/* Ảnh chính */}
      <div className="featured-image" onClick={() => setIsOpen(true)}>
        <img src={`/phucparty/img/${mainImage}`} alt={project.title} />
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div className="lightbox-overlay" onClick={() => setIsOpen(false)}>
          <span className="close-btn">&times;</span>
          <button
            className="nav-btn prev"
            onClick={(e) => {
              e.stopPropagation();
              changeImage(mainImageIndex - 1);
            }}
          >
            &#10094;
          </button>
          <img src={`/phucparty/img/${mainImage}`} alt="Full size" onClick={(e) => e.stopPropagation()} />
          <button
            className="nav-btn next"
            onClick={(e) => {
              e.stopPropagation();
              changeImage(mainImageIndex + 1);
            }}
          >
            &#10095;
          </button>
        </div>
      )}

      {/* Danh sách ảnh Thumbnail */}
      <div className="thumbnail-scroll-container">
        {project.files.map((fileName, index) => (
          <img
            key={index}
            src={`/phucparty/img/${fileName}`}
            className={`thumbnail ${mainImage === fileName ? "active" : ""}`}
            onClick={() => {
              setMainImage(fileName);
              setMainImageIndex(index);
            }}
            alt={`Thumbnail ${index + 1}`}
          />
        ))}
      </div>

      {/* Phần thông tin liên hệ cập nhật */}
      {project.contactInfo && (
        <div className="contact-section">
          {project.contactInfo.address && (
            <p><strong>{labels.address}: </strong> {project.contactInfo.address}</p>
          )}
          {project.contactInfo.owner && (
            <p><strong>Thuộc sở hữu của: </strong> {project.contactInfo.owner}</p>
          )}
          {project.contactInfo.link && (
            <p>
              <strong>Link: </strong>
              <a href={project.contactInfo.link} target="_blank" rel="noopener noreferrer">
                {project.contactInfo.owner || "Xem tại đây"}
              </a>
            </p>
          )}
          {project.date && (
            <p><strong>{labels.date}: </strong> {project.date}</p>
          )}

          {/* Câu cảm ơn linh hoạt */}
          <p style={{ marginTop: "15px" }}>
            <strong>Cảm ơn Quý khách đã tin tưởng sử dụng dịch vụ tại {labels.brand}.</strong>
          </p>
        </div>
      )}
      
      <ContactSection />
      <AdditionalSections currentSlug={slug} />
    </div>
  );
};

export default DetailPost;