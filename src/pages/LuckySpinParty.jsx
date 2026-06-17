import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/v1.png"; // Bạn nhớ kiểm tra xem ảnh logo có đúng ở đây không nhé

// SỐ ZALO CHÍNH CỦA ANH DUSTIN
const ZALO_PHONE_ADMIN = "0799910603";

// 🎁 1. DANH SÁCH QUÀ PHỔ THÔNG (Khi khách cố tình spam không nhập tên bé)
const BASIC_PRIZES = [
  { text: "Kẹo Mút Tròn", color: "#94a3b8", icon: "🍬" },
  { text: "Bong Bóng Bay", color: "#cbd5e1", icon: "🎈" },
  { text: "Hình Dán Sticker", color: "#94a3b8", icon: "🧸" },
  { text: "Chun Buộc Tóc", color: "#cbd5e1", icon: "🎀" },
  { text: "Bút Chì Màu", color: "#94a3b8", icon: "✏️" },
  { text: "Móc Khóa Nhỏ", color: "#cbd5e1", icon: "🔑" },
];

// 💎 2. DANH SÁCH QUÀ XỊN PREMIUM (Chỉ xuất hiện khi nhập ĐỦ thông tin bé)
const PREMIUM_PRIZES = [
  { text: "Voucher 500k", color: "#FF007F", icon: "🎁" },
  { text: "Set Nến Thơm", color: "#7B2CBF", icon: "🕯️" },
  { text: "Ly Thủy Tinh", color: "#00F5D4", icon: "🥂" },
  { text: "Combo Đèn Bay", color: "#FF5400", icon: "✨" },
  { text: "Quay Thêm Lượt", color: "#3A0CA3", icon: "🔄" },
  { text: "Heo Bông Bự", color: "#9E0059", icon: "🐷" },
];

// ĐƯA BIẾN STYLES LÊN TRÊN ĐỂ VITE BIÊN DỊCH AN TOÀN CHUẨN 100%
const styles = {
  partyContainer: {
    background: "radial-gradient(circle, #1a1625 0%, #0a0712 100%)",
    borderRadius: "24px",
    color: "#fff",
    fontFamily: "system-ui, -apple-system, sans-serif",
    position: "relative",
    border: "3px solid #64748b",
    maxWidth: "1050px",
    margin: "10px auto",
    perspective: "1000px",
    boxSizing: "border-box",
  },
  backButton: {
    position: "absolute",
    top: "15px",
    left: "15px",
    background: "rgba(255, 255, 255, 0.08)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "8px 16px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
    zIndex: 20,
  },
  headerArea: { textAlign: "center", marginBottom: "30px" },
  partyTitle: { margin: 0, fontWeight: "bold", letterSpacing: "0.5px" },
  partySubtitle: { fontSize: "13px", color: "#94a3b8", marginTop: "6px" },
  mainLayout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wheelWrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  pointer: {
    position: "absolute",
    top: "-6px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "0",
    height: "0",
    borderLeftStyle: "solid",
    borderLeftColor: "transparent",
    borderRightStyle: "solid",
    borderRightColor: "transparent",
    borderTopStyle: "solid",
    zIndex: 10,
  },
  canvasStyle: { borderRadius: "50%", background: "#13111c", maxWidth: "100%" },
  spinButton: {
    marginTop: "20px",
    color: "#fff",
    border: "none",
    fontWeight: "bold",
    borderRadius: "30px",
    cursor: "pointer",
  },
  disabledBtn: { background: "#334155", cursor: "not-allowed" },
  formWrapper: {
    background: "rgba(255, 255, 255, 0.02)",
    padding: "25px",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    boxSizing: "border-box",
  },
  formTitle: { margin: "0 0 18px 0", textAlign: "center" },
  inputGroup: { marginBottom: "15px" },
  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "11px",
    borderRadius: "10px",
    border: "1px solid #3f3f46",
    background: "#09070f",
    color: "#fff",
    outline: "none",
    boxSizing: "border-box",
  },
  resultBox: {
    marginTop: "15px",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
  },
  resultText: { margin: "4px 0 8px 0", color: "#fff", fontWeight: "bold" },
  codeBadge: {
    background: "#ffffff",
    color: "#111111",
    padding: "6px 12px",
    borderRadius: "6px",
    display: "inline-block",
    fontWeight: "bold",
    fontSize: "16px",
    letterSpacing: "0.5px",
  },
  zaloSubmitBtn: {
    marginTop: "12px",
    width: "100%",
    background: "#0068ff",
    color: "#fff",
    border: "none",
    padding: "11px",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "13px",
    cursor: "pointer",
  },
};

