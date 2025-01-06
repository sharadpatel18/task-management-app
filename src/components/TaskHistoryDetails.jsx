import React, { useEffect, useState } from "react";
import {
  filterCompletedTaskById,
  getTaksHistoryById,
} from "../localstorage/taskHandler";
import { getCurrentUserDataInLocalStorage } from "../localstorage/authData";
import { useParams } from "react-router-dom";

const TaskHistoryDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [subTask, setSubTask] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    getCurrentUserDataInLocalStorage()
  );

  useEffect(() => {
    const data = getTaksHistoryById(id);
    const taskData = filterCompletedTaskById(id , currentUser.id);
    setTask(data);
    setSubTask(taskData);
  }, []);

  return (
    <div>
      {Object.keys(task).length > 0 ? (
        <>
          <div className="taskshow-main">
            <div className="taskshow-container">
              <div
                className="progress"
                role="progressbar"
                aria-label="Animated striped example"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  style={{ width: "100%" }}
                ></div>
              </div>
              <div className="taskshow-status">
                <div>create</div>
                <div>working</div>
                <div>error</div>
                <div>bug</div>
                <div>complete</div>
              </div>
              {Object.keys(task).length > 0 ? (
                <div className="taskshow-details">
                  <h1>{task.title}</h1>
                  <p>{task.task}</p>
                  <label>Stating Date: {task.startingDate}</label>
                  <label>Ending Date: {task.endingDate}</label>
                </div>
              ) : (
                <div>Loading....</div>
              )}
              <div className="taskshow-details">
                <h1>summery</h1>
                <label htmlFor="">{task.summery}</label>
              </div>
              {subTask.map((item) => {
                return (
                  <div className="taskshow-details">
                    <h1>{item.title}</h1>
                    <p>{item.task}</p>
                    <label htmlFor="">Peoples:</label>
                    {item.selectedPeoples.map((p) => {
                      return <p className="card-text">{p.name}</p>;
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default TaskHistoryDetails;
