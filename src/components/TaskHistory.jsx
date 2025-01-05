import React, { useEffect , useState} from "react";
import { Link } from "react-router-dom";
import { getCurrentUserDataInLocalStorage } from "../localstorage/authData";
import { getTaskHistory } from "../localstorage/taskHandler";

const History = () => {
  
    const [currentUser, setCurrentUser] = useState(
        getCurrentUserDataInLocalStorage()
      );
    const [ completedTask , setCompletedTask ] = useState([]);

    useEffect(()=>{
        const data = getTaskHistory();
        setCompletedTask(data);
    },[]);

  return (
    <div>
      <div className="task-main">
        {completedTask.length > 0 ? (
          completedTask.map((item) => {
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
                    <p>created By : {item.createdByName}</p>
                    <Link
                      to={`/taskdetailhistory/${item.id}`}
                      className="btn btn-primary"
                    >
                      Full Details of this task
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No More History Available</h1>
        )}
      </div>
    </div>
  );
};

export default History;