export default function LuckySpinParty() {
  const navigate = useNavigate();
  const [babyName, setBabyName] = useState("");
  const [babyBirthday, setBabyBirthday] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [prizeResult, setPrizeResult] = useState(null);
  const [generatedCode, setGeneratedCode] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const canvasRef = useRef(null);
  const angleRef = useRef(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const canvasSize = windowWidth < 500 ? 300 : 440;
  const isPremiumMode = babyName.trim() !== "" && babyBirthday.trim() !== "";
  const currentPrizes = isPremiumMode ? PREMIUM_PRIZES : BASIC_PRIZES;

  const drawWheel = (currentAngle) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const size = canvasSize;
    const center = size / 2;
    const radius = center - 8;
    const arc = Math.PI / (currentPrizes.length / 2);

    ctx.clearRect(0, 0, size, size);

    currentPrizes.forEach((prize, i) => {
      const angle = currentAngle + i * arc;
      ctx.fillStyle = prize.color;
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, angle, angle + arc, false);
      ctx.lineTo(center, center);
      ctx.fill();

      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.save();
      ctx.fillStyle = isPremiumMode ? "#ffffff" : "#334155";
      // ĐỒNG BỘ PHÔNG CHỮ CHUẨN ĐỂ KHÔNG BỊ LỆCH TRÊN CÁC THIẾT BỊ
      ctx.font =
        windowWidth < 500 ? "bold 11px sans-serif" : "bold 14px sans-serif";
      ctx.translate(center, center);
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = "right";
      ctx.fillText(
        `${prize.icon} ${prize.text}`,
        radius - (windowWidth < 500 ? 15 : 25),
        4,
      );
      ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(center, center, windowWidth < 500 ? 30 : 45, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = isPremiumMode ? "#00f5d4" : "#64748b";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = "#111111";
    ctx.font =
      windowWidth < 500 ? "bold 9px sans-serif" : "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("PHÚC", center, center - (windowWidth < 500 ? 1 : 2));
    ctx.fillText(
      isPremiumMode ? "VIP" : "BASIC",
      center,
      center + (windowWidth < 500 ? 9 : 14),
    );
  };

  useEffect(() => {
    drawWheel(angleRef.current);
  }, [isPremiumMode, canvasSize]);

  const spinTheWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setPrizeResult(null);
    setGeneratedCode("");

    let spinAngleStart = Math.random() * 15 + 20;
    let spinTime = 0;
    const spinTimeTotal = Math.random() * 2000 + 4000;

    const animateSpin = () => {
      spinTime += 20;
      if (spinTime >= spinTimeTotal) {
        setIsSpinning(false);
        calculateFinalPrize();
        return;
      }

      const easeOut = (t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b;
      const deltaAngle =
        spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
      angleRef.current += (deltaAngle * Math.PI) / 180;

      drawWheel(angleRef.current);
      requestAnimationFrame(animateSpin);
    };

    animateSpin();
  };

  const calculateFinalPrize = () => {
    const degrees = (angleRef.current * 180) / Math.PI + 90;
    const arcd = 360 / currentPrizes.length;
    const index =
      Math.floor((360 - (degrees % 360)) / arcd) % currentPrizes.length;

    const finalPrize = currentPrizes[index];
    const codeType = isPremiumMode ? "VIP" : "NORMAL";
    const randDigits = Math.floor(1000 + Math.random() * 9000);

    setPrizeResult(finalPrize);
    setGeneratedCode(`${codeType}-${randDigits}`);
  };

  const handleSendToZalo = () => {
    if (!prizeResult) return;
    const message = isPremiumMode
      ? `Chào Phúc Design! Con tôi tên là: ${babyName.toUpperCase()} (Sinh nhật: ${babyBirthday}). Bé vừa quay trúng giải thưởng xịn: ${prizeResult.icon} ${prizeResult.text}. Mã xác thực phần quà của bé là: ${generatedCode}.`
      : `Chào Phúc Design! Tôi vừa tham gia vòng quay thử và nhận được phần quà kỷ niệm: ${prizeResult.icon} ${prizeResult.text}. Mã số: ${generatedCode}.`;

    window.open(
      `https://zalo.me/${ZALO_PHONE_ADMIN}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const isMobile = windowWidth < 850;

  return (
    <div
      style={{
        ...styles.partyContainer,
        borderColor: isPremiumMode ? "#00f5d4" : "#64748b",
        boxShadow: isPremiumMode
          ? "0 25px 50px rgba(0, 245, 212, 0.25)"
          : "0 25px 50px rgba(0,0,0,0.5)",
        padding: isMobile ? "70px 15px 30px 15px" : "50px 30px",
      }}
    >
      <button onClick={() => navigate("/")} style={styles.backButton}>
        <img
          src={logo}
          alt="Phúc Design"
          style={{ height: "35px", objectFit: "contain" }}
        />
      </button>

      <div style={styles.headerArea}>
        <h1
          style={{
            ...styles.partyTitle,
            color: isPremiumMode ? "#00f5d4" : "#e2e8f0",
            fontSize: isMobile ? "22px" : "30px",
          }}
        >
          {isPremiumMode ? "💎 PREMIUM SPIN VIP 💎" : "🎉 LUCKY SPIN PARTY 🎉"}
        </h1>
        <p style={styles.partySubtitle}>
          {isPremiumMode
            ? "Đã kích hoạt quà tặng đặc quyền dành cho bé!"
            : "Nhập thông tin bé để mở khóa đĩa quà VIP từ Phúc Design."}
        </p>
      </div>

      <div
        style={{
          ...styles.mainLayout,
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "35px" : "50px",
        }}
      >
        <div
          style={{
            ...styles.wheelWrapper,
            transform: isPremiumMode ? "rotateY(360deg)" : "rotateY(0deg)",
            transition:
              "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
        >
          {/* ĐÃ FIX LỖI CÚ PHÁP THẺ ĐÓNG Ở ĐÂY */}
          <div
            style={{
              ...styles.pointer,
              borderTopColor: isPremiumMode ? "#00f5d4" : "#64748b",
              borderLeftWidth: isMobile ? "12px" : "16px",
              borderRightWidth: isMobile ? "12px" : "16px",
              borderTopWidth: isMobile ? "24px" : "32px",
            }}
          ></div>

          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            style={styles.canvasStyle}
          />

          <button
            onClick={spinTheWheel}
            disabled={isSpinning}
            style={{
              ...styles.spinButton,
              background: isPremiumMode
                ? "linear-gradient(45deg, #00f5d4, #7b2cbf)"
                : "linear-gradient(45deg, #64748b, #475569)",
              boxShadow: isPremiumMode
                ? "0 5px 20px rgba(0, 245, 212, 0.4)"
                : "none",
              fontSize: isMobile ? "14px" : "16px",
              padding: isMobile ? "12px 30px" : "14px 40px",
              ...(isSpinning ? styles.disabledBtn : {}),
            }}
          >
            {isSpinning
              ? "🌟 ĐANG XOAY..."
              : isPremiumMode
                ? "🔥 QUAY VÒNG VIP 🔥"
                : "🎲 QUAY THỬ QUÀ NHỎ"}
          </button>
        </div>

        <div
          style={{
            ...styles.formWrapper,
            width: isMobile ? "100%" : "390px",
          }}
        >
          <h3
            style={{
              ...styles.formTitle,
              color: isPremiumMode ? "#ffbf00" : "#94a3b8",
              fontSize: isMobile ? "15px" : "16px",
            }}
          >
            {isPremiumMode
              ? "✨ Vòng Quay VIP Sẵn Sàng ✨"
              : "🔒 Nhập Tên Bé Để Đổi Đĩa Quà VIP"}
          </h3>

          <div style={styles.inputGroup}>
            <label
              style={{
                ...styles.label,
                color: isPremiumMode ? "#00f5d4" : "#94a3b8",
              }}
            >
              Tên của bé yêu:
            </label>
            <input
              type="text"
              placeholder="Nhập tên bé..."
              value={babyName}
              onChange={(e) => setBabyName(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label
              style={{
                ...styles.label,
                color: isPremiumMode ? "#00f5d4" : "#94a3b8",
              }}
            >
              Ngày sinh của bé:
            </label>
            <input
              type="date"
              value={babyBirthday}
              onChange={(e) => setBabyBirthday(e.target.value)}
              required
              style={{
                ...styles.input,
                colorScheme: "dark",
              }}
            />
          </div>

          {prizeResult && (
            <div
              style={{
                ...styles.resultBox,
                background: isPremiumMode
                  ? "linear-gradient(135deg, #ff007f 0%, #7b2cbf 100%)"
                  : "linear-gradient(135deg, #475569 0%, #1e293b 100%)",
              }}
            >
              <p style={{ margin: 0, fontSize: "13px", color: "#fff" }}>
                BÉ ĐÃ QUAY TRÚNG:
              </p>
              <h2
                style={{
                  ...styles.resultText,
                  fontSize: isMobile ? "18px" : "20px",
                }}
              >
                {prizeResult.icon} {prizeResult.text}
              </h2>

              <div style={styles.codeBadge}>{generatedCode}</div>

              <button onClick={handleSendToZalo} style={styles.zaloSubmitBtn}>
                Gửi Zalo Xác Thực Quà VIP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
