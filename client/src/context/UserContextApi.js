import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";
import axios from "axios";
import { auth, storage, db } from "../firebase_service";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import {
  getDownloadURL,
  uploadBytes,
  ref,
  getMetadata,
  uploadBytesResumable,
  Timestamp,
} from "firebase/storage";
import {
  addDoc,
  getDocs,
  collection,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  doc,
  where,
  updateDoc,
} from "firebase/firestore";
import { v4 } from "uuid";
//

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({}); // to store the user object from firebase
  const [loading, setLoading] = useState(true); // to check if the user is logged in or not
  const [articles, setArticles] = useState([]); // to store the articles from firebase
  const [postLiked, setPostLiked] = useState([]); // to store the liked posts
  const [event, setEvent] = useState([]); // to store the events from firebase
  const [changeEmail, setChangeEmail] = useState("");

  function logIn(email, password) {
    // to sign in the user
    return signInWithEmailAndPassword(auth, email, password).then((user) => {
      console.log("user in usercontext:", user);
      // setUser(user);
      //get the current user email from user collection and set it to the user object
      const userRef = collection(db, "users");
      const q = query(userRef, where("email", "==", user.user.email));
      getDocs(q)
        .then((querySnapshot) => {
          const currentUser = querySnapshot.docs[0].data();
          console.log("currentUser:", currentUser);
          const preparedUser = {
            displayName: currentUser.displayName,
            email: currentUser.email,
            avatarUrl: currentUser.avatarUrl,
            password: currentUser.password,
            uid: currentUser.uid,
            contact_no: currentUser.contact_no,
            location: currentUser.location,
            userUniversity: currentUser.userUniversity,
            bio: currentUser.bio,
          };
          setUser(preparedUser);
          console.log("user in userContext after setUser:", user);
          localStorage.setItem("user", JSON.stringify(preparedUser));
        })
        .catch((error) => {
          console.log("Error getting user information: ", error);
        });
      //storing user in local storage
    });
  }
  function signUp(email, password) {
    // to sign up the user
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    // to sign out the user
    localStorage.removeItem("user");
    return signOut(auth); //firebase service to signOut
    //empty local storage
  }

  function googleSignIn() {
    // to sign in the user using google
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider).then(async (user) => {
      const userRef = collection(db, "users");
      const q = query(userRef, where("email", "==", user.user.email));
      const querySnapshot = await getDocs(q);
      const currentUser = querySnapshot.docs.map((doc) => doc.data())[0];
      if (!currentUser) {
        const displayName = user.user.displayName;
        const useremail = user.user.email;
        const userAvator = user.user.photoURL;
        const avatarName = `${
          user.user.uid
        }-${new Date().getTime()}-avatar.jpg`;
        const storageRef = ref(storage, `googleSignimages/${avatarName}`);
        const snapshot = await uploadBytes(storageRef, userAvator);
        const avatarUrl = await getDownloadURL(snapshot.ref);
        await setDoc(doc(db, "users", user.user.uid), {
          uid: user.user.uid,
          displayName: displayName,
          email: useremail,
          avatarUrl: avatarUrl,
        });
        await setDoc(doc(db, "userChats", user.user.uid), {});

        const preparedUser = {
          displayName,
          email: useremail,
          avatarUrl: avatarUrl,
          uid: user.user.uid,
        };
        setUser(preparedUser);
        localStorage.setItem("user", JSON.stringify(preparedUser));
      } else {
        const preparedUser = {
          displayName: currentUser.displayName,
          email: currentUser.email,
          avatarUrl: currentUser.avatarUrl,
          uid: currentUser.uid,
        };
        setUser(preparedUser);
        localStorage.setItem("user", JSON.stringify(preparedUser));
        // localStorage.setItem("user", JSON.stringify(preparedUser));
      }
    });
  }

  const postArticleAPI = async (payload) => {
    // to post the article
    setLoading(true); // to start the loading

    if (payload.image !== "") {
      const storageRef = ref(storage, `Articles/${payload.image.name + v4()}`);
      const upload = uploadBytesResumable(storageRef, payload.image);
      console.log("upload img:", upload);
      upload.on(
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
          console.log(error.code);
        },
        async () => {
          const downloadURL = await getDownloadURL(storageRef);
          try {
            const metadata = await getMetadata(storageRef);
            console.log("File available at", downloadURL);
            const docRef = await addDoc(collection(db, "articles"), {
              actor: {
                email: payload.user.email,
                title: payload.user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                image: payload.user.avatarUrl,
              },
              video: payload.video,
              sharedImg: downloadURL,
              comments: 0,
              description: payload.description,
              likes: [],
              tag: payload.tag,
            });
            setLoading(false); // to stop the loading
            console.log("Document written with ID: ", docRef.id);
          } catch (error) {
            console.log("Error adding document: ", error);
          }
        }
      );
    } else if (payload.video !== "") {
      // for video
      setLoading(true); // to start the loading

      try {
        const docRef = addDoc(collection(db, "articles"), {
          actor: {
            email: payload.user.email,
            title: payload.user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            image: payload.user.avatarUrl,
          },
          video: payload.video,
          sharedImg: "",
          comments: 0,
          description: payload.description,
          likes: 0,
          tag: payload.tag,
        });
        setLoading(false); // to stop the loading
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.log("Error adding document: ", error);
      }
    } else {
      // for text only
      setLoading(true); // to start the loading

      try {
        const docRef = addDoc(collection(db, "articles"), {
          actor: {
            email: payload.user.email,
            title: payload.user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            image: payload.user.avatarUrl,
          },
          video: "",
          sharedImg: "",
          comments: 0,
          description: payload.description,
          likes: 0,
          tag: payload.tag,
        });
        setLoading(false); // to stop the loading
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.log("Error adding document: ", error);
      }
    }
    // sending email notification
    //get all users email from database
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => doc.data());
    console.log("users:", users);
    //send email to all users
    //get user information from local storage
    const userLocal = JSON.parse(localStorage.getItem("user"));
    // console.log("------------------userLocal:--------------------", userLocal);
    // const userAuth = auth.currentUser;
    // console.log("------------------userAuth:--------------------", userAuth.displayName);
    // const currUser = user.displayName;
    // console.log("=========================currUser:===========================", currUser);
    users.forEach((u) => {
      axios
        .post(`https://interact-react-impact.herokuapp.com/sendEmail`, {
          email: u.email,
          subject: "New Post Added",
          info: {
            type: "userPost",
            category: payload.tag,
            des: userLocal.displayName + " has uploaded a new post",
          },
        })
        .then((res, req) => {
          console.log(" at client-sideemail sent");
        })
        .catch((err) => {
          console.log(" at client-sideemail not sent", err);
        });
    });
  };

  function getArticlesAPI() {
    // to get the articles
    setLoading(true); // to start the loading
    const q = query(
      collection(db, "articles"),
      orderBy("actor.timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const payload = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        article: doc.data(),
      }));
      console.log("database data:", payload);
      setLoading(false); // to stop the loading
      setArticles(payload);
    });
    return unsubscribe;
  }
  function getEventsAPI() {
    //get data from events collection
    setLoading(true); // to start the loading
    const q = query(collection(db, "events"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const payload = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        event: doc.data(),
      }));
      console.log("event data:", payload);
      setLoading(false); // to stop the loading
      setEvent(payload);
    });
    console.log("in userContext event:", event);
    return unsubscribe;
  }

  // function forgotPasswordAPI(email) {
  //   return sendPasswordResetEmail(auth, email,{
  //     url: "http://localhost:3000/login",
  //   }).then((res)=>{
  //     console.log("password reset email sent");

  //     // change the user password info in the user collections

  //   }).catch((error)=>{
  //     console.log("error:",error);
  //   })
  // }

  //get current user data

  //get users
  function forgotPasswordAPI(email) {
    return sendPasswordResetEmail(auth, email, {
      url: "https://interact-react-impact.herokuapp.com/",
    })
      .then((res) => {
        console.log("password reset email sent");

        // update user's password in Firebase Authentication
        const newPassword = "new-password"; // replace with new password
        const user = auth.currentUser;
        if (user) {
          user
            .updatePassword(newPassword)
            .then(() => {
              console.log("user password updated successfully");
              // update user's password in your user collection in database
              const userId = user.uid; // get user id
              const userRef = collection("users").doc(userId);
              userRef
                .update({
                  password: newPassword,
                })
                .then(() => {
                  console.log("user password updated in database successfully");
                })
                .catch((error) => {
                  console.error(
                    "error updating user password in database",
                    error
                  );
                });
            })
            .catch((error) => {
              console.error(
                "error updating user password in Firebase Authentication",
                error
              );
            });
        } else {
          console.log("user not found");
        }
      })
      .catch((error) => {
        console.log("error in forgot password:", error);
      });
  }

  function getUsersAPI() {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const payload = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        user: doc.data(),
      }));
      console.log("user data:", payload);
      setLoading(false); // to stop the loading
      setUser(payload);
    });
    console.log("in userContext event:", event);
    return unsubscribe;
  }
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      // to check if the user is logged in or not
      console.log("Auth", currentuser);
      setUser(currentuser);
    }); //firebase service to check if the user is logged in or not

    return () => {
      // to unsubscribe the listener
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider // to provide the context to the children
      value={{
        user,
        loading,
        signUp,
        logIn,
        googleSignIn,
        logOut,
        postArticleAPI,
        getArticlesAPI,
        articles,
        event,
        getEventsAPI,
        getUsersAPI,
        forgotPasswordAPI,
      }} // to provide the context to the children
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
