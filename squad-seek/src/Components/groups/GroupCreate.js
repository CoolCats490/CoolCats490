import { useState } from "react";
//Bootstrap Stuff
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//Axios
import axios from 'axios';
//React Select
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

//Tag Select Options
const optionsTags = [
  {value: 'concert', label: 'Concert'},
  {value: 'cosplay', label: 'Cosplay'},
  {value: 'cooking', label: 'Cooking'},
  {value: 'gaming', label: 'Gaming'},
  {value: 'surfing', label: 'Surfing'}
];
//Group Type Options
const optionsGroupType =[
  {value: 0, label: 'In Person'},
  {value: 1, label: 'Online'}
  ];

const GroupCreate = (props) => {
  const [enteredTitle, setTitle] = useState("");
  const [enteredMType, setMType] = useState("");
  const [enteredDate, setDate] = useState("");
  const [enteredDescription, setDescription] = useState("");
  const [enteredTag, setTag] = useState([]);

  //Entry Handlers
  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const meetingTypeHandler = (event) => {
    setMType(event.value);
  };

  const dateHandler = (event) => {
    console.log(event.target.value);
    setDate(event.target.value);
  };

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const tagHandler = (event) => {
    setTag( event );
  }
  const submitHandler = (event) => {
    event.preventDefault();

    //Clearing fields
    setTitle("");
    setMType("");
    setDate("");
    setDescription("");
    setTag("");

    //Putting data into a object
    const groupData = {
      name: enteredTitle,
      type: parseInt(enteredMType),
      time: new Date(enteredDate),
      description: enteredDescription,
      tagsArray: enteredTag.map(e => e.value)
    };


    //props.onSavedGroup(groupData);
    console.log(groupData);
    axios.post('http://localhost:5000/activities/add', groupData).then(res=> console.log(res.data));
  };


  // const showLocation = () => {
  //   if (enteredMType === "0") return <Button bg="light">location?</Button>;
  // };

  return (
    <div className="text-white">
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formGroupTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            className="text-capitalize"
            type="text"
            placeholder="Title"
            onChange={titleHandler}
            value={enteredTitle}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupType">
          <Form.Label>Meeting Type</Form.Label>
          <Select
          className="text-black"
          placeholder="Select Group Type"
          options={optionsGroupType}
          onChange={meetingTypeHandler}
          value={enteredMType}
        />
        </Form.Group>


        { <Form.Group className="mb-3" controlId="formGroupTags">
          <Form.Label>Tags</Form.Label>
          <CreatableSelect
            className="text-capitalize text-black"
            placeholder="Select or Create Tags"
            //Select multiple tags
            isMulti
            //Search for tags
            isSearchable
            onChange={tagHandler}
            options={optionsTags}
            //Set value of tag
            value={enteredTag}
          />
        </Form.Group> }

        <Form.Group className="mb-3" controlId="formGroupDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="meetingDate"
            onChange={dateHandler}
            value={enteredDate}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupDescription">
          <Form.Label>Group Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Group Description"
            style={{ Width: "4000px" }}
            onChange={descriptionHandler}
            value={enteredDescription}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default GroupCreate;
