import "../styles/SlackWebHookPage.css";

import axios from "axios";
import { useState } from "react";
import LoadingOverlay from "src/components/LoadingOverlay";

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
      setLoading(false);
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 실패");
      setLoading(false);
    }
  };

  return (
    <div className="webhook-container">
      <LoadingOverlay loading={loading} />
      <h2>Slack WebHook URL 입력</h2>
      <input
        type="text"
        value={webhookUrl}
        onChange={handleInputChange}
        placeholder="URL을 입력하세요"
      />
      <div className="button-div">
        <a href="/">
          <button className="invert">취소</button>
        </a>
        <button onClick={handleSave}>저장</button>
      </div>
    </div>
  );
};

export default SlackWebhookPage;
