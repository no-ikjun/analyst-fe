import { useState } from "react";
import styled from "styled-components";

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <Container>
      <Logo>Wisemind</Logo>

      <SearchWrapper>
        <SearchInput
          placeholder="주제, 장소, 매체 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchWrapper>

      <Menu>
        <MenuItem>홈</MenuItem>
        <MenuItem>추천</MenuItem>
        <MenuItem>팔로우 중</MenuItem>
        <Divider />
        <MenuItem>대한민국</MenuItem>
        <MenuItem>세계</MenuItem>
        <MenuItem>지역</MenuItem>
        <MenuItem>비즈니스</MenuItem>
        <MenuItem>과학/기술</MenuItem>
        <MenuItem>엔터테인먼트</MenuItem>
        <MenuItem>스포츠</MenuItem>
        <MenuItem>건강</MenuItem>
      </Menu>
    </Container>
  );
}

const Container = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  padding: 12px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3385ff;
  margin-right: 40px;
`;

const SearchWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  width: 400px;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #ccc;
  background: rgba(255, 255, 255, 0.6);
  outline: none;
  transition: 0.3s;

  &:focus {
    border-color: #3385ff;
    box-shadow: 0 0 5px rgba(51, 133, 255, 0.5);
  }
`;

const Menu = styled.nav`
  display: flex;
  align-items: center;
  margin-left: 40px;
`;

const MenuItem = styled.div`
  margin: 0 10px;
  font-size: 0.95rem;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #3385ff;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 20px;
  background: #ccc;
  margin: 0 12px;
`;
