import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  //
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [avatarUrl, setavatarUrl] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    console.log("user in chat context :", currentUser);
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
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  console.log(state, dispatch);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
