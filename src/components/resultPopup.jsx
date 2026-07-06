import React from "react";
import "./resultPopup.css"; // Có css rời

export default function ResultPopup({ isOpen, onClose, result, babyName, code, onSendZalo, onSendWhatsapp, onSpinAgain }) {
  if (!isOpen) return null;

  return (
    <div className="popup-backdrop">
      <div className="popup-container">
        <button className="close-icon" onClick={onClose}>
          &times;
        </button>

        <h3 className="popup-title">Chúc Mừng {babyName} Quay Trúng</h3>
        <div className="prize-display">
          {result?.icon} {result?.text}
        </div>
        <div className="code-badge">Mã: {code}</div>

        <div className="instructions">
          <p>
            <strong>Điều kiện sử dụng:</strong>
          </p>
          <p>- Đối với Voucher: sẽ áp dụng vào dịch vụ tiếp theo kể từ khi quay trúng.</p>
          <p>- Đối với các quà khác: có thể đổi ngay qua qua tin nhắn theo hướng dẫn bên dưới:</p>
        </div>
        <div className="instructions">
          <p>
            <strong>Hướng dẫn đổi quà:</strong>
          </p>
          <p>- Chụp màn hình hiện tại và gửi tin nhắn Zalo/WhatsApp để đổi quà.</p>
          <p>- Có thể chọn quay thêm để có cơ hội nhận quà giá trị hơn!</p>
        </div>

        <div className="button-group">
          <button className="zalo-btn" onClick={onSendZalo}>
            Gửi Zalo
          </button>
          <button className="wa-btn" onClick={onSendWhatsapp}>
            Gửi WhatsApp
          </button>
          <button className="retry-btn" onClick={onSpinAgain}>
            Quay thêm lần nữa
          </button>
        </div>
      </div>
    </div>
  );
}
