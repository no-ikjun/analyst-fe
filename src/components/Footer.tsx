import styled from "styled-components";

export default function Footer() {
  return (
    <FooterContainer>
      <Content>
        <Brand>© 2025 Wisemind</Brand>
        <Info>
          <span>개발자: 최익준</span>
          <Separator>|</Separator>
          <span>Email: dev@ikjun.com</span>
          <Separator>|</Separator>
          <a href="https://ikjun.com" target="_blank" rel="noopener noreferrer">
            포트폴리오
          </a>
        </Info>
      </Content>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.6);
  padding: 12px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  box-sizing: border-box;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  font-size: 0.9rem;
  color: #333;
  padding: 8px 0;
`;

const Brand = styled.div`
  font-weight: bold;
  color: #3385ff;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  a {
    color: #3385ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Separator = styled.span`
  color: #ccc;
  margin: 0 4px;
`;
