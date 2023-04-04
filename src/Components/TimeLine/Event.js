import React, { useState, useEffect } from "react";
import Header from "../Header";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
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
import { wrap } from "lodash";


function Event() {

  const [events, setEvents] = useState([]);
 const { user, event, getEventsAPI } = useUserAuth();
 useEffect(() => {
   const unsubscribe = getEventsAPI();
   return () => {
     unsubscribe();
   };
 }, []);

  return (
    <div style={{}}>
      <Header />
      {event.map((item) => (
        <Card
          sx={{
            width: "400px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexWrap: "wrap",
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
            // overflowY: "scroll",

          }}
        >
          <CardContent>
            <Typography variant="h5" component="div" style={{
              color: "#000",
            }}>
              {item.event?.title}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {item.event?.description}
            </Typography>

            <Typography color="textSecondary">{item.event?.date}</Typography>
            <Typography variant="body2">{item.event?.location}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Event;
