import React from "react";
import Logo from "../../assets/logo.png";

const DemoHeader = () => {
  return (
    <header
      style={{
        borderBottom: "1px solid",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          height: 70,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img style={{ height: 70 }} src={Logo} alt="Blog logo" />
      </div>
    </header>
  );
};

export default DemoHeader;
