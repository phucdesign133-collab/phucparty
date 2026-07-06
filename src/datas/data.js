//1. nơi tập trung dữ liệu hình ảnh dùng cho render

// ------------------------------------------------------------------------------x---------------------------------------------------------
//2. nơi tập trung dữ liệu hashtag dùng cho tìm kiếm
export const SUGGESTED_KEYWORDS = [
  { id: 1, label: "Sinh nhật", category: "birthday" },
  { id: 2, label: "Thôi nôi", category: "birthday" },
  { id: 3, label: "Tiệc cưới", category: "wedding" },
  { id: 4, label: "Khai trương", category: "event" },
  { id: 5, label: "Sự kiện", category: "event" },
];

export const HASHTAGS_BY_CATEGORY = {
  featured: ["#thoinoi", "#daythang", "#hoanggia", "#luxury"],
  birthday: ["#sinhnhat", "#ngoaitroi", "#congchua", "#capybara"],
  project: ["#sanhtieccuoi", "#galadinner", "#trienlam", "#hoatuoi"],
};
export const ALL_ITEMS = [
  { id: 1, label: "Sinh nhật bé trai", category: "birthday" },
  { id: 2, label: "Sinh nhật bé gái", category: "birthday" },
  { id: 3, label: "Tiệc cưới ngoài trời", category: "wedding" },
  { id: 4, label: "Tiệc cưới trong nhà", category: "wedding" },
  { id: 5, label: "Thôi nôi hoàng gia", category: "baby" },
  { id: 6, label: "Khai trương cửa hàng", category: "event" },
  { id: 7, label: "Lễ kỷ niệm", category: "event" },
  { id: 8, label: "Tiệc trà chiều", category: "event" },
];
// ------------------------------------------------------------------------------x-----------------------------------------------
//3. Dữ liệu ảnh được hiển thị dành riêng cho bộ lọc file data.js
// export const galleryData = [
//   { id: 1, src: img1, category: "all", subCategory: "sinh-nhat" },
//   { id: 2, src: img2, category: "all", subCategory: "hoang-tu" },
//   { id: 3, src: img3, category: "all", subCategory: "cong-chua" },
//   { id: 4, src: img4, category: "all", subCategory: "trong-nha" },
//   { id: 5, src: img5, category: "all", subCategory: "thoi-noi" },
//   { id: 6, src: img6, category: "all", subCategory: "khai-truong" },
//   { id: 7, src: img7, category: "all", subCategory: "le-ky-niem" },
//   { id: 8, src: img8, category: "all", subCategory: "concept" },
// ];
// à cái map này là của imageGallery để render trang thư viện

// ------------------------------------------------------------------------------x-----------------------------------------------
//4. Dữ liệu để map cho trang tất cả bài viết -> chỗ này tạm thời chưa biết xài ở đâu. tạm thời ẩn
export const mockGalleryItems = [
  // { id: 1, title: "TSN Hiển Long", src: img1, category: "sinh-nhat", projectName: "Sinh nhật bé Hiển Long", time: "28.01.2024" },
  // { id: 2, title: "TSN Bảo Mi", src: img1, category: "sinh-nhat", projectName: "Sinh nhật bé Bảo Mi", time: "13.10.2023" },
  // { id: 9, title: "Thiết kế 02", src: img2, category: "gia-tien" },
  // { id: 3, title: "Thiết kế 03", src: img3, category: "hoang-tu" },
  // { id: 4, title: "Thiết kế 04", src: img4, category: "cong-chua" },
  // { id: 5, title: "Thiết kế 01", src: img5, category: "cong-bong" },
  // { id: 6, title: "Thiết kế 02", src: img6, category: "concept" },
  // { id: 7, title: "Thiết kế 03", src: img7, category: "le-ky-niem" },
  // { id: 8, title: "Thiết kế 04", src: img8, category: "thoi-noi" },
];
// -> đã di chuyển qua galleryData.js
// ------------------------------------------------------------------------------x-----------------------------------------------
//5. Khúc này là ảnh thumbnail ở chi tiết bài viết
// export const imageDetailThumbnail = [{ id: 1, title: "thumbnail", src: bg3 }];
// ------------------------------------------------------------------------------x-----------------------------------------------
//6. Khúc này là đổ data thật của bài viết để render ảnh
// export const imageDetailPost = [
//   { id: 1, src: img1, title: "Khoảnh khắc 1" },
//   { id: 2, src: img2, title: "Khoảnh khắc 2" },
//   { id: 3, src: img3, title: "Khoảnh khắc 3" },
//   { id: 4, src: img4, title: "Khoảnh khắc 4" },
// ];
// ------------------------------------------------------------------------------x-----------------------------------------------
// ------------------------------------------------------------------------------x-----------------------------------------------
// src/data/data.js
export const dataLuckySpinParty = {
  partyInfo: {
    title: "Lucky Spin Party",
    description: "Chào mừng bạn đến với sự kiện quay số may mắn!",
  },
  stages: [
    { id: 1, name: "Stage Performance One", date: "OCT 16, 2025" },
    { id: 2, name: "Stage Performance Two", date: "NOV 12, 2025" },
  ],
};

