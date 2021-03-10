import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainForm from "../components/MainForm";
import InputForm from "../components/InputForm";
import HTTP from "../utilities/instance-axios";
import { toast } from "react-toastify";
import { FaGoogle, FaFacebookF, FaGithubSquare, FaHome } from "react-icons/fa";
import "../assets/form.css";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await HTTP.post("/api/auth/login", user)
      .then(({ data }) => {
        toast.success(data.message);
      })
      .catch(({ response }) => {
        toast.error(response.data.message);
      });
  };

  return (
    <div className="login">
      <div className="root-to-home">
        <Link to="/">
          <FaHome />
        </Link>
      </div>
      <div className="container-form">
        <div className="page-title">LOGIN</div>
        <MainForm>
          {/* email input */}
          <InputForm
            label="Email Address"
            name="email"
            value={email}
            type="email"
            placeholder="type email Address"
            handleChange={handleChange}
          />
          {/* password input */}
          <InputForm
            label="Password"
            name="password"
            value={password}
            type="password"
            placeholder="type password"
            handleChange={handleChange}
          />
          <div className="group-submit">
            <button className="btn btn-success" onClick={handleSubmit}>
              submit
            </button>
            <span>
              don't have Account ?{"  "}
              <Link to="/register">Register</Link>
            </span>
          </div>
        </MainForm>
        <div className="break-line">
          <span>or</span>
        </div>
        <div className="container-social-media">
          <a
            className="login-social"
            href="https://react-passport.herokuapp.com/auth/google"
            style={{ backgroundColor: "rgb(232 34 34)" }}
          >
            <span className="icon">
              <FaGoogle />
            </span>
            <span className="main-social">
              continue with <b>Google</b>
            </span>
          </a>
          <a
            className="login-social"
            href="https://react-passport.herokuapp.com/auth/facebook"
            style={{ backgroundColor: "rgb(56 56 144)" }}
          >
            <span className="icon">
              <FaFacebookF />
            </span>
            <span className="main-social">
              continue with <b> Facebook</b>
            </span>
          </a>
          <a
            className="login-social"
            href="https://react-passport.herokuapp.com/auth/github"
            style={{ backgroundColor: "rgb(14 8 8)" }}
          >
            <span className="icon">
              <FaGithubSquare />
            </span>
            <span className="main-social">
              continue with <b> Github</b>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
