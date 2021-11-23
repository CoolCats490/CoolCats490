import { useParams } from "react-router";
import axios from "axios";
//token stuff
import { useContext } from "react";
import AuthContext from "../Store/auth-context";

//react imports
import { useState, useEffect, useCallback } from "react";
//Styling
import {
  Badge,
  Col,
  Row,
  Image,
  Container,
  Button,
  Modal,
  ListGroup,
  Accordion,
  Card
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//pic
import defaultPic from "./Media/group-defualt.jpg";
//Components
import GroupUpdate from "../Components/groups/GroupUpdate";
import GroupDelete from "../Components/groups/GroupDelete";

const GroupDetails = (props) => {
  //token stuff
  const authCtx = useContext(AuthContext);
  const isLogedIn = authCtx.isLoggedIn;

  //get the id from the url using params
  const params = useParams();

  //groups object and setter here
  const [groups, setGroups] = useState([]);

  //use useState to store and set if the update group modals is shown
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  //use useState to store and set if the update group modals is shown
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //use useState to store if the data is still being fetched from the server
  const [isLoading, setLoading] = useState(true);

  //Use useState to store user info from server
  const [userInfo, setUserInfo] = useState([]);

  //U
  const [dataChanged, setDataChanged] = useState(false)
  ///////////////////////////////////////////////////////////////
  const loadData = useCallback( async () =>{
    //async call to database
      const fetchGroups = async () => {
        try {
          let response = await axios(
            `http://localhost:5000/activities/${params.groupID}`
          );
          //store groups in groups object
          setGroups(response.data);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
  
      let fetchUser = async () =>{
        try{
          const response = await axios.get
        ("http://localhost:5000/users/me", {
          headers: {
            "Content-Type": "application/json",
            token: authCtx.token,
          },
        });
        //store user info in user object
        setUserInfo(response.data)
  
        }catch(err){
          console.log(err);
        }
      }
      //Call async function
      fetchGroups();
      if(isLogedIn)
        fetchUser();
    //set datachange back to false
      setDataChanged(false)
  },[dataChanged,params,authCtx.token,isLogedIn])


  //useEffect hook will load groups from data base when component is loaded
  useEffect(() => {
    loadData()
  }, [loadData]);

  //if data is not loaded will retrun a blank page saying loading
  if (isLoading) {
    return <Container>Data is Loading</Container>;
  }

  const joinBtnHandler = (event) => {

    let alreadyJoined = groups.members.find(x => x.id === userInfo._id)

    if(!alreadyJoined){
      console.log("not in group")

      //get user stuff
      let memberInfo = {
        id:userInfo._id,
        username:userInfo.username
      }

      groups.members.push(memberInfo)

      const groupStuff = {
        members: groups.members
      }
  
      try {//http://localhost:5000/activities/join/:id
        axios.post('http://localhost:5000/activities/join/'+groups._id, groupStuff).then(res=> console.log(res.data));
      } catch (err) {
            console.log(err);
      }

      //Update the page data again
      setDataChanged(true)

    }

  };

  //Date stuff
  let date = new Date(parseInt(groups.time));
  let month = date.toLocaleString("en-US", { month: "long" });
  let day = date.toLocaleString("en-US", { day: "2-digit" });
  let year = date.getFullYear();
  let time = date.toLocaleTimeString("en-US");

  //console.log("group id "+groups.createdBy)
  //console.log(groups)
  //console.log("User id = "+userInfo._id)
  //console.log("Group id = "+groups.createdBy[0].id)

  return (
    <>
      <Container className="text-light bg-secondary">
        <Row className="pt-4">
          <Col>
            <Image
              style={{ maxHeight: "300px", maxWidth: "500px" }}
              src={defaultPic}
              rounded
            />
          </Col>
          <Col>
            <section>
              <h2>
                <strong>Group Title:</strong> {groups.name}
              </h2>
              {groups.createdBy !=null &&(<p>
                <strong>Group Started by:</strong> {groups.createdBy[0].username}
              </p>)}
              <p>
                <strong>Group Type:</strong>{" "}
                {parseInt(groups.type) ? "Online" : "In Person"}{" "}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {month + " " + day + ", " + year + " @ " + time}
              </p>
              <p>
                <strong>Description:</strong> {groups.description}
              </p>
              <p>
                <strong>Tags: </strong>
                {groups.tagsArray.map((e, index) => (
                  <Badge className="bg-warning text-dark me-2" key={index}>
                    {e}
                  </Badge>
                ))}
              </p>
              {groups.createdBy[0].id === userInfo._id && (<Button onClick={() => setShowUpdateModal(true)} className="pr-2">Update</Button>)}
              {isLogedIn && groups.createdBy[0].id === userInfo._id && (<Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                Delete
              </Button>)}
              {isLogedIn && groups.createdBy[0].id !== userInfo._id && (<Button onClick={joinBtnHandler}>Join Group</Button>)}
            </section>
          </Col>
        </Row>
        <Row>
        <Container fluid >
        {groups.members && (<h4 className="pt-4"></h4>)}
        {/* <ListGroup className="pb-4">
          {
              groups.members && 
              groups.members.map((e,index) =>(
                <ListGroup.Item key={e._id} key={index}>{e.username}</ListGroup.Item>
              )
              )
          }

        </ListGroup> */}
        <Accordion className="text-dark pb-4 ">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                            <h4 className="pt-4 text-center">Click to see members in group</h4>
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                <ListGroup className="pb-4">
          {
              groups.members && 
              groups.members.map((e,index) =>(
                <ListGroup.Item key={e._id} key={index}>{e.username}</ListGroup.Item>
              )
              )
          }

        </ListGroup>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>

        </Container>
        </Row>
      </Container>

      {/*Update Modal/Popup window settings start here                 */}
      <Modal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        animation={false}
      >
        <Modal.Header>
          <Modal.Title id="group-update-modal">Update Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GroupUpdate
            title={groups.name}
            type={groups.type}
            date={groups.time}
            description={groups.description}
            tags={groups.tagsArray}
            id={groups._id}
            onModalClose={setShowUpdateModal}
            onDataChanged={setDataChanged}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        animation={false}
      >
        <Modal.Header>
          <Modal.Title id="group-delte-modal">Delete Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GroupDelete
            title={groups.name}
            id={groups._id}
            onModalClose={setShowDeleteModal}
            //onGroupUpdated={}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GroupDetails;
