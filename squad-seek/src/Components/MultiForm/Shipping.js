import React, { useState } from 'react';
import Input from './input';
import Button from './button'

export default function Shipping(props) {
  const [enteredFullName, setFullName] = useState("");
  const [enteredEmail, setEmail] = useState("");
  const [enteredAddress, setPassword] = useState("");
  const [enteredCity, setCity] = useState("");
  const [enteredCountry, setCountry] = useState("");


  const nameHandler = (event) =>{
    setFullName(event.target.value);
  }
  const emailHandler = (event) =>{
    setEmail(event.target.value);
  }
  const passwordHandler = (event) =>{
    setPassword(event.target.value);
  }
  const cityHandler = (event) =>{
    setCity(event.target.value);
  }
  const countryHandler = (event) =>{
    setCountry(event.target.value);
  }

  const nextBtnHandler = ()=>{
    //creating group data object
    const firstPageData = {
      name: enteredFullName,
      email: enteredEmail,
      address: enteredAddress,
      city: enteredCity,
      country: enteredCountry
    };

    console.log(firstPageData);
    console.log("123")
    
    //move to next page
    props.onSetActive(props.active + 1)
  };



  return (
    <div>
      <h3 style={{textAlign: 'center'}}>Account Creation Information</h3>
      <Input type="text" placeholder="Enter your full name" label="Full Name" onChange={nameHandler} required/>
      
      <Input type="email" placeholder="Enter your e-mail" label="Email Address" onChange={emailHandler}/>

      <Input type="password" placeholder="Enter a password" label="Password" onChange={passwordHandler}/>

      <div>
      <Input type="text" placeholder="Enter your country" label="Country" onChange={countryHandler}/>
      <Input type="text" placeholder="Enter your city" label="City" onChange={cityHandler}/>
      </div>

      {props.active !== 1 && (
        <Button onClick={() => props.onSetActive(props.active - 1)}>Previous</Button>
      )}
      {props.active !== 3 && (
        <Button
          onClick={() => props.onSetActive(nextBtnHandler)}
          style={{ float: 'right' }}
        >
          Next
        </Button>
      )}
    </div>
  )
}