import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import Landing from "./pages/Landing";
import HowToMun from "./pages/howToMun";
import Committee from "./components/Committee";
import Contacts from "./components/Contacts";
import Guide from "./components/Guide";
import WorldMap from "./components/WorldMap";
import Gallery2Page from "./components/Gallery2Page";
import AboutUs from "./pages/aboutUs";
import Sec from "./components/sec";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Sponsors from "./components/Sponsors.jsx";
import { Toaster } from "react-hot-toast";
import StarsBackground from "./components/Home/StarsBackground.jsx";
import FAQ from "./pages/FAQ";
import HowToMUN from "./pages/howToMun.jsx";

const router = createBrowserRouter([
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
        path: "/how-to-mun",
        element: <HowToMun />,
      },
      {
        path: "/FAQs",
        element: <FAQ />,
      },
      {
        path: "/Sponsors",
        element: <Sponsors />,
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
      {
        path: "/how-to-mun",
        element: <HowToMUN />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StarsBackground />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <Toaster />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
