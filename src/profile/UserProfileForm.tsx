import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

export default function InvestmentProfileForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    riskTolerance: "",
    interests: "",
    knowledgeLevel: "",
    assetSize: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleSubmit = () => console.log(formData);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dfefff] to-[#f8fbff]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-2xl bg-white/30 border border-white/20 shadow-2xl rounded-3xl p-8 max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {step === 1 && "당신의 투자 성향을 알려주세요"}
          {step === 2 && "관심 있는 투자 분야는 무엇인가요?"}
          {step === 3 && "투자 지식 수준을 선택해주세요"}
          {step === 4 && "현재 자산 규모를 입력해주세요"}
        </h2>

        {step === 1 && (
          <div className="space-y-4">
            <Textarea
              placeholder="예: 안정형, 공격형, 중립형 등"
              name="riskTolerance"
              value={formData.riskTolerance}
              onChange={handleChange}
              className="bg-white/40 backdrop-blur rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-200"
            />
            <Button className="w-full">다음</Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Textarea
              placeholder="예: 주식, 부동산, 코인, 스타트업 투자 등"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              className="bg-white/40 backdrop-blur rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-200"
            />
            <Button className="w-full" onClick={handleNext}>
              다음
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Input
              placeholder="초급, 중급, 고급 등"
              name="knowledgeLevel"
              value={formData.knowledgeLevel}
              onChange={handleChange}
              className="bg-white/40 backdrop-blur rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-200"
            />
            <Button className="w-full" onClick={handleNext}>
              다음
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <Input
              placeholder="예: 약 5천만원, 1억원 이상 등"
              name="assetSize"
              value={formData.assetSize}
              onChange={handleChange}
              className="bg-white/40 backdrop-blur rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-200"
            />
            <Button className="w-full" onClick={handleSubmit}>
              제출하기
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
