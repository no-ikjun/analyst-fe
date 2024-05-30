import "../styles/StockInfo.css";

import axios from "axios";
import { useState } from "react";

import LoadingOverlay from "./LoadingOverlay";

const ForeignStockInfo = ({ stockInfo, code }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddToWatchlist = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/kis/foreign/add-interest?code=${code}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("관심 종목에 추가 성공:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("관심 종목에 추가 실패:", error);
      setError("종목 추가 불가");
    }
    setLoading(false);
  };

  return (
    <div className="stock-info-container">
      <LoadingOverlay loading={loading} />
      <h3>주식 정보</h3>
      <p>
        {stockInfo.prdt_name} ({stockInfo.prdt_eng_name})
      </p>
      <p>
        {stockInfo.natn_name} ({stockInfo.tr_mket_name})
      </p>
      {error && <p className="error">{error}</p>}
      <button onClick={handleAddToWatchlist}>관심 종목에 추가</button>
    </div>
  );
};

export default ForeignStockInfo;
