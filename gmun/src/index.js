import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import Landing from "./pages/Landing";
import Committee from "./components/Committee";
import Contacts from "./components/Contacts";
import Guide from "./components/Guide";
import WorldMap from "./components/WorldMap";
import Gallery from "./components/Gallery";
import FAQs from "./components/FAQs";
import AboutUs from "./pages/aboutUs";
import Sec from "./components/sec";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Sponsors from "./components/Sponsors.jsx";
import AuthLayout from "./pages/Authorization/AuthLayout.jsx";
import SignUpPage from "./pages/Authorization/SignUpPage.jsx";
import LoginPage from "./pages/Authorization/LoginPage.jsx";
import ForgotPassword from "./pages/Authorization/ForgotPassword.jsx";
import VerifyEmail from "./pages/Authorization/VerifyEmail.jsx";

const router = createBrowserRouter([
  {
    path: "/api/auth",
    element: (
      <AuthLayout />
    ),
  },
  {
    path: "/api/auth/signup",
    element: (
      <AuthLayout>
        <SignUpPage />
      </AuthLayout>
    )
  },
  {
    path: "/api/auth/login",
    element: (
      <AuthLayout>
        <LoginPage />
      </AuthLayout>
    )
  },
  {
    path: "/api/auth/forgot-password",
    element: (
      <AuthLayout>
        <ForgotPassword />
      </AuthLayout>
    )
  },
  {
    path: "/api/auth/verify-email",
    element: (
      <AuthLayout>
        <VerifyEmail />
      </AuthLayout>
    )
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/AboutUs",
        element: <AboutUs />,
      },
      {
        path: "/committee/:id",
        element: <Committee />,
      },
      {
        path: "/contact",
        element: <Contacts />,
      },
      {
        path: "/guide",
        element: <Guide />,
      },
      {
        path: "/worldmap",
        element: <WorldMap />,
      },
      {
        path: "/FAQs",
        element: <FAQs />,
      },
      {
        path: "/Sponsors",
        element: <Sponsors/>,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/sec",
        element: <Sec />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
