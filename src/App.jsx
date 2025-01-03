import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskDetails from "./components/TaskDetails";
import SubTaskForm from "./childcomponets/SubTaskForm";

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

  const handleChange = (value) => {
    setShowName(value)
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar name={name} handleChange={handleChange} showName={showName}/>}>
            <Route index element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/login"
              element={<Login handleChange={handleChange} showName={showName}/>}
            />
            <Route path="/taskform" element={<TaskForm />} />
            <Route path="/taskdetails/:id" element={<TaskDetails />} />
            <Route path="/subtaskform/:id" element={<SubTaskForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
