import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/LoginFeature/Login";
import MainPage from "./Components/MainPage";
import SignUp from "./Components/LoginFeature/SignUp";
import Category from "./Components/Caterogy";
import Chat from "./Components/Chat/Chatpage";
import Event from "./Components/TimeLine/Event";
import { UserAuthContextProvider } from "./context/UserContextApi";
function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
      <Router>
       
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/events" element={<Event />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/category" element={<Category />} />
          <Route exact path="/login" element={<Login />}></Route>
          <Route path="/chat" element={<Chat />} />
        </Routes>
        
      </Router>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
