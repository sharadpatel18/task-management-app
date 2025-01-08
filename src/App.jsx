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
import History from "./components/TaskHistory";
import TaskHistoryDetails from "./components/TaskHistoryDetails";

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
            <Route path="/taskform/:id" element={<TaskForm isEdit={true}/>} />
            <Route path="/taskform" element={<TaskForm isEdit={false}/>} />
            <Route path="/history" element={<History />} />
            <Route path="/taskdetails/:id" element={<TaskDetails />} />
            <Route path="/subtaskform/:id" element={<SubTaskForm />} />
            <Route path="/taskdetailhistory/:id" element={<TaskHistoryDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
