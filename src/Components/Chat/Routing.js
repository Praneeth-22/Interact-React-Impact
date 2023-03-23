import Home from "./ChatHome";
import Login from "./Login";
import Register from "./Register";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Chat/AuthContext";

function Routing() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/chat-register" />;
    }

    return children
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat-login">
          {/* <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          /> */}
          <Route path="/chat-login" element={<Login />} />
          <Route path="/chat-register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing
