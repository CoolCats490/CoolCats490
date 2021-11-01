import React from 'react';
import Input from './input';

export default function Payment() {

  return (
    <div>
      <h3 style={{textAlign: 'center'}}>Personal Information </h3>
      <Input type="text" placeholder="abcdefghijk" label="Filler" />
      <Input type="text" placeholder="John Doe" label="Preferred Name" />
      
      <div style={{ display: 'flex'}}>
        <div style={{ flex: 1, paddingRight: 10}}>
        <Input type="text" placeholder="12/20/1997" label="Date of Birth" style={{marginRight: 10}}/>
        </div>
        <div style={{ flex: 1}}>

        <Input type="text" placeholder="000" label="Filler"/>
        </div>
      </div>
    </div>
  )
}