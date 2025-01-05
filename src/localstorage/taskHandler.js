let taskData = [];
let completedTaskData = [];
let subTaskData = [];
let completedSubTaskData = [];

const getTaskData = () => {
  const data = localStorage.getItem("task");
  if (data) {
    taskData = JSON.parse(data);
  }
};
const getCompletedTaskData = () => {
  const data = localStorage.getItem("completedTask");
  if (data) {
    completedTaskData = JSON.parse(data);
  }
};
const getCompletedSubTaskData = () => {
  const data = localStorage.getItem("completedSubTask");
  if (data) {
    completedSubTaskData = JSON.parse(data);
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
getCompletedSubTaskData();
getCompletedTaskData();

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

const updateStatus = (id, status) => {
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
  const responce = subTaskData.filter((item) => {
    return item.parentTask == id;
  });

  return responce;
};

const CompleteTaskById = (data) => {
  completedTaskData.push(data);
  localStorage.setItem("completedTask", JSON.stringify(completedTaskData));
  console.log(data);

  taskData = taskData.filter((item) => {
    return item.id !== data.id;
  });

  localStorage.setItem("task", JSON.stringify(taskData));
};

const CompleteSubTaskById = (data) => {
  completedSubTaskData.push(data);
  localStorage.setItem(
    "completedSubTask",
    JSON.stringify(completedSubTaskData)
  );

  subTaskData = subTaskData.filter((item) => {
    return item.id !== data.id;
  });
  localStorage.setItem("subtask", JSON.stringify(subTaskData));
};

const getTaskHistory = () => {
  return completedTaskData;
};

const getSubTaskHistory = () => {
  return completedSubTaskData;
};

const getTaksHistoryById = (id) => {
  const index = completedTaskData.findIndex((item)=>{
    return  item.id == id;
  })

  return completedTaskData[index];
}

export {
  createTask,
  getTaskById,
  updateStatus,
  getTaskUserById,
  createSubTask,
  getSubTaskById,
  CompleteTaskById,
  CompleteSubTaskById,
  getTaskHistory,
  getSubTaskHistory,
  getTaksHistoryById
};
