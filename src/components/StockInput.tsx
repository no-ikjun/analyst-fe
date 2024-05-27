import "../styles/StockInput.css";

import axios from "axios";
import { useState } from "react";

import StockInfo from "./StockInfo";

const StockInput: React.FC = () => {
  const [stockCode, setStockCode] = useState<string>("");
  const [stockInfo, setStockInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("로그인이 필요합니다.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5050/kis/stock-info?code=${stockCode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setStockInfo(response.data.output);
    } catch (err) {
      setError("주식 정보를 불러오는 데 실패했습니다.");
      console.error("주식 정보 불러오기 실패:", err);
    }
  };

  return (
    <div className="stock-input-container">
      <a
        href="http://data.krx.co.kr/contents/MDC/MDI/mdiLoader/index.cmd?menuId=MDC0201020101"
        target="_blank"
        rel="noreferrer"
      >
        종목 코드 확인하기
      </a>
      <form onSubmit={handleSubmit}>
        <label htmlFor="stockCode">관심 주식 종목 코드:</label>
        <input
          type="text"
          id="stockCode"
          value={stockCode}
          onChange={handleInputChange}
          required
        />
        <button type="submit">검색하기</button>
      </form>
      {error && <p className="error">{error}</p>}
      {stockInfo && <StockInfo stockInfo={stockInfo} />}
    </div>
  );
};

export default StockInput;
