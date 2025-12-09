import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { BookOpen, FileText, HelpCircle, Globe2, Users } from "lucide-react";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthLayout from "./components/AuthLayout";
import Profile from "./components/Profile";
import EditDetails from "./components/EditDetails";
import Landing from "./pages/Landing";
import HowToMun from "./pages/howToMun";
import Committee from "./components/Committee";
import Contacts from "./components/Contacts";
import Guide from "./components/Guide";
import WorldMap from "./components/WorldMap";
import Gallery2Page from "./components/Gallery2Page";
import LogoutBtn from "./components/LogoutBtn";
import FAQs from "./components/FAQs";
import Discuss from "./components/Discuss";
import AboutUs from "./pages/aboutUs";
import Sec from "./components/sec";
import { Provider } from "react-redux";
import store from "./store/store.js";
import PostPage from "./components/PostPage.jsx";
import Sponsors from "./components/Sponsors.jsx";
import FAQ from "./pages/FAQ";


const router = createBrowserRouter([
  {
    path: "/logout",
    element: (
      <AuthLayout>
        <LogoutBtn />
      </AuthLayout>
    ),
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
        path: "/login",
        element: <Login />,
      },
      {
           path: "/faq",
          element: <FAQ />,
       },

      {
        path: "/edit",
        element: (
          <AuthLayout>
            <EditDetails />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/posts/:postId",
        element: (
          <AuthLayout>
            <PostPage />
          </AuthLayout>
        ),
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
        path: "/how-to-mun",
        element: <HowToMun />,
      },
      {
        path: "/FAQs",
        element: <FAQ />,
      },
      {
        path: "/Sponsors",
        element: <Sponsors/>,
      },
      {
        path: "/Discuss",
        element: (
          <AuthLayout>
            <Discuss />
          </AuthLayout>
        ),
      },
      
      {
        path: "/gallery",
        element: <Gallery2Page />,
      },
      {
        path: "/gallery2",
        element: <Gallery2Page />,
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