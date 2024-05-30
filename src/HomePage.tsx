import "./styles/HomePage.css";

import axios from "axios";
import { useEffect, useState } from "react";

import LoadingOverlay from "./components/LoadingOverlay";
import StockInput from "./components/StockInput";

const HomePage = () => {
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
    <div className="home-container">
      <LoadingOverlay loading={loading} />
      <h2>AI Analyst</h2>
      {isLoggedIn ? (
        <>
          <p>
            <a className="link-button" href="/pref">
              투자 성향 등록하기 &rarr;
            </a>
          </p>
          <StockInput />
          <div className="link-button-p">
            <a className="link-button" href="/slack">
              Webhook 설정
            </a>
            <a className="link-button" href="/stock">
              관심 종목 보기
            </a>
          </div>
        </>
      ) : (
        <>
          <p>로그인이 필요한 서비스입니다.</p>
          <a className="link-button" href="/login">
            로그인
          </a>
        </>
      )}
    </div>
  );
};

export default HomePage;
