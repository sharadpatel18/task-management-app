let authData = [];

const getAuthData = () => {
  const data = localStorage.getItem("user");
  if (data) {
    authData = JSON.parse(data);
  }
};

getAuthData();

const createUser = (name, email, password, role) => {
  if (name === "" || email === "" || password === "" || role === "") {
    return alert("missing data alert!!!!!!!!!!");
  }

  if (authData.length == 0) {
    localStorage.setItem(
      "user",
      JSON.stringify([
        {
          id: Date.now(),
          name: name,
          email: email,
          password: password,
          role: role,
        },
      ])
    );
    return "User is created!!!";
  }

  const findIndexOfUser = authData.findIndex((item) => {
    return email === item.email || password === item.password;
  });

  if (findIndexOfUser >= 0) {
    return alert("User is already existed please login");
  }

  authData.push({
    id: Date.now(),
    name: name,
    email: email,
    password: password,
    role: role,
  });

  localStorage.setItem("user", JSON.stringify(authData));

  return "User is created!!!";
};

const loginUser = (email, password) => {
  if (email === "" || password === "") {
    return alert("missing data alert!!!!!!!!!!");
  }

  const findIndexOfUser = authData.findIndex((item) => {
    return email === item.email || password === item.password;
  });

  if (findIndexOfUser == -1) {
    return alert("User is not existed please signup");
  }

  localStorage.setItem("currentUser" , JSON.stringify(authData[findIndexOfUser]))
  return "User is Logging successfully!!!!"
};

const handleLogOut = () => {
  localStorage.setItem('currentUser' , JSON.stringify({}));
  
}

const getCurrentUserDataInLocalStorage = () => {
  const data = localStorage.getItem("currentUser");
  if (data) {
    return JSON.parse(data);
  }else{
    return {}
  }
}
const getAllUserDataInLocalStorage = () => {
  const data = localStorage.getItem("user");
  if (data) {
    return JSON.parse(data);
  }else{
    return []
  }
}

export { createUser , loginUser , handleLogOut , getCurrentUserDataInLocalStorage , getAllUserDataInLocalStorage};
