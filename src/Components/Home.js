import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import user from "../images/user.svg";
import EventIcon from "@mui/icons-material/Event";
import ArticleIcon from "@mui/icons-material/Article";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import demopost from "../images/demoimg.jpg";
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
import demo2 from "../images/demo2.jpg";
import { useNavigate } from "react-router-dom";
import Post from "./Post";

function Home(props) {
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState("close");

  const [value, setValue] = useState(3);
  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModel) {
      case "open":
        setShowModel("close");
        break;
      case "close":
        setShowModel("open");
        break;
      default:
        setShowModel("close");
        break;
    }
  };
  return (
    <Container>
      <HomeContainer>
        <Category>
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
        </Category>
        <ShareBox>
          <div>
            <img src={user} alt="user" />
            <button onClick={handleClick}>Start a post</button>
          </div>
          <div>
            <button>
              <AddPhotoAlternateIcon />
              <span>Photo</span>
            </button>
            <button>
              <EventIcon />
              <span>Event</span>
            </button>
            <button>
              <ArticleIcon />
              <span>Article</span>
            </button>
          </div>
        </ShareBox>
        <div>
          <Article>
            <SharedActor>
              <a>
                <img src={user} alt="user" />
                <div>
                  <span>Title</span>
                  <span>Info</span>
                  <span>Date</span>
                </div>
              </a>
              <button>
                <MoreHorizIcon />
              </button>
            </SharedActor>
            <Description>Welcome to Ualbany </Description>
            <SharedImg>
              <a>
                <img src={demopost} alt="demo" />
              </a>
            </SharedImg>
            <SocialCounts>
              <li>
                <button>
                  <Rating
                    name="text-feedback"
                    value={value}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <span>{value}</span>
                </button>
              </li>
              <li>
                <a>
                  2 <CommentIcon />{" "}
                </a>
              </li>
            </SocialCounts>
            <SocialActions>
              <button>
                <Rating
                  name="half-rating"
                  defaultValue={2.5}
                  precision={0.5}
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <span>Rate</span>
              </button>
              <button>
                <CommentIcon />
                <span>Comment</span>
              </button>
              <button>
                <ShareOutlinedIcon />
                <span>Share</span>
              </button>
            </SocialActions>
          </Article>
          <Article>
            <SharedActor>
              <a>
                <img src={user} alt="user" />
                <div>
                  <span>Title</span>
                  <span>Info</span>
                  <span>Date</span>
                </div>
              </a>
              <button>
                <MoreHorizIcon />
              </button>
            </SharedActor>
            <Description>First post </Description>
            <SharedImg>
              <a>
                <img src={demo2} alt="demo2" />
              </a>
            </SharedImg>
            <SocialCounts>
              <li>
                <button>
                  <Rating
                    name="text-feedback"
                    value={value}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <span>{value}</span>
                </button>
              </li>
              <li>
                <a>
                  2 <CommentIcon />{" "}
                </a>
              </li>
            </SocialCounts>
            <SocialActions>
              <button>
                <Rating
                  name="half-rating"
                  defaultValue={2.5}
                  precision={0.5}
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <span>Rate</span>
              </button>
              <button>
                <CommentIcon />
                <span>Comment</span>
              </button>
              <button>
                <ShareOutlinedIcon />
                <span>Share</span>
              </button>
            </SocialActions>
          </Article>
        </div>
        {console.log(showModel)}
        <Post showModel={showModel} handleClick={handleClick} />
      </HomeContainer>
    </Container>
  );
}
const HomeContainer = styled.div`
  grid-area: main;
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
const Category = styled(CommonCard)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 6px 16px;
  color: #0a66c2;
  margin-top: 11px;
`;
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
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
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
    }
  }
`;
const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    background: transparent;
    border: none;
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

export default Home;
