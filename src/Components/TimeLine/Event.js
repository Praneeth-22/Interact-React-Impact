import React, { useState, useEffect } from "react";
import Header from "../Header";
import Popover from "@mui/material/Popover";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import CardActions from "@mui/material/CardActions";
import {
  addDoc,
  getDocs,
  collection,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  doc,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase_service";
import { useUserAuth } from "../../context/UserContextApi";
import Button from "@mui/material/Button";

function Event() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [events, setEvents] = useState([]);
 const { user, event, getEventsAPI } = useUserAuth();
   const handlePopoverOpen = (event) => {
     setAnchorEl(event.currentTarget);
   };
     const handlePopoverClose = () => {
       setAnchorEl(null);
     };
       const open = Boolean(anchorEl);
 useEffect(() => {
   const unsubscribe = getEventsAPI();
   return () => {
     unsubscribe();
   };
 }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "flex-start",
        margin: "0 -10px",
        height: "100%",
        overflowY: "scroll",
      }}
    >
      <Header />
      {event.map((item) => (
        <Card
          key={item.event?.id}
          sx={{
            width: "400px",
            height: "250px",
            margin: "10px",
            padding: "10px",
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
            borderRadius: "10px",
            backgroundColor: "#fff",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 0 20px 0 rgba(0,0,0,0.2)",
            },
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              style={{
                color: "#28104e",
                fontWeight: 600,
                alignItems: "center",
                letterSpacing: "1px",
              }}
            >
              {item.event?.title} {"-"} {item.event?.university}
            </Typography>
            <Typography
              gutterBottom
              sx={{
                color: "#4A1D91",
                // overflowY: "scroll",
              }}
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              {item.event?.description}
            </Typography>
            {/* <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: "none",
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography sx={{ p: 1 }}>{item.event?.description}</Typography>
            </Popover> */}
            <Typography
              sx={{
                color: "#4A1D91",
              }}
            >
              {item.event?.date}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#4A1D91",
              }}
            >
              {item.event?.location}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "10px",
              }}
            ></div>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "end",
              marginTop: "10px",
            }}
          >
            {/* <Button variant="secondary">Close</Button> */}
            <Button variant="primary">
              <a
                href={item.event?.link ? item.event?.link : "/events"}
                target="_blank"
                style={{
                  color: "black",
                  textDecoration: "none",
                  backgroundColor: "#28104e",
                  padding: "10px",
                  borderRadius: "5px",
                  color : "white"
                }}
              >
                view
              </a>
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default Event;
