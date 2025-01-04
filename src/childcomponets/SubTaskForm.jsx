import React, { useEffect, useState } from "react";
import { getCurrentUserDataInLocalStorage } from "../localstorage/authData";
import { createSubTask, getTaskUserById, updateStatus } from "../localstorage/taskHandler";
import { useParams } from "react-router-dom";

const SubTaskForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [onlyWorkingUser, setWorkingUser] = useState([]);
  const [selectedPeoples, setSelectedPeoples] = useState([]);
  const [responce, setResponce] = useState("");
  const [responceShow, setResponceShow] = useState(false);
  const [status, setStatus] = useState("");
  const [currentUser, setCurrentUser] = useState(
    getCurrentUserDataInLocalStorage()
  );

  useEffect(() => {
    const data = getTaskUserById(id);
    setWorkingUser(data);
  }, []);

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
      id: Date.now(),
      title: title,
      task: task,
      selectedPeoples: selectedPeoples,
      createdBy: currentUser.id,
      createdByName: currentUser.name,
      parentTask: id,
      updatedStatus:status,
    };
    const responce = createSubTask(taskdata);
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
          <h1>Sub Task Create</h1>
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
            <option value="error">error</option>
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

export default SubTaskForm;
