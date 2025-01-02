let taskData = [];
let subTaskData = [];

const getTaskData = () => {
  const data = localStorage.getItem("task");
  if (data) {
    taskData = JSON.parse(data);
  }
};

const getSubTaskData = () => {
  const data = localStorage.getItem("subtask");
  if (data) {
    subTaskData = JSON.parse(data);
  }
};

getTaskData();
getSubTaskData();

const createTask = (data) => {
  taskData.push(data);
  localStorage.setItem("task", JSON.stringify(taskData));
  return "Task is created";
};

const getTaskById = (id) => {
  const IndexOfTask = taskData.findIndex((item) => {
    return item.id == id;
  });

  return taskData[IndexOfTask];
};

const updateStatus = (id , status) => {
  const IndexOfTask = taskData.findIndex((item) => {
    return item.id == id;
});

  taskData[IndexOfTask].status = status;
  localStorage.setItem("task", JSON.stringify(taskData));

  return "Task status is updated";
};

const getTaskUserById = (id) => {
  const indexOfTask = taskData.findIndex((item) => {
    return item.id == id;
  });

  return taskData[indexOfTask].selectedPeoples;
};

const createSubTask = (data) => {
  subTaskData.push(data);
  localStorage.setItem("subtask", JSON.stringify(subTaskData));
  return "Sub Task is created";
};

const getSubTaskById = (id) => {
  const responce = subTaskData.filter((item)=>{
    return item.parentTask == id;
  })

  return responce
}

export { createTask, getTaskById, updateStatus, getTaskUserById , createSubTask , getSubTaskById};
