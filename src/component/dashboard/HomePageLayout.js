import React from "react";

const HomePageLayout = ({ children }) => {
  return (
    <div
      style={{
        overflow: "auto",
        backgroundImage: "linear-gradient(to bottom, #f1f1f1, #ffffff)",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};

export default HomePageLayout;
