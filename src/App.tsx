import "./styles/App.css";

import { Route, Routes } from "react-router-dom";

import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import HomePage from "./HomePage";
import ForeignStockPage from "./stock/ForeignStockPage";
import MyStockPage from "./stock/MyStockPage";
import InvestmentPreferences from "./stock/PrefPage";
import SlackWebhookPage from "./stock/SlackWebHookPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/stock" element={<MyStockPage />} />
        <Route path="/stock/foreign" element={<ForeignStockPage />} />
        <Route path="/pref" element={<InvestmentPreferences />} />
        <Route path="/slack" element={<SlackWebhookPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
