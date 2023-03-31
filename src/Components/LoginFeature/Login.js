import React from "react";
import "./loginpage.css";
import { useNavigate } from "react-router-dom";
import photo from "./img/finallogo.jpg";
import { Link } from "react-router-dom";
import google from "./img/google.svg";
import ChatBotIcon from "../ChatBotIcon";
import bg from "./img/background.jpg";
import { useUserAuth } from "../../context/UserContextApi";
import { useState } from "react";
import { Alert, stepClasses } from "@mui/material";
import GoogleButton from "react-google-button";
// import bg from './img/logintest2.svg';

const Login = () => {
  /*const navigate = useNavigate();*/
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const { logIn, googleSignIn } = useUserAuth(); // to get the logIn function from the context

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*navigate("/home");*/
    setError("");
    /*navigate("/home");*/
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="loginpage">
      <nav className="navbar navbar-expand-lg navbar-light  fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            <img
              src={photo}
              class="img-circle"
              width="40"
              height="40"
              alt="pic"
            />
          </Link>
          <div id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  className="nav-link my-nav-item active"
                  to={"/"}
                  style={{
                    color: "white",
                  }}
                >
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={"/sign-up"}
                  style={{
                    color: "white",
                  }}
                >
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="notNav">
        <img src={bg} className="bgImg" alt="bg" />
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={handleSubmit}>
              <h3>Login</h3>
              {error && <Alert variant="danger">{error}</Alert>}
              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    color: "white",
                    backgroundColor: "#28104e",
                  }}
                >
                  Sign In
                </button>
              </div>
              <div className="d-grid mt-2">
                <button
                  type="submit"
                  className="googleBtn"
                  onClick={handleGoogleSignIn}
                >
                  <a>Sign In via Google</a>&nbsp;&nbsp;
                  <img src={google} alt="click" />
                </button>
              </div>
            </form>
          </div>
        </div>
        <ChatBotIcon />
      </div>
    </div>
  );
};

export default Login;
