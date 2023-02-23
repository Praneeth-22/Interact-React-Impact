import React from 'react'
import styled from "styled-components";
import { useState, useEffect } from "react";
import demopost from "./../../images/demoimg.jpg";
import Rating from "@mui/material/Rating";
import CommentIcon from "@mui/icons-material/Comment";
import StarIcon from "@mui/icons-material/Star";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Container from "react-bootstrap/Container";
import demo2 from "./../../images/demo2.jpg";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import { faker } from "@faker-js/faker";
function DemoPost(props) {
    const {mainimg} = props
      const [value, setValue] = useState(3);    
  return (
    <div>
      <Article>
        <SharedActor>
          <a>
            <img src={faker.image.avatar()} alt="user" />
            <div>
              <span>{faker.name.firstName()}</span>
              <span>{faker.lorem.words(3)}</span>
              <span>timestamp</span>
            </div>
          </a>
          <button>
            <MoreHorizIcon />
          </button>
        </SharedActor>
        <Description>Welcome to Ualbany </Description>
        <SharedImg>
          <a>
            {mainimg ? (
              <img src={mainimg} alt="demo" />
            ) : (
              <img src={demopost} alt="demo" />
            )}
           
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
  );
}
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
export default DemoPost
