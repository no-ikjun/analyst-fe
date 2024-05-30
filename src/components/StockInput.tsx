import "../styles/StockInput.css";

import axios from "axios";
import { useState } from "react";

import ForeignStockInfo from "./ForeignStockInfo";
import LoadingOverlay from "./LoadingOverlay";
import StockInfo from "./StockInfo";

const StockInput = () => {
  const [stockCode, setStockCode] = useState<string>("");
  const [stockInfo, setStockInfo] = useState<any>(null);
  const [isInternational, setIsInternational] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockCode(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsInternational(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }
    try {
      let response;
      if (isInternational) {
        response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/kis/foreign/stock-info?code=${stockCode}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      } else {
        response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/kis/stock-info?code=${stockCode}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      }
      if (!response.data.output) {
        setError("해당 주식 정보가 존재하지 않습니다.");
        setLoading(false);
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
        <div className="checkbox-container">
          <label htmlFor="international">
            해외 주식 검색 (
            <a
              href="https://money2.daishin.com/html/Notice/2020/downloads/n_22.pdf"
              target="_blank"
              rel="noreferrer"
            >
              나스닥
            </a>
            )
          </label>
          <input
            type="checkbox"
            id="international"
            checked={isInternational}
            onChange={handleCheckboxChange}
          />
        </div>
        <button type="submit">검색하기</button>
      </form>
      {error && <p className="error">{error}</p>}
      {!error &&
        stockInfo &&
        (stockInfo.admn_item_yn ? (
          <StockInfo stockInfo={stockInfo} code={stockCode} />
        ) : (
          <ForeignStockInfo stockInfo={stockInfo} code={stockCode} />
        ))}
    </div>
  );
};

export default StockInput;
