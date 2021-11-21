import React,{useState} from 'react';
import Input from './input';
import Button from './button'
//React Select
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
//axios
import axios from 'axios';

export default function RegisterPage2(props) {
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
  const [enteredAge, setAge] = useState(0);


  const userNameHandler = (event) =>{
    setUserName(event.target.value);
  }

  const tagHandler = (event) => {
    setTag(event);
  }

  const dateHandler = (event) => {
    
    //get year from date selector
    let date1 =new Date(event.target.value)
    let givenYear = date1.getFullYear();

    //get the current yyear
    let date2 = new Date();
    let currentYear = date2.getFullYear();

    //console.log(currentYear - givenYear)
    setAge(currentYear - givenYear);

    //console.log(2021 - year)
  };


  const nextBtnHandler = ()=>{
    //creating group data object
    const secondPageData = {
      username: enteredUserName,
      interests: enteredTag.map(e => e.value),
      age: enteredAge,

    };

    //console.log(firstPageData);
    //console.log(secondPageData)
    
    //move to next page
    props.onSetActive(props.active + 1)


    //database stuff
    //console.log(props.firstPageData);

   
    let combinedData = {
      username: enteredUserName,
      age: enteredAge,
      interests: enteredTag.map(e => e.value),
      password: props.firstPageData.password,
      email: props.firstPageData.email,
      firstname: props.firstPageData.fName,
      lastname: props.firstPageData.lName

    }

    console.log(combinedData)

    //send data to database
    axios.post('http://localhost:5000/users/add', combinedData).then(res=> console.log(res.data));
  };

  return (
    <div>
      <h3 style={{textAlign: 'center'}}>Personal Information </h3>
      <Input type="text" placeholder="John Doe" label="Username" onChange={userNameHandler}/>
      <p style={{ marginBottom: '0px'}}>Interest</p>
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
        <Input type="date" label="Date of Birth" style={{marginRight: 10}} onChange={dateHandler}/>
        </div>
        
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