import React from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "./home-page/HomePage";
import DemoPage from "./demo-page/DemoPage";
import DemoHeader from "./demo-page/DemoHeader";
import { Blog } from "../context/context";
import { ToastContainer } from "react-toastify";
import HomeHeader from "./home-page/header/HomeHeader";
import Profile from "./home-page/profile/Profile";
import Write from "./home-page/write/Write";

const MainPage = () => {
  const { currentUser } = Blog();
  return (
    <Router>
      {currentUser ? <HomeHeader /> : <DemoHeader />}
      <ToastContainer />
      <Routes>
        {currentUser && <Route path="/" element={<HomePage />} />}
        {!currentUser && <Route path="/demo" element={<DemoPage />} />}
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/write" element={<Write />} />
        <Route
          path="*"
          element={<Navigate to={!currentUser ? "/demo" : "/"} />}
        />
      </Routes>
    </Router>
  );
};

export default MainPage;
