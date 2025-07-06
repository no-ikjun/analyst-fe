import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function ChatbotPage() {
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
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversation, isLoading]);

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
        setConversation((prev) => [...prev, `🤖 ${data.response}`]);
      } else {
        setConversation((prev) => [
          ...prev,
          "🤖 오류: 답변을 생성할 수 없습니다.",
        ]);
      }
    } catch (err) {
      console.error("챗봇 오류:", err);
      setConversation((prev) => [
        ...prev,
        "🤖 오류: 서버와 통신에 실패했습니다.",
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setConversation([]);
    setInput("");
    const newSessionId = crypto.randomUUID();
    sessionId.current = newSessionId;
    localStorage.setItem("chatSessionId", newSessionId);
  };

  return (
    <Wrapper>
      <Header>
        <Title>Wisemind AI Assistant</Title>
        <SubText>투자 관련 궁금한 내용을 질문하세요</SubText>
      </Header>

      <ChatArea ref={chatRef}>
        {conversation.length === 0 && (
          <Notice>
            Mindwise AI가 제공하는 답변은 참고용이며, 정확성을 별도로
            확인하세요.
          </Notice>
        )}
        {conversation.map((msg, idx) => (
          <MessageWrapper key={idx} isUser={idx % 2 === 0}>
            <MessageBubble isUser={idx % 2 === 0}>{msg}</MessageBubble>
          </MessageWrapper>
        ))}
        {isLoading && (
          <MessageWrapper isUser={false}>
            <LoadingBubble>🤖 답변을 생성하는 중...</LoadingBubble>
          </MessageWrapper>
        )}
      </ChatArea>

      <InputArea>
        <TextInput
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
        <ButtonGroup>
          <SendButton onClick={handleSend}>전송</SendButton>
          <ResetButton onClick={handleReset}>초기화</ResetButton>
        </ButtonGroup>
      </InputArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: linear-gradient(135deg, #e6f0ff, #f2faff);
  height: calc(100vh - 132px);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 20px;
  text-align: center;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.8rem;
  color: #222;
`;

const SubText = styled.p`
  margin: 8px 0 0;
  font-size: 0.95rem;
  color: #555;
`;

const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MessageWrapper = styled.div<{ isUser?: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

const MessageBubble = styled.div<{ isUser?: boolean }>`
  background: ${(props) =>
    props.isUser ? "rgba(200, 230, 255, 0.3)" : "rgba(255, 255, 255, 0.8)"};
  color: #333;
  padding: 10px 14px;
  border-radius: 16px;
  max-width: 70%;
  word-break: break-word;
  white-space: pre-wrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
`;

const LoadingBubble = styled(MessageBubble)`
  font-style: italic;
  color: #555;
`;

const Notice = styled.div`
  text-align: center;
  color: #777;
  font-size: 0.85rem;
  padding: 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
`;

const InputArea = styled.div`
  display: flex;
  padding: 16px;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  gap: 8px;
`;

const TextInput = styled.textarea`
  flex: 1;
  min-height: 50px;
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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
