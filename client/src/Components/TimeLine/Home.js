import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import EventIcon from "@mui/icons-material/Event";
import ArticleIcon from "@mui/icons-material/Article";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Button from "@mui/material/Button";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SchoolIcon from "@mui/icons-material/School";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Box from "@mui/material/Box";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import userImgUnLoad from "./Images/user.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import spinner from "./Images/spin.svg";
// import demo2 from "../images/demo2.jpg";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import { faker } from "@faker-js/faker";
import Modal from "react-bootstrap/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./Home.css";
import MyEvent from "./MyEvent";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import TextField from "@mui/material/TextField";
import { useUserAuth } from "../../context/UserContextApi";
import { db, storage } from "../../firebase_service";

import {
  doc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  getFirestore,
  query,
  where,
  orderBy,
  onSnapshot,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebase from "firebase/compat/app";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import { Label } from "@material-ui/icons";
import { filter } from "lodash";
//
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import LabelIcon from "@mui/icons-material/Label";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
//
function Home(props) {
  const navigate = useNavigate();
  //
  const { loading, getArticlesAPI, articles } = useUserAuth(); // destructuring user from context
  const ava = faker.image.avatar();
  const user = JSON.parse(localStorage.getItem("user"));
  const [avatarUrl, setavatarUrl] = useState(ava); // state for photo url
  const [displayName, setDisplayName] = useState(""); // state for display name
  const [email, setEmail] = useState("");
  //
  const [isOpen, setIsOpen] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);

  const defaultDate = new Date();
  const catcolor = { color: "#6237a0" };

  const [articleId, setArticleId] = useState("");
  const [likevalue, setLikeValue] = useState(0);
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]); // to store the comments from
  const [eventInfo, setEventInfo] = useState({
    title: "",
    description: "",
    category: "",
    university: "",
    date: defaultDate.toISOString().substr(0, 10),
    time: "",
    location: "",
    uploadBy: "",
    userimage: "",
    eventId: "",
    timestamp: null,
    eventImage: "",
  });
  //comment

  const prepareComments = (data) => {
    const comments = data.reduce((acc, item) => {
      if (acc[item.articleId]) {
        acc[item.articleId].push(item.comments);
      } else {
        acc[item.articleId] = [item.comments];
      }
      return acc;
    }, []);
    return comments;
  };

  const postComment = async (event, articleId) => {
    event.preventDefault();
    setArticleId(articleId);
    try {
      await addDoc(collection(db, `articles/${articleId}/comments`), {
        text: newComment,
        username: user.displayName,
        userImg: user.avatarUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
        .then(() => {
          getArticlesAPI();
          setNewComment("");
        })
        .catch((error) => {
          console.log(error);
        });
      // console.log("Comment written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
    setNewComment("");
  };
  //

  // console.log("articles: ", articles);
  useEffect(() => {
    let allComments = [];
    const q = query(
      collection(db, "articles"),
      orderBy("actor.timestamp", "desc")
    );
    onSnapshot(q, async (querySnapshot) => {
      const payload = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        article: doc.data(),
      }));

      for (let i = 0; i < payload.length; i++) {
        const { id } = payload[i];
        if (id.length > 0) {
          const querySnapshot = await getDocs(
            collection(doc(db, "articles", id), "comments")
          );
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            allComments.push({ articleId: id, comments: doc.data() });
          });
        }

        setComments(prepareComments(allComments));
      }
    });
  }, [newComment]);

  useEffect(() => {
    const prepareData = {
      displayName: user?.displayName,
      email: user?.email,
      avatarUrl: user?.avatarUrl,
    };
    setavatarUrl(prepareData?.avatarUrl);
    setDisplayName(prepareData?.displayName);
    setEmail(prepareData?.email);

    getArticlesAPI();
    // console.log("home page user: ", user);
  }, []);

  const handleLikes = (e, articleId) => {
    e.preventDefault();
    // setLikeValue(likevalue + 1);
    const articleRef = doc(db, "articles", articleId);
    updateDoc(articleRef, {
      //update likes with uid
      likes: firebase.firestore.FieldValue.arrayUnion(user.uid),
    });
  };
  //add event into event collection
  const addEvent = async (event) => {
    console.log("------------------adding event:----------- ");
    event.preventDefault();
    const userName = user.displayName;
    const userImg = user.avatarUrl;
    const EventId = Math.floor(Math.random() * 1000000000);
    // storing the eventImage into storage in firebase
    const storageRef = ref(storage, `eventImages/${EventId}`);
    const uploadTask = await uploadBytes(storageRef, eventInfo.eventImage);
    const downloadURL = await getDownloadURL(uploadTask.ref);
    // console.log("downloadURL: ", downloadURL);
    // alert("Event added successfull");
    const preparedData = {
      ...eventInfo,
      uploadBy: userName,
      userimage: userImg,
      eventId: EventId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      eventImage: downloadURL,
    };
    // console.log("-----------event-----------------------", event);
    // console.log("eventInfo: ", eventInfo);
    try {
      // add event info into a new document in the events collection
      const docRef = await addDoc(collection(db, "events"), preparedData);
      // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding event: ", error);
    }
    setEventInfo({
      title: "",
      description: "",
      category: "",
      date: "",
      time: "",
      location: "",
      uploadBy: "",
      userimage: "",
      eventId: "",
      timestamp: null,
      eventImage: "",
    });
  };
  //location
  const locations = [
    {
      value: "new-york",
      label: "New York",
    },
    {
      value: "los-angeles",
      label: "Los Angeles",
    },
    {
      value: "chicago",
      label: "Chicago",
    },
    {
      value: "houston",
      label: "Houston",
    },
    {
      value: "philadelphia",
      label: "Philadelphia",
    },
    {
      value: "Massachusetts",
      label: "Massachusetts",
    },
    {
      value: "San Francisco",
      label: "San Francisco",
    },
    {
      value: "Seattle",
      label: "Seattle",
    },
  ];
  // console.log("user:pic", user.avatarUrl)
  //loader
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeArticleId, setActiveArticleId] = useState(null);
  const toggleMenu = (id) => {
    setActiveArticleId(id);
    setIsMenuOpen(!isMenuOpen);
  };
  // delete article
  const [isDeleting, setIsDeleting] = useState(false);
  const [articleIdToDelete, setArticleIdToDelete] = useState(null);
  const handleDeleteClick = (id) => {
    setArticleIdToDelete(id);
    setIsDeleting(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const docRef = doc(db, "articles", articleIdToDelete);
      await deleteDoc(docRef);
      setIsDeleting(false);
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const handleDeleteCancel = () => {
    setArticleIdToDelete(null);
    setIsDeleting(false);
  };
///
  const editTest = async (id) => {
    // alert("Are you sure you want to edit this article?");
    // console.log("--------------going to edit article id:---------------- ", articleId);
    // console.log("--------------going to edit article id:---------------- ", id);

    articles.map((article) => {
      if (article.id === id) {
        // console.log("-------------test article:----------------- ", article);
        const preEditArticle = {
          id: article.id,
          article: {
            description: article.article?.description,
            sharedImg: article.article?.sharedImg,
            video: article.article?.video,
          },
        };
        // console.log(
        //   "-------------preEditArticle:----------------- ",
        //   preEditArticle
        // );
        setGetArticle(preEditArticle);
      }
    });
  };
  //edit article
  const [editPost, setEditPost] = useState(false);
  const handleEditClose = () => setEditPost(false);
  const handleEditShow = () => setEditPost(true);
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newVideo, setNewVideo] = useState("");
  const [getArticle, setGetArticle] = useState({
    id: "",
    article: {
      description: "",
      sharedImg: "",
      video: "",
    },
  });
  const [editImgSelect, setEditImgSelect] = useState();
  //menu bar
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  //edit image

  const selectNewImage = () => {
    // e.preventDefault();
    // console.log("-------------selectNewImage:----------------- ");
  };
  // handle edited post
  const handleEditPost = async () => {
    //editing the article in the database
    // e.preventDefault();
    // console.log("-----------article-----------------------", getArticle);
    // console.log(
    //   "-------------handleEditPost:----------------- ",
    //   getArticle.id
    // );
    //update the firebase database with id equals  getArticle.id
    // const articleRef = doc(db, "articles", getArticle.id);
    // console.log("-----------articleRef-----------------------", articles);
    //map through the articles array and find the article with the id that matches getArticle.id
    let artRef;
    articles.map((article) => {
      // console.log("id", article.id, "getArticle.id", getArticle.id);
      if (article.id === getArticle.id) {
        // console.log("-------------test article:----------------- ", article);
        artRef = article.id;
      }
    });
    // console.log("-----------artRef-----------------------", artRef);
    const articleRef = doc(db, "articles", artRef);
    //print the articleRef collection data to the console
    const articleRefData = await getDoc(articleRef);
    // console.log(
    //   "-----------articleRefData-----------------------",
    //   articleRefData.data()
    // );
    //update the articleRef collection with the the updated description
    await updateDoc(articleRef, {
      ...articleRefData.data(),
      description: getArticle.article.description,
    });
    // console.log(
    //   "-----------articleRefData-----------------------",
    //   articleRefData.data()
    // );
    //close the edit modal
    handleEditClose();
  };
  //handle category change
  const [value1, setValue1] = React.useState(0);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [activeTag, setActiveTag] = useState("All");

  const handleChange = (event, newValue) => {
    let eve = event.target.innerText;
    if (eve === undefined) {
      eve = "All";
    }
    setActiveTag(eve);

    setValue1(newValue);
  };
  const getFilteredArticles = async (tag) => {
    const filteredArticles = articles.filter((article) => {
      return article.article.tag === tag;
    });

    setFilteredArticles(filteredArticles);
  };
  useEffect(() => {
    if (activeTag === "All") {
      setFilteredArticles(articles);
    } else {
      console.log(
        "-------------useEffect activeTag:----------------- ",
        activeTag
      );
      getFilteredArticles(activeTag);
    }
    // console.log("-------------useEffect filtered:----------------- ", filteredArticles);
  }, [activeTag, articles]);
  useEffect(() => {
    // console.log("Filtered Articles: ", filteredArticles);
  }, [filteredArticles]);
  //more comments
  const [showAllComments, setShowAllComments] = useState(false);
  const handleShowAllComments = () => {
    setShowAllComments(true);
  };
  //delete comment

  const deleteComment = async (postId, commentId) => {
    console.log("postId: ", postId, "commentId: ", commentId);
    try {
      await deleteDoc(doc(db, "articles", postId, "comments", commentId));
      console.log("Document successfully deleted!");

      // update the state of comments in your React component
      const updatedComments = comments[postId].filter(
        (comment) => comment.id !== commentId
      );
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: updatedComments,
      }));
    } catch (error) {
      console.log("Error removing comment: ", error);
    }
  };

  // useEffect(() => {
  //   // this useEffect is for the comments change

  // }, [comments]);
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
        <HomeContainer>
          <ShareBox>
            <div>
              {user && user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="user"
                  referrerpolicy="no-referrer"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
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
                  onClick={handleClick}
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
                  onClick={() => setOpenEvent(true)}
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
                  onClick={handleClick}
                >
                  Article
                </span>
              </button>
            </div>
          </ShareBox>
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
          <Post isOpen={isOpen} setIsOpen={setIsOpen} />
        </HomeContainer>
      ) : (
        <HomeContainer>
          <ShareBox>
            <div>
              {user && user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="user"
                  referrerpolicy="no-referrer"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              ) : (
                <img
                  src={userImgUnLoad}
                  alt="user"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
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
                  onClick={handleClick}
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
                  onClick={() => setOpenEvent(true)}
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
                  onClick={handleClick}
                >
                  Article
                </span>
              </button>
            </div>
          </ShareBox>

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
                label="Career & Jobs"
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
                label="Workshops"
                icon={<ConstructionOutlinedIcon />}
                iconPosition="start"
                sx={{
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "capitalize",
                }}
              />
            </Tabs>
          </div>
          {/* display loader */}
          {isSubmitting && <CircularProgress />}
          <Content>
            {articles.length > 0 &&
              filteredArticles?.map(({ id, article }) => {
                const isCurrentUser =
                  user && article.actor.email === user.email;
                return (
                  <>
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
                              {}
                              {article.actor.timestamp &&
                                article.actor.timestamp
                                  .toDate()
                                  .toLocaleDateString()}
                            </span>
                            {/* <span>{article?.tag}</span> */}
                          </div>
                        </a>
                        {isCurrentUser && (
                          <div>
                            <Button
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleMenuClick}
                            >
                              <MoreHorizIcon onClick={toggleMenu} />
                            </Button>
                            <Menu
                              key={id}
                              id="basic-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleMenuClose}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              <MenuItem
                                onClick={() => {
                                  console.log("hjsdbhfbsdbskj: ", id);
                                  setGetArticle(article);
                                  editTest(id);
                                  setEditPost(true);
                                  // setArticleId(id);
                                  handleMenuClose();
                                  setAnchorEl(null);
                                }}
                              >
                                Edit
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  console.log(
                                    "------------------------delete--------------------: ",
                                    id
                                  );
                                  handleDeleteClick(id);
                                  handleMenuClose();
                                }}
                              >
                                Delete
                              </MenuItem>
                            </Menu>
                            <Dialog
                              open={isDeleting}
                              onClose={handleDeleteCancel}
                              sx={{
                                borderRadius: "20px",
                              }}
                            >
                              <DialogTitle sx={{
                                color: "#28104e",
                                fontWeight: 600,
                                letterSpacing: "1.5px",

                              }}>Delete Post</DialogTitle>
                              <DialogContent>
                                <DialogContentText sx={{
                                  color:"black",
                                  fontSize: "14px",

                                }}>
                                  Are you sure you want to delete this post?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleDeleteCancel} sx={{
                                  color:"grey",
                                  border: "1px solid grey",
                                }}>
                                  Cancel
                                </Button>
                                <Button onClick={handleDeleteConfirm} sx={{
                                  color: "#28104e",
                                  border: "1px solid #28104e",
                                
                                }}>
                                  Delete
                                </Button>
                              </DialogActions>
                            </Dialog>
                            <Modal
                              show={editPost}
                              onHide={handleEditClose}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              centered
                            >
                              <Modal.Header closeButton>
                                <Modal.Title
                                  style={{
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    letterSpacing: "1px",
                                  }}
                                >
                                  Editing the Post
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      margin: "0px 0px 0px 0px",
                                      padding: "0px 0px 0px 0px",
                                    }}
                                  >
                                    <TextField
                                      id="outlined-basic"
                                      label="description"
                                      multiline
                                      variant="outlined"
                                      value={getArticle.article.description}
                                      onChange={(e) => {
                                        setGetArticle({
                                          ...getArticle,
                                          article: {
                                            ...getArticle.article,
                                            description: e.target.value,
                                          },
                                        });
                                        console.log(
                                          "getArticle: ",
                                          getArticle.article.description
                                        );
                                      }}
                                      size="small"
                                      sx={{
                                        margin: "5px",
                                        width: "90%",
                                      }}
                                    />
                                    {article.sharedImg ? (
                                      <div
                                        style={{
                                          width: "400px",
                                          height: "300px",
                                          margin: "5px",
                                          borderRadius: "10px",
                                        }}
                                      >
                                        <img
                                          src={getArticle.article.sharedImg}
                                          alt="shared"
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                          }}
                                        />
                                      </div>
                                    ) : (
                                      article.video && (
                                        <div>
                                          <ReactPlayer
                                            width={"100%"}
                                            url={getArticle.article.video}
                                          />
                                        </div>
                                      )
                                    )}
                                  </div>
                                  <div></div>
                                </div>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={handleEditClose}
                                  sx={{
                                    color: "grey",
                      
                                  }}
                                >
                                  Close
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={(handleEditClose, handleEditPost)}
                                  sx={{
                                    color: "#28104e",
                           
                                  }}
                                >
                                  Save Changes
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </div>
                        )}
                      </SharedActor>
                      <Description
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "10px 0px",
                        }}
                      >
                        <div>{article.description} </div>

                        {
                          <Chip
                            icon={
                              <LabelIcon
                                sx={{
                                  // backgroundColor:"red",
                                  color: "#6237a0 !important",
                                }}
                              />
                            }
                            label={article.tag}
                            variant="outlined"
                            sx={{
                              color: "#28104E",
                              fontWeight: 700,
                              border: "1px solid #28104E",
                              padding: "0px 10px ",
                              marginLeft: "10px",
                            }}
                          />
                        }
                      </Description>
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

                      <div
                        className="ui card"
                        style={{ background: "#fff", width: "100%" }}
                      >
                        <div
                          className="content"
                          style={{
                            width: "100%",
                            padding: "10px 20px",
                            background: "#fff",
                            margin: "10px 0px",
                          }}
                        >
                          <span className="right floated">
                            <i className="comment icon"></i>
                            {comments[id]?.length ? comments[id]?.length : 0}
                            <span
                              style={{ margin: "0px 5px", color: "#6237a0" }}
                            >
                              comments
                            </span>
                          </span>
                          <span className="left floated">
                            <i
                              className="heart filled transparent like icon"
                              onClick={(event) => {
                                handleLikes(event, id);
                              }}
                            ></i>
                            <span
                              style={{ margin: "0px 5px", color: "#6237a0" }}
                            >
                              {article.likes ? article.likes.length : 0} likes
                            </span>
                          </span>
                        </div>
                        <div
                          className="extra content"
                          style={{ background: "#fff", width: "100%" }}
                        >
                          <form
                            className="post_commentbox"
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <img
                              class="ui avatar image"
                              src={user?.avatarUrl}
                            />
                            <div
                              className="ui large action left icon input rounded-circle"
                              style={{ width: "100%" }}
                            >
                              <i className="comment outline icon"></i>
                              <input
                                type="text"
                                placeholder="Add Comment..."
                                onChange={(e) => setNewComment(e.target.value)}
                                value={newComment}
                              />
                              <button
                                className="ui button"
                                onClick={(e) => {
                                  postComment(e, id);
                                }}
                                type="submit"
                                disabled={!newComment}
                                style={{
                                  color: "#fff",
                                  backgroundColor: "#6237a0",
                                }}
                              >
                                comment
                              </button>
                            </div>
                          </form>
                          <div class="ui divider"></div>
                          {comments[id]?.map((comment, index) => {
                            if (!showAllComments && index >= 2) return null;
                            const isCommentCreator =
                              comment.userId === user?.id;
                            const isPostCreator = article.userId === user?.id;
                            return (
                              <>
                                <div
                                  className="ui relaxed divided list"
                                  style={{
                                    display: "flex",
                                    margin: "0px 30px",
                                  }}
                                >
                                  <div className="item">
                                    <i
                                      className="large middle aligned icon"
                                      style={{}}
                                    >
                                      <img
                                        src={comment.userImg}
                                        alt="user"
                                        style={{
                                          borderRadius: "50%",
                                          width: "40px",
                                          height: "40px",
                                        }}
                                      />
                                    </i>
                                    <div className="content left float ">
                                      <a
                                        className="header left float"
                                        style={{
                                          color: "#6237a0",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {comment.username}
                                      </a>
                                      <div className="description">
                                        {comment.text}
                                      </div>
                                      {/* {(isCommentCreator || isPostCreator) && (
                                        <i
                                          className="trash alternate icon"
                                          onClick={() =>
                                            deleteComment(id, comment)
                                          }
                                          style={{
                                            color: "red",
                                            cursor: "pointer",
                                          }}
                                        ></i>
                                      )} */}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  class="ui divider"
                                  style={{ margin: "10px 30px" }}
                                ></div>
                              </>
                            );
                          })}
                          {comments[id]?.length > 3 && !showAllComments && (
                            <div
                              className="ui basic button"
                              onClick={handleShowAllComments}
                            >
                              Show more
                            </div>
                          )}
                          {comments[id]?.length > 3 && showAllComments && (
                            <div
                              className="ui basic button"
                              onClick={() => setShowAllComments(false)}
                            >
                              Show less
                            </div>
                          )}
                        </div>
                      </div>
                    </Article>
                  </>
                );
              })}
          </Content>
          <Post
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
          />
        </HomeContainer>
      )}
      <Rightbar>
        <MyEvent />
      </Rightbar>
      <Modal
        show={openEvent}
        onHide={() => setOpenEvent(false)}
        style={{}}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              color: "#28104E",
            }}
          >
            Add Event
          </Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpenEvent(false);
            addEvent(e);
          }}
        >
          <Modal.Body>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
            >
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "90%" },
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Event Title"
                  variant="outlined"
                  onChange={(e) =>
                    setEventInfo({
                      ...eventInfo,
                      title: e.target.value,
                    })
                  }
                  sx={{}}
                  size="small"
                />
              </Box>

              <TextField
                id="outlined-basic"
                label="Event University"
                variant="outlined"
                onChange={(e) =>
                  setEventInfo({
                    ...eventInfo,
                    university: e.target.value,
                  })
                }
                size="small"
              />

              <TextField
                id="outlined-basic"
                label="location"
                variant="outlined"
                select
                value={eventInfo.location}
                InputProps={{
                  startAdornment: <LocationOnIcon />,
                }}
                onChange={(e) =>
                  setEventInfo({
                    ...eventInfo,
                    location: e.target.value,
                  })
                }
                size="small"
              >
                {locations.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <Box sx={{}}>
                <TextField
                  id="outlined-basic"
                  label="Time"
                  type={"time"}
                  variant="outlined"
                  value={eventInfo.time}
                  onChange={(e) =>
                    setEventInfo({
                      ...eventInfo,
                      time: e.target.value,
                    })
                  }
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Date"
                  variant="outlined"
                  type="date"
                  size="small"
                  value={eventInfo.date}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) =>
                    setEventInfo({
                      ...eventInfo,
                      date: e.target.value,
                    })
                  }
                />
              </Box>
            </Box>
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "90%" },
              }}
            >
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                variant="outlined"
                multiline
                size="small"
                maxRows={4}
                onChange={(e) =>
                  setEventInfo({
                    ...eventInfo,
                    description: e.target.value,
                  })
                }
              />
              <TextField
                id="outlined-flexible"
                label="Link"
                type={"url"}
                size="small"
                value={eventInfo.link}
                variant="outlined"
                onChange={(e) =>
                  setEventInfo({
                    ...eventInfo,
                    link: e.target.value,
                  })
                }
                // InputLabelProps={{
                //   shrink: true,
                // }}
              />
              {/* <TextFiel */}
              <input
                type="file"
                accept="image/gif, image/jpeg, image/png"
                name="image"
                id="file"
                style={{
                  padding: "10px 10px",
                }}
                // style={{ display: "none" }}
                onChange={(e) => {
                  setEventInfo({
                    ...eventInfo,
                    eventImage: e.target.files[0],
                  });
                  // alert("Image uploaded");
                }}
              />
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              sx={{
                backgroundColor: "#28104E",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#004182",
                },
              }}
            >
              Upload
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
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
        width: 40px;
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
