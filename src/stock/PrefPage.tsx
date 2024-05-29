import "../styles/PrefPage.css";

import axios from "axios";
import { useEffect, useState } from "react";
import LoadingOverlay from "src/components/LoadingOverlay";

const InvestmentPreferences: React.FC = () => {
  const [selectedPreference, setSelectedPreference] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInvestmentPreference = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/pref`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.status === 200) {
          switch (response.data) {
            case 1:
              setSelectedPreference("안정형");
              break;
            case 2:
              setSelectedPreference("안정추구형");
              break;
            case 3:
              setSelectedPreference("위험중립형");
              break;
            case 4:
              setSelectedPreference("적극투자형");
              break;
            case 5:
              setSelectedPreference("공격투자형");
              break;
            default:
              setSelectedPreference("안정형");
              break;
          }
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("투자 성향 불러오기 실패:", error);
      }
    };

    fetchInvestmentPreference();
  }, []);

  const handlePreferenceChange = (preference: string) => {
    setSelectedPreference(preference);
  };

  const handleSavePreference = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    try {
      let preference = 0;
      switch (selectedPreference) {
        case "안정형":
          preference = 1;
          break;
        case "안정추구형":
          preference = 2;
          break;
        case "위험중립형":
          preference = 3;
          break;
        case "적극투자형":
          preference = 4;
          break;
        case "공격투자형":
          preference = 5;
          break;
        default:
          preference = 1;
          break;
      }
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/pref`,
        { preference },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      window.location.href = "/";
    } catch (error) {
      console.error("투자 성향 저장 실패:", error);
    }
    setLoading(false);
  };

  return (
    <div className="preferences-container">
      <LoadingOverlay loading={loading} />
      <h2>투자 성향 선택</h2>
      <ul>
        <li>
          <button
            className={selectedPreference === "안정형" ? "selected" : ""}
            onClick={() => handlePreferenceChange("안정형")}
          >
            ① 안정형
          </button>
        </li>
        <li>
          <button
            className={selectedPreference === "안정추구형" ? "selected" : ""}
            onClick={() => handlePreferenceChange("안정추구형")}
          >
            ② 안정추구형
          </button>
        </li>
        <li>
          <button
            className={selectedPreference === "위험중립형" ? "selected" : ""}
            onClick={() => handlePreferenceChange("위험중립형")}
          >
            ③ 위험중립형
          </button>
        </li>
        <li>
          <button
            className={selectedPreference === "적극투자형" ? "selected" : ""}
            onClick={() => handlePreferenceChange("적극투자형")}
          >
            ④ 적극투자형
          </button>
        </li>
        <li>
          <button
            className={selectedPreference === "공격투자형" ? "selected" : ""}
            onClick={() => handlePreferenceChange("공격투자형")}
          >
            ⑤ 공격투자형
          </button>
        </li>
      </ul>
      <button className="save-button" onClick={() => handleSavePreference()}>
        저장하기
      </button>
    </div>
  );
};

export default InvestmentPreferences;
