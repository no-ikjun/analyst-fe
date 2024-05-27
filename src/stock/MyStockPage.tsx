import "../styles/MyStockPage.css";

import axios from "axios";
import { useEffect, useState } from "react";
import LoadingOverlay from "src/components/LoadingOverlay";

interface Stock {
  code: string;
  std_pdno: string;
  prdt_abrv_name: string;
}

const MyStockPage = () => {
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/kis/interest-list`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setWatchlist(response.data);
      } catch (err) {
        setError("관심 종목을 불러오는 데 실패했습니다.");
        console.error("관심 종목 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <div className="watchlist-container">
      <LoadingOverlay loading={loading} />
      <a href="/">&larr;이전으로</a>
      <h2>관심 종목</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <ul>
          {watchlist.map((stock) => (
            <li key={stock.code}>
              <p>종목 코드: {stock.code}</p>
              <p>정식 코드: {stock.std_pdno}</p>
              <p>종목 이름: {stock.prdt_abrv_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyStockPage;
