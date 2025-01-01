import React, { useEffect, useState } from "react";
import {
  getAllUserDataInLocalStorage,
  getCurrentUserDataInLocalStorage,
} from "../localstorage/authData";
import { createTask } from "../localstorage/taskHandler";
import { data } from "react-router-dom";

const TaskForm = () => {
  const [allPeoples, setAllPeoples] = useState(getAllUserDataInLocalStorage());
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [onlyWorkingUser, setWorkingUser] = useState([]);
  const [selectedPeoples, setSelectedPeoples] = useState([]);
  const [responce, setResponce] = useState("");
  const [responceShow, setResponceShow] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    getCurrentUserDataInLocalStorage()
  );

  useEffect(() => {
    const data = allPeoples.filter((item) => {
      return item.role !== "manager";
    });
    setWorkingUser(data);
  }, [allPeoples]);

  const handleHire = (user) => {
    setSelectedPeoples((prev) => [...prev, user]);
    setWorkingUser((prevWorking) =>
      prevWorking.filter((workingUser) => workingUser.id !== user.id)
    );
  };

  const handleReject = (user) => {
    setWorkingUser((prevWorking) =>
      prevWorking.filter((workingUser) => workingUser.id !== user.id)
    );
  };

  const releaseUser = (user) => {
    setWorkingUser((prevWorking) => [...prevWorking, user]);

    setSelectedPeoples((prevHired) =>
      prevHired.filter((hiredUser) => hiredUser.id !== user.id)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskdata = {
      id:Date.now(),
      title: title,
      task: task,
      status: status,
      startingDate: startingDate,
      endingDate: endingDate,
      selectedPeoples: selectedPeoples,
      createdBy: currentUser.id 
    };
    const responce = createTask(taskdata);
    setResponce(responce);
    setResponceShow(true);

    setInterval(() => {
      setResponceShow(false);
    }, 3000);
  };
  return (
    <div className="auth-main">
      <div className="task-container">
        <div>{responceShow === true ? responce : null}</div>
        <div className="mb-3">
          <h1>Task Create</h1>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Task Details
          </label>
          <textarea
            className="form-control"
            id="exampleInputPassword1"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Select Your Task Status
          </label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Select status</option>
            <option value="bug">bug</option>
            <option value="create">create</option>
            <option value="error">error</option>
            <option value="completed">completed</option>
            <option value="working">working</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className=" mb-3 form-label ">
            Select Workers
          </label>
          {onlyWorkingUser.length !== 0
            ? onlyWorkingUser.map((item) => {
                return (
                  <div className="mb-3 h-card">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      {item.name}
                    </label>
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      {item.email}
                    </label>
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      {item.role}
                    </label>
                    <button
                      className="btn btn-success"
                      onClick={() => handleHire(item)}
                    >
                      Hire
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleReject(item)}
                    >
                      Reject
                    </button>
                  </div>
                );
              })
            : null}
        </div>
        <div className="mb-3 selected">
          <label htmlFor="exampleInputPassword1" className=" mb-3 form-label ">
            Selected Workers
          </label>
          {selectedPeoples.length !== 0 ? (
            selectedPeoples.map((item) => {
              return (
                <div className="mb-3 h-card">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    {item.name}
                  </label>
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    {item.email}
                  </label>
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    {item.role}
                  </label>
                  <button
                    className="btn btn-danger"
                    onClick={() => releaseUser(item)}
                  >
                    Reject
                  </button>
                </div>
              );
            })
          ) : (
            <label
              htmlFor="exampleInputPassword1"
              className=" mb-3 form-label "
            >
              none
            </label>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Starting Date
          </label>
          <input
            type="date"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={startingDate}
            onChange={(e) => setStartingDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Ending Date
          </label>
          <input
            type="date"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={endingDate}
            onChange={(e) => setEndingDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
