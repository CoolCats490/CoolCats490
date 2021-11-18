import React,{useState} from 'react';
import Input from './input';
import Button from './button'
//React Select
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

export default function Payment(props) {
  //Tag Select Options
  const optionsTags = [
    {value: 'concert', label: 'Concert'},
    {value: 'cosplay', label: 'Cosplay'},
    {value: 'cooking', label: 'Cooking'},
    {value: 'gaming', label: 'Gaming'},
    {value: 'surfing', label: 'Surfing'}
  ];

  //useState stuff
  const [enteredUserName, setUserName] = useState("");
  const [enteredTag, setTag] = useState([]);
  const [enteredDate, setDate] = useState("");


  const userNameHandler = (event) =>{
    setUserName(event.target.value);
  }

  const tagHandler = (event) => {
    setTag( event );
  }

  const dateHandler = (event) => {
    setDate(event.target.value);


    console.log(enteredDate)
    let year = enteredDate.getFullYear()

    console.log(2021 - year)
  };


  const nextBtnHandler = ()=>{
    //creating group data object
    const secondPageData = {
      userName: enteredUserName,
      tags: enteredTag.map(e => e.value),
      date: new Date(enteredDate)
    };

    //console.log(firstPageData);
    console.log("123")
    console.log(secondPageData)
    
    //move to next page
    props.onSetActive(props.active + 1)
  };

  return (
    <div>
      <h3 style={{textAlign: 'center'}}>Personal Information </h3>
      <Input type="text" placeholder="John Doe" label="Username" onChange={userNameHandler}/>
      <p>tags</p>
      <CreatableSelect
            className="text-capitalize text-black"
            placeholder="Select or Create Interest"
            //Select multiple tags
            isMulti
            //Search for tags
            isSearchable
            onChange={tagHandler}
            options={optionsTags}
            //Set value of tag
            value={enteredTag}
          />
      
      <div style={{ display: 'flex'}}>
        <div style={{ flex: 1, paddingRight: 10}}>
        <Input type="date" label="Date of Birth" style={{marginRight: 10}} onchange={dateHandler}/>
        </div>
        {/* <div style={{ flex: 1}}>

        <Input type="text" placeholder="000" label="Filler"/>
        </div> */}
      </div>
      
      {props.active !== 1 && (
        <Button onClick={() => props.onSetActive(props.active - 1)}>Previous</Button>
      )}
      {props.active !== 3 && (
        <Button
          onClick={nextBtnHandler}
          style={{ float: 'right' }}
        >
          Next
        </Button>
      )}

    </div>
  )
}