import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "src/components/LoadingOverlay";
import { useAuthStore } from "src/stores/authStore";
import styled from "styled-components";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        { email, password },
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      useAuthStore.getState().setLoggedIn(true);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <LoadingOverlay loading={loading} />
      <Card>
        <Title>로그인</Title>
        <form onSubmit={handleLogin}>
          <InputGroup>
            <label>Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label>Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <LoginButton type="submit">로그인</LoginButton>
        </form>
        <SubText>
          계정이 없으신가요? <SignUpLink href="/signup">회원가입</SignUpLink>
        </SubText>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: calc(100vh - 132px);
  background: linear-gradient(135deg, #e6f0ff, #f2faff);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 32px;
  width: 360px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  color: #333;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  label {
    font-size: 0.9rem;
    margin-bottom: 4px;
    color: #555;
  }
`;

const Input = styled.input`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: rgba(255, 255, 255, 0.7);
  outline: none;
  transition: 0.3s;

  &:focus {
    border-color: #3385ff;
    box-shadow: 0 0 5px rgba(51, 133, 255, 0.4);
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #3385ff;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    background: #2277ee;
  }
`;

const SubText = styled.p`
  font-size: 0.85rem;
  color: #555;
  text-align: center;
  margin-top: 16px;
`;

const SignUpLink = styled.a`
  color: #3385ff;
  text-decoration: none;
  margin-left: 4px;

  &:hover {
    text-decoration: underline;
  }
`;
