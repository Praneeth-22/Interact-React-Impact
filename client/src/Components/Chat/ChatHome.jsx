import React from "react";
import "../Chat/style.scss";
import Slidebar from "./Component/Slidebar";
import Chat from "./Component/Chat";
import Header from "../Header";
const Home = () => {
  return (
    <div
      className="home"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div className="container">
        <Slidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
