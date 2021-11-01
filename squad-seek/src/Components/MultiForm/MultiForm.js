import React from 'react'
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
  const [active, setActive] = React.useState(1)
  return (
    <Container>
      <MultiStepForm activeStep={active}>
        <Step label='Account Creation'>
          <Shipping />
        </Step>
        <Step label='Personal Info'>
          <Payment />
        </Step>
        <Step label='confirmation'>
          <Confirmation />
        </Step>
      </MultiStepForm>

      {active !== 1 && (
        <Button onClick={() => setActive(active - 1)}>Previous</Button>
      )}
      {active !== 3 && (
        <Button
          onClick={() => setActive(active + 1)}
          style={{ float: 'right' }}
        >
          Next
        </Button>
      )}
    </Container>
  )
}

export default MultiForm;