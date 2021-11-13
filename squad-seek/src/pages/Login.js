import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const Login = () => {
  return (
    <div className = "container-fluid bg-dark text-white">
      <h1 className = "text-center">Login to Squad Seek</h1>
      <div className = "d-flex flex-wrap justify-content-center mt-auto">
        <form>
          <div className="form-group pt-5">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
            />
          </div>
          <div className="form-group mt-2">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className="mt-4 mb-4">
            <button type="button" className="btn-primary d-block w-100">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
