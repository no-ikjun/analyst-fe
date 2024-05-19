import "./styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <h2>홈 페이지</h2>
      <p>로그인이 필요한 서비스입니다.</p>
      <a className="link-button" href="/login">
        로그인
      </a>
    </div>
  );
};

export default HomePage;
