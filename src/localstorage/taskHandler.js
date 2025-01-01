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

const getUserTaskDataById = (id) => {
    taskData.forEach((item)=>{
        item.selectedPeoples.forEach((people)=>{
            if (people.id == id) {
                filteredTask.push(item) 
            }
        })
    })
    
    filteredTask = filteredTask.filter((item)=>{
        return item.id !== item.id
    })
    return filteredTask;
}

export {createTask , getUserTaskDataById}