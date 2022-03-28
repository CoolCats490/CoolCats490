import React, { useState, useContext } from "react";
//Bootstrap/Styling
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";
//Database
import axios from "axios";
import AuthContext from "../Store/auth-context";
import { useHistory } from "react-router";

const Login = () => {
  //Sets the correct backend server address depending
  //on if in dev or production mode
  const url =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_URL_DEVELOPMENT
      : process.env.REACT_APP_URL_PRODUCTION;

  const [enteredName, setName] = useState("");
  const [enteredPass, setPass] = useState("");
  const [loginFail, setLoginFail] = useState(false);

  //store and get JWL token
  const authCtx = useContext(AuthContext);
  const isLogedIn = authCtx.isLoggedIn;

  //Using useHistory to direct to a new page after login
  let history = useHistory();

  let expirationTime = null;

  const userNamerHandler = (event) => {
    setName(event.target.value);
  };

  const passwordHandler = (event) => {
    setPass(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    //Putting data into a object
    let loginData = {
      username: enteredName,
      password: enteredPass,
    };

    axios
      .post(url + "/users/login", loginData)
      .then((res) => {
        //Login token expiration time
        expirationTime = new Date(
          new Date().getTime() + +res.data.expiresIn
        );
        
        //Store login token locally
        authCtx.login(res.data.token, expirationTime.toISOString());
      })
      .catch((error) => {
        if (error.response) {

          //Set loginFail to true and show user an error
          if(error.response.data.message === "User does not exist"
              || error.response.data.message === "Incorrect Password !"){
                setLoginFail(true)
              }

        } 
      });

    if (isLogedIn) {
      history.replace("/profile");
    }
  };

  return (
    <div className="container-fluid ">
      <Row>
        <Col className="mx">
          <h1 className="text-center pb-6 pt-4">Login to Squad Seek</h1>

          <Container className="w-25 pt-5 pb-5 px-5 bg-white text-dark rounded border-primary">

            <Form onSubmit={submitHandler}>

            {
                loginFail && 
                (<Container className="bg-warning text-center mt-4">Incorrect Login Credentials</Container>)
            }

              <Form.Group className="mb-3" controlId="formLoginName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  onChange={userNamerHandler}
                  value={enteredName}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLoginPass">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={passwordHandler}
                  value={enteredPass}
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit" className="">
                  Submit
                </Button>
              </div>
            </Form>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
