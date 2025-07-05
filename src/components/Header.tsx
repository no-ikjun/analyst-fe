import { useNavigate } from "react-router-dom";
import { useAuthStore } from "src/stores/authStore";
import styled from "styled-components";

export default function Header() {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  return (
    <Container>
      <Logo onClick={() => navigate("/")}>Wisemind</Logo>

      <SearchWrapper>
        <SearchInput placeholder="궁금한 정보를 검색하세요" />
      </SearchWrapper>

      <Menu>
        <MenuItem onClick={() => navigate("/analyst")}>Analyst</MenuItem>
        <MenuItem onClick={() => navigate("/chatting")}>Chatting</MenuItem>

        {isLoggedIn ? (
          <ProfileButton onClick={() => navigate("/profile")}>
            내 프로필
          </ProfileButton>
        ) : (
          <LoginButton onClick={() => navigate("/login")}>로그인</LoginButton>
        )}
      </Menu>
    </Container>
  );
}

const Container = styled.header`
  position: sticky;
  top: 0;
  z-index: 999;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3385ff;
  cursor: pointer;
`;

const SearchWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 24px;
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

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MenuItem = styled.div`
  font-size: 0.95rem;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #3385ff;
  }
`;

const LoginButton = styled.button`
  background: transparent;
  color: #333;
  border: 1px solid #ccc;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const ProfileButton = styled(LoginButton)`
  font-weight: bold;
  color: #3385ff;
  border-color: #3385ff;

  &:hover {
    background: rgba(51, 133, 255, 0.1);
  }
`;
