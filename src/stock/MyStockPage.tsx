import axios from "axios";
import { useEffect, useState } from "react";
import LoadingOverlay from "src/components/LoadingOverlay";
import styled from "styled-components";

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

  const handleRemove = async (code: string) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/kis/delete-interest?code=${code}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setWatchlist((prev) => prev.filter((stock) => stock.code !== code));
    } catch (err) {
      console.error("관심 종목에서 제거 실패:", err);
      setError("관심 종목에서 제거하는 데 실패했습니다.");
    }
  };

  return (
    <Wrapper>
      <LoadingOverlay loading={loading} />

      <TopBar>
        <NavLink href="/analyst">&larr; 이전으로</NavLink>
        <NavLink href="/stock/foreign">해외주식</NavLink>
      </TopBar>

      <Title>
        [국내주식] 관심 종목 <Count>({watchlist.length})</Count>
      </Title>

      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <CardList>
          {watchlist.map((stock) => (
            <StockCard key={stock.code}>
              <CardContent>
                <StockInfo>
                  <strong>종목 티커:</strong> {stock.code}
                </StockInfo>
                <StockInfo>
                  <strong>정식 티커:</strong> {stock.std_pdno}
                </StockInfo>
                <StockInfo>
                  <strong>종목 이름:</strong> {stock.prdt_abrv_name}
                </StockInfo>
              </CardContent>

              <ButtonGroup>
                <ActionButton onClick={() => {}}>자세히 보기</ActionButton>
                <RemoveButton onClick={() => handleRemove(stock.code)}>
                  제거하기
                </RemoveButton>
              </ButtonGroup>
            </StockCard>
          ))}
        </CardList>
      )}
    </Wrapper>
  );
};

export default MyStockPage;

const Wrapper = styled.div`
  background: linear-gradient(135deg, #e6f0ff, #f2faff);
  min-height: calc(100vh - 172px);
  padding: 20px 40px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const NavLink = styled.a`
  color: #3385ff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #222;
`;

const Count = styled.span`
  color: #3385ff;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 16px;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StockCard = styled.div`
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StockInfo = styled.p`
  margin: 0;
  color: #333;
  font-size: 0.95rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: #3385ff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;

  &:hover {
    background: #1c6fe6;
  }
`;

const RemoveButton = styled(ActionButton)`
  background: #ff4d4f;

  &:hover {
    background: #d9363e;
  }
`;
