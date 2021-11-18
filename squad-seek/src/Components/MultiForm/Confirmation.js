import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

export default function Confirmation() {
  //allows us to link back to old page in histor
  const history = useHistory();

  const loginBtnHandler = () =>{
    history.push("/login");
  }

  return (
    <div>
      <h3 style={{textAlign: 'center'}}>Your Account has been Created!</h3>
      <p style={{textAlign: 'center'}}> Thanks for creating an account! You will recieve a confirmation of your account in your email</p>
      <Button onClick={loginBtnHandler}>Login</Button>
    </div>
  )
}