import Masonry from "react-masonry-css";
import styled from "styled-components";

const contentList = [
  {
    type: "뉴스",
    title: "윤석열, 오늘 특검 2차 출석",
    summary:
      "윤석열 전 대통령이 오늘 2차 특검에 출석해 주요 혐의에 대해 조사를 받았다.",
    image:
      "https://img.khan.co.kr/news/r/700xX/2025/07/05/news-p.v1.20250705.b3dcef377e784132b3c541b6f00ec96b_P1.webp",
    relevance: 85,
  },
  {
    type: "뉴스",
    title: "SK 해킹 피해 전액 환급",
    summary: "SK텔레콤 해킹 피해로 인한 고객 위약금 전액 환급 조치가 발표됐다.",
    relevance: 72,
  },
  {
    type: "지식",
    title: "ETF",
    description: "여러 종목을 묶어 거래하는 상장지수펀드",
    relevance: 95,
  },
  {
    type: "지식",
    title: "PER",
    description: "주가수익비율, 기업 가치 평가 지표",
    relevance: 88,
  },
  {
    type: "상품",
    title: "미래에셋 미국 배당주 펀드",
    description: "안정적 배당 수익을 추구하는 글로벌 펀드",
    relevance: 90,
  },
  {
    type: "상품",
    title: "미래에셋 AI 로보어드바이저",
    description: "AI가 관리하는 초개인화 투자 포트폴리오",
    relevance: 93,
  },
  {
    type: "상품",
    title: "미래에셋 미국 배당주 펀드",
    description: "안정적 배당 수익을 추구하는 글로벌 펀드",
    relevance: 90,
  },
  {
    type: "상품",
    title: "미래에셋 AI 로보어드바이저",
    description: "AI가 관리하는 초개인화 투자 포트폴리오",
    relevance: 93,
  },
  {
    type: "뉴스",
    title: "윤석열, 오늘 특검 2차 출석",
    summary:
      "윤석열 전 대통령이 오늘 2차 특검에 출석해 주요 혐의에 대해 조사를 받았다.",
    image:
      "https://img.khan.co.kr/news/r/700xX/2025/07/05/news-p.v1.20250705.b3dcef377e784132b3c541b6f00ec96b_P1.webp",
    relevance: 85,
  },
  {
    type: "뉴스",
    title: "SK 해킹 피해 전액 환급",
    summary: "SK텔레콤 해킹 피해로 인한 고객 위약금 전액 환급 조치가 발표됐다.",
    relevance: 72,
  },
  {
    type: "지식",
    title: "ETF",
    description: "여러 종목을 묶어 거래하는 상장지수펀드",
    relevance: 95,
  },
  {
    type: "지식",
    title: "ETF",
    description: "여러 종목을 묶어 거래하는 상장지수펀드",
    relevance: 95,
  },
  {
    type: "지식",
    title: "ETF",
    description: "여러 종목을 묶어 거래하는 상장지수펀드",
    relevance: 95,
  },
  {
    type: "지식",
    title: "ETF",
    description: "여러 종목을 묶어 거래하는 상장지수펀드",
    relevance: 95,
  },
  {
    type: "상품",
    title: "미래에셋 AI 로보어드바이저",
    description: "AI가 관리하는 초개인화 투자 포트폴리오",
    relevance: 93,
  },
  {
    type: "상품",
    title: "미래에셋 AI 로보어드바이저",
    description: "AI가 관리하는 초개인화 투자 포트폴리오",
    relevance: 93,
  },
];

const breakpointColumnsObj = {
  default: 3,
  900: 2,
  600: 1,
};

export default function MainPage() {
  return (
    <Wrapper>
      <StyledMasonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {contentList.map((item, idx) => (
          <Card key={idx}>
            <CardTop>
              <TypeIcon>{item.type}</TypeIcon>
              <Relevance>{item.relevance}% 일치</Relevance>
            </CardTop>

            {item.image && <CardImage src={item.image} alt={item.title} />}

            <CardTitle>{item.title}</CardTitle>

            {item.summary && <Summary>{item.summary}</Summary>}
            {item.description && <Description>{item.description}</Description>}
          </Card>
        ))}
      </StyledMasonry>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: linear-gradient(135deg, #e6f0ff, #f2faff);
  min-height: 100vh;
  padding: 20px 40px;
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
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TypeIcon = styled.div`
  background: #3385ff;
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.8rem;
`;

const Relevance = styled.div`
  font-size: 0.8rem;
  color: #555;
`;

const CardImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 10px;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
  color: #222;
`;

const Summary = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #444;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #444;
  margin: 0;
`;
