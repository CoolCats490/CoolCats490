import React,{useState, useContext} from "react";
import axios from "axios";
import AuthContext from "../../Store/auth-context";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  //Sets the correct backend server address depending
  //on if in dev or production mode
  const url =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_URL_DEVELOPMENT
      : process.env.REACT_APP_URL_PRODUCTION;

  const [enteredName, setName] = useState("");
  const [enteredPass, setPass] = useState("");
  const [loginFail, setLoginFail] = useState(false);

  //Using useHistory to direct to a new page after login
  let history = useHistory();

  //store and get JWL token
  const authCtx = useContext(AuthContext);
  const isLogedIn = authCtx.isLoggedIn;

  let expirationTime = null;

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
    <Container>
      <Form onSubmit={submitHandler}>
        {loginFail && (
          <Container className="bg-warning text-center mt-4">
            Incorrect Login Credentials
          </Container>
        )}

        <Form.Group className="mb-3" controlId="formLoginName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={(e)=>setName(e.target.value)}
            value={enteredName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLoginPass">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e)=>setPass(e.target.value)}
            value={enteredPass}
          />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" className="">
            Login
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default LoginForm;
