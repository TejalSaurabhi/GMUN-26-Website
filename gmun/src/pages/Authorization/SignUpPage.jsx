import { motion } from "framer-motion";
import Input from "../../components/Authorization/InputField/Input";
import { Flag, Landmark, Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../../components/Authorization/PasswordStrengthMeter/PasswordStrengthMeter";
import { useAuthStore } from "../../store/authStore";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [committee, setCommittee] = useState("");
  const [country, setCountry] = useState("");
  const [personnel, setPersonnel] = useState("");

  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await signup(email, password, name);
      navigate("/api/auth/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="signup-parent"
    >
      <div className="signup-box">
        <h2 className="create-account">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <Input
            icon={Landmark}
            type="text"
            placeholder="Committee"
            value={committee}
            onChange={(e) => {
              if (e.target.value === "All India Political Party") {
                setCommittee("AIPPM");
              } else setCommittee(e.target.value);
            }}
          />
          {committee === "AIPPM" || committee === "International Press" ? (
            <Input
              icon={User}
              type="text"
              placeholder="Personnel"
              value={personnel}
              onChange={(e) => setPersonnel(e.target.value)}
            />
          ) : (
            (committee === "UNSC" ||
              committee === "DISEC" ||
              committee === "UNCSW" ||
              committee === "World Bank" ||
              committee === "UNHRC") && (
              <Input
                icon={Flag}
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            )
          )}

          {error && <p className="error">{error}</p>}

          <PasswordStrengthMeter password={password} />

          <motion.button
            className="submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="loader" size={24} /> : "Sign Up"}
          </motion.button>
        </form>
      </div>

      <div className="link-to-log-in">
        <p>
          Already have an account?
          <Link to={"/api/auth/login"} className="login-page-link">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
