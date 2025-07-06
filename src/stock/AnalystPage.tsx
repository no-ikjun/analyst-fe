import axios from "axios";
import { useEffect, useState } from "react";
import LoadingOverlay from "src/components/LoadingOverlay";
import StockInput from "src/components/StockInput";
import styled from "styled-components";

const AnalystPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/auth/validation`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("accessToken");
        }
      } catch (error) {
        console.error("로그인 상태 확인 실패:", error);
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  return (
    <Wrapper>
      <LoadingOverlay loading={loading} />

      <Card>
        <Title>AI Analyst</Title>

        {isLoggedIn ? (
          <>
            <PrimaryButton
              href="http://data.krx.co.kr/contents/MDC/MDI/mdiLoader/index.cmd?menuId=MDC0201020101"
              target="_blank"
              rel="noreferrer"
            >
              종목 티커 확인하기
            </PrimaryButton>

            <Divider />

            <StockInput />

            <Divider />

            <ButtonGroup>
              <SecondaryButton href="/slack">Webhook 설정</SecondaryButton>
              <SecondaryButton href="/stock">관심 종목 보기</SecondaryButton>
            </ButtonGroup>
          </>
        ) : (
          <>
            <Notice>로그인이 필요한 서비스입니다.</Notice>
            <PrimaryButton href="/login">로그인</PrimaryButton>
          </>
        )}
      </Card>
    </Wrapper>
  );
};

export default AnalystPage;

const Wrapper = styled.div`
  background: linear-gradient(135deg, #e6f0ff, #f2faff);
  min-height: calc(100vh - 172px);
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  backdrop-filter: blur(25px);
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 20px;
  padding: 32px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #222;
  margin-bottom: 8px;
`;

const Notice = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 12px;
`;

const PrimaryButton = styled.a`
  background: #3385ff;
  color: white;
  padding: 12px 0px;
  border-radius: 12px;
  text-decoration: none;
  font-size: 1rem;
  width: 100%;
  text-align: center;
  transition:
    background 0.2s,
    transform 0.2s;

  &:hover {
    background: #1c6fe6;
    color: white;
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: rgba(51, 133, 255, 0.15);
  color: #3385ff;

  &:hover {
    background: rgba(51, 133, 255, 0.25);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
`;
