import { useEffect, useState } from "react";
import styled from "styled-components";

export default function GlobalPersonalAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState<string[]>([]);
  const [isComposing, setIsComposing] = useState(false); // 한글 조합 체크

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.shiftKey && e.key.toLowerCase() === "a") {
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    setConversation((prev) => [
      ...prev,
      `🧑‍💻 ${input}`,
      `🤖 AI 답변: ${input}에 대한 분석입니다.`,
    ]);
    setInput("");
  };

  const handleReset = () => {
    setConversation([]);
  };

  if (!isOpen) return null;

  return (
    <Container>
      <PromptArea>
        <Input
          placeholder="궁금한 내용을 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isComposing) handleSend();
          }}
        />
        <SendButton onClick={handleSend}>전송</SendButton>
        <ResetButton onClick={handleReset}>초기화</ResetButton>
      </PromptArea>

      <ChatPanel>
        {conversation.length === 0 && (
          <Notice>
            Mindwise AI가 제공하는 데이터 중 오류가 있을 수 있습니다.
            <br />
            중요한 정보는 다시 한 번 확인하세요.
          </Notice>
        )}
        {conversation.map((msg, idx) => (
          <Message key={idx}>{msg}</Message>
        ))}
      </ChatPanel>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const PromptArea = styled.div`
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.7);
  padding: 12px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #ccc;
  background: rgba(255, 255, 255, 0.6);
  outline: none;
  transition: 0.3s;
  width: 240px;

  &:focus {
    border-color: #3385ff;
    box-shadow: 0 0 5px rgba(51, 133, 255, 0.5);
  }
`;

const SendButton = styled.button`
  background: #3385ff;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #2277ee;
  }
`;

const ResetButton = styled.button`
  background: transparent;
  border: 1px solid #ccc;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  color: #333;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const ChatPanel = styled.div`
  width: 360px;
  max-height: 500px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const Notice = styled.div`
  font-size: 0.85rem;
  color: #777;
  margin-bottom: 12px;
  background: rgba(255, 255, 255, 0.5);
  padding: 8px;
  border-radius: 8px;
  text-align: center;
`;

const Message = styled.div`
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 8px;
`;
