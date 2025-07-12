import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface MessageWrapperProps {
  $isUser?: boolean;
}

export default function GlobalPersonalAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState<string[]>([]);
  const [isComposing, setIsComposing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const sessionId = useRef<string>(
    localStorage.getItem("chatSessionId") || crypto.randomUUID(),
  );

  useEffect(() => {
    localStorage.setItem("chatSessionId", sessionId.current);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
  
      const isCorrectKeyCombo =
        e.shiftKey &&
        e.code === "Space" &&
        ((isMac && e.metaKey) || (!isMac && e.ctrlKey));
  
      if (isCorrectKeyCombo) {
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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setConversation((prev) => [...prev, `🧑‍💻 ${userMessage}`]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_AI_URL}/chatbot/message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionId.current,
            message: userMessage,
          }),
        },
      );

      const data = await res.json();
      if (data.response) {
        setConversation((prev) => [...prev, `🤖 AI 답변: ${data.response}`]);
      } else {
        setConversation((prev) => [
          ...prev,
          "오류: 답변을 생성할 수 없습니다.",
        ]);
      }
    } catch (err) {
      console.error("챗봇 오류:", err);
      setConversation((prev) => [...prev, "오류: 서버와 통신에 실패했습니다."]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    setConversation([]);
    setInput("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_AI_URL}/chatbot/reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId.current }),
        },
      );

      if (!res.ok) {
        throw new Error("세션 초기화 실패");
      }

      const newSessionId = crypto.randomUUID();
      sessionId.current = newSessionId;
      localStorage.setItem("chatSessionId", newSessionId);

      console.log("새 세션 생성:", newSessionId);
    } catch (err) {
      console.error("세션 초기화 오류:", err);
      setConversation((prev) => [...prev, "오류: 세션 초기화에 실패했습니다."]);
    }
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
          <MessageWrapper key={idx} $isUser={idx % 2 === 0}>
            <Message isUser={idx % 2 === 0}>{msg}</Message>
          </MessageWrapper>
        ))}

        {isLoading && (
          <MessageWrapper $isUser={false}>
            <LoadingMessage>🤖 답변을 생성하는 중...</LoadingMessage>
          </MessageWrapper>
        )}
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
const MessageWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "$isUser",
})<MessageWrapperProps>`
  display: flex;
  justify-content: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
`;

const Message = styled.div<{ isUser?: boolean }>`
  background: ${(props) =>
    props.isUser ? "rgba(200, 230, 255, 0.3)" : "rgba(255,255,255,0.8)"};
  color: #333;
  padding: 10px 14px;
  margin-bottom: 12px;
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

const LoadingMessage = styled.div`
  background: rgba(255, 255, 255, 0.8);
  color: #555;
  padding: 10px 14px;
  border-radius: 16px;
  max-width: 70%;
  word-break: break-word;
  white-space: pre-wrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-style: italic;
  backdrop-filter: blur(10px);
`;
