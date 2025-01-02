let taskData = [];
let filteredTask = [];

const getTaskData = () => {
  const data = localStorage.getItem("task");
  if (data) {
    taskData = JSON.parse(data);
  }
};

getTaskData()

const createTask = (data) => {
    taskData.push(data);
    localStorage.setItem('task' , JSON.stringify(taskData))
    return "Task is created"
  }
  
  const getTaskById = (id) => {
    const IndexOfTask = taskData.findIndex((item)=>{
      return item.id == id;
    })
    
    return taskData[IndexOfTask];
  }
  
  const updateStatus = (id) => {
    const IndexOfTask = taskData.findIndex((item)=>{
      return item.id == id;
    })
    
    taskData[IndexOfTask].status = "working";
    localStorage.setItem('task' , JSON.stringify(taskData))
    
    return "Task status is updated"
}

export {createTask , getTaskById , updateStatus}