import React from "react";
import schedule from "./static_Data/events";
import Divider from "@mui/material/Divider";
import { Card } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { hover } from "@testing-library/user-event/dist/hover";
import "./TimeLineCss/MyEvent.css";
import { useNavigate } from "react-router-dom";
function MyEvent() {
  const navigate = useNavigate();
  const myDetails = schedule.map((event) => {
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
          {event.event_name}
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
