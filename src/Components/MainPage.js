import React from "react";
import Header from "./Header";
import Home from "./TimeLine/Home";
import Caterogy from "./Caterogy";
import styled from "styled-components";
import { useState, useEffect } from "react";
function MainPage() {
  const [openModel, setOpenModel] = useState(false);
  return (
    <Container>
      {openModel ? (
        <>
          <Caterogy setOpenModel={setOpenModel} />
        </>
      ) : (
        <>
          <button onClick={() => setOpenModel(true)} className="openModel">
            click
          </button>
          <Header />
          <Home />
        </>
      )}
    </Container>
  );
}
const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;

  .openModel {
    width: 200px;
    height: 40px;
    border: none;
    border-radius: 6px;
    background-color: cornflowerblue;
    color: white;
    cursor: pointer;
  }
`;
const Content = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
`;

export default MainPage;
