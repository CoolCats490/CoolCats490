import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
//React Select
import CreatableSelect from "react-select/creatable";

const ChangeInterests = ({ userInfo, showForm }) => {
  //Tag Select Options
  const optionsTags = [
    { value: "concert", label: "Concert" },
    { value: "cosplay", label: "Cosplay" },
    { value: "cooking", label: "Cooking" },
    { value: "gaming", label: "Gaming" },
    { value: "surfing", label: "Surfing" },
  ];

  //Formatting incoming tags into a format React-select can read
  let currentTags = userInfo.interests.map((v) => ({
    label: v,
    value: v,
  }));
  //useStates
  const [enteredTag, setTag] = useState(currentTags);
  const [tagsUpdated, setTagsUpdated] = useState(false);
  const [errorUpdating, setErrorUpdating] = useState(false);

  //Sets the correct backend server address depending
  //on if in dev or production mode
  const url =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_URL_DEVELOPMENT
      : process.env.REACT_APP_URL_PRODUCTION;

  const tagHandler = (event) => {
    setTag(event);
    console.log(enteredTag)
  };
 
  const submitHandler = () => {
    //Put the old tags and new tags in a array
    let oldTags = currentTags.map(e => e.value.toLowerCase());
    let newTags = enteredTag.map(e => e.value.toLowerCase());
    //Database call
    axios.post(url + "/users/changeTags", 
    { 
        userData:{
            _id:userInfo._id,
        username:userInfo.username
        },
        addedTags: newTags.filter(x => !oldTags.includes(x)),
        removedTags: oldTags.filter(x => !newTags.includes(x)),
        tagsArray: enteredTag.map(e => e.value.toLowerCase())
    
    })
        .then(res =>{
            setTagsUpdated(true);
        })
        .catch( err =>{
            console.log(err.response)
        })

  };

  const closeHandler = () => {
    setTagsUpdated(false);
    setErrorUpdating(false);
    showForm(false);
  };

  return (
    <Container className="w-50">
      {tagsUpdated && (
        <h5 className="bg-success text-center" onClick={closeHandler}>
          Tags Updated
        </h5>
      )}
      {errorUpdating && (
        <h5 className="bg-warning text-center">Error Updating Tags</h5>
      )}
      {!tagsUpdated && (
        <Form>
          <Form.Group className="mb-3" controlId="formGroupTags">
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
            />
          </Form.Group>
          <Button onClick={submitHandler}>Submit</Button>
          <Button className="mx-2 bg-danger" onClick={closeHandler}>
            Cancel
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default ChangeInterests;
