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

function Profile() {

  const fileInputRef = useRef(null);
  const {  getUsersAPI } = useUserAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  const [photoUrl, setPhotoUrl] = useState("");
  const [displayName, setDisplayName] = useState("");
  console.log("user in profile page is:", user);
  //
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      console.log("Selected file:", file);
      console.log("File data URL:", dataUrl);
      setChangeImg(dataUrl);
      setPhotoUrl(dataUrl); 
      console.log("------changed photoUrl:-------", photoUrl);
    };
  };
  // Send reader to server using fetch or axios
  // Save the dataUrl in your database

  const handleEditPictureClick = () => {
    fileInputRef.current.click();
  };
  useEffect(() => {
    if (user) {
      setPhotoUrl(user.photoURL);
      setDisplayName(user.displayName);
      console.log("user in useeffect profile page is:", user);
    }
  }, [user]);
  console.log("users in profile page is:", user);
  //changing the profile values
  const [newPassword, setNewPassword] = useState(user?.password);
  const [newName, setNewName] = useState(displayName);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [changeImg, setChangeImg] = useState(photoUrl);
  const [userDocId, setUserDocId] = useState("");
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleNewProfileChanges = async (event) => {
      event.preventDefault();
      const userDoc = await getDocs(
        query(
          collection(db, "users"),
          where("email", "==", user.email)
        )
      );
      userDoc.forEach((doc) => {
        setUserDocId(doc.id);
      }
      );
      console.log("userDocId of updating profile-------------------is:", userDocId);
      //
      const userDocRef = doc(db, "users", userDocId);
      console.log("photoUrl", photoUrl)
      console.log("values", newName, changeImg, newPassword)
      await updateDoc(userDocRef, {
        displayName: newName,
        avatarUrl: changeImg,
        password: newPassword,
      });
      console.log("after updating the profile page -------------------is:", userDocId);
      //update the user in local storage
      const updatedUser = {
        ...user,
        displayName: newName,
        photoURL: changeImg,
        password: newPassword,
      }
      localStorage.setItem("user", JSON.stringify(updatedUser));
      //update the user in context
      getUsersAPI();
  };

  return (
    <div>
      <Typography
        id="transition-modal-title"
        variant="h6"
        component="h2"
        style={{ fontWeight: "bold" }}
      >
        Profile : {user.displayName}
      </Typography>
      {/* <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleProfilePictureChange}
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            sx={{ mb: 1 }}
            onClick={handleEditPictureClick}
          >
            <div style={{ position: "relative" }}>
              <Avatar
                alt="Profile Picture"
                src={photoUrl}
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
      </Box> */}
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleProfilePictureChange}
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            sx={{ mb: 1 }}
            onClick={handleEditPictureClick}
          >
            <div style={{ position: "relative" }}>
              <Avatar
                alt="Profile Picture"
                src={photoUrl}
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
          />
          <TextField
            id="outlined-multiline-static"
            label="Email"
            disabled
            variant="outlined"
            defaultValue={user.email}
          />
          <TextField
            id="outlined-multiline-static"
            label="Old Password"
            variant="outlined"
            disabled
            defaultValue={user.password}
          />
          {/* <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              New Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showNewPassword ? "text" : "password"}
              onChange={(e) => setNewPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
           */}
        </div>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleNewProfileChanges}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ ml: 2 }}
            onClick={() => (window.location.href = "/home")}
          >
            Close
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Profile;
