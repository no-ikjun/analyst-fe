import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

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
    <Wrapper>
      <LoadingOverlay loading={loading} />

      <Title>해외 주식 정보</Title>
      <InfoItem>
        {stockInfo.prdt_name} ({stockInfo.prdt_eng_name})
      </InfoItem>
      <InfoItem>
        {stockInfo.natn_name} ({stockInfo.tr_mket_name})
      </InfoItem>

      {error && <ErrorText>{error}</ErrorText>}

      <ActionButton onClick={handleAddToWatchlist}>
        관심 종목에 추가
      </ActionButton>
    </Wrapper>
  );
};

export default ForeignStockInfo;

const Wrapper = styled.div`
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 16px;
  padding: 24px;
  width: calc(100%-48px);
  max-width: calc(100%-48px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

const Title = styled.h3`
  font-size: 1.4rem;
  color: #222;
  margin-top: 0;
  margin-bottom: 12px;
  text-align: center;
`;

const InfoItem = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: #333;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  text-align: center;
`;

const ActionButton = styled.button`
  background: #3385ff;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 8px;
  transition:
    background 0.2s,
    transform 0.2s;

  &:hover {
    background: #1c6fe6;
    transform: translateY(-2px);
  }
`;
