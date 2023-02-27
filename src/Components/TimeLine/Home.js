import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
// import user from '../Components/images/user.svg'
import EventIcon from "@mui/icons-material/Event";
import ArticleIcon from "@mui/icons-material/Article";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import demopost from "./../../images/demoimg.jpg";
import Rating from "@mui/material/Rating";
import CommentIcon from "@mui/icons-material/Comment";
import StarIcon from "@mui/icons-material/Star";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Chip from "@mui/material/Chip";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SchoolIcon from "@mui/icons-material/School";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Container from "react-bootstrap/Container";
import demo2 from "./../../images/demo2.jpg";
// import demo2 from "../images/demo2.jpg";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import { faker } from "@faker-js/faker";
import DemoPost from "./DemoPost";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./Home.css";
import MyEvent from './MyEvent'
function Home(props) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [value1, setValue1] = React.useState(0);
  const catcolor = { color: "#6237a0" };
  const handleChange = (event, newValue) => {
    setValue1(newValue);
  };
  const [value, setValue] = useState(3);
  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
    setIsOpen(true);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "start",
      justifyContent: "space-around",
      padding: "0 20px",
    }}>
      <HomeContainer>
        <ShareBox>
          <div>
            <img src={faker.image.avatar()} alt="user" />
            <button onClick={handleClick}>Start a post</button>
          </div>
          <div>
            <button>
              <AddPhotoAlternateIcon style={{ color: "#28104e" }} />
              <span
                style={{
                  color: "#28104e",
                  fontWeight: 600,
                  alignItems: "center",
                  marginLeft: "7px",
                  letterSpacing: "1.5px",
                }}
              >
                Photo
              </span>
            </button>
            <button>
              <EventIcon style={{ color: "#28104e" }} />
              <span
                style={{
                  color: "#28104e",
                  fontWeight: 600,
                  alignItems: "center",
                  marginLeft: "7px",
                  letterSpacing: "1.5px",
                }}
              >
                Event
              </span>
            </button>
            <button>
              <ArticleIcon style={{ color: "#28104e" }} />
              <span
                style={{
                  color: "#28104e",
                  fontWeight: 600,
                  alignItems: "center",
                  marginLeft: "7px",
                  letterSpacing: "1.5px",
                }}
              >
                Article
              </span>
            </button>
          </div>
        </ShareBox>
        {/* <Category>
          <Chip
            avatar={<CategoryOutlinedIcon />}
            label="All"
            component="a"
            href="#basic-chip"
            clickable
            variant="outlined"
            onClick={() => navigate("/home")}
          />
          <Chip
            avatar={<SportsBasketballIcon />}
            label="Sport"
            component="a"
            href="#basic-chip"
            clickable
            variant="outlined"
          />
          <Chip
            avatar={<SchoolIcon />}
            label="Academics"
            component="a"
            href="#basic-chip"
            clickable
            variant="outlined"
          />
          <Chip
            avatar={<CelebrationIcon />}
            label="Activities"
            component="a"
            href="#basic-chip"
            clickable
            variant="outlined"
          />
          <Chip
            label="More"
            component="a"
            href="#basic-chip"
            clickable
            variant="outlined"
            avatar={<ArrowRightIcon />}
          />
        </Category> */}
        <div>
          <Tabs
            TabIndicatorProps={{ style: { backgroundColor: "#28104e" } }}
            value={value1}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            style={{
              marginBottom: "10px",
              boxShadow: "0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%)",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          >
            <Tab
              label="All"
              icon={<CategoryOutlinedIcon />}
              iconPosition="start"
              sx={{
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "capitalize",
              }}
            />
            <Tab
              label="All"
              icon={<CategoryOutlinedIcon />}
              iconPosition="start"
              sx={{
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "capitalize",
              }}
            />
            <Tab
              label="All"
              icon={<CategoryOutlinedIcon />}
              iconPosition="start"
              sx={{
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "capitalize",
              }}
            />
            <Tab
              label="Sports"
              icon={<SportsBasketballIcon />}
              iconPosition="start"
              sx={{
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "capitalize",
              }}
            />
            <Tab
              label="Academics"
              icon={<SchoolIcon />}
              iconPosition="start"
              sx={{
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "capitalize",
              }}
            />

            <Tab
              label="
              Activities"
              icon={<CelebrationIcon />}
              iconPosition="start"
              sx={{
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "capitalize",
              }}
            />
          </Tabs>
        </div>
        <div>
          <DemoPost mainimg={demo2} />
          <DemoPost />
        </div>

        <Post isOpen={isOpen} setIsOpen={setIsOpen} />
      </HomeContainer>
        <Rightbar>
          <MyEvent/>
        </Rightbar>

    </div>
  );
}
const HomeContainer = styled.div`
  grid-area: main;
  width: 70%;
`;
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  margin-top: 16px;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      flex-direction: row;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;
const Rightbar = styled(CommonCard)`
  margin-top: 16px;
  margin-left: 20px;
  min-width:30% ;
  @media (max-width: 768px) {
    display: none;
  }
`;

export default Home;
