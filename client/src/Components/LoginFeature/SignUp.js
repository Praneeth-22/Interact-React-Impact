import React from "react";
import { useState } from "react";
import "./loginpage.css";
import photo from "./img/finallogo.jpg";
import { Link } from "react-router-dom";
import ChatBotIcon from "../ChatBotIcon";
import google from "./img/google.svg";
import { useNavigate } from "react-router-dom";
import bg from "./img/background.jpg";
import { useUserAuth } from "../../context/UserContextApi";
import { Alert } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Add from "./img/add.png";
import { auth, db, storage } from "../../firebase_service";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CircularProgress from "@mui/material/CircularProgress";
const SignUp = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  //loader
  const [isSubmitting, setIsSubmitting] = useState(false);
  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    /*navigate("/home");*/
    setIsSubmitting(true);
    const displayName = e.target[0].value;
    const useremail = e.target[1].value;
    const userpassword = e.target[2].value;
    const userAvator = e.target[3].files[0];
    if (!displayName || !useremail || !userpassword || !userAvator) {
      setInterval(() => {
        setError("");
      }, 5000);
      setError("Please fill all the fields");
      return;
    }
    if (userpassword.length < 6) {
      setInterval(() => {
        setError("");
      }, 5000);
      setError("Password should be atleast 6 characters long");
      return;
    }
    try {
      //  await signUp(email, password);
      //Create user
      const { user } = await createUserWithEmailAndPassword(
        auth,
        useremail,
        userpassword
      );
      //Create a unique image name
      const avatarName = `SignUp/${user.uid}-${new Date().getTime()}-${
        userAvator.name
      }`;
      const storageRef = ref(storage, avatarName);
      const snapshot = await uploadBytes(storageRef, userAvator);
      const avatarUrl = await getDownloadURL(snapshot.ref);
      console.log(" ---user id for creating ----", user.id);
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: displayName,
        email: useremail,
        avatarUrl: avatarUrl,
        password: userpassword,
      });

      await setDoc(doc(db, "userChats", user.uid), {});

      //  await setDoc(doc(db, "userChats", userDocRef.id), {});
      // Send email verification
      await sendEmailVerification(user);
      console.log("verification email sent");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
    setIsSubmitting(false);
  };
  return (
    <div className="signup">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
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
                  className="nav-link"
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
                  className="nav-link active"
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
                  fontWeight: "600",
                  letterSpacing: "1px",
                }}
              >
                Sign Up
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
                  Username :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
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
              <div className="mb-3">
                <input style={{ display: "none" }} type="file" id="file" />
                <label
                  htmlFor="file"
                  style={{
                    color: "#28104e",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {/* <img
                    src={Add}
                    alt=" "
                    style={{
                      width: "30px",
                      height: "20px",
                      marginRight: "8px",
                    }}
                  /> */}
                  <PersonAddIcon
                    sx={{
                      width: "30px",
                      height: "20px",
                      marginRight: "6px",
                    }}
                  />
                  <span
                    style={{
                      color: "#28104e",
                      fontWeight: "600",
                      fontSize: "12px",
                    }}
                  >
                    Add an avatar
                  </span>
                </label>
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
                  Sign Up
                </button>
              </div>
              <p
                className="forgot-password text-right"
                style={{
                  color: "#28104e",
                  // fontWeight: "600",
                  float: "right",
                  fontSize: "14px",
                  marginTop: "10px",
                }}
              >
                Already registered{" "}
                <span
                  style={{ color: "#28104e", fontWeight: "600", cursor: "pointer",fontSize:"16px" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Login?
                </span>
              </p>
              {isSubmitting && <CircularProgress color="secondary" />}
            </form>
          </div>
        </div>
      </div>

      <ChatBotIcon />
    </div>
  );
};

export default SignUp;
