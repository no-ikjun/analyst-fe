import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

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
    <Wrapper>
      <LoadingOverlay loading={loading} />

      {/* <Link
        href="http://data.krx.co.kr/contents/MDC/MDI/mdiLoader/index.cmd?menuId=MDC0201020101"
        target="_blank"
        rel="noreferrer"
      >
        종목 티커 확인하기
      </Link> */}

      <Form onSubmit={handleSubmit}>
        <Label htmlFor="stockCode">관심 주식 종목 티커:</Label>
        <Input
          type="text"
          id="stockCode"
          value={stockCode}
          onChange={handleInputChange}
          required
        />

        <CheckboxContainer>
          <label htmlFor="international">
            해외 주식 검색 (
            <a
              href="https://kr.investing.com/stock-screener/?sp=country::5|sector::a|industry::a|equityType::a|exchange::2%3Ceq_market_cap;1"
              target="_blank"
              rel="noreferrer"
            >
              나스닥
            </a>
            )
          </label>
          <Checkbox
            type="checkbox"
            id="international"
            checked={isInternational}
            onChange={handleCheckboxChange}
          />
        </CheckboxContainer>

        <SearchButton type="submit">검색하기</SearchButton>
      </Form>

      {error && <ErrorText>{error}</ErrorText>}

      {!error &&
        stockInfo &&
        (stockInfo.admn_item_yn ? (
          <StockInfo stockInfo={stockInfo} code={stockCode} />
        ) : (
          <ForeignStockInfo stockInfo={stockInfo} code={stockCode} />
        ))}
    </Wrapper>
  );
};

export default StockInput;

const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: stretch;
`;

// const Link = styled.a`
//   color: #3385ff;
//   text-decoration: none;
//   font-size: 0.9rem;
//   text-align: center;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #222;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;

  &:focus {
    border-color: #3385ff;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #333;

  a {
    color: #3385ff;
    text-decoration: none;
    margin-left: 4px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Checkbox = styled.input`
  transform: scale(1.2);
`;

const SearchButton = styled.button`
  background: #3385ff;
  color: white;
  border: none;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;

  &:hover {
    background: #1c6fe6;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  text-align: center;
`;
