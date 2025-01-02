import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskById , updateStatus} from "../localstorage/taskHandler";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [statusBar,setStatusBar] = useState("2%");
   const [responce , setResponce] = useState('')
    const [responceShow , setResponceShow] = useState(false)
  

  useEffect(() => {
    const data = getTaskById(id);
    setTask(data);
  }, []);

  useEffect(()=>{
    if(task.status == "working"){
        setStatusBar("25%");
    }else if(task.status == "error"){
        setStatusBar("59%");
    }else if(task.status == "bug"){
        setStatusBar("75%");
    }else if(task.status == "completed"){
        setStatusBar("100%");
    }else{
        setStatusBar("2%")
    }
  },[task , responceShow])

  const handleWorkingStart = () => {
    const data = updateStatus(id);
    setResponce(data);
    setResponceShow(true);

    setInterval(()=>{
        setResponceShow(false)
    },3000)
  }

  return (
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
            style={{ width: `${statusBar}` }}
          ></div>
        </div>
        <div className="taskshow-status">
          <div>create</div>
          <div>working</div>
          <div>error</div>
          <div>bug</div>
          <div>complete</div>
        </div>
        <div>
            {responceShow === true ? responce : null}
        </div>
        {
            Object.keys(task).length > 0
            ?
            <div className="taskshow-details">
                <h1>{task.title}</h1>
                <p>{task.task}</p>
                <label>Stating Date: {task.startingDate}</label>
                <label>Ending Date: {task.endingDate}</label>
                <div className="taskshow-btns">
                    {task.status === "create" ?  <button className="btn btn-danger" onClick={handleWorkingStart}>Start Working</button> : null}
                    <button className="btn btn-primary">Add Sub-Task</button>
                    <button className="btn btn-success">Completed</button>
                </div>
            </div>
            :
            <div>Loading....</div>
        }
      </div>
    </div>
  );
};

export default TaskDetails;