// Đây là nơi chứa logic cuộn trang duy nhất
export const scrollToTopSmooth = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Thêm mảng dữ liệu 6 ảnh mới vào đây
// export const galleryUpComing = [
//   {
//     id: 1,
//     src: img1,
//     title: "The second single to be taken from Coldplay's",
//     date: "29. 9. 2026",
//   },
//   {
//     id: 2,
//     src: img2,
//     title: "TRAFFIC, the world's largest wildlife trade",
//     date: "29. 9. 2026",
//   },
//   { id: 3, src: img3, title: "Girl, please tell me why", date: "29. 9. 2026" },
//   {
//     id: 4,
//     src: img4,
//     title: "Bữa tiệc bùng nổ Phúc Party",
//     date: "29. 9. 2026",
//   },
//   { id: 5, src: img5, title: "Vòng quay may mắn cực vui", date: "29. 9. 2026" },
//   {
//     id: 6,
//     src: img6,
//     title: "Khoảnh khắc sự kiện đáng nhớ",
//     date: "29. 9. 2026",
//   },
// ];
// export const galleryRecentEvents = [
//   {
//     id: 1,
//     src: img1,
//     title: "The second single to be taken from Coldplay's",
//     date: "29. 9. 2026",
//   },
//   {
//     id: 2,
//     src: img2,
//     title: "TRAFFIC, the world's largest wildlife trade",
//     date: "29. 9. 2026",
//   },
//   { id: 3, src: img3, title: "Girl, please tell me why", date: "29. 9. 2026" },
//   {
//     id: 4,
//     src: img4,
//     title: "Bữa tiệc bùng nổ Phúc Party",
//     date: "29. 9. 2026",
//   },
//   { id: 5, src: img5, title: "Vòng quay may mắn cực vui", date: "29. 9. 2026" },
//   {
//     id: 6,
//     src: img6,
//     title: "Khoảnh khắc sự kiện đáng nhớ",
//     date: "29. 9. 2026",
//   },
// ];
// Danh sách quà tặng
// data.js
// -----x----

// -----x----
export const BASIC_PRIZES = [
  { text: "Bút Chì Màu", color: "#FFD1DC", icon: "✏️" },
  { text: "Móc Khóa Nhỏ", color: "#AEC6CF", icon: "🔑" },
  { text: "Kẹo Mút", color: "#B2FBA5", icon: "🍭" },
  { text: "Bộ Thẻ Bài (tùy chọn)", color: "#FDFD96", icon: "🎈" },
  { text: "Hình Dán Sticker", color: "#FFB347", icon: "🔖" },
  { text: "Thun Buộc Tóc", color: "#FF6961", icon: "🎀" },
  { text: "Bộ 10 vòng đeo tay", color: "#bf81e3", icon: "🎁" },
  { text: "Bộ 5 lật đật mini", color: "#75e3eb", icon: "🎁" },
];

