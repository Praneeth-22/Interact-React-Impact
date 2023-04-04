import React, { useState, useEffect, useContext } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { ChatContext } from "../ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase_service";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
export default function Input() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [avatarUrl, setavatarUrl] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    console.log("user in Chats:", currentUser);
    const prepareData = {
      displayName: currentUser?.displayName,
      email: currentUser?.email,
      avatarUrl: currentUser?.avatarUrl,
    };
    setavatarUrl(prepareData?.avatarUrl);
    setDisplayName(prepareData?.displayName);
    setEmail(prepareData?.email);
  }, [currentUser]);
  //
  const { data } = useContext(ChatContext);
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, `Chats/${currentUser.uid}/${uuid()}`);

      const uploadTask =  uploadBytesResumable(storageRef, img);

      // uploadTask.on(
      
      //   (error) => {
      //     //TODO:Handle Error
      //   },
      //    () => {
      //      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      //       await updateDoc(doc(db, "chats", data.chatId), {
      //         messages: arrayUnion({
      //           id: uuid(),
      //           text,
      //           senderId: currentUser.uid,
      //           date: Timestamp.now(),
      //           img: downloadURL,
      //         }),
      //       });
      //     })
      //     .catch((error) => {
      //       // TODO: Handle download URL error
      //       console.log("--------error in img send--------",error);
      //     })
      //   }
      // );
      uploadTask
        .then((snapshot) => {
          // Upload completed successfully, get download URL
          return getDownloadURL(snapshot.ref);
        })
        .then(async (downloadURL) => {
          // Update the database with the download URL
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        })
        .catch((error) => {
          // Handle any errors
          console.log("--------error in img send--------", error);
        });
    } else {
      console.log("no img");
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    console.log("send");
    setText("");
    setImg(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type a message"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        {/* <img src={Attach} alt="send" /> */}
        <input
          type="file"
          style={{
            display: "none",
          }}
          id="file"
          onChange={(e) => {
            setImg(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
          // value={img}
        />
        <label htmlFor="file">
          <img src={Img} alt="file" style={{
            cursor: "pointer",
            
          }}/>
        </label>
        <button
          onClick={handleSend}
          style={{
            backgroundColor: text || img ? "#6237a0" : "#9e9e9e",
            cursor: text || img ? "pointer" : "not-allowed",
            borderRadius: "15px",
            border: "none",
            color: "white",
            padding: "10px 20px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "14px",
            margin: "4px 2px",
          }}
        >
          send
        </button>
      </div>
    </div>
  );
}
