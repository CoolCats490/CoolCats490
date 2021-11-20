import { useState } from "react";
//Bootstrap Stuff
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import CreatableSelect from "react-select/creatable";


//Tag Select Options
const optionsTags = [
  {value: 'concert', label: 'Concert'},
  {value: 'cosplay', label: 'Cosplay'},
  {value: 'cooking', label: 'Cooking'},
  {value: 'gaming', label: 'Gaming'},
  {value: 'surfing', label: 'Surfing'}
];

const GroupUpdate = (props) => {
    let d = new Date(parseInt(props.date))
    let datestring = d.getFullYear().toString() + '-' + (d.getMonth()+1).toString().padStart(2, '0') + '-' + d.getDate().toString().padStart(2, '0');
    let ts = d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0') + ':' + d.getSeconds().toString().padStart(2, '0');
    let groupID= props.id
    console.log(datestring + "T" +  ts);

  const [enteredTitle, setTitle] = useState(props.title);
  const [enteredMType, setMType] = useState(props.type);
  const [enteredDate, setDate] = useState(datestring + "T" +  ts);
  const [enteredDescription, setDescription] = useState(props.description);
  const [enteredTag, setTag] = useState([]);

    
const history = useHistory()

  //Entry Handlers
  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const meetingTypeHandler = (event) => {
    setMType(event.target.value);
  };

  const dateHandler = (event) => {
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


    props.onSavedGroup(groupData);
    console.log(groupData);
    axios.post(`http://localhost:5000/activities/${groupID}`,groupData)
    .then(res =>{console.log(res)})
    .catch(error => console.error(error));
  };

  const selectMenuStyle = {
    menuList: styles => ({ ...styles, backgroundColor: 'Black' })
  }


  return (
    <div className="bg-primar">
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
          <Form.Control
            as="select"
            className="form-select"
            onChange={meetingTypeHandler}
            value={enteredMType}
          >
            <option defaultValue>Select Type</option>
            <option value="0">In Person</option>
            <option value="1">Online</option>
          </Form.Control>
        </Form.Group>


        { <Form.Group className="mb-3" controlId="formGroupTags">
          <Form.Label>Tags</Form.Label>
          <CreatableSelect
            className="text-capitalize"
            placeholder="Select or Create Tags"
            //Styles
            styles={selectMenuStyle}
            //Select multiple tags
            isMulti
            //Search for tags
            isSearchable
            onChange={tagHandler}
            options={optionsTags}
            //Set value of tag
            value={enteredTag}
            //
            defaultValue={"test"}
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

        { <Button variant="primary" type="submit">
          Submit
        </Button> }
      </Form>
    
    </div>
  );
};

export default GroupUpdate;