export const PREMIUM_PRIZES = [
  { text: "Voucher 50k", color: "#FFD700", icon: "🎁" }, // Vàng Gold
  { text: "Voucher 200k", color: "#FFC107", icon: "🎁" }, // Vàng Gold
  { text: "Voucher 100k", color: "#FFB300", icon: "🎁" }, // Vàng Gold
  { text: "Voucher 500k", color: "#FF8F00", icon: "🎁" }, // Vàng Gold
  { text: "Card điện thoại 70k", color: "#FFD54F", icon: "🎁" }, // Vàng Gold
  { text: "Card điện thoại 50k", color: "#FFCA28", icon: "🎁" }, // Vàng Gold
  { text: "Card điện thoại 20k", color: "#FFD54F", icon: "🎁" }, // Vàng Gold
  { text: "Card điện thoại 10k", color: "#FFCA28", icon: "🎁" }, // Vàng Gold
];

// Dành cho phần All Projects ở trang Home
// export const PROJECTS_DATA = [
//   ...Array.from({ length: 14 }, (_, i) => ({
//     id: i + 1,
//     title: `Dự án ${i + 1}`,
//     date: "2026-06-05", // Mặc định tháng 6
//     src: img3, // Thay link Pinterest bằng link ảnh trực tiếp
//   })),
//   // Dự án số 13
//   {
//     id: 13,
//     title: "Dự án số 13",
//     date: "2026-06-05",
//     src: img1,
//   },
//   // Các dự án tháng 5
//   ...Array.from({ length: 7 }, (_, i) => ({
//     id: i + 14,
//     title: `Dự án ${i + 14}`,
//     date: "2026-05-15",
//     src: img2,
//   })),
// ];
// viết lại cho phần tab dự án của tháng
// Ví dụ cấu trúc trong tabData.js
// export const TAB_DATA = [
//   {
//     title: "Dự án Web",
//     projects: [
//       // Phải có trường 'projects' là một mảng
//       { id: 1, thumbnail: img1, title: "dự án số 1", subtitle: "29.06.2026", link: "#" },
//       { id: 2, thumbnail: img1, title: "dự án số 2", subtitle: "28.06.2026", link: "#" },
//       { id: 3, thumbnail: img1, title: "dự án số 3", subtitle: "27.06.2026", link: "#" },
//       { id: 4, thumbnail: img1, title: "dự án số 4", subtitle: "26.06.2026", link: "#" },
//       { id: 5, thumbnail: img1, title: "dự án số 5", subtitle: "25.06.2026", link: "#" },
//       { id: 6, thumbnail: img1, title: "dự án số 6", subtitle: "24.06.2026", link: "#" },
//       { id: 7, thumbnail: img1, title: "dự án số 7", subtitle: "23.06.2026", link: "#" },
//       { id: 8, thumbnail: img1, title: "dự án số 8", subtitle: "22.06.2026", link: "#" },
//       { id: 9, thumbnail: img1, title: "dự án số 9", subtitle: "23.06.2026", link: "#" },
//       { id: 10, thumbnail: img1, title: "dự án số 10", subtitle: "22.06.2026", link: "#" },
//       // ...
//     ],
//   },
//   {
//     title: "Dự án Mobile",
//     projects: [], // Nếu chưa có data, ít nhất phải là mảng rỗng []
//   },
//   {
//     title: "Dự án Khác",
//     projects: [
//       { id: 2, src: img2, title: "dự án số 2", subtitle: "28.06.2026" },
//       { id: 3, src: img3, title: "dự án số 3", subtitle: "29.06.2026" },
//       { id: 4, src: img4, title: "dự án số 4", subtitle: "28.06.2026" },
//       { id: 5, src: img5, title: "dự án số 5", subtitle: "29.06.2026" },
//       { id: 6, src: img6, title: "dự án số 6", subtitle: "28.06.2026" },
//     ],
//   },
// ];
// Đây là dành cho chứa background của trang Thư viện
// export const GALLERY_DATA = [
//   { id: 1, thumbnail: bg1, title: "Thư viện", description: "bg1" },
//   { id: 2, thumbnail: bg2, title: "Thư viện 2", description: "bg2" },
// ];

// ------------------------------------------------------------------------------x---------------------------------------------------------
