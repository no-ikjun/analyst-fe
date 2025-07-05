import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function GlobalPersonalAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState<string[]>([]);
  const [isComposing, setIsComposing] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.shiftKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversation]);

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
        <Textarea
          placeholder="궁금한 내용을 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isComposing && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <SendButton onClick={handleSend}>전송</SendButton>
          <ResetButton onClick={handleReset}>초기화</ResetButton>
        </div>
      </PromptArea>

      <ChatPanel ref={chatRef}>
        {conversation.length === 0 && (
          <Notice>
            Mindwise AI가 제공하는 데이터 중 오류가 있을 수 있습니다. 중요한
            정보는 재차 확인하세요.
          </Notice>
        )}
        {conversation.map((msg, idx) => (
          <MessageWrapper key={idx} isUser={idx % 2 === 0}>
            <Message isUser={idx % 2 === 0}>{msg}</Message>
          </MessageWrapper>
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
  align-items: flex-end;
  gap: 8px;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 360px;
`;

const Textarea = styled.textarea`
  flex: 1;
  min-height: 60px;
  max-height: 120px;
  resize: vertical;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: rgba(255, 255, 255, 0.6);
  outline: none;
  padding: 8px 12px;
  font-size: 1rem;
  overflow-y: auto;

  &::placeholder {
    color: #aaa;
  }
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
const MessageWrapper = styled.div<{ isUser?: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  margin: 4px 0;
`;

const Message = styled.div<{ isUser?: boolean }>`
  background: ${(props) =>
    props.isUser ? "rgba(200, 230, 255, 0.3)" : "rgba(255,255,255,0.8)"};
  color: #333;
  padding: 10px 14px;
  border-radius: 16px;
  max-width: 70%;
  word-break: break-word;
  white-space: pre-wrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
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
