import React from "react";
import schedule from "./static_Data/events";
import Divider from "@mui/material/Divider";
import { Card } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { hover } from "@testing-library/user-event/dist/hover";
import "./TimeLineCss/MyEvent.css";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserContextApi";
import { useState, useEffect } from "react";
function MyEvent() {
  const navigate = useNavigate();
  const { user,event,getEventsAPI } = useUserAuth();
  console.log(".................",event,"................."); 
  const myDetails = event.map((item) => {
    return (

      <Card
        className="card"
        onClick={() => {
          navigate("/events");
        }}
      >
        <p
          style={{
            color: "#28104e",
            fontWeight: 600,
            letterSpacing: "1.5px",
          }}
        >
          {item.title}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            width: "100%",
          }}
        >
          <p
            style={{
              color: "#28104e",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "1.5px",
              marginRight: "10px",
            }}
          >
            <span>
              <EventIcon
                style={{
                  fontSize: "18px",
                  marginRight: "5px",
                  color: "#28104e",
                }}
              />
            </span>
            {event.date},{event.time}
          </p>
          <p
            style={{
              color: "#28104e",
              fontSize: "12px",
              letterSpacing: "1.5px",
              fontWeight: 600,
            }}
          >
            {" "}
            <span>
              <LocationOnIcon
                style={{
                  fontSize: "16px",
                  marginRight: "5px",
                  color: "#28104e",
                }}
              />
            </span>
            {event.location}
          </p>
        </div>
      </Card>
    );
  });
  return (
    <div
      style={{
        padding: "10px 20px",
      }}
    >
      <h3
        style={{
          color: "#28104e",
          fontWeight: 500,
          alignItems: "center",
          letterSpacing: "1.5px",
        }}
      >
        Events
      </h3>
      {myDetails}
    </div>
  );
}

export default MyEvent;
