import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASIC_PRIZES, PREMIUM_PRIZES } from "../datas/data";
import ResultPopup from "../components/resultPopup";

const ZALO_PHONE_ADMIN = "0799910603";

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
  // Show popup
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    document.body.style.overflow = showPopup ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showPopup]);

  const isMobile = windowWidth < 850;
  const canvasSize = windowWidth < 500 ? 300 : 440;

  const isPremiumMode = babyName.trim().length > 0 && babyBirthday.trim().length > 0;

  const currentPrizes = isPremiumMode ? PREMIUM_PRIZES : BASIC_PRIZES;

  const drawWheel = (currentAngle) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const size = canvasSize;
    const center = size / 2;
    const radius = center - 8;
    const arc = (Math.PI * 2) / currentPrizes.length;

    ctx.clearRect(0, 0, size, size);

    currentPrizes.forEach((prize, index) => {
      const angle = currentAngle + index * arc;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, angle, angle + arc);
      ctx.closePath();

      ctx.fillStyle = prize.color;
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.save();

      ctx.translate(center, center);
      ctx.rotate(angle + arc / 2);

      ctx.fillStyle = "#000";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.font = windowWidth < 500 ? 'bold 11px "Quicksand", sans-serif' : 'bold 14px "Quicksand", sans-serif';

      ctx.fillText(`${prize.icon} ${prize.text}`, radius - (windowWidth < 500 ? 15 : 25), 0);

      ctx.restore();
    });

    const centerRadius = windowWidth < 500 ? 20 : 30;

    ctx.beginPath();
    ctx.arc(center, center, centerRadius, 0, Math.PI * 2);

    ctx.fillStyle = "#fff";
    ctx.fill();

    ctx.strokeStyle = isPremiumMode ? "#00f5d4" : "#64748b";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.font = windowWidth < 500 ? "20px Arial" : "30px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🎁", center, center);
  };

  useEffect(() => {
    drawWheel(angleRef.current);
  }, [canvasSize, isPremiumMode]);

  const calculateFinalPrize = () => {
    const degrees = angleRef.current * (180 / Math.PI) + 90;
    const arc = 360 / currentPrizes.length;

    const index = Math.floor((360 - (degrees % 360)) / arc) % currentPrizes.length;

    const prize = currentPrizes[index];

    setPrizeResult(prize);

    const code = `${isPremiumMode ? "VIP" : "NORMAL"}-${Math.floor(1000 + Math.random() * 9000)}`;

    setGeneratedCode(code);
  };

  const spinTheWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setPrizeResult(null);
    setGeneratedCode("");

    const spinAngleStart = Math.random() * 15 + 20;
    const spinTimeTotal = Math.random() * 2000 + 4000;

    let spinTime = 0;

    const easeOut = (t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b;

    const animate = () => {
      spinTime += 20;

      if (spinTime >= spinTimeTotal) {
        setIsSpinning(false);
        calculateFinalPrize();
        setShowPopup(true);
        return;
      }

      const delta = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);

      angleRef.current += (delta * Math.PI) / 180;

      drawWheel(angleRef.current);

      requestAnimationFrame(animate);
    };

    animate();
  };

  // const [showPopup, setShowPopup] = useState(false);
  const handleSpinAgain = () => {
    setShowPopup(false); // Ẩn popup
    spinTheWheel(); // Kích hoạt hàm quay lại ngay
  };
  return (
    <div
      style={{
        ...styles.partyContainer,
        borderColor: isPremiumMode ? "#00f5d4" : "#64748b",
        boxShadow: isPremiumMode ? "0 25px 50px rgba(0, 245, 212, 0.25)" : "0 25px 50px rgba(0,0,0,0.5)",
        padding: isMobile ? "70px 15px 30px 15px" : "50px 30px",
      }}
    >
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
          {isPremiumMode ? "Đã kích hoạt quà tặng đặc quyền dành cho bé!" : "Nhập thông tin bé để mở khóa đĩa quà VIP từ Phúc Design."}
        </p>
      </div>

      <div
        style={{
          ...styles.mainLayout,
          flexDirection: isMobile ? "column" : "row", // Chuyển thành hàng dọc khi dùng điện thoại
          gap: isMobile ? "35px" : "50px",
        }}
      >
        {/* KHỐI VÒNG QUAY RESPONSIVE */}
        <div
          style={{
            ...styles.wheelWrapper,
            transform: isPremiumMode ? "rotateY(360deg)" : "rotateY(0deg)",
            transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
        >
          <div
            style={{
              ...styles.pointer,
              borderTopColor: isPremiumMode ? "#00f5d4" : "#64748b",
              borderLeftWidth: isMobile ? "12px" : "16px",
              borderRightWidth: isMobile ? "12px" : "16px",
              borderTopWidth: isMobile ? "24px" : "32px",
            }}
          ></div>

          {/* Canvas tự nhận size theo thiết bị */}
          <canvas ref={canvasRef} width={canvasSize} height={canvasSize} style={styles.canvasStyle} />

          <button
            //chỗ gọi nút xoay vòng
            onClick={spinTheWheel}
            disabled={isSpinning}
            style={{
              ...styles.spinButton,
              background: isPremiumMode ? "linear-gradient(45deg, #00f5d4, #7b2cbf)" : "linear-gradient(45deg, #64748b, #475569)",
              boxShadow: isPremiumMode ? "0 5px 20px rgba(0, 245, 212, 0.4)" : "none",
              fontSize: isMobile ? "14px" : "16px",
              padding: isMobile ? "12px 30px" : "14px 40px",
              background: "#B2FBA5", // Mint Pastel
              color: "#000", // Chữ đen
              ...(isSpinning ? styles.disabledBtn : {}),
            }}
          >
            {isSpinning ? "🌟 ĐANG XOAY..." : isPremiumMode ? "🔥 QUAY VÒNG VIP 🔥" : "🎲 QUAY THỬ QUÀ NHỎ"}
          </button>
        </div>

        {/* KHỐI FORM NHẬP THÔNG TIN RESPONSIVE */}
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
            {isPremiumMode ? "✨ Vòng Quay VIP Sẵn Sàng ✨" : "🔒 Nhập Tên Bé Để Đổi Đĩa Quà VIP"}
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
            <input type="text" placeholder="Nhập tên bé..." value={babyName} onChange={(e) => setBabyName(e.target.value)} style={styles.input} />
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
                colorScheme: "dark", // Giữ giao diện lịch tối tương thích với nền tiệc
              }}
            />
          </div>

          {/* KẾT QUẢ TRÚNG THƯỞNG */}
          {prizeResult && (
            <div
              style={{
                ...styles.resultBox,
                background: isPremiumMode ? "linear-gradient(135deg, #ff007f 0%, #7b2cbf 100%)" : "linear-gradient(135deg, #475569 0%, #1e293b 100%)",
              }}
            >
              <p style={{ margin: 0, fontSize: "13px", color: "#fff" }}>BÉ ĐÃ QUAY TRÚNG:</p>
              <h2
                style={{
                  ...styles.resultText,
                  fontSize: isMobile ? "18px" : "20px",
                }}
              >
                {prizeResult.icon} {prizeResult.text}
              </h2>

              <div style={styles.codeBadge}>{generatedCode}</div>
            </div>
          )}
        </div>
      </div>
      {/* POPUP ĐẶT Ở ĐÂY (NGOÀI CÙNG) */}
      <ResultPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        result={prizeResult}
        babyName={babyName}
        code={generatedCode}
        onSendZalo={() => window.open(`https://zalo.me/0799910603?text=Mã:${generatedCode}`)}
        onSendWhatsapp={() => window.open(`https://wa.me/0799910603?text=Mã:${generatedCode}`)}
        onSpinAgain={() => {
          setShowPopup(false);
          spinTheWheel();
        }}
      />
    </div>
  );
}

const styles = {
  //chỗ này là nền của hiển thị kết quả vòng quay
  partyContainer: {
    background: "radial-gradient(circle, #1a1625 0%, #0a0712 100%)",
    borderRadius: "24px",
    color: "#fff",
    fontFamily: '"Quicksand", sans-serif',
    position: "relative",
    border: "3px solid #64748b",
    maxWidth: "1050px",
    margin: "10px auto",
    // perspective: "1000px",
    boxSizing: "border-box",
    backgroundColor: "#F8F9FA",
    margin: "10px",
    padding: "25px",
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
