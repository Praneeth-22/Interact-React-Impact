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
import bachelor from '.././TimeLine/Images/user.png'
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

  useEffect(() => {
    const unsubscribe = getEventsAPI();
    return () => {
      unsubscribe();
    };
  }, []);

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
          >
            <div>
              <TextField
                id="input-with-icon-textfield"
                label="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Sort By
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Sort By"
                >
                  <MenuItem value={10}>Date</MenuItem>
                  <MenuItem value={20}>Name</MenuItem>
                </Select>
              </FormControl>
              <SortIcon fontSize="large" />
            </div>
          </div>
        </div>
        <div>
          <h1 style={{ color: "#6237a0", fontFamily: "Roboto" }}>
            Recommended Events
          </h1>

          <div className="myCard-style">
            <Card sx={{ maxWidth: 345, margin: "18px" }}>
              <CardMedia
                sx={{ height: 140 }}
                image={bachelor}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Event Name
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant="body2" color="text.gray">
                    <LocationOnRoundedIcon
                      fontSize="medium"
                      className="myIcon-style"
                    />
                    Location
                  </Typography>
                  <Typography variant="body2" color="text.gray">
                    <CalendarTodayRoundedIcon
                      fontSize="medium"
                      className="myIcon-style"
                    />
                    04/20/2023
                  </Typography>
                </div>

                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" className="Share-learn-more">
                  Share
                </Button>
                <Button size="small" className="Share-learn-more">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </div>
        </div>

        <h1 style={{ color: "#6237a0", fontFamily: "Roboto" }}>All Events</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {event.map((item) => (
            <div className="myCard-style">
              <Card sx={{ maxWidth: 345, margin: "18px" }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={bachelor}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Event Name
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <Typography variant="body2" color="text.gray">
                      <LocationOnRoundedIcon
                        fontSize="medium"
                        className="myIcon-style"
                      />
                      Location
                    </Typography>
                    <Typography variant="body2" color="text.gray">
                      <CalendarTodayRoundedIcon
                        fontSize="medium"
                        className="myIcon-style"
                      />
                      04/20/2023
                    </Typography>
                  </div>

                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" className="Share-learn-more">
                    Share
                  </Button>
                  <Button size="small" className="Share-learn-more">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default Event;
