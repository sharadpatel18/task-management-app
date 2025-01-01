import React, { useEffect, useState } from "react";
import { getCurrentUserDataInLocalStorage } from "../localstorage/authData";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [currentUser, setCurrentUser] = useState({});
  const Navigate = useNavigate();
  useEffect(() => {
    const data = getCurrentUserDataInLocalStorage();
    if (Object.keys(data).length !== 0) {
      setCurrentUser(data);
    }else{
      setCurrentUser({
        role:"none"
      })
    }
  }, []);

  return (
    <div className="home-main">
      {currentUser.role === "manager" ? (
        <div className="task-form">
          <h1>Create A Task</h1>
          <button className="btn btn-primary" onClick={()=>Navigate('/taskform')}>Create Task</button>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
