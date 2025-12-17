import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BASE_URL } from "./constants.js";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice.js";
import axios from "axios";
import { logout } from "./store/authSlice.js";
import Preloader from "./components/preloader.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch data from the API
    // Update the state
    document.title = "GMUN 2025";

    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/profile`, {
          withCredentials: true,
        });
        console.log(response);
        dispatch(login({ userData: response.data }));
      } catch (error) {
        dispatch(logout());
      }
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  // Let the preloader always play fully, independent of API latency
  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 7000); // play full animation (~4s)
    return () => clearTimeout(timer);
  }, []);

  if (showPreloader) {
    return (
      <>
        <Preloader />
      </>
    );
  } else {
    return (
      <>
        <ScrollToTop />
        <ToastContainer position="top-left" />
        <div>
          {/* Navbar will always be displayed */}
          <NavBar />

          {/* Render the child route components using Outlet */}
          <div>
            <Outlet />
          </div>

          {/* Footer will always be displayed */}
          <Footer />
        </div>
      </>
    );
  }
};

export default App;
