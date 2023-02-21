import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/LoginFeature/Login';
import Home from './Components/Home';
// import Login from "./Components/LoginFeature/Login";
import MainPage from "./Components/MainPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<MainPage />} />
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
