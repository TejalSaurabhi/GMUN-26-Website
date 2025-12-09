import Countdown from '../components/Countdown';
// import Commendations from '../components/commendationpage';
// import { useEffect } from "react";
import Announcements from "../components/Announcements";
import Footer from "../components/Footer";
 
import Reviews from "../components/reviews/Reviews";
import Timeline from "../components/Timeline";
// import { useAuthStore } from "../store/authStore";
// import LoadingSpinner from "../components/LoadingSpinner";
import Hero from "../components/Home/Hero/Hero";
import "./landing.css";
import Commendations from "../components/Home/Commendations/Commendations";
import Benefits from "../components/Home/Benefits/Benefits";

// Redireceting already authenticated users to home page if they try to go to signup page
// The verified property is causing trouble
// export const RedirectAuthenticatedUsers = ({ children }) => {
//   const { user, isAuthenticated, checkAuth } = useAuthStore();

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   console.log("user from check auth", user);
//   if(user.verified && isAuthenticated) {
//     return <Navigate to="/" replace />
//   }

//   return children;
// };

const Landing = () => {
  // const { isCheckingAuth, checkAuth } = useAuthStore();

  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);

  // if (isCheckingAuth) {
  //   return <LoadingSpinner />;
  // } else {
  return (
    <div>
      <header className="header-wrapper">
        <Hero />
        <Countdown />
      </header>

      <Benefits />

      <div className="countdown-section">
        <Commendations />
      </div>

      {/* <div className="committees-section">
        <Committees />
      </div> */}

      <div className="announcements" style={{ marginTop: "120px" }}>
        <Announcements />
      </div>

      <div className="timeline">
        <Timeline />
      </div>

      <div className="reviews">
        <Reviews />
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};
// };

export default Landing;
