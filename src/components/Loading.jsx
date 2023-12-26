import React from "react";
import "./loading.css";
import loadingImage from "../assets/loading.png";

function LoadingPage() {
  return (
    <div className="loading-container">
      <img src={loadingImage} alt="loading" />
      <img src={loadingImage} alt="loading" />
      <img src={loadingImage} alt="loading" />
      <img src={loadingImage} alt="loading" />
      <img src={loadingImage} alt="loading" />

      <img src={loadingImage} alt="loading" />
      <img src={loadingImage} alt="loading" />
      <img src={loadingImage} alt="loading" />
      <img src={loadingImage} alt="loading" />
      <img src={loadingImage} alt="loading" />
    </div>
  );
}

export default LoadingPage;
