import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
// import user from '../Components/images/user.svg'
import EventIcon from "@mui/icons-material/Event";
import ArticleIcon from "@mui/icons-material/Article";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Rating from "@mui/material/Rating";
import CommentIcon from "@mui/icons-material/Comment";
import StarIcon from "@mui/icons-material/Star";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Button from "@mui/material/Button";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SchoolIcon from "@mui/icons-material/School";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Container from "react-bootstrap/Container";
import demo2 from "./../../images/demo2.jpg";

import userImgUnLoad from "./Images/user.png";
import spinner from "./Images/spin.svg";
// import demo2 from "../images/demo2.jpg";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import { faker } from "@faker-js/faker";
import DemoPost from "./DemoPost";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./Home.css";
import MyEvent from "./MyEvent";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
//
import { useUserAuth } from "../../context/UserContextApi";
import { db } from "../../firebase_service";
import { doc, collection, addDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
//
function Home(props) {
  const navigate = useNavigate();
  //
  const { user, loading, getArticlesAPI, articles } =
    useUserAuth(); // destructuring user from context
  const ava = faker.image.avatar();
  const [photoUrl, setPhotoUrl] = useState(ava); // state for photo url
  const [displayName, setDisplayName] = useState(""); // state for display name
  //
  const [isOpen, setIsOpen] = useState(false);
  const [value1, setValue1] = React.useState(0);
  const catcolor = { color: "#6237a0" };
  const handleChange = (event, newValue) => {
    setValue1(newValue);
  };
  const [articleId, setArticleId] = useState("");
  const [value, setValue] = useState(3);
  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
    setIsOpen(true);
  };

  useEffect(() => {
    if (user.photoURL) {
      // user != null && user.photoURL != null
      console.log("photo   is:", user.photoURL);
      console.log("display name is:", user.displayName);
      setPhotoUrl(user.photoURL);
      setDisplayName(user.displayName);
    }
    getArticlesAPI();
  }, [user]);
  //comment
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]); // to store the comments from firebase
  const postComment = async (event, articleId) => {
    event.preventDefault();

    console.log("articleId:", articleId);

    try {
      const docRef = await addDoc(
        collection(db, `articles/${articleId}/comments`),
        {
          text: newComment,
          username: user.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }
      );
      console.log("Comment written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
    setNewComment("");
  };
  //
  console.log("loading: ", loading);
  console.log("articles: ", articles);
  // console.log("comments: ", comments);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
        justifyContent: "space-around",
        padding: "0 20px",
      }}
    >
      {articles.length === 0 ? (
        <p></p>
      ) : (
        <HomeContainer>
          <ShareBox>
            <div>
              {user && user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="user"
                  referrerpolicy="no-referrer"
                />
              ) : (
                <img src={userImgUnLoad} alt="user" />
              )}
              <button
                onClick={handleClick}
                // disabled={!loading ? true : false}
              >{` Start a post`}</button>
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
                label="Workshops"
                icon={<ConstructionOutlinedIcon />}
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
                label="Career fair"
                icon={<BusinessCenterOutlinedIcon />}
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
              <Tab
                label="E-sports"
                icon={<SportsEsportsOutlinedIcon />}
                iconPosition="start"
                sx={{
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "capitalize",
                }}
              />
            </Tabs>
          </div>
          <Content>
            {/* {!loading && <img src={spinner} alt="loading" />} */}
            {articles.length > 0 &&
              articles.map(({ id, article }) => (
                <Article key={id}>
                  {/* {setArticleId(id)} */}
                  <SharedActor>
                    <a>
                      <img
                        src={article.actor.image}
                        alt="user"
                        style={{ borderRadius: "50%", marginRight: "10px" }}
                      />

                      <div>
                        <span
                          style={{
                            color: "#6237a0",
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          {article.actor.title}
                        </span>
                        <span>{article.actor.email}</span>
                        {/* {console.log(article.actor.date.toDate())} */}
                        {/* <span>{article.actor.date}</span> */}
                        <span>
                        {
                         
                        }
                          {article.actor.timestamp && article.actor.timestamp
                            .toDate()
                            .toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <MoreHorizIcon />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImg>
                    <a>
                      {!article.sharedImg && article.video ? (
                        <ReactPlayer width={"100%"} url={article.video} />
                      ) : (
                        article.sharedImg && (
                          <img src={article.sharedImg} alt="shared" />
                        )
                      )}
                    </a>
                  </SharedImg>
                  <SocialCounts>
                    <li>
                      <button
                        style={{
                          border: "none",
                          outline: "none",
                          backgroundColor: "transparent",
                          padding: "0",
                        }}
                      >
                        <Rating
                          name="post-rating"
                          value={value}
                          readOnly
                          precision={0.5}
                          sx={{}}
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.55 }}
                              fontSize="inherit"
                            />
                          }
                        />
                        <span>{value}</span>
                      </button>
                    </li>
                    <li>
                      <a>
                        {article.comments}
                        <CommentIcon />{" "}
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

                  <form className="post_commentbox">
                    <input
                      type="text"
                      placeholder="Post comment...."
                      value={newComment}
                      className="post_input"
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      className="post_button"
                      onClick={(e) => postComment(e, id)}
                      type="submit"
                      disabled={!newComment}
                    >
                      POST
                    </Button>
                  </form>
                  <div className="post_comments">
                    <p>ko</p>
                    {comments.map(({ id, comment }) => (
                      <>
                        <p key={id}>
                          <b>{comment.username}</b>&nbsp;{comment.text}
                        </p>
                        <p>hello</p>
                      </>
                    ))}
                  </div>
                </Article>
              ))}
          </Content>
          <Post isOpen={isOpen} setIsOpen={setIsOpen} />
        </HomeContainer>
      )}
      <Rightbar>
        <MyEvent />
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
const Content = styled.div`
  text-align: center;
  & > img {
    width: 50px;
  }
`;

const Rightbar = styled(CommonCard)`
  margin-top: 16px;
  margin-left: 20px;
  min-width: 30%;
  @media (max-width: 768px) {
    display: none;
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
    width: 96%;
    height: 100%;
    border-radius: 5px;
    max-height: 500px;
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
    margin-right: 15px;
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
