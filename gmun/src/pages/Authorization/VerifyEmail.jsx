import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputeRefs = useRef([]);
  const navigate = useNavigate();

  const { verifyEmail, isLoading, error } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");

    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (index, value) => {
    const newCode = [...code];

    //Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputeRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) inputeRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputeRefs.current[index - 1].focus();
      let newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
    }
  };

  //auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="verify-email-parent">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="verify-email-container"
      >
        <h2 className="verify-your-email">Verify Your Email</h2>
        <p>Enter the 6-digit code sent to your email address.</p>

        <form onSubmit={handleSubmit} className="verify-form">
          <div className="verify-form-container">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputeRefs.current[index] = el)}
                type="text"
                maxLength="6"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="verify-form-input"
              />
            ))}
          </div>

          {error && <p className="error">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="submit-btn"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
