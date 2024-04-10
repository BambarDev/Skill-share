import React from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "./home-page/HomePage";
import DemoPage from "./demo-page/DemoPage";
import HomeHeader from "./home-page/HomeHeader";
import DemoHeader from "./demo-page/DemoHeader";

const MainPage = () => {
  const currentUser = false;
  return (
    <Router>
      {currentUser ? <HomeHeader /> : <DemoHeader />}
      <Routes>
        {currentUser && <Route path="/" element={<HomePage />} />}
        {!currentUser && <Route path="/demo" element={<DemoPage />} />}
        <Route
          path="*"
          element={<Navigate to={!currentUser ? "/demo" : "/"} />}
        />
      </Routes>
    </Router>
  );
};

export default MainPage;
