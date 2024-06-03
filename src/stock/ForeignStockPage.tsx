import "../styles/MyStockPage.css";

import axios from "axios";
import { useEffect, useState } from "react";
import LoadingOverlay from "src/components/LoadingOverlay";

interface ForeignStock {
  code: string;
  prdt_name: string;
  prdt_eng_name: string;
}

const ForeignStockPage = () => {
  const [watchlist, setWatchlist] = useState<ForeignStock[]>([]);
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
          `${import.meta.env.VITE_BASE_URL}/kis/foreign/interest-list`,
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

  const handleRemove = async (code: string) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/kis/foreign/delete-interest?code=${code}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      // 관심 종목에서 제거된 종목을 로컬 상태에서도 제거
      setWatchlist((prevWatchlist) =>
        prevWatchlist.filter((stock) => stock.code !== code),
      );
    } catch (err) {
      console.error("관심 종목에서 제거 실패:", err);
      setError("관심 종목에서 제거하는 데 실패했습니다.");
    }
  };

  return (
    <div className="watchlist-container">
      <LoadingOverlay loading={loading} />
      <div className="top-div">
        <a href="/stock">&larr;이전으로</a>
      </div>

      <h2>[해외주식] 관심 종목 ({watchlist.length})</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <ul>
          {watchlist.map((stock) => (
            <li key={stock.code}>
              <p>종목 티커: {stock.code}</p>
              <p>영문 이름: {stock.prdt_eng_name}</p>
              <p>한글 이름: {stock.prdt_name}</p>
              <div className="button-group">
                <button onClick={() => {}}>자세히보기</button>
                <button onClick={() => handleRemove(stock.code)}>
                  제거하기
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ForeignStockPage;
