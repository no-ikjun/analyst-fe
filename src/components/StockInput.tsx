import "../styles/StockInput.css";

import axios from "axios";
import { useState } from "react";

import LoadingOverlay from "./LoadingOverlay";
import StockInfo from "./StockInfo";

const StockInput: React.FC = () => {
  const [stockCode, setStockCode] = useState<string>("");
  const [stockInfo, setStockInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("로그인이 필요합니다.");
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/kis/stock-info?code=${stockCode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (
        response.data.output === null ||
        response.data.output.std_pdno === ""
      ) {
        setError("해당 주식 정보가 존재하지 않습니다.");
        return;
      }
      setStockInfo(response.data.output);
    } catch (err) {
      setError("주식 정보를 불러오는 데 실패했습니다.");
      console.error("주식 정보 불러오기 실패:", err);
    }
    setLoading(false);
  };

  return (
    <div className="stock-input-container">
      <LoadingOverlay loading={loading} />
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
      {stockInfo && !error && (
        <StockInfo stockInfo={stockInfo} code={stockCode} />
      )}
    </div>
  );
};

export default StockInput;
