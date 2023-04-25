import {
  Typography,
  TextField,
  Box,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import React, { useState, useRef, useEffect } from "react";
import { useUserAuth } from "../../context/UserContextApi";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  getDownloadURL,
  uploadBytes,
  ref,
  getMetadata,
  uploadBytesResumable,
  Timestamp,
} from "firebase/storage";
import { auth, storage, db } from "../../firebase_service";
import {
  addDoc,
  getDocs,
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import _ from "lodash";
import { GoogleMap, Autocomplete } from "@react-google-maps/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { getUsersAPI } = useUserAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  const [avatarUrl, setavatarUrl] = useState();
  const [displayName, setDisplayName] = useState(user?.displayName);
  const [location, setLocation] = useState(user?.location);
  // const [bio, setBio] = useState(user?.bio);
  const [pno, setPno] = useState(user?.contact_no);
  const [userUniversity, setUserUniversity] = useState(user?.userUniversity);
  const [bio, setBio] = useState(user?.bio);
  // console.log("user in profile page is:", user);
  //
  const [changeImg, setChangeImg] = useState("");
  const [storeImg, setatoreImg] = useState("");

  const handleProfilePictureChange = async (event) => {
    event.preventDefault();
    console.log("event.target.files[0]:", event.target.files[0]);
    const file = event.target.files[0];
    console.log("file:", file);
    setChangeImg(file.name);
    try {
      const storageRef = ref(
        storage,
        `users/${user?.uid}/profilePicture//${file.name + v4()}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          if (snapshot.state === "running") {
            console.log("Upload is running");
          }
        },
        (error) => {
          console.log(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
          setavatarUrl(downloadURL);
          console.log("avatarUrl", avatarUrl);
        }
      );
    } catch (err) {
      console.log("error in storageRef:", err);
    }
  };

  console.log("*************** updated url", avatarUrl);

  const [newPassword, setNewPassword] = useState(user?.password);
  const [newName, setNewName] = useState(displayName);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [userDocId, setUserDocId] = useState("");
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleNewProfileChanges = async (event) => {
    event.preventDefault();
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("avatarUrl", avatarUrl);
    const userDoc = await getDocs(
      query(collection(db, "users"), where("email", "==", user.email))
    );
    let docNum;
    userDoc.forEach((doc) => {
      docNum = doc.id;
    });
    console.log("userDocId of updating profile-------------------is:", docNum);
    //
    const userDocRef = doc(db, "users", docNum);
    console.log("avatarUrl", avatarUrl);
    console.log("values", newName, changeImg, newPassword);
    const payload = {
      ...user,
      displayName: newName ? newName : user.displayName,
      avatarUrl: avatarUrl ? avatarUrl : user.avatarUrl,
      password: newPassword ? newPassword : user.password,
      location: location ? location : user.location,
      userUniversity: userUniversity ? userUniversity : user.userUniversity,
      contact_no: pno ? pno : user.contact_no,
      bio: bio ? bio : user.bio,
    };
    console.log("---------------------------payload", payload);
    await updateDoc(userDocRef, payload);
    console.log(
      "after updating the profile page -------------------is:",
      userDocId
    );
    //update the user in local storage
    const updatedUser = {
      ...user,
      displayName: newName ? newName : user.displayName,
      avatarUrl: avatarUrl ? avatarUrl : user.avatarUrl,
      password: newPassword ? newPassword : user.password,
      location: location ? location : user.location,
      userUniversity: userUniversity ? userUniversity : user.userUniversity,
      contact_no: pno ? pno : user.contact_no,
      bio: bio ? bio : user.bio,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    //update the user in context
    getUsersAPI();
    toast("updated profile", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    
  };
  const handleEditPictureClick = () => {
    fileInputRef.current.click();
  };
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setPno(value);

    const isValidPhoneNumber = /^\d{10}$/.test(value);
    if (!isValidPhoneNumber) {
      setErrorMessage("Phone number must be a 10-digit number");
    } else {
      setErrorMessage("");
    }
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Typography
        id="transition-modal-title"
        variant="h6"
        component="h2"
        style={{ fontWeight: "bold", color: "#28104E", letterSpacing: "1px" }}
      >
        Profile : {_.capitalize(user.displayName)}
      </Typography>
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <input
          type="file"
          accept="image/*"
          name="name"
          id="file"
          ref={fileInputRef}
          // value={user.avatarUrl}
          style={{ display: "none" }}
          onChange={handleProfilePictureChange}
        />
        <label htmlFor="file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            sx={{ mb: 1 }}
            // onClick={handleEditPictureClick}
          >
            <div style={{ position: "relative" }}>
              <Avatar
                alt="Profile Picture"
                src={avatarUrl !== undefined ? avatarUrl : user.avatarUrl}
                sx={{ width: 90, height: 90 }}
              />
              <div style={{ position: "absolute", bottom: 0, right: 0 }}>
                <PhotoCamera
                  fontSize="large"
                  sx={{
                    color: "white",
                    backgroundColor: "gray",
                    borderRadius: "50%",
                    p: 1,
                  }}
                />
              </div>
            </div>
          </IconButton>
        </label>
      </Box>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Name"
            variant="outlined"
            defaultValue={user.displayName}
            onChange={(e) => setNewName(e.target.value)}
            size="small"
          />
          <TextField
            id="outlined-multiline-static"
            label="Email"
            disabled
            variant="outlined"
            defaultValue={user.email}
            size="small"
          />
          <TextField
            id="outlined-multiline-static"
            label="location"
            variant="outlined"
            defaultValue={user?.location}
            onChange={(e) => setLocation(e.target.value)}
            size="small"
          />
          <TextField
            id="outlined-multiline-static"
            label="Phone Number"
            variant="outlined"
            defaultValue={user?.contact_no}
            onChange={handleInputChange}
            size="small"
          />
          {errorMessage && <div style={{ color: "red" ,
          fontSize:"12px",
          fontWeight:"bold",
          letterSpacing:"1px",
          marginTop:"5px",
          float:"right"
          }}>{errorMessage}</div>}
          <TextField
            id="outlined-multiline-static"
            label="University"
            variant="outlined"
            defaultValue={user.userUniversity}
            onChange={(e) => setUserUniversity(e.target.value)}
            size="small"
          />
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "90%" },
            }}
          >
            <TextField
              id="outlined-multiline-static"
              label="Bio"
              variant="outlined"
              defaultValue={user?.bio}
              onChange={(e) => setBio(e.target.value)}
              size="small"
              multiline
              row={3}
            />
          </Box>
        </div>
        <Box sx={{ mt: 2, float: "right" }}>
          <Button
            variant="outlined"
            color="error"
            sx={{
              mr: 2,
              // color: "#28104E",
              // borderColor: "#28104E",
            }}
            onClick={() => (window.location.href = "/home")}
          >
            Close
          </Button>
          <Button
            variant="contained"
            // color="success"
            sx={{ mr: 2, color: "white", backgroundColor: "#28104E" }}
            onClick={handleNewProfileChanges}
          >
            Save
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Profile;
