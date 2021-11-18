import { useParams } from "react-router";
import axios from "axios";

//react imports
import { useState, useEffect } from "react";
//Styling
import {
  Badge,
  Col,
  Row,
  Image,
  Container,
  Button,
  Modal,
} from "react-bootstrap";
//pic
import defaultPic from "./Media/group-defualt.jpg";
//Components
import GroupUpdate from "../Components/groups/GroupUpdate";
import GroupDelete from "../Components/groups/GroupDelete";

const GroupDetails = (props) => {
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

  //useEffect hook will load groups from data base when component is loaded
  useEffect(() => {
    //async call to database
    const fetchGroups = async () => {
      try {
        const response = await axios(
          `http://localhost:5000/activities/${params.groupID}`
        );
        //store groups in groups object
        setGroups(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    //Call async function
    fetchGroups();
  }, []);

  //if data is not loaded will retrun a blank page saying loading
  if (isLoading) {
    return <Container>Data is Loading</Container>;
  }


  //Date stuff
  let date = new Date(parseInt(groups.time));
  let month = date.toLocaleString("en-US", { month: "long" });
  let day = date.toLocaleString("en-US", { day: "2-digit" });
  let year = date.getFullYear();
  let time = date.toLocaleTimeString("en-US");

  return (
    <>
      <Container className="text-light bg-secondary">
        <Row>
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
                  <Badge className="bg-warning text-dark me-2" key={index}>{e}</Badge>
                ))}
              </p>
              <Button onClick={() => setShowUpdateModal(true)}>Update</Button>{" "}
              <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete</Button>
            </section>
          </Col>
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
          <Modal.Title id="group-update-modal">
            Update Group
          </Modal.Title>
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
          <Modal.Title id="group-delte-modal">
            Delete Group
          </Modal.Title>
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
