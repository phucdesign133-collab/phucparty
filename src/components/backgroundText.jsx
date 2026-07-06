import React from "react";

const BackgroundText = () => {
  const styles = {
    wrapper: {
      padding: "20px",
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
      <h1 style={styles.title}>Nơi Lưu Giữ Những Kỷ Niệm</h1>
      <p style={styles.subtitle}>
        Khoảnh khắc tuyệt vời được ghi lại bởi team Phúc Party và chính bạn.
      </p>
      <div style={styles.line}></div>
    </div>
  );
};

export default BackgroundText;