// Description: This component is used to create a post
// requried imports
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { faker } from "@faker-js/faker";
import ReactPlayer from "react-player";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

// Post component
function Post(props) {
  const { isOpen, setIsOpen } = props; // destructuring props
  const [shareImage, setShareImage] = useState(""); // state for image
  const [text, setText] = useState(""); // state for text
  const [videoLink, setVideoLink] = useState(""); // state for video link
  const [assetArea, setAssetArea] = useState(""); // state for asset area
  console.log("at posts-->props :", props); // console log for props

  const handleChange = (e) => { // function to handle change
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };
  const switchAssetArea = (area) => { // function to switch asset area
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };
  const reset = (e) => { // function to reset
    setText("");
    setShareImage("");
    setVideoLink("");
    switchAssetArea("");
    setIsOpen(false);
  };
  return ( // return statement
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
                <img src={faker.image.avatar()} alt="" />
                <span>{faker.name.firstName()}</span>
              </UserInfo>
              <Editor>
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
                      <label htmlFor="file" className="label">Select an image</label>
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
                  onClick={() => switchAssetArea(assetArea === "image" ? "" : "image")}
                >
                  <AddPhotoAlternateOutlinedIcon />
                </AssetButton>
                <AssetButton
                  onClick={() => switchAssetArea(assetArea === "media" ? "" : "media")}
                >
                  <InsertLinkIcon />
                </AssetButton>
              </AttachAssets>
              <PostButton disabled={(!text)? true : false}>Post</PostButton>
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
`;

const Content = styled.div`
  top: 10%;
  width: 100%;
  max-width: 600px;
  background-color: whitesmoke;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
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
  color: ${(props) => (props.disabled ? "white" : "white")};
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
