import React, { useState } from "react";
import { loginUser } from "../localstorage/authData";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responce , setResponce] = useState('')
  const [responceShow , setResponceShow] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = loginUser(email,password);
    setResponce(data);
    setResponceShow(true);

    setInterval(()=>{
        setResponceShow(false)
    },5000)
  };

  return (
    <div className="auth-main">
      <form className="auth-container" onSubmit={handleSubmit}>
      <div>
            {responceShow === true ? responce : null}
        </div>
        <div className="mb-3">
          <h1>Login</h1>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
