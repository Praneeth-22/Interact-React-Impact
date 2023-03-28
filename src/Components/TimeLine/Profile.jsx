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
import { doc, updateDoc } from "firebase/firestore";

function Profile() {

  const fileInputRef = useRef(null);
  const { user, getUsersAPI } = useUserAuth();
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
  }, []);
  console.log("users in profile page is:", user);
  //changing the profile values
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [changeImg, setChangeImg] = useState(user.photoURL);
  const [userDocId, setUserDocId] = useState("");
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleNewProfileChanges = async (event) => {
    //update the changes into firebase user collection
    event.preventDefault();
    //store image into firebase storage
    const storageRef = ref(storage, `profilePictures/${user.displayName}/${user.uid}`);
    const snapshot = await uploadBytes(storageRef, photoUrl);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("File available at", downloadURL);
    //update the changes into firebase user collection with user id = uid

    const userRef = collection(db, "users");
    const q = query(userRef, where("uid", "==", user.uid));
    console.log("q is:", q);
    const querySnapshot = await getDocs(q);
    console.log("querySnapshot is:", querySnapshot);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserDocId(doc.id);
    });
    const userIdRef = doc(db, "users", userDocId);
    console.log("userIdRef is:", userIdRef);
    await updateDoc(userIdRef, {
      displayName: newName,
      avatarUrl: downloadURL,
      password: newPassword,
    });
    //update user authentaion data with new changes
    // await updateProfile(user, {
    //   displayName: newName,
    //   photoURL: downloadURL,
    // });

    // console.log("changes updated successfully",userIdRef)
    // console.log("user.uid is:", user.uid);
    // const userRef = doc(db, "users", user.uid);
    // console.log("userRef is:", userRef)
    // await updateDoc(userRef, {
    //   displayName: newName,
    //   avatarUrl: downloadURL,
    //   password: newPassword,
    // });

    //reset state variables
    setNewName("");
    setNewPassword("");
    // setProfilePicture("");
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
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        {/* <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleProfilePictureChange}
        /> */}
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
                {/* <PhotoCamera
                  fontSize="large"
                  sx={{
                    color: "white",
                    backgroundColor: "gray",
                    borderRadius: "50%",
                    p: 1,
                  }}
                /> */}
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
            defaultValue={user?.displayName}
            // onChange={(e) => setNewName(e.target.value)}
          />
          <TextField
            id="outlined-multiline-static"
            label="Email"
            disabled
            variant="outlined"
            defaultValue={user.email}
          />
          {/* <TextField
            id="outlined-multiline-static"
            label="Old Password"
            variant="outlined"
            disabled
            defaultValue={user.password}
          /> */}
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
          </FormControl> */}
          
        </div>
        <Box sx={{ mt: 2 }}>
          {/* <Button
            variant="contained"
            color="success"
            onClick={handleNewProfileChanges}
          >
            Save
          </Button> */}
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
