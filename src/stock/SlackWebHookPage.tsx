import axios from "axios";
import { useState } from "react";
import LoadingOverlay from "src/components/LoadingOverlay";
import styled from "styled-components";

const SlackWebhookPage = () => {
  const [webhookUrl, setWebhookUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebhookUrl(e.target.value);
  };

  const handleSave = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      window.location.href = "/login";
      return;
    }
    if (!webhookUrl) {
      alert("URL을 입력하세요");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/message?url=${webhookUrl}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      console.log("저장 성공:", response.data);
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 실패");
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <LoadingOverlay loading={loading} />

      <Card>
        <Title>Slack WebHook 설정</Title>

        <Input
          type="text"
          value={webhookUrl}
          onChange={handleInputChange}
          placeholder="URL을 입력하세요"
        />

        <ButtonGroup>
          <SecondaryButton href="/analyst">취소</SecondaryButton>
          <PrimaryButton onClick={handleSave}>저장</PrimaryButton>
        </ButtonGroup>
      </Card>
    </Wrapper>
  );
};

export default SlackWebhookPage;

const Wrapper = styled.div`
  background: linear-gradient(135deg, #e6f0ff, #f2faff);
  min-height: calc(100vh - 172px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Card = styled.div`
  backdrop-filter: blur(25px);
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: stretch;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  color: #222;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  width: calc(100%-24px);

  &:focus {
    border-color: #3385ff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const PrimaryButton = styled.button`
  background: #3385ff;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  flex: 1;
  font-size: 1rem;
  transition:
    background 0.2s,
    transform 0.2s;

  &:hover {
    background: #1c6fe6;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.a`
  background: rgba(51, 133, 255, 0.15);
  color: #3385ff;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  text-align: center;
  flex: 1;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.2s;

  &:hover {
    background: rgba(51, 133, 255, 0.25);
    transform: translateY(-2px);
  }
`;
