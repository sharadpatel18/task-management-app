import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  const [showName, setShowName] = useState(false);
  const [name, setName] = useState({});

  useEffect(() => {
    const getName = () => {
      const data = localStorage.getItem("currentUser");
      if (data) {
        setName(JSON.parse(data));
      }
    };
    getName();
  }, [showName]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar name={name} />}>
            <Route index element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/login"
              element={<Login setShowName={setShowName} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
