import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerifyEmail from "./pages/VerifyEmail";
import Navbar from "./components/Layout/Navbar";
import PropTypes from "prop-types";
import ProfilePage from "./pages/ProfilePage";

const App = ({ toggleTheme }) => {
  return (
    <Router>
      <Navbar toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

App.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
};

export default App;
