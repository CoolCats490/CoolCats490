// export default GroupUpdate;
import { useState, useCallback } from "react";
//Bootstrap Stuff
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import "./CSS/GroupUpdate.css"
//React Select
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import ChooseLocation from "../Map/ChooseLocation";
import { Container } from "react-bootstrap";

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

const GroupUpdate = (props) => {

    //Sets the correct backend server address depending
    //on if in dev or production mode
    const url = process.env.NODE_ENV === "development" ? 
    process.env.REACT_APP_URL_DEVELOPMENT : process.env.REACT_APP_URL_PRODUCTION;
  
    //Translate incoming time into a format that datepicker can read
    let d = new Date(props.date)
    let datestring = d.getFullYear().toString() + '-' + (d.getMonth()+1).toString().padStart(2, '0') + '-' + d.getDate().toString().padStart(2, '0');
    let ts = d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0') + ':' + d.getSeconds().toString().padStart(2, '0');

    //Formatting incoming tags into a format React-select can read
    let currentTags = props.tags.map(v => ({
        label: v,
        value: v
      }));

    //Formatting meeting type into a for mat Reac-Select can read
    let mTypes = {
      value: parseInt(props.type), 
      label: parseInt(props.type)?  "Online":"In Person"
    };

    //Creating useState for all the fields in the form
  const [enteredTitle, setTitle] = useState(props.title);
  const [enteredMType, setMType] = useState(mTypes);

  const [enteredDate, setDate] = useState(datestring + "T" +  ts);
  const [enteredDescription, setDescription] = useState(props.description);
  const [enteredTag, setTag] = useState(currentTags);
  const [userFile, setUserFile] = useState(null);
  //console.log(props.groupPic)
  const [addr, setAddr] = useState(props.address || "");
  const [location, setLocation] = useState(props.location || null);
  const [showMap, setShowMap] = useState(false)

  //Entry Handlers
  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const meetingTypeHandler = (event) => {
    setMType(event);

    if(enteredMType.value === 1){
      setAddr("");
      setLocation(null);
    }
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

  const fileHandler = (event) =>{
    setUserFile(event.target.files[0])
  }

  
  const submitHandler = (event) => {
    event.preventDefault();

    //Clearing fields
    setTitle("");
    setMType("");
    setDate("");
    setDescription("");
    setTag("");

    //Put the old tags and new tags in a array
    let oldTags = currentTags.map(e => e.value.toLowerCase());
    let newTags = enteredTag.map(e => e.value.toLowerCase());

    let formData = new FormData();
    formData.append("name", enteredTitle);
    formData.append("type", enteredMType.value);
    formData.append("time", enteredDate);
    formData.append("description", enteredDescription);
    formData.append("tagsArray", JSON.stringify(enteredTag.map(e => e.value.toLowerCase())));
    formData.append("createdBy", JSON.stringify(props.createdBy));
    formData.append("members", JSON.stringify(props.members));
    formData.append("addedTags", JSON.stringify(newTags.filter(x => !oldTags.includes(x))));
    formData.append("removedTags", JSON.stringify(oldTags.filter(x => !newTags.includes(x))));
    formData.append("address", addr);
    formData.append("location", JSON.stringify(location))
    formData.append("userFile", userFile);


    try {
      axios({
        method: "post",
        url: url + '/activities/update/'+props.id,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        })
      //axios.post( url + '/activities/update/'+props.id, groupData)
      .then(res=> console.log(res.data));
    } catch (err) {
          console.log(err.response);
    }

      //Send
      //props.onGroupUpdated(groupData)

      //Close Modal
      props.onModalClose(false);
      props.onDataChanged(true);
  };

  const cancelBtnHandler = useCallback( event =>{
    props.onModalClose(false)
  },[props])

  console.log(userFile)
  return (
    <Container className="">
      <Form >
        <Form.Group className="mb-3" controlId="formGroupTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            className=""
            type="text"
            placeholder="Title"
            onChange={titleHandler}
            value={enteredTitle}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupType">
          <Form.Label>Meeting Type</Form.Label>
         
          <Select
          placeholder="Select Group Type"
          //defaultValue={0}
          options={optionsGroupType}
          onChange={meetingTypeHandler}
          value={enteredMType}
        />
        </Form.Group>

        {enteredMType.value === 0 &&(
          <Form.Group className="mb-3" controlId="formGroupTitle">
            <Form.Label>Location</Form.Label>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Address"
              value={addr}
              onSelect={()=>setShowMap(true)}
              disabled
            />
            {!showMap &&(<Button onClick={()=>setShowMap(true)} className="mb-2">Show Map</Button>)}
            {showMap && (<Button onClick={()=>setShowMap(false)} variant="secondary" className="mb-2">Close Map</Button>)}
            {showMap && 
            (<ChooseLocation 
                onSetAddress={setAddr}
                onSetPosition={setLocation}
            />)}
        </Form.Group>)}
        

        { <Form.Group className="mb-3" controlId="formGroupTags">
          <Form.Label>Tags</Form.Label>
          <CreatableSelect
            className="text-capitalize"
            placeholder="Select or Create Tags"
            //Select multiple tags
            isMulti
            //Search for tags
            isSearchable
            onChange={tagHandler}
            options={optionsTags}
            //Set value of tag
            value={enteredTag}
            
            //
          />
        </Form.Group> }

        <Form.Group className="mb-3" controlId="formGroupTags">
          <Form.Label>Group Picture</Form.Label>
          <Form.Control
            type="file"
            onChange={fileHandler}
            accept=".jpg,.jpeg,.png"
          />
        </Form.Group>

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

        <Button variant="primary" onClick={submitHandler}>
          Submit
        </Button>{" "}
        <Button variant="secondary" onClick={cancelBtnHandler}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default GroupUpdate;
