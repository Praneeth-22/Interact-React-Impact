import React from "react";
// import schedule from "./static_Data/events";
import Divider from "@mui/material/Divider";
import { Card } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { hover } from "@testing-library/user-event/dist/hover";
import "./TimeLineCss/MyEvent.css";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserContextApi";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function MyEvent() {
  const navigate = useNavigate();
  const { user, event, getEventsAPI } = useUserAuth();
   const [events, setEvents] = useState([]);
  useEffect(() => {
    const unsubscribe = getEventsAPI();

    return () => {
      unsubscribe();
    };
  }, []);
  //model
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [eventId, setEventId] = useState("");
  //storeing current event data in a state variable
  const [currentEvent, setCurrentEvent] = useState({});

  const settingCurrentEVent = (id) => {
    // console.log("clicked", id);
    event.map((item) => {
      if (item.id === id) {
        setCurrentEvent(item);
      }
    });
  };
  // console.log("selected event", currentEvent);
  const handleCurrentEVent = (e, id) => {
    e.preventDefault();
    // console.log("clicked", id);
    handleShow();
    setEventId(id);
    settingCurrentEVent(id);
  };
// console.log("................. Sorting events.................");
//   const sortedEvents = [...event].sort((a, b) => {
//     return b.timestamp - a.timestamp;
//   });
//  const top3Events = sortedEvents
//    .sort((a, b) => new Date(a.event.date) - new Date(b.event.date))
//    .slice(0, 3);
// const top3Events = sortedEvents.slice(0, 3);
  // console.log(".................", event, ".................");

  const myDetails = event.slice(0,3).map((item) => {
    return (
      <Card
        className="card"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // position:"sticky"
          // position:"fixed"
        }}
      >
        <div
          onClick={(e) => {
            console.log("clicked");
            handleCurrentEVent(e, item.id);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            width: "100%",
            flexDirection: "row",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              color: "#28104e",
              fontWeight: 600,
              letterSpacing: "1.5px",
              cursor: "pointer",
            }}
          >
            {item.event.university} &nbsp;
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
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            flexDirection: "row",
          }}
        >
          <span
            style={{
              color: "#4A1D91",
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
                  color: "#4A1D91",
                }}
              />
            </span>
            {item.event.date}
          </span>
          <p
            style={{
              color: "#4A1D91",
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
                  color: "#4A1D91",
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
          fontWeight: 600,
          alignItems: "center",
          letterSpacing: "1px",
        }}
      >
        Events
      </h3>
      {myDetails}
      <Card
        className="card"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            flexDirection: "row",
            marginBottom: "8px",
          }} 
          onClick={() => {
            navigate("/events");
          }}
        >
          <span
            style={{
              color: "#28104e",
              fontWeight: 600,
              letterSpacing: "1px",
              cursor: "pointer",
            }}
          >
            {" "}
            View All
          </span>
        </div>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentEvent.event?.title} {"-"} {currentEvent.event?.university}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "start",
              width: "100%",
            }}
          >
            <p>{currentEvent.event?.date}</p>
            <p>{currentEvent.event?.location}</p>
            <p>{currentEvent.event?.description}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              justifyContent: "end",
              width: "100%",
            }}
          >
            <p></p>
            <p>
              Uploaded By:
              <img
                src={currentEvent.event?.userimage}
                alt="img"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginLeft: "10px",
                }}
              />{" "}
              {currentEvent.event?.uploadBy}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            <a
              href={
                currentEvent.event?.link ? currentEvent.event?.link : "/home"
              }
              target="_blank"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              view
            </a>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyEvent;
