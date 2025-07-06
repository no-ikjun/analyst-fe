import "./styles/App.css";

import { Route, Routes } from "react-router-dom";

import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import ChatbotPage from "./chat/ChatbotPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import GlobalPersonalAssistant from "./components/PersonalAssistance";
import Home from "./MainPage";
import UserProfileForm from "./profile/UserProfileForm";
import AnalystPage from "./stock/AnalystPage";
import ForeignStockPage from "./stock/ForeignStockPage";
import MyStockPage from "./stock/MyStockPage";
import InvestmentPreferences from "./stock/PrefPage";
import SlackWebhookPage from "./stock/SlackWebHookPage";

function App() {
  return (
    <div className="app">
      <Header />
      <GlobalPersonalAssistant />
      <Routes>
        <Route path="/analyst" element={<AnalystPage />} />
        <Route path="/profile" element={<UserProfileForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/stock" element={<MyStockPage />} />
        <Route path="/stock/foreign" element={<ForeignStockPage />} />
        <Route path="/pref" element={<InvestmentPreferences />} />
        <Route path="/slack" element={<SlackWebhookPage />} />
        <Route path="/chatting" element={<ChatbotPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
