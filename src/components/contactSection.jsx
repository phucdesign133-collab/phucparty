import React from "react";
import "./contactSection.css";

const ContactSection = ({category}) => {
  // Xác định tên thương hiệu dựa trên category
  const brandName = category === "thiet-ke" ? "Phúc Design" : "Phúc Party";
  return (
    <div className="contact-section-border">
      <h3 style={{marginTop:"-10px"}}>Liên hệ với chúng tôi</h3>
      <div className="contact-info">
        <p>
          <strong>Đại diện {brandName}:</strong> Dương Đỗ Hồng Phúc
        </p>
        <p>
          <strong>Số điện thoại:</strong> 079.991.0603
        </p>
        <p>
          <strong>Email:</strong> phucdesign133@gmail.com
        </p>
      </div>

      <div className="cta-container">
        <a href="https://zalo.me/0799910603" target="_blank" rel="noopener noreferrer" className="btn-zalo">
          Liên hệ Zalo
        </a>
        <a href="https://zalo.me/0799910603" target="_blank" rel="noopener noreferrer" className="btn-share">
          Liên hệ Whatsapp
        </a>
        {/* <button onClick={handleShare} className="btn-share hidden-btn">
          Chia sẻ bài viết
        </button> */}
      </div>
    </div>
  );
};

export default ContactSection;
