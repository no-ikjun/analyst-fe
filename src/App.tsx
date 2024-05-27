import "./styles/App.css";

import { Route, Routes } from "react-router-dom";

import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import HomePage from "./HomePage";
import MyStockPage from "./stock/MyStockPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/stock" element={<MyStockPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
