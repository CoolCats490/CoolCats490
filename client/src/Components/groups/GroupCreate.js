import { useState, useContext, useEffect } from "react";
//Styling
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Modal } from "react-bootstrap";
import "./CSS/GroupCreate.css";
//Axios
import axios from "axios";
//React Select
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
//token
import AuthContext from "../../Store/auth-context";
//google map
import ChooseLocation from "../Map/ChooseLocation";
import { useHistory } from "react-router-dom";

//Tag Select Options
const optionsTags = [
  { value: "concert", label: "Concert" },
  { value: "cosplay", label: "Cosplay" },
  { value: "cooking", label: "Cooking" },
  { value: "gaming", label: "Gaming" },
  { value: "surfing", label: "Surfing" },
];
//Group Type Options
const optionsGroupType = [
  { value: "0", label: "In Person" },
  { value: "1", label: "Online" },
];

const GroupCreate = (props) => {
  //Sets the correct backend server address depending
  //on if in dev or production mode
  const url = process.env.NODE_ENV === "development" ? 
  process.env.REACT_APP_URL_DEVELOPMENT : process.env.REACT_APP_URL_PRODUCTION;

  //token stuff
  const authCtx = useContext(AuthContext);
  const isLogedIn = authCtx.isLoggedIn;

  const [enteredTitle, setTitle] = useState("");
  const [enteredMType, setMType] = useState("");
  const [enteredDate, setDate] = useState("");
  const [enteredDescription, setDescription] = useState("");
  const [enteredTag, setTag] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showMap, setShowMap] = useState(false)
  const [addr, setAddr] = useState("");
  const [location, setLocation] = useState(null);
  const [userFile, setUserFile] = useState(null);

  //useHistory is used to redirect to new page
  const history = useHistory();

  //useEffect hook will load groups from data base when component is loaded
  useEffect(() => {
    //async call to database
    const fetchUser = async () => {
      try {
        const response = await axios.get( url + "/users/me", {
          headers: {
            "Content-Type": "application/json",
            token: authCtx.token,
          },
        });
        //store user info in user object
        setUserInfo(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    //Call async function
    if (isLogedIn) fetchUser();
  }, [isLogedIn, authCtx.token, url]);

  //Entry Handlers
  const titleHandler = (event) => {
    setTitle(event.target.value);
  };
  const meetingTypeHandler = (event) => {
    setMType(event);
  };
  const dateHandler = (event) => {
    setDate(event.target.value);
  };
  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const tagHandler = (event) => {
    setTag(event);
  };
  const fileHandler = (event) =>{
    setUserFile(event.target.files[0])
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (isLogedIn) {
      //creating a form data object to store group info
      let formData = new FormData();
      formData.append("name", enteredTitle);
      formData.append("type", enteredMType.value );
      formData.append("time", enteredDate);
      formData.append("description", enteredDescription);
      formData.append("tagsArray", JSON.stringify(enteredTag.map(e => e.value.toLowerCase())));
      formData.append("createdBy", JSON.stringify( {id: userInfo._id, username: userInfo.username} ));
      formData.append("members", JSON.stringify( {id: userInfo._id, username: userInfo.username} ));
      formData.append("address", addr);
      formData.append("location", JSON.stringify( location ))
      formData.append("userFile", userFile);

      //Clearing fields
      setTitle("");
      setMType("");
      setDate("");
      setDescription("");
      setTag("");

      //db request
      axios({
        method: "post",
        url: url + '/activities/add/',
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        })
        //.post( url + "/activities/add", groupData)
        .then((res) => {
          console.log(res.data)
          history.push("/groups/list");
        });
    } else {
      setShowErrorModal(true);
    }
  };

  return (
    <Container className="text-dark bg-light pt-4 mt-5 pb-5 w-50">
      <h3 className="text-center">Create a new group</h3>
      <hr/>
      <Form>
        <Form.Group className="mb-3 formGroupTitle" controlId="formGroupTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            className=""
            type="text"
            placeholder="Title"
            onChange={titleHandler}
            value={enteredTitle}
          />
        </Form.Group>

        <Form.Group className="mb-3 formGroupType" controlId="formGroupType">
          <Form.Label>Meeting Type</Form.Label>
          <Select
            className="text-black"
            placeholder="Select Group Type"
            options={optionsGroupType}
            onChange={meetingTypeHandler}
            value={enteredMType}
          />
        </Form.Group>

        {enteredMType.value === "0" &&(
          <Form.Group className="mb-3 formGroupTitle" controlId="formGroupLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              className="mb-2 formGroupTitle"
              type="text"
              placeholder="Address"
              value={addr}
              onSelect={()=>setShowMap(true)}
              disabled
            />
            {!showMap &&(<Button onClick={()=>setShowMap(true)} className="mb-2">Show Map</Button>)}
            {showMap && (<Button onClick={()=>setShowMap(false)} className="mb-2 bg-secondary">Close Map</Button>)}
            {showMap && 
            (<ChooseLocation 
                onSetAddress={setAddr}
                onSetPosition={setLocation}
            />)}
        </Form.Group>)}
        
            

        {
          <Form.Group className="mb-3 formGroupTags" controlId="formGroupTags">
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
          </Form.Group>
        }

        <Form.Group className="mb-3 formGroupDate" controlId="formGroupDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="meetingDate"
            onChange={dateHandler}
            value={enteredDate}
          />
        </Form.Group>

        <Form.Group className="mb-3 formGroupType" controlId="formGroupTags">
          <Form.Label>Group Picture</Form.Label>
          <Form.Control
            type="file"
            onChange={fileHandler}
            accept=".jpg,.jpeg,.png"
          />
        </Form.Group>

        <Form.Group className="mb-3 text-center" controlId="formGroupDescription">
          <Form.Label>Group Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Group Description"
            style={{ Width: "4000px" }}
            onChange={descriptionHandler}
            value={enteredDescription}
          />
        </Form.Group>

        <div className="text-center mt-4">
          <Button variant="primary" onClick={submitHandler}>
              Submit
          </Button>
        </div>

        
            
      </Form>

      <Modal
        show={showErrorModal}
        onHide={() => setShowErrorModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        animation={false}
      >
        <Modal.Header>
          <Modal.Title id="group-create-error-modal">
            Group Creation Error
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please create an account before making a group</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default GroupCreate;
