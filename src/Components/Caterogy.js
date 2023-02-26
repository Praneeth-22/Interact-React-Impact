import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Card, Grid } from "@mui/material";
function Caterogy({ setOpenModel }) {
  const navigate = useNavigate();
  const routeHome = (e) => {
    e.preventDefault();
    if (e.target.style.backgroundColor === "green") {
      e.target.style.backgroundColor = "cornflowerblue";
    } else {
      e.target.style.backgroundColor = "green";
    }
  };

  return (
    <CaterogyContainer>
      <Elements>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            className="title"
            style={{ fontSize: "20px", fontWeight: 600, color: "#28104e" }}
          >
            Select a Category
          </div>
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOpenModel(false);
              }}
            >
              X
            </button>
          </div>
        </div>

        <div className="body">
          {/* <Checkbox  defaultChecked /> */}
          {/* <button onClick={routeHome}>Sport</button>
          <button onClick={routeHome}>Academics</button>
          <button onClick={routeHome}>Activities</button>
          <button onClick={routeHome}>Others</button> */}
          <Grid container spacing={2}>
            {[1, 2, 3, 4].map((item) => {
              return (
                <Grid item xs={6}>
                  <Card
                    variant="outlined"
                    style={{
                      padding: "10px 16px",
                      boxShadow: "5px 8px 10px rgba(40, 16, 78, 0.4)",
                    }}
                  >
                    <div style={{ fontSize: "16px", fontWeight: 600 }}>
                      Hello world{" "}
                    </div>
                    <div style={{ fontSize: "12px" }}>
                      secondary textbsjkfbdkjfjsdfdsnjkbvjkbjvdfjkbvkjdf
                    </div>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
        {/* <div className="footer">
          <button
            id="cancelBtn"
            onClick={() => {
              setOpenModel(false);
            }}
          >
            Cancel
          </button>
          <button
            id="saveBtn"
            onClick={() => {
              setOpenModel(false);
            }}
          >
            Save
          </button>
        </div> */}
      </Elements>
    </CaterogyContainer>
  );
}
const CaterogyContainer = styled.div`
  display: grid;
  place-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
`;
const Elements = styled.div`
  width: 650px;
  height: 400px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.12);
  .titleCloseBtn {
    display: flex;
    justify-content: flex-end;
  }
  .titleCloseBtn button {
    width: 30px;
    height: 30px;
    border: none;
    background-color: #28104e;
    color: white;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
  }
  .title {
    display: inline-block;
    text-align: center;
    margin-top: 10px;
    font-size: 1.5rem;
  }
  .body {
    /* flex: 50%;
    display: flex; */
    /* justify-content: space-around; */
    margin-top: 40px;
    flex-wrap: wrap;
    align-items: center;
    font-size: 1.7rem;
    text-align: center;
  }
  .body button {
    width: 150px;
    height: 60px;
    margin: 10px;
    border: none;
    background-color: cornflowerblue;
    color: white;
    border-radius: 8px;
    font-size: 20px;
    cursor: pointer;
    background-color: #ff3cac;
    background-image: linear-gradient(
      225deg,
      #ff3cac 0%,
      #784ba0 50%,
      #2b86c5 100%
    );
  }
  .footer button {
    width: 150px;
    height: 45px;
    margin: 10px;
    border: none;
    background-color: cornflowerblue;
    color: white;
    border-radius: 8px;
    font-size: 20px;
    cursor: pointer;
  }
  #cancelBtn {
    background-color: #28104e;
    background-image: linear-gradient(147deg, #ff3b43 0%, #ff2525 74%);
  }
  #saveBtn {
    background-color: #056855;
    background-image: linear-gradient(132deg, #056855 0%, #07a20c 100%);
  }
`;

export default Caterogy;
