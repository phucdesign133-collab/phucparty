const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* Cột 1: Giới thiệu */}
        <div className="footer-column">
          <h4 className="footer-title">PhucParty</h4>
          <p className="footer-text">
            Mang lại niềm vui và những khoảnh khắc may mắn, đáng nhớ cho mọi bữa tiệc của bạn.
          </p>
        </div>

        {/* Cột 2: Đường dẫn nhanh */}
        <div className="footer-column">
          <h4 className="footer-title">Khám Phá</h4>
          <ul className="footer-links">
            <li><a href="#/">Trang chủ</a></li>
            <li><a href="#/lucky">Vòng quay may mắn</a></li>
            <li><a href="#/about">Về chúng tôi</a></li>
          </ul>
        </div>

        {/* Cột 3: Dịch vụ */}
        <div className="footer-column">
          <h4 className="footer-title">Dịch Vụ</h4>
          <ul className="footer-links">
            <li><a href="#/">Tổ chức sự kiện</a></li>
            <li><a href="#/">Cho thuê vòng quay</a></li>
            <li><a href="#/">Biểu diễn nghệ thuật</a></li>
          </ul>
        </div>

        {/* Cột 4: Bản quyền & Liên hệ */}
        <div className="footer-column">
          <h4 className="footer-title">Liên Hệ</h4>
          <p className="footer-text">Email: info@phucparty.com</p>
          <p className="footer-text">Design & Developed by Dustin</p>
        </div>
      </div>

      {/* Dòng bản quyền chạy ngang ở dưới cùng */}
      <div className="footer-bottom">
        <p>© 2026 PhucParty. Alle Rechte vorbehalten (Toàn bộ bản quyền được bảo lưu).</p>
      </div>
    </footer>
  );
};

export default Footer;