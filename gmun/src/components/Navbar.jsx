import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import gmunlogo from "../images/GMUN Gold.png";
import edition from "../images/3rd.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import axios from "axios";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogout = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response);
      toast.success("Logged out successfully");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="nav">
      <input type="checkbox" id="sidebar-active" />
      <div className="nav-logo">
        <img src={gmunlogo} alt="GmunLogo" className="front-face" />
        <img src={edition} alt="3rd edition" className="back-face" />
      </div>
      <div className="sidebar-nav">
        <label htmlFor="sidebar-active" className="sidebar-open">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="#e8eaed"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </label>
      </div>
      <ul className="nav-menu">
        <li>
          <label htmlFor="sidebar-active" className="sidebar-close nav-list">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32px"
              viewBox="0 -960 960 960"
              width="32px"
              fill="#e8eaed"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </label>
        </li>
        <li className="nav-list">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-list">
          <Link to="/sec">Secretariat</Link>
        </li>
        <li className="nav-list dropdown">
          <button className="dropbtn">Committees</button>
          <ul className="dropdown-content">
            <li>
              <Link to="/committee/1">UNSC</Link>
            </li>
            <li>
              <Link to="/committee/2">UNHRC</Link>
            </li>
            <li>
              <Link to="/committee/3">AIPPM</Link>
            </li>
            <li>
              <Link to="/committee/4">UNGA-DISEC</Link>
            </li>
            <li>
              <Link to="/committee/5">International Press</Link>
            </li>
            <li>
              <Link to="/committee/6">World Bank</Link>
            </li>
            <li>
              <Link to="/committee/7">UN CSW</Link>
            </li>
          </ul>
        </li>
        <li className="nav-list">
          <Link to="/FAQs">FAQs</Link>
        </li>
        <li className="nav-list">
          <Link to="/discuss">Discuss</Link>
        </li>
        <li className="nav-list">
          <Link to="/AboutUs">About</Link>
        </li>
        <li className="nav-list">
          <Link to="/gallery">Gallery</Link>
        </li>
        <li className="nav-list">
          <Link to="/Sponsors">Sponsors</Link>
        </li>
        {authStatus ? (
          <li onClick={handlelogout} className="register">
            Logout
          </li>
        ) : (
          <li className="register">
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
