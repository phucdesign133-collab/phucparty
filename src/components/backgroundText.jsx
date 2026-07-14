import React from "react";

const BackgroundText = ({ category }) => {
  // Cấu hình nội dung cho từng tab
  const content = {
    "su-kien": {
      title: "Sự Kiện Đáng Nhớ",
      subtitle: "Những cột mốc quan trọng và các bữa tiệc hoành tráng mà chúng tôi đã thực hiện."
    },
    "thiet-ke": {
      title: "Thiết Kế Sáng Tạo",
      subtitle: "Nơi ý tưởng bay cao với những bản vẽ độc đáo và chuyên nghiệp nhất."
    },
    "bang-gia": {
      title: "Bảng Giá Dịch Vụ",
      subtitle: "Chi tiết các gói dịch vụ chất lượng với mức giá tối ưu dành cho bạn."
    },
    default: {
      title: "Nơi Lưu Giữ Những Kỷ Niệm",
      subtitle: "Khoảnh khắc tuyệt vời được ghi lại bởi team Phúc Party và chính bạn."
    },
    resources: {
      title: "Tools & AI",
      subtitle: "Tools & AI - Kho công cụ hỗ trợ công việc. Đừng quên bấm vào 'Chi tiết' và xem clip hướng dẫn để ủng hộ Phúc nhé!"
    }
  };

  const data = content[category] || content.default;

  const styles = {
    wrapper: {
      padding: "40px 20px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "'Segoe UI', sans-serif"
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#2d3436",
      margin: "0 0 15px 0",
      lineHeight: "1.2"
    },
    subtitle: {
      fontSize: "1.1rem",
      color: "#636e72",
      fontWeight: "400",
      maxWidth: "600px",
      margin: "0 auto"
    },
    line: {
      width: "60%",
      height: "1px",
      backgroundColor: "#dfe6e9",
      marginTop: "40px"
    }
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>{data.title}</h1>
      <p style={styles.subtitle}>{data.subtitle}</p>
      <div style={styles.line}></div>
    </div>
  );
};

export default BackgroundText;