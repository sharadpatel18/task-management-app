import React, { useEffect, useState } from "react";
import { getTaksHistoryById } from "../localstorage/taskHandler";
import { useParams } from "react-router-dom";

const TaskHistoryDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});

  useEffect(() => {
    const data = getTaksHistoryById(id);
    setTask(data);
    console.log(data);
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
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default TaskHistoryDetails;
