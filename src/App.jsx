import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

// Pages
import Home from "./pages/Home";
import LuckySpinParty from "./pages/LuckySpinParty";
// import AllGallery from "./pages/AllGallery";
import AllPost from "./pages/allPost";
import DetailPost from "./pages/detailPost";

// Component con giúp tự động cuộn lên đầu
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  useEffect(() => {
    // 1. Kiểm tra xem trên đường link hiện tại có chứa chữ "fbclid" không
    if (window.location.search.includes('fbclid')) {
      // 2. Tạo ra một đối tượng URL dựa trên đường dẫn hiện tại
      const url = new URL(window.location.href);
      
      // 3. Xóa bỏ riêng cái tham số fbclid rác rưởi đi
      url.searchParams.delete('fbclid');
      
      // 4. Cập nhật lại thanh địa chỉ của trình duyệt mà không làm tải lại trang
      window.history.replaceState({}, document.title, url.pathname + url.search + url.hash);
    }
  }, []);
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lucky-spin" element={<LuckySpinParty />} />
        {/* <Route path="/all-gallery" element={<AllGallery />} /> */}
        <Route path="/all-post" element={<AllPost />} />
        <Route path="/detail-post" element={<DetailPost />} />
        <Route path="/post/:slug" element={<DetailPost />} />
      </Routes>
      <BackToTop />
      <Footer />
    </>
  );
}

export default App;
