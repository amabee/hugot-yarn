import React from "react";
import "../public/styles/login-style.css";

const Login = () => {
  return (
    <div className="container">
      <div className="box box-two">
        <img src="/images/yarn.png" alt="Hugel Yarn" className="logo" />
        <form>
          <input type="text" placeholder="Phone, email, or username" />
          <input type="password" placeholder="Password" />
        </form>
        <button type="button" className="next-btn">
          Log In
        </button>
      </div>
      <p>
        Don't have an account? <a href="#">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
