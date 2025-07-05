import "../styles/SignupPage.css";

import axios from "axios";
import React, { useState } from "react";

const SignupPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      console.log("회원가입 요청:", {
        email,
        password,
      });
      console.log("API URL:", `${import.meta.env.VITE_BASE_URL}/user/signup`);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/signup`,
        {
          email,
          password,
        },
      );
      if (response.status === 201) {
        alert("회원가입이 완료되었습니다.");
        // Redirect to login page or home page
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
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
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
      <a className="link-button" href="login">
        로그인
      </a>
    </div>
  );
};

export default SignupPage;
