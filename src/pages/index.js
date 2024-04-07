import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./home-page/HomePage";
import DemoPage from "./demo-page/DemoPage";
import HomeHeader from "./home-page/HomeHeader";
import DemoHeader from "./demo-page/DemoHeader";

const MainPage = () => {
  const auth = false;
  return (
    <Router>
      {auth ? <HomeHeader /> : <DemoHeader />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </Router>
  );
};

export default MainPage;
