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
import Profile from '../src/Components/TimeLine/Profile';
import ChatHome from '../src/Components/Chat/ChatHome';
import ProtectedRoute from '../src/Components/LoginFeature/ProtectedRoute';
import { ChatContextProvider } from '../src/Components/Chat/ChatContext';
//
function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <ChatContextProvider>
          <Router>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <MainPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/events"
                element={
                  <ProtectedRoute>
                    <Event />
                  </ProtectedRoute>
                }
              />
              <Route path="/sign-up" element={<SignUp />} />
              <Route
                path="/category"
                element={
                  <ProtectedRoute>
                    <Category />
                  </ProtectedRoute>
                }
              />
              <Route exact path="/login" element={<Login />}></Route>
              {/* <Route path="/chat" element={<Chat />} /> */}
              <Route path="*" element={<h1>404 Not Found</h1>} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chat-home"
                element={
                  <ProtectedRoute>
                    <ChatHome />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </ChatContextProvider>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
