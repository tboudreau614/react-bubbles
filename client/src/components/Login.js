import React, { useState } from "react";
import axios from "axios";

const Login = ({ history }) => {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const handleChange = e => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", creds)
      .then(res => {
        console.log("token test:", res);
        localStorage.setItem("token", res.data.payload);
        history.push("/protected");
      })
      .catch(err => console.error(err.response));
  };
  return (
    <div className="loginForm">
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input className="usernameStyle"
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
          value={creds.username}
        />
        <input className="passwordStyle"
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          value={creds.password}
        />
        <button className="buttonStyle" type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;