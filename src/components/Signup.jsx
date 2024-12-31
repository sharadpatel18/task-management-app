import React, { useState } from "react";
import { createUser } from "../localstorage/authData";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("viewer");
  const [responce , setResponce] = useState('')
  const [responceShow , setResponceShow] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = createUser(name,email,password,role);
    setResponce(data);
    setResponceShow(true);

    setInterval(()=>{
        setResponceShow(false)
    },3000)
  };

  return (
    <div className="auth-main">
      <form className="auth-container" onSubmit={handleSubmit}>
        <div>
            {responceShow === true ? responce : null}
        </div>
        <div className="mb-3">
          <h1>Signup</h1>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Select Your Role
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option selected value="viewer">
              developer
            </option>
            <option value="manager">manager</option>
            <option value="developer">designer</option>
            <option value="developer">tester</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
     
    </div>
  );
};

export default Signup;
