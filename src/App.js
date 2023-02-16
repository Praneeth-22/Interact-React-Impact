import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import MainPage from './Components/MainPage';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/home" element={<MainPage/>
          }>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
