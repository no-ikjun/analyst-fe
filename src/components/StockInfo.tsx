import "../styles/StockInfo.css";

import axios from "axios";

const StockInfo = ({ stockInfo }: any) => {
  const handleAddToWatchlist = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/watchlist`,
        {
          stockCode: stockInfo.code,
          stockName: stockInfo.name,
        },
      );
      console.log("관심 종목에 추가 성공:", response.data);
    } catch (error) {
      console.error("관심 종목에 추가 실패:", error);
    }
  };

  return (
    <div className="stock-info-container">
      <h3>주식 정보</h3>
      <p>{stockInfo.std_pdno}</p>
      <p>{stockInfo.prdt_abrv_name}</p>
      <button onClick={handleAddToWatchlist}>관심 종목에 추가</button>
    </div>
  );
};

export default StockInfo;
