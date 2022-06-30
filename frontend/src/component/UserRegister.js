import React, { useState } from "react";
// import "./Register.css";
import { Link } from "react-router-dom";
// import ing from "../assets/ing.png";
import { message } from "antd";

const UserRegister = ({ history }) => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfrimpassword] = useState("");

  console.log({
    role,
    username,
    email,
    mobile,
    password,
    confirmpassword,
  });
  const fetchRegister = () => {
    fetch("/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role,
        username,
        email,
        mobile,
        password,
        confirmpassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.msg) {
          message.success(data.msg);
          history.push("/login");
        } else {
          message.error(data.error);
        }
      });
  };

  return (
    <div className="body_body">
      <div className="signup-container">
        <div className="welcome-img">
      
          {/* <img src={ing} alt="welcome image" height="350px" width="450px" /> */}
        </div>

        <div class="form-container">
          <h2>Create your Account Today ! </h2>

          <p class="title">Sign Up</p>

          <div class="signup-form">
            <div class="form-item selector">
              <span class="item-indicator"></span>
              <label className="select_label" for="role">
                Choose your role
              </label>
              <select
                id="role"
                className="role_select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Student">Student</option>
                <option value="Company">Company</option>
                <option value="Mentor">Mentor</option>
              </select>
            </div>
            <div class="form-item fullname">
              <input
                type="text"
                placeholder="Please enter your username "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span class="item-indicator"></span>
            </div>

            <div class="form-item email">
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span class="item-indicator"></span>
            </div>

            <div class="form-item confirm-password">
              <input
                type="text"
                placeholder=" Enter Mobile No"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <span class="item-indicator"></span>
            </div>
            <div class="form-item password">
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span class="item-indicator"></span>
            </div>

            <div class="form-item confirm-password">
              <input
                type="password"
                name="Confirmpassword"
                placeholder="Enter Confirm Password"
                value={confirmpassword}
                onChange={(e) => setConfrimpassword(e.target.value)}
              />
              <span class="item-indicator"></span>
            </div>

            <p class="login">
              Already have an account?
              <Link to="login">Login</Link>
            </p>
            <div class="actions">
              <button type="submit" onClick={() => fetchRegister()}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;