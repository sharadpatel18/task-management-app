import React, { useEffect, useState } from "react";
import { getCurrentUserDataInLocalStorage } from "../localstorage/authData";

const Home = () => {
  const [currentUser, setCurrentUser] = useState({});

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
        <div>
          <h1>Create A Task</h1>
          <button>Create Task</button>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
