import React, { useEffect, useState } from "react";
import { getCurrentUserDataInLocalStorage } from "../localstorage/authData";
import { getUserTaskDataById } from "../localstorage/taskHandler";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const getTaskData = () => {
    const data = localStorage.getItem("task");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };
  const [currentUser, setCurrentUser] = useState({});
  const [taskData, setTaskData] = useState(getTaskData());
  const [selectedTask, setSelectedTask] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const data = getCurrentUserDataInLocalStorage();
    if (Object.keys(data).length !== 0) {
      setCurrentUser(data);
    } else {
      setCurrentUser({
        role: "none",
      });
    }
  }, []);

  useEffect(() => {
    const selecedData = taskData.filter((item) =>
      item.selectedPeoples.some(
        (people) =>
          people.id === currentUser.id || item.createdBy === currentUser.id
      )
    );

    setSelectedTask(selecedData);
  }, [taskData, currentUser]);

  return (
    <div className="home-main">
      {currentUser.role === "manager" ? (
        <div className="task-form">
          <h1>Create A Task</h1>
          <button
            className="btn btn-primary"
            onClick={() => Navigate("/taskform")}
          >
            Create Task
          </button>
        </div>
      ) : null}
      <div className="task-main">
        {selectedTask.length > 0 ? (
          selectedTask.map((item) => {
            return (
              <div className="col-sm-6 mx-3 mb-sm-0">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.task}</p>
                    <p>Starting Date: {item.startingDate}</p>
                    <p>Ending Date: {item.endingDate}</p>
                    <p>People Are Enrolled: </p>
                    {item.selectedPeoples.map((p) => {
                      return <p className="card-text">{p.name}</p>;
                    })}
                    <a href="#" className="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1>you are free go and enjoy your freedom</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
