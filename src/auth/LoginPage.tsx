import "../styles/LoginPage.css";

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "src/components/LoadingOverlay";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.BASE_URL}/auth/login`, {
        email,
        password,
      });
      console.log("로그인 성공:", response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay loading={loading} />
      <div className="login-container">
        <h2>로그인</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">로그인</button>
        </form>
        <a className="link-button" href="/signup">
          회원가입
        </a>
      </div>
    </>
  );
};

export default LoginPage;
