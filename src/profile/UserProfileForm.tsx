import { useState } from "react";
import styled from "styled-components";

export default function InvestmentProfileForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    riskTolerance: "",
    interests: [] as string[],
    assetSize: "",
  });

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
  const handleSubmit = () => console.log(formData);

  return (
    <>
      <Card>
        <Title>
          {step === 1 && "당신의 투자 성향을 선택해주세요"}
          {step === 2 && "관심 있는 투자 분야를 선택해주세요"}
          {step === 3 && "현재 자산 규모를 선택해주세요"}
        </Title>

        {step === 1 && (
          <Options>
            {["안정형", "중립형", "적극형", "공격형", "초고위험"].map(
              (type) => (
                <Label key={type}>
                  <input
                    type="radio"
                    name="riskTolerance"
                    value={type}
                    checked={formData.riskTolerance === type}
                    onChange={handleChange}
                  />
                  <Text>{type}</Text>
                </Label>
              ),
            )}
            <Button disabled={!formData.riskTolerance} onClick={handleNext}>
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
            <Button disabled={!formData.assetSize} onClick={handleSubmit}>
              제출하기
            </Button>
          </Options>
        )}
      </Card>
    </>
  );
}

const Card = styled.div`
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 350px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
  max-width: 220px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  input {
    transform: scale(1.2);
  }
`;

const Text = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
`;

const Button = styled.button`
  padding: 12px;
  border-radius: 10px;
  background: linear-gradient(135deg, #66b2ff, #3385ff);
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: linear-gradient(135deg, #3385ff, #0066cc);
  }
`;

const AssetButton = styled.button<{ selected: boolean }>`
  padding: 12px;
  border-radius: 10px;
  background: ${({ selected }) =>
    selected ? "#3385ff" : "rgba(255, 255, 255, 0.4)"};
  color: ${({ selected }) => (selected ? "white" : "#333")};
  border: 1px solid #ccc;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${({ selected }) =>
      selected ? "#0066cc" : "rgba(255, 255, 255, 0.6)"};
  }
`;
