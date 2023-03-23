// Description: This component is used to create a post
// requried imports
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { faker } from "@faker-js/faker";
import ReactPlayer from "react-player";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
//
import { useUserAuth } from "../../context/UserContextApi";
//
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
//

// Post component
const options = [
  "Sports",
  "Academics",
  "Entertainment",
  "Politics",
  "Technology",
  "Others",
];

function Post(props) {
  const { isOpen, setIsOpen } = props; // destructuring props
  const [shareImage, setShareImage] = useState(""); // state for image
  const [text, setText] = useState(""); // state for text
  const [videoLink, setVideoLink] = useState(""); // state for video link
  const [assetArea, setAssetArea] = useState(""); // state for asset area
  // console.log("at posts-->props :", props); // console log for props
  //
  const { user, postArticleAPI } = useUserAuth(); // destructuring user from context
  const ava = faker.image.avatar();
  const [photoUrl, setPhotoUrl] = useState(ava); // state for photo url
  const [displayName, setDisplayName] = useState(""); // state for display name
  //
  const [Cvalue, setCValue] = React.useState(options[0]);
  const [inputCValue, setInputCValue] = React.useState("");
  //
  const handleChange = (e) => {
    // function to handle change
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };
  const switchAssetArea = (area) => {
    // function to switch asset area
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };
  const postArticle = (e) => {
    // function to post article
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload = {
      image: shareImage,
      video: videoLink,
      user: user,
      description: text,
      timestamp: new Date().getTime(),
    }
    console.log("payload is:", payload);
    postArticleAPI(payload);
    reset(e);
  };

  const reset = (e) => {
    // function to reset
    setText("");
    setShareImage("");
    setVideoLink("");
    switchAssetArea("");
    setIsOpen(false);
  };
  useEffect(() => {
    if (user.photoURL) {
      // user != null && user.photoURL != null
      console.log("post photo   is:", user.photoURL);
      console.log("post display name is:", user.displayName);
      setPhotoUrl(user.photoURL);
      setDisplayName(user.displayName);
    }
  }, [user]);

  //
   const [cat, setCat] = React.useState("");
   const handleCatChange = (event) => {
      setCat(event.target.value);
    };
    // console.log("cat is:", cat);
  //
  return (
    // return statement
    <>
      {isOpen && (
        <Container>
          <Content>
            <Header>
              <h2>Create a Post</h2>
              <button onClick={reset}>
                <CloseIcon className="close" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {photoUrl ? (
                  <img src={photoUrl} alt="" referrerpolicy="no-referrer" />
                ) : (
                  <img src={ava} alt="" referrerpolicy="no-referrer" />
                )}

                <span>{displayName}</span>
              </UserInfo>
              {/* <Autocomplete
                value={Cvalue}
                onChange={(event, newValue) => {
                  setCValue(newValue);
                }}
                inputValue={inputCValue}
                onInputChange={(event, newInputValue) => {
                  setInputCValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                sx={{
               
                }}
                renderInput={(params) => <TextField {...params} sx={{ 
                  width: "50% !important",
                  height: "50px !important",
                  backgroundColor: "white !important",
                  borderRadius: "10px",
                  border: "1px solid lightgray",
                  zIndex: "99999999999900 !important",
                }} />}
              /> */}
              {/* <FormControl sx={{ m: 1, minWidth: 120,zIndex:99999999 }}>
                <Select
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                {/* <FormHelperText>Without label</FormHelperText> */}
              {/* </FormControl> */}

              <Editor>
                <FormControl sx={{}}>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Tag
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={cat}
                    onChange={handleCatChange}
                  >
                    <FormControlLabel
                      value="sport"
                      control={<Radio />}
                      label="sport"
                    />
                    <FormControlLabel
                      value="academics"
                      control={<Radio />}
                      label="academics"
                    />
                    <FormControlLabel
                      value="Career & Jobs"
                      control={<Radio />}
                      label="Career & Jobs"
                    />
                  </RadioGroup>
                </FormControl>
                <textarea
                  placeholder="Hi, there..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>

                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file" className="label">
                        Select an image
                      </label>
                    </p>
                    {shareImage && (
                      <img
                        src={URL.createObjectURL(shareImage)}
                        alt="upload a img"
                      />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <div>
                      <input
                        type="text"
                        placeholder="Please enter a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </div>
                  )
                )}
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton
                  onClick={() =>
                    switchAssetArea(assetArea === "image" ? "" : "image")
                  }
                >
                  <AddPhotoAlternateOutlinedIcon />
                </AssetButton>
                <AssetButton
                  onClick={() =>
                    switchAssetArea(assetArea === "media" ? "" : "media")
                  }
                >
                  <InsertLinkIcon />
                </AssetButton>
              </AttachAssets>
              <PostButton
                disabled={shareImage || videoLink || text ? false : true}
                onClick={(event) => {postArticle(event)}} //
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  top: 10%;
  width: 100%;
  max-width: 600px;
  background-color: whitesmoke;
  max-height: 90%;
  overflow: initial;
  border-radius: 15px;
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 0px auto;
  animation: fadeIn 0.7s;
`;

const Header = styled.div`
  padding: 16px 20px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  /* background-color: #deacf5; */
  // backgroundColor:"#deacf5",
  font-weight: normal;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    cursor: pointer;

    .close {
      pointer-events: none;
    }
  }
`;
const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  img {
    width: 48px;
    border-radius: 50%;
    margin-right: 5px;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;
const AssetButton = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;
const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  svg {
    margin-right: 5px;
  }
  ${AssetButton} {
    width: 40px;
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)": "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#004182")};
    background: #004182;
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    border: none;
    outline: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;
const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
  .label {
    cursor: pointer;
    color: #0a66c2;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    text-decoration: none;
    display: inline-block;
    &:hover {
      text-decoration: underline;
    }
  }
`;



export default Post;
