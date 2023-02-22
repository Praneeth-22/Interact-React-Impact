import React from 'react'
import './loginpage.css'
import { useNavigate } from "react-router-dom";
import photo from './img/finallogo.jpg'
import { Link } from "react-router-dom";
import google from './img/google.svg'
import ChatBot from "../ChatBot";

function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  }
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
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link my-nav-item" to={"/"}>
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <div className="d-grid mt-2">
              <button type="submit" className="googleBtn">
                <a>Sign In via Google</a>&nbsp;&nbsp;
                <img src={google} alt="click" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <ChatBot />
    </div>
  );
}

export default Login