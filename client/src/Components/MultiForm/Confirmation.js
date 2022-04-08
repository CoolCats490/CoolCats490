import React from 'react';
import Button from './button'
import { useHistory } from 'react-router';
import "./Confirmation.css"

export default function Confirmation() {
  //allows us to link back to old page in histor
  const history = useHistory();

  const loginBtnHandler = () =>{
    history.push("/login");
  }

  return (
    <div className='con-wrapper'>
      <h3 className='text-center mt-5'>Your Account has been Created!</h3>
      {/* <p style={{textAlign: 'center'}}> Thanks for creating an account! You will recieve a confirmation of your account in your email</p> */}
      <div className="d-flex justify-content-center mt-3"><br/>
      <Button onClick={loginBtnHandler}  >Login</Button>
      </div>
    </div>
  )
}