import React from 'react'
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
  import { toast, ToastContainer } from "react-toastify";
function ForgotPass() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");

    const { logIn, googleSignIn, forgotPasswordAPI } = useUserAuth(); // to get the logIn function from the context

    const handleSubmit = async (e) => {
      e.preventDefault();
      /*navigate("/home");*/
      setError("");
      /*navigate("/home");*/
      try {
        await forgotPasswordAPI(email).then((result) => {
            console.log("req send");
            console.log(result);
            navigate("/login");
        }).catch((err) => {
            console.log("error in reset",err);
            setError(err.message);
        });
        
      } catch (err) {
        setError(err.message);
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
              <h3>Reset Password</h3>
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
              <div className="d-grid" style={{
                    marginTop: "20px",
                    marginBottom: "15px",
              }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    color: "white",
                    backgroundColor: "#28104e",
                  }}
                >
                  Submit
                </button>
              </div>
            
              <p className="forgot-password text-right">
                Wanna login ?  <a href="/login"> Sign In</a>
              </p>
            </form>
          </div>
        </div>
        <ChatBotIcon />
      </div>
    </div>
  );
}

export default ForgotPass
