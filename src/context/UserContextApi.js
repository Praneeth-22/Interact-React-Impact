import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
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
  doc,where,
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

  // function logIn(email, password) {
  //   // to sign in the user
  //   return signInWithEmailAndPassword(auth, email, password).then((user) => {
  //     console.log("user in usercontext:", user);
  //     // setUser(user);
  //     //get the current user email from user collection and set it to the user object
  //     const userRef = collection(db, "users");
  //     const q = query(userRef, orderBy("email", "asc"));
  //     onSnapshot(q, (querySnapshot) => {
  //       const users = [];
  //       querySnapshot.forEach((doc) => {
  //         users.push({ ...doc.data(), id: doc.id });
  //       });
  //       const currentUser = users.filter((u) => u.email === user.user.email);
  //       console.log("currentUser:", currentUser);
  //       //console log current user mail id
  //       console.log("currentUser[0]:", currentUser[0]);
  //       const preparedUser = {
  //         displayName: currentUser[0].displayName,
  //         email: currentUser[0].email,
  //         photoURL: currentUser[0].avatarUrl,
  //         password: currentUser[0].password,
  //         uid: currentUser[0].uid,
  //       };
  //       setUser(preparedUser);
  //       localStorage.setItem("user", JSON.stringify(preparedUser));
  //       console.log("user in localStorage:", user);
  //     });
  //     //storing user in local storage
  //   });
  // }
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
            photoURL: currentUser.avatarUrl,
            password: currentUser.password,
            uid: currentUser.uid,
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
  //  function googleSignIn() {
  //   // to sign in the user using google
  //   const googleAuthProvider = new GoogleAuthProvider();
  //   return signInWithPopup(auth, googleAuthProvider).then(async (user) => {
  //     console.log("user in usercontext:", user);
  //     // add user into collection if not exist


  //     console.log(user.user.photoURL)
  //     const displayName = user.user.displayName;
  //     const useremail = user.user.email;
  //     const userAvator = user.user.photoURL;
  //     const avatarName = `${user.user.uid}-${new Date().getTime()}-${
  //       userAvator.name
  //     }`;
  //     const storageRef = ref(storage, `googleSignimages/${avatarName}`);
  //     const snapshot = await uploadBytes(storageRef, userAvator);
  //     const avatarUrl = await getDownloadURL(snapshot.ref);
  //     const userDocRef = await addDoc(collection(db, "users"), {
  //       uid: user.user.uid,
  //       displayName: displayName,
  //       email: useremail,
  //       avatarUrl: avatarUrl,
  //     });
  //     console.log("User added with ID: ", userDocRef.id);
  //     await setDoc(doc(db, "userChats", userDocRef.id), {});
  //       //
  //     const userRef = collection(db, "users");
  //     const q = query(userRef, orderBy("email", "asc"));
  //     onSnapshot(q, (querySnapshot) => {
  //       const users = [];
  //       querySnapshot.forEach((doc) => {
  //         users.push({ ...doc.data(), id: doc.id });
  //       });
  //       const currentUser = users.filter((u) => u.email === user.user.email);
  //       console.log("currentUser:", currentUser);
  //       //console log current user mail id
  //       console.log("currentUser[0]:", currentUser[0]);
  //       const preparedUser = {
  //         displayName: currentUser[0].displayName,
  //         email: currentUser[0].email,
  //         photoURL: currentUser[0].avatarUrl,
  //         password: currentUser[0].password,
  //         uid: currentUser[0].uid,
  //       };
  //       console.log("preparedUser in user context:", preparedUser)
  //       setUser(preparedUser);
  //       localStorage.setItem("user", JSON.stringify(preparedUser));
  //       console.log("user in localStorage:", user);
  //     });
  //   });
  // }
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
         const avatarName = `${user.user.uid}-${new Date().getTime()}-${
           userAvator.name
         }`;
         const storageRef = ref(storage, `googleSignimages/${avatarName}`);
         const snapshot = await uploadBytes(storageRef, userAvator);
         const avatarUrl = await getDownloadURL(snapshot.ref);
        //  const userDocRef = await addDoc(collection(db, "users"), {
        //    uid: user.user.uid,
        //    displayName: displayName,
        //    email: useremail,
        //    avatarUrl: avatarUrl,
        //  });
        //  console.log("User added with ID: ", userDocRef.id);
        //  await setDoc(doc(db, "userChats", userDocRef.uid), {});
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
           photoURL: avatarUrl,
           uid: user.user.uid,
         };
         setUser(preparedUser);
         // localStorage.setItem("user", JSON.stringify(preparedUser));
       } else {
         const preparedUser = {
           displayName: currentUser.displayName,
           email: currentUser.email,
           photoURL: currentUser.avatarUrl,
           uid: currentUser.uid,
         };
         setUser(preparedUser);
         // localStorage.setItem("user", JSON.stringify(preparedUser));
          localStorage.setItem("user", JSON.stringify(preparedUser));
       }
     });
   }

  function postArticleAPI(payload) {
    // to post the article
    setLoading(true); // to start the loading

    if (payload.image !== "") {
      const storageRef = ref(storage, `images/${payload.image.name + v4()}`);
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
                image: payload.user.photoURL,
              },
              video: payload.video,
              sharedImg: downloadURL,
              comments: 0,
              description: payload.description,
              likes: [],
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
            image: payload.user.photoURL,
          },
          video: payload.video,
          sharedImg: "",
          comments: 0,
          description: payload.description,
          likes: 0,
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
            image: payload.user.photoURL,
          },
          video: "",
          sharedImg: "",
          comments: 0,
          description: payload.description,
          likes: 0,
        });
        setLoading(false); // to stop the loading
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.log("Error adding document: ", error);
      }
    }
  }

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
    const q = query(collection(db, "events"));
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

  //get current user data
  function currUserInfoAPI() {}
  //get users
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
      }} // to provide the context to the children
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
