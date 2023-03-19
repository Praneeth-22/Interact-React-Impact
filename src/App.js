import "./App.css";
import '../src/Components/Chat/style.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/LoginFeature/Login";
import MainPage from "./Components/MainPage";
import SignUp from "./Components/LoginFeature/SignUp";
import Category from "./Components/Caterogy";
// import Chat from "./Components/Chat/Chatpage";
import Event from "./Components/TimeLine/Event";
import { UserAuthContextProvider } from "./context/UserContextApi";
import Register from '../src/Components/Chat/Register';
import ChatLogin from '../src/Components/Chat/Login';
import Profile from '../src/Components/TimeLine/Profile';
import ProtectedRoute from '../src/Components/LoginFeature/ProtectedRoute';
//
function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
      <Router>
       
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><Event /></ProtectedRoute>} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
          <Route exact path="/login" element={<Login />}></Route>
          {/* <Route path="/chat" element={<Chat />} /> */}
          <Route path="/chat-register" element={<Register />}/>
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/chat-login" element={<ChatLogin />}/>
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        </Routes>
        
      </Router>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
