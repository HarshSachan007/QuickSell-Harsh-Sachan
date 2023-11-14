import React from "react";
import logo from "../../assets/logo.png"; 

const Loading = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <img
        src={logo}
        alt="company-logo"
        style={{
          height: "80px",
          width: "80px",
          animation: "scale 0.8s infinite alternate", // Simple scale animation
        }}
      />
      <span
        style={{
          color: "#4fa94d",
          fontWeight: "bold",
          letterSpacing: "2px",
          fontSize: "1.5em",
        }}
      >
        Loading Awesomeness...
      </span>

      {/* @keyframes animation */}
      <style>
        {`
          @keyframes scale {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
