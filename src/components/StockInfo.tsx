import "../styles/StockInfo.css";

import axios from "axios";
import { useState } from "react";

import LoadingOverlay from "./LoadingOverlay";

const StockInfo = ({ stockInfo, code }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddToWatchlist = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/kis/add-interest?code=${code}`,
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
      <p>{stockInfo.std_pdno}</p>
      <p>{Number(stockInfo.bfdy_clpr).toLocaleString()} (전일종가)</p>
      <p>
        {(
          Number(stockInfo.bfdy_clpr) * Number(stockInfo.lstg_stqt)
        ).toLocaleString()}
        원 (시총)
      </p>
      <p>{stockInfo.prdt_abrv_name}</p>
      {error && <p className="error">{error}</p>}
      <button onClick={handleAddToWatchlist}>관심 종목에 추가</button>
    </div>
  );
};

export default StockInfo;
