import React,{useState} from 'react'
import styled from 'styled-components';
import { MultiStepForm, Step } from 'react-multi-form'
import Shipping from './Shipping'
import Payment from './Payment'
import Confirmation from './Confirmation'
import Button from './button'

const Container = styled.div`
  max-width: 500px;
  margin: 40px auto;

  @media(max-width: 590px) {
    width: 300px;
  }
`

const MultiForm = () => {

  const [active, setActive] = React.useState(1);
  //const [isLoggedIn, setLoggedIn] = useState(true);
  const [firstPageData, setFirstPageData] = useState("");
  const [secondPageData, setSecondPageData] = useState("");

  // const submitHandler = ()=>{
  //   //data object here

  //   if (isLoggedIn){

  //   }
  //   else{
  //     //axios post request here
  //   }
  // };


  return (
    <Container>
      <MultiStepForm activeStep={active}>
        <Step label='Account Creation'>
          <Shipping 
            active = {active}
            onSetActive={setActive}
            onDataInput={setFirstPageData}
          />
        </Step>
        <Step label='Personal Info'>
          <Payment 
            active = {active}
            onSetActive={setActive}
            onDataInput={setSecondPageData}
          />
        </Step>
        <Step label='confirmation'>
          <Confirmation 
            active = {active}
            onSetActive={setActive}
            firstPageData={firstPageData}
            secondPageData={secondPageData}
          />
        </Step>
      </MultiStepForm>

      
    </Container>
  )
}

export default MultiForm;