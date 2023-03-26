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
  useEffect(() => {
    const unsubscribe = getEventsAPI();
    return () => {
      unsubscribe();
    };
  }, []);
  console.log(".................",event,"................."); 
  const myDetails = event.map((item) => {
    return (
      <Card className="card">
        <p onClick={() => navigate("/events")}>
          <span
            style={{
              color: "#28104e",
              fontWeight: 600,
              letterSpacing: "1.5px",
              cursor: "pointer",
            }}
          >
            {item.event.university} -{" "}
          </span>
          <span
            style={{
              color: "#28104e",
              fontWeight: 600,
              letterSpacing: "1.5px",
              cursor: "pointer",
            }}
          >
            {item.event.title}
          </span>
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
            {item.event.date}
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
            {item.event.location}
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
