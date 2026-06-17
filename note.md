# 📝 NHẬT KÝ CÚ PHÁP CODE CỦA DUSTIN

## 1. Cách chèn Lordicon (Icon Động)

- Thẻ style trong React bắt buộc phải nằm trong 2 cặp dấu ngoặc nhọn `{{ }}`.
- Các giá trị kích thước phải bọc trong dấu nháy đơn `'`.

```jsx
<lord-icon
  src="[https://cdn.lordicon.com/rhrmfnhf.json](https://cdn.lordicon.com/rhrmfnhf.json)"
  trigger="hover"
  style={{ width: '150px', height: '150px' }}
></lord-icon>

## 2. Cách chèn danh sách tổng quát khi chưa có data
const initialPartners = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: `Đối tác ${index + 1}`,
  img: `https://dummyimage.com/150x80/f1f1f1/333333.png&text=Partner+${index + 1}`
}));


##Button.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// 🌟 NÚT 1: NHIỆM VỤ VÀO VÒNG QUAY MAY MẮN
export function SpinMissionButton() {
  return (
    <Link to="/lucky-spin-party" style={{ textDecoration: 'none' }}>
      <button style={{...btnStyles.base, ...btnStyles.spin}}>
        🔥 Vào Vòng Quay Nhận Quà VIP
      </button>
    </Link>
  );
}

// 🌟 NÚT 2: NHIỆM VỤ XEM BỘ SƯU TẬP ẢNH
export function GalleryMissionButton() {
  return (
    <Link to="/gallery" style={{ textDecoration: 'none' }}>
      <button style={{...btnStyles.base, ...btnStyles.gallery}}>
        📸 Lướt Xem Mẫu Tiệc Đẹp (+1 Lượt)
      </button>
    </Link>
  );
}

// Stylesheet nội bộ gọn gàng
const btnStyles = {
  base: { color: '#fff', border: 'none', padding: '12px 26px', fontSize: '14px', fontWeight: 'bold', borderRadius: '25px', cursor: 'pointer' },
  spin: { background: 'linear-gradient(45deg, #00f5d4, #7b2cbf)' },
  gallery: { background: 'linear-gradient(45deg, #ff5400, #ff007f)' }
};
```
<!-- Các bước push dự án đầu lên Git -->
# 1. Khởi tạo Git (nếu dự án mới tinh chưa từng chạy Git)
git init

# 2. Kết nối dự án ở máy với link GitHub của bạn
git remote add origin https://github.com/phucdesign133-collab/phucparty.git

# 3. Gom tất cả các file đã sửa lại chuẩn bị nộp
git add .

# 4. Tạo một ghi chú cho lần nộp này
git commit -m "feat: hoàn thành khung xương và vòng quay may mắn"

# 5. Đẩy code lên nhánh main
git branch -M main
git push -u origin main