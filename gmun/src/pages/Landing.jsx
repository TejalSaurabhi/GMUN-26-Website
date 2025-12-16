import Commendations from '../components/commendationpage';
// import { useEffect } from "react";
import Announcements from "../components/Announcements";
import Reviews from "../components/reviews/Reviews";
import Timeline from "../components/Timeline";
// import { useAuthStore } from "../store/authStore";
// import LoadingSpinner from "../components/LoadingSpinner";
import Hero from "../components/Home/Hero/Hero";
import LightRays from "../components/LightRays/LightRays";
import "./landing.css";
import Highlights from "../components/Home/Highlights/Highlights";
import CommitteeMarquee from "../components/CommitteeMarquee";

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
        <LightRays
          raysOrigin="top-center"
          raysColor="#e8d4b8"
          raysSpeed={0.8}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="hero-light-rays"
        />
        <Hero />
      </header>

      <Highlights />

      <CommitteeMarquee />

      {/* Timeline comes before letters from ambassadors */}
      <div className="timeline">
        <Timeline />
      </div>

      <div className="commendations-section">
        <Commendations />
      </div>

      <div className="announcements">
        <Announcements />
      </div>

      <div className="reviews">
        <Reviews />
      </div>
    </div>
  );
};
// };

export default Landing;