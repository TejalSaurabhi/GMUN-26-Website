import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BASE_URL } from "./constants.js";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice.js";
import axios from "axios";
import { useState } from "react";
import { logout } from "./store/authSlice.js";
import Preloader from "./components/preloader.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return (
      <>
        <div>
          <Preloader />
        </div>
      </>
    );
  } else {
    return (
      <>
        <ToastContainer position="top-left" />
        <div>
          {/* Navbar will always be displayed */}
          <NavBar />

          {/* Render the child route components using Outlet */}
          <div>
            <Outlet />
          </div>
        </div>
      </>
    );
  }
};

export default App;
