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


export {createTask , getUserTaskDataById}