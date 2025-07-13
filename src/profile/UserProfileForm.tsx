import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function ProfilePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    risk_profile: "",
    interests: [] as string[],
    assetSize: "",
    knowledge_level: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/profiles?access_token=${accessToken}`,
        );
        const data = await res.json();
        setFormData({
          risk_profile: data.risk_profile || "",
          interests: data.interests?.split(",") || [],
          assetSize: data.assetSize || "",
          knowledge_level: data.knowledge_level || "",
        });
      } catch (err) {
        console.error("프로필 조회 실패", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const newInterests = checked
        ? [...prev.interests, value]
        : prev.interests.filter((item) => item !== value);
      return { ...prev, interests: newInterests };
    });
  };

  const handleNext = () => setStep((prev) => prev + 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/profiles?access_token=${localStorage.getItem("accessToken")}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            interests: formData.interests.join(","),
          }),
        },
      );
      if (res.ok) {
        navigate("/");
      } else {
        alert("저장 실패");
      }
    } catch (err) {
      console.error("저장 오류", err);
      alert("저장 중 오류 발생");
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <Card>
        <Title>
          {step === 1 && "투자 성향을 선택하세요"}
          {step === 2 && "관심 분야를 선택하세요"}
          {step === 3 && "자산 규모를 선택하세요"}
          {step === 4 && "투자 배경지식 테스트"}
        </Title>

        {step === 1 && (
          <Options>
            {["안정형", "중립형", "적극형", "공격형", "초고위험"].map(
              (type) => (
                <Label key={type}>
                  <input
                    type="radio"
                    name="risk_profile"
                    value={type}
                    checked={formData.risk_profile === type}
                    onChange={handleChange}
                  />
                  <Text>{type}</Text>
                </Label>
              ),
            )}
            <Button disabled={!formData.risk_profile} onClick={handleNext}>
              다음
            </Button>
          </Options>
        )}

        {step === 2 && (
          <Options>
            {["주식", "부동산", "암호화폐", "스타트업", "채권", "기타"].map(
              (field) => (
                <Label key={field}>
                  <input
                    type="checkbox"
                    value={field}
                    checked={formData.interests.includes(field)}
                    onChange={handleCheckboxChange}
                  />
                  {field}
                </Label>
              ),
            )}
            <Button
              disabled={formData.interests.length === 0}
              onClick={handleNext}
            >
              다음
            </Button>
          </Options>
        )}

        {step === 3 && (
          <Options>
            {[
              "5천만원 이하",
              "5천만원~1억원",
              "1억원~5억원",
              "5억원~10억원",
              "10억원 이상",
            ].map((amount) => (
              <AssetButton
                key={amount}
                selected={formData.assetSize === amount}
                onClick={() => setFormData({ ...formData, assetSize: amount })}
              >
                {amount}
              </AssetButton>
            ))}
            <Button disabled={!formData.assetSize} onClick={handleNext}>
              다음
            </Button>
          </Options>
        )}

        {step === 4 && (
          <Options>
            <p style={{ textAlign: "center" }}>
              Q. 주가수익비율(PER)이 낮은 경우가 의미하는 바를 가장 정확하게 설명한 것은?
            </p>
            {["advanced", "beginner", "intermediate"].map((level) => (
              <AssetButton
                key={level}
                selected={formData.knowledge_level === level}
                onClick={() =>
                  setFormData({ ...formData, knowledge_level: level })
                }
              >
                {level === "advanced" && "기업의 수익성에 비해 주가가 저평가되어 있을 가능성이 높다."}
                {level === "beginner" && "기업의 재무 구조가 불안정하여 투자 위험이 높다."}
                {level === "intermediate" && "기업이 높은 성장 잠재력을 보유하고 있어 미래 수익이 크게 증가할 것으로 예상된다."}
              </AssetButton>
            ))}
            <Button
              disabled={!formData.knowledge_level || loading}
              onClick={handleSubmit}
            >
              {loading ? "저장 중..." : "제출하기"}
            </Button>
          </Options>
        )}
      </Card>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  background: linear-gradient(135deg, #e6f0ff, #f2faff);
  min-height: calc(100vh - 200px);
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  backdrop-filter: blur(25px);
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 24px;
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: #222;
  text-align: center;
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 100%;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
  max-width: 300px;
  padding: 12px 18px;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 14px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  input {
    transform: scale(1.2);
  }
`;

export const Text = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
`;

export const Button = styled.button`
  padding: 14px 28px;
  border-radius: 14px;
  background: linear-gradient(135deg, #66b2ff, #3385ff);
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s;
  min-width: 160px;

  &:hover {
    background: linear-gradient(135deg, #3385ff, #0066cc);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const AssetButton = styled.button<{ selected: boolean }>`
  padding: 14px 28px;
  border-radius: 14px;
  background: ${({ selected }) =>
    selected ? "#3385ff" : "rgba(255, 255, 255, 0.4)"};
  color: ${({ selected }) => (selected ? "white" : "#333")};
  border: 1px solid ${({ selected }) => (selected ? "#3385ff" : "#ccc")};
  cursor: pointer;
  transition: 0.3s;
  min-width: 260px;
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    background: ${({ selected }) =>
      selected ? "#0066cc" : "rgba(255, 255, 255, 0.6)"};
  }
`;
