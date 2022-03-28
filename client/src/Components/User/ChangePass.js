import React, { useState, useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
//Token
import AuthContext from "../../Store/auth-context";

const ChangePass = ({ userInfo, showForm }) => {
  //token object
  const authCtx = useContext(AuthContext);

  //Sets the correct backend server address depending
  //on if in dev or production mode
  const url =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_URL_DEVELOPMENT
      : process.env.REACT_APP_URL_PRODUCTION;

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  //Error useStates
  const [currNonMatch, setCurrNonMatch] = useState(false);
  const [nonMatch, setNonMatch] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [passUpdated, setPassUpdated] = useState(false);

  let expirationTime = null;

  const currentPassHandler = (e) => {
    setCurrentPass(e.target.value);
  };
  const newPassHandler = (e) => {
    setNewPass(e.target.value);
  };

  const confirmPassHandler = (e) => {
    setConfirmPass(e.target.value);
  };

  const submitHandler = () => {
    if (newPass !== confirmPass) {
      console.log("passwords don't match");
      setNonMatch(true);
      setPassLength(false);
    } else if (newPass.length < 5 && confirmPass < 5)//(newPass === "" || confirmPass === "") 
    {
      setPassLength(true);
      setNonMatch(false);
    } else {
      axios
        .post(url + "/users/changePass", {
          username: userInfo.username,
          password: currentPass,
          newPassowrd: newPass,
        })
        .then((res) => {
          //Login token expiration time
          expirationTime = new Date(new Date().getTime() + +res.data.expiresIn);

          //Store login token locally
          authCtx.login(res.data.token, expirationTime.toISOString());

          //show success message
          setPassUpdated(true);
        })
        .catch((err) => {
          //console.log(res);
          console.log(err.response)
          if(err.response.data.message === "Incorrect Password!"){
            setCurrNonMatch(true)
          }
        });
      //clear state of error msg
      setPassLength(false);
      setNonMatch(false);
      setCurrNonMatch(false);
    }
  };

  const cancelHandler = () => {
    //clear fields
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
    //close form
    showForm(false);
    //clear state of error msg
    setPassLength(false);
    setNonMatch(false);
    setCurrNonMatch(false);
  }

  return (
    <Container className="w-50">
      {nonMatch && <h5 className="text-center bg-warning">New Passwords Do Not Match</h5>}
      {passLength && <h5 className="text-center bg-warning">Passwords Need to Be At Least 5 Characters</h5>}
      { currNonMatch && (<h5 className="text-center bg-warning">Current Password Does Not Match</h5>)}
      { passUpdated && (<h5 className="text-center bg-success shadow" onClick={cancelHandler}>Password Updated</h5>)}
      {!passUpdated &&(<Form>
        <Form.Group className="mb-2" controlId="currentPass">
          <Form.Label>Currnet Password</Form.Label>
          <Form.Control
            type="password"
            value={currentPass}
            placeholder="Password"
            onChange={currentPassHandler}
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="newPass">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={newPass}
            placeholder="Password"
            onChange={newPassHandler}
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="confirmPass">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPass}
            placeholder="Password"
            onChange={confirmPassHandler}
          />
        </Form.Group>
        <Button variant="primary" onClick={submitHandler}>
          Submit
        </Button>
        <Button className="bg-danger mx-2" onClick={cancelHandler}>Cancel</Button>
      </Form>)}
    </Container>
  );
};

export default ChangePass;
