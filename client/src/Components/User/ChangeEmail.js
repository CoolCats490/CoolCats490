import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const ChangeEmail = ({ userInfo, showForm }) => {
  const [newEmail, setNewEmail] = useState("");
  //error useStates
  const [nonEmail, setNonEmail] = useState(false);
  const [emailUpdated, setEmailUpdated] = useState(false);
  const [failedToUpdate, setFailedToUpdate] = useState(false);

  //Sets the correct backend server address depending
  //on if in dev or production mode
  const url =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_URL_DEVELOPMENT
      : process.env.REACT_APP_URL_PRODUCTION;

  const newEmailHandler = (e) => {
    setNewEmail(e.target.value);
  };

  const submitHandler = () => {
    // regular expresson check for email  || https://stackoverflow.com/questions/39356826/how-to-check-if-it-a-text-input-has-a-valid-email-format-in-reactjs
    let re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(newEmail)) {
      setNonEmail(true)
    }else{
        axios.post(url + "/users/changeEmail",
            {_id:userInfo._id, email: newEmail
        })
        .then(res=>{
            console.log(res.data);
            setEmailUpdated(true);
            setFailedToUpdate(false);
            setNonEmail(false);
        })
        .catch(err =>{
            console.log(err.response.data);
            if(err.response.data.message === "Failed To Update Password"){
                setFailedToUpdate(true);
                setNonEmail(false);
                setEmailUpdated(false);
            }
        })
    }
  };

  const cancelHandler = () => {
        showForm(false);
        setFailedToUpdate(false);
        setNonEmail(false);
        setEmailUpdated(false);
  };

  return (
    <Container className="w-50">
    {failedToUpdate && (<h5 className="bg-warning text-center">Failed To Update Email</h5>)}
    {nonEmail && (<h5 className="text-center bg-warning">Please Enter A Valid Email</h5>)}
    {emailUpdated && (<h5 className="text-center bg-success shadow" onClick={cancelHandler}>Email Updated</h5>)}
      {!emailUpdated &&(<Form>
        <Form.Group className="mb-2" controlId="currentEmail">
          <Form.Label>Currnet Email</Form.Label>
          <Form.Control type="email" value={userInfo.email} disabled />
        </Form.Group>
        <Form.Group className="mb-2" controlId="newEmail">
          <Form.Label>New Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="New Email"
            required
            onChange={newEmailHandler}
          />
        </Form.Group>
        <Button variant="primary" onClick={submitHandler}>
          Submit
        </Button>
        <Button className="bg-danger mx-2" onClick={cancelHandler}>
          Cancel
        </Button>
      </Form>)}
    </Container>
  );
};

export default ChangeEmail;
