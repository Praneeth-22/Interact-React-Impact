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
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  /*const navigate = useNavigate();*/
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const { logIn, googleSignIn, forgotPasswordAPI } = useUserAuth(); // to get the logIn function from the context
//loader
const [isSubmitting, setIsSubmitting] = useState(false);
//
  const handleSubmit = async (e) => {
    e.preventDefault();
   setIsSubmitting(true);
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
    setIsSubmitting(false);
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
              style={{
                borderRadius: "50%",
              }}
              alt="pic"
            />
          </Link>
          <div id="NavEle">
            <ul className="navbar-nav ">
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
              <h3
                style={{
                  color: "#28104e",
                  fontWeight: "700",
                  letterSpacing: "1px",
                }}
              >
                Login
              </h3>
              {error && <Alert variant="danger">{error}</Alert>}
              <div className="mb-3">
                <label
                  style={{
                    color: "#28104e",
                    fontWeight: "600",
                    fontSize: "12px",
                  }}
                >
                  Email :
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label
                  style={{
                    color: "#28104e",
                    fontWeight: "600",
                    fontSize: "12px",
                  }}
                >
                  Password :
                </label>
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  float: "right",
                  alignItems: "flex-end",
                }}
              >
                <span
                  className="forgot-password text-right"
                  style={{
                    color: "#28104e",
                    marginTop: "6px",
                    float: "right",
                    marginButtom: "0px",
                  }}
                >
                  Forgot password{" "}
                  <span
                    style={{
                      color: "#28104e",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate("/forgot-password");
                    }}
                  >
                    {" "}
                    {`reset?`}
                  </span>
                </span>
                <span
                  className="forgot-password text-right"
                  style={{
                    color: "#28104e",
                    float: "right",
                  }}
                >
                  Don't have an account?{" "}
                  <span
                    style={{
                      color: "#28104e",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate("/sign-up");
                    }}
                  >
                    {" "}
                    {`signup`}
                  </span>
                </span>
              </div>
              {isSubmitting && <CircularProgress color="secondary" />}
            </form>
            <ChatBotIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
