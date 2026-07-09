import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { galleryData } from "../datas/galleryData";
import BackgroundText from "../components/backgroundText";
import ContactSection from "../components/contactSection";
import Breadcrumb from "../components/Breadcrumb";
import AdditionalSections from "../components/AdditionalSections";
import "../components/detailPost.css";

const DetailPost = () => {
  const { slug } = useParams();
  const project = galleryData.find((item) => item.slug === slug);

  const [mainImage, setMainImage] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const scrollTimer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 0);

    if (project && project.files && project.files.length > 0) {
      setMainImage(project.files[0]);
      setMainImageIndex(0);
    }

    return () => clearTimeout(scrollTimer);
  }, [slug, project]);

  const changeImage = (newIndex) => {
    if (!project || !project.files) return;
    const count = project.files.length;
    const safeIndex = (newIndex + count) % count;
    setMainImageIndex(safeIndex);
    setMainImage(project.files[safeIndex]);
  };

  if (!project) return <div>Không tìm thấy bài viết này!</div>;

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

      {/* 1. Ảnh chính (Đã cập nhật path chuẩn) */}
      <div className="featured-image" onClick={() => setIsOpen(true)}>
        <img src={`${import.meta.env.BASE_URL}img/${mainImage}`} alt={project.title} />
      </div>

      {/* 2. Lightbox (Đã cập nhật path chuẩn) */}
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
          <img src={`${import.meta.env.BASE_URL}img/${mainImage}`} alt="Full size" onClick={(e) => e.stopPropagation()} />
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

      {/* 3. Danh sách ảnh Thumbnail (Đã cập nhật path chuẩn) */}
      <div className="thumbnail-scroll-container">
        {project.files.map((fileName, index) => (
          <img
            key={index}
            src={`${import.meta.env.BASE_URL}img/${fileName}`}
            className={`thumbnail ${mainImage === fileName ? "active" : ""}`}
            onClick={() => {
              setMainImage(fileName);
              setMainImageIndex(index);
            }}
            alt={`Thumbnail ${index + 1}`}
          />
        ))}
      </div>
      {/* Thông tin chi tiết bài viết */}
      <div className="contact-section">
        {project.contactInfo?.address && (
          <div className="address-section">
            <strong>{labels.address}: </strong>
            {(() => {
              const addresses = project.contactInfo.address.split(". - ");
              if (addresses.length > 1) {
                return (
                  <ul style={{ listStyle: "none", paddingLeft: "15px", marginTop: "5px" }}>
                    {addresses.map((addr, index) => (
                      <li key={index} style={{ marginBottom: "5px" }}>
                        <span style={{ fontWeight: "bold" }}>CN{index + 1}:</span> {addr.trim()}
                      </li>
                    ))}
                  </ul>
                );
              }
              return <span> {project.contactInfo.address}</span>;
            })()}
          </div>
        )}

        {project.contactInfo?.owner && (
          <p>
            <strong>Thuộc sở hữu của: </strong> {project.contactInfo.owner}
          </p>
        )}

        {/* Hiển thị link cho mọi bài viết có link */}
        {project.contactInfo?.link && (
          <p>
            <strong>Link: </strong>
            <a
              style={{ textDecoration: "none", color: "var(--primary-dark-red)", fontWeight: "bold", fontStyle: "italic" }}
              href={project.contactInfo.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.contactInfo.owner ? project.contactInfo.owner : "Xem nhiều hơn >>"}
            </a>
          </p>
        )}

        {(project.date || project.contactInfo?.date) && (
          <p>
            <strong>{labels.date}: </strong> {project.date || project.contactInfo.date}
          </p>
        )}

        <p style={{ marginTop: "15px" }}>
          <strong>Cảm ơn Quý khách đã tin tưởng sử dụng dịch vụ tại {labels.brand}.</strong>
        </p>
      </div>
      {/* Điều hướng về hashtag của facebook */}
      <div className="hashtag-container">
        {project.tags?.map((tag, index) => (
          <a
            key={index}
            href={`https://www.facebook.com/hashtag/${tag.toLowerCase()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hashtag-item"
          >
            <span>#{tag}</span>
          </a>
        ))}
      </div>
      {/* Thông tin liên hệ đặt dịch vụ */}
      <ContactSection category={project.category} />
      <AdditionalSections currentSlug={slug} />
    </div>
  );
};

export default DetailPost;
