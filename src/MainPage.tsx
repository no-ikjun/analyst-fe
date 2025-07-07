import axios from "axios";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import LoadingOverlay from "./components/LoadingOverlay";

interface ArticleCard {
  type: string;
  title: string;
  description?: string;
  relevance: number;
  article: string;
  difficulty: string;
  source_url: string[];
}

const breakpointColumnsObj = {
  default: 3,
  900: 2,
  600: 1,
};

export default function MainPage() {
  const [contentList, setContentList] = useState<ArticleCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleCard | null>(
    null,
  );

  const navigate = useNavigate();

  const fetchRecommendedArticles = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/articles/recommend`,
        { params: { access_token: accessToken } },
      );

      const results = res.data.results || res.data;

      if (!Array.isArray(results)) {
        console.error("API 응답이 배열 형태가 아님:", results);
        setLoading(false);
        return;
      }

      const transformed: ArticleCard[] = results.map((item: any) => ({
        type: "뉴스",
        title: item.topic,
        description: item.article.slice(0, 150) + "...",
        relevance: item.relevance || 0,
        article: item.article,
        difficulty: item.difficulty || "intermediate",
        source_url: Array.isArray(item.sources) ? item.sources : [],
      }));

      setContentList(transformed);
    } catch (err) {
      console.error("추천 아티클 로딩 실패", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    // 로그인 상태 확인
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
      return;
    }
    fetchRecommendedArticles();
  }, [navigate]);

  return (
    <Wrapper>
      <TopBar>
        <TopText>더 정확한 추천을 위해 나의 투자 현황을 검사해보세요!</TopText>
        <ProfileButton onClick={() => navigate("/profile")}>
          투자 성향 분석하기 →
        </ProfileButton>
      </TopBar>
      <LoadingOverlay loading={loading} />

      <StyledMasonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {contentList.map((item, idx) => (
          <Card key={idx} onClick={() => setSelectedArticle(item)}>
            <CardTop>
              <TypeIcon>{item.type}</TypeIcon>
              <Relevance>{item.relevance}% 일치</Relevance>
            </CardTop>
            <CardTitle>{item.title}</CardTitle>
            {item.description && <Description>{item.description}</Description>}
          </Card>
        ))}
      </StyledMasonry>

      {selectedArticle && (
        <ModalOverlay onClick={() => setSelectedArticle(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{selectedArticle.title}</ModalTitle>
              <CloseButton onClick={() => setSelectedArticle(null)}>
                ×
              </CloseButton>
            </ModalHeader>

            <Difficulty>난이도: {selectedArticle.difficulty}</Difficulty>

            <ModalBody>{selectedArticle.article}</ModalBody>

            <SourceSection>
              <SourceLabel>출처:</SourceLabel>
              {selectedArticle.source_url.map((url, idx) => (
                <SourceIcon
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`출처 ${idx + 1}`}
                >
                  🔗
                </SourceIcon>
              ))}
            </SourceSection>
          </ModalContent>
        </ModalOverlay>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: linear-gradient(135deg, #e6f0ff, #f2faff);
  min-height: 100vh;
  padding: 20px 40px;
`;

const TopBar = styled.div`
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 16px 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const TopText = styled.div`
  font-size: 1rem;
  color: #333;
  font-weight: 500;
`;

const ProfileButton = styled.button`
  background: linear-gradient(135deg, #66b2ff, #3385ff);
  color: white;
  padding: 8px 16px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.3s;

  &:hover {
    background: linear-gradient(135deg, #3385ff, #0066cc);
  }
`;

const StyledMasonry = styled(Masonry)`
  display: flex;
  margin-left: -24px;

  .masonry-grid_column {
    padding-left: 24px;
    background-clip: padding-box;
  }

  .masonry-grid_column > div {
    margin-bottom: 24px;
  }
`;

const Card = styled.div`
  backdrop-filter: blur(25px);
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition:
    transform 0.2s,
    background 0.2s;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.3);
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TypeIcon = styled.div`
  background: #3586ff7d;
  color: white;
  padding: 2px 10px;
  border-radius: 8px;
  font-size: 0.8rem;
`;

const Relevance = styled.div`
  font-size: 0.8rem;
  color: #555;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
  color: #222;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #444;
  margin: 0;
`;

/** 모달 스타일 */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  padding: 24px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.4rem;
  color: #222;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.6rem;
  cursor: pointer;
  color: #555;
`;

const Difficulty = styled.div`
  font-size: 0.9rem;
  color: #3385ff;
  margin-bottom: 12px;
`;

const ModalBody = styled.div`
  font-size: 1rem;
  color: #333;
  white-space: pre-wrap;
  line-height: 1.5;
`;

const SourceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

const SourceLabel = styled.div`
  font-size: 0.9rem;
  color: #222;
  font-weight: bold;
`;

const SourceIcon = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(51, 133, 255, 0.15);
  color: #3385ff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  text-decoration: none;
  font-size: 1.2rem;
  transition:
    background 0.2s,
    transform 0.2s;

  &:hover {
    background: rgba(51, 133, 255, 0.25);
    transform: scale(1.1);
  }
`;
