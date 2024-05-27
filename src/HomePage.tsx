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
          <p>환영합니다! 서비스를 이용하세요.</p>
          <StockInput />
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
