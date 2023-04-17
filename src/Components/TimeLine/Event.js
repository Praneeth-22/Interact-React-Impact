import React, { useState, useEffect } from "react";
import Header from "../Header";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

import Container from "@mui/material/Container";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useUserAuth } from "../../context/UserContextApi";
// import bachelor from "../../images/bachelors-sim-science-gaming-animation-2021.jpg";
import bachelor from ".././TimeLine/Images/user.png";
import { TextField, InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import "./TimeLineCss/Events.css";

function Event() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, event, getEventsAPI } = useUserAuth();
  const [sortedEvents, setSortedEvents] = useState([]);
  const [upcommingEvents, setUpcommingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  console.log("---------------------all event-----------", event);
  useEffect(() => {
    const unsubscribe = getEventsAPI();
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    // Sort events based on date in ascending order
    const sorted = [...event].sort(
      (a, b) => new Date(a.event.date) - new Date(b.event.date)
    );
    setSortedEvents(sorted);

    // Filter upcoming and past events
    const today = new Date();
    const upcoming = sorted.filter((e) => new Date(e.event.date) >= today);
    const past = sorted.filter((e) => new Date(e.event.date) < today);
    setUpcommingEvents(upcoming);
    setPastEvents(past);
  }, [event]);
  return (
    <>
      <Header />
      <Container className="py-4" style={{ backgroundColor: "	#F5F5F5" }}>
        <div style={{ marginBottom: "10px" }}>
          <h1
            style={{
              color: "#6237a0",
              fontFamily: "Roboto",
              fontWeight: "700",
            }}
          >
            Let us explore the events
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          ></div>
        </div>

        {/* <h1 style={{ color: "#6237a0", fontFamily: "Roboto" }}>All Events</h1> */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ width: "100%" }}>
            <h2 style={{ color: "#6237a0", fontFamily: "Roboto" }}>
              Upcoming Events
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {upcommingEvents.map((item) => (
                <div style={{}}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      margin: "15px",
                      minHeight: 400,
                      maxHeight: 500,
                    }}
                  >
                    <CardMedia
                      sx={{ height: 200, width: "100%" }}
                      image={
                        item.event.eventImage ? item.event.eventImage : bachelor
                      }
                      title={item.event.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.event.description}
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CalendarTodayRoundedIcon
                            sx={{ color: "#6237a0", marginRight: "5px" }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(item.event.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </Typography>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <LocationOnRoundedIcon
                            sx={{ color: "#6237a0", marginRight: "5px" }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {item.event.location}
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        style={{
                          color: "#6237a0",
                        }}
                        href={item.event.link ? item.event.link : "#"}
                        target="_blank"
                      >
                        Know More
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <h2 style={{ color: "#6237a0", fontFamily: "Roboto" }}>
              Past Events
            </h2>
            {pastEvents.map((item) => (
              <div className="myCard-style">
                <Card
                  sx={{
                    maxWidth: 345,
                    margin: "15px",
                    minHeight: 400,
                    maxHeight: 500,
                  }}
                >
                  <CardMedia
                    sx={{ height: 200, width: "100%" }}
                    image={
                      item.event.eventImage ? item.event.eventImage : bachelor
                    }
                    title={item.event.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.event.description}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "10px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CalendarTodayRoundedIcon
                          sx={{ color: "#6237a0", marginRight: "5px" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(item.event.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </Typography>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <LocationOnRoundedIcon
                          sx={{ color: "#6237a0", marginRight: "5px" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {item.event.location}
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

export default Event;
