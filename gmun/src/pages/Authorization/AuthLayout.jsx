import FloatingShapes from "../../components/Authorization/FloatingShapes/FloatingShapes";
import "./auth.css";

const AuthLayout = ({children}) => {
  return (
    <div className="auth-parent">
      <FloatingShapes
        color="#119d9fff"
        width="16rem"
        height="16rem"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShapes
        color="#119d9fff"
        width="8rem"
        height="8rem"
        top="-5%"
        left="10%"
        delay={2}
      />

      <FloatingShapes
        color="#119d9fff"
        width="12rem"
        height="12rem"
        top="45%"
        left="70%"
        delay={5}
      />
      {children}
    </div>
  );
};

export default AuthLayout;
