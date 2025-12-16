import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import Input from "../../components/Authorization/InputField/Input";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, isLoading, error, login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (evt) => {
    evt.preventDefault();
    await login(email, password);
    navigate('/');
  };

  return (
    <motion.div
      className="login-parent"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="login-container">
        <h2 className="welcome-back">Welcome Back</h2>

        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="forgot-password-container">
            <Link to="/api/auth/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
          {error && <p className="error">{error.message}</p>}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="loader" /> : "Login"}
          </motion.button>
        </form>
      </div>

      <div className="link-to-signup">
        <p>
          Don't have an account?
          <Link to="/api/auth/signup" className="signup-page-link">
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
