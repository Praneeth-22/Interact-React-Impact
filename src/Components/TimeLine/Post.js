import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
// import user from "../images/user.svg";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import {faker} from '@faker-js/faker'
function Post(props) {
  const { isOpen, setIsOpen } = props;
  const [text, setText] = useState("");
  console.log("at posts-->props :", props);
  return (
    <>
      {isOpen && (
        <Container>
          <Content>
            <Header>
              <h2>Create a Post</h2>
              <button
                onClick={(e) => {
                  setIsOpen(false);
                }}
              >
                <CloseIcon className="close" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                <img src={faker.image.avatar()} alt="" />
                <span>Name</span>
              </UserInfo>
              <Editor>
                <textarea
                  placeholder="Hi, there..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton>
                  <AddPhotoAlternateOutlinedIcon />
                </AssetButton>
                <AssetButton>
                  <NotesOutlinedIcon />
                </AssetButton>
              </AttachAssets>
              <PostButton>Post</PostButton>
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
  color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "white")};
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

export default Post;
