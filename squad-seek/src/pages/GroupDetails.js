import { useParams } from "react-router";
import axios from "axios";

//react imports
import { useState, useEffect } from "react";
//Styling
import { Badge, Col, Row, Image, Container, Button, Modal } from "react-bootstrap";
//pic
import defaultPic from "./Media/group-defualt.jpg";
import GroupUpdate from "../Components/groups/GroupUpdate";

const GroupDetails = (props) => {
  //get the id from the url using params
  const params = useParams();

  //groups object and setter here
  const [groups, setGroups] = useState([]);

  //use useState to store and set if the modals is shown
  const[showModal, setShowModal] = useState(false);

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
      } catch (err) {
        console.log(err);
      }
    };
    //Call async function
    fetchGroups();
  }, []);

  //Date stuff
  let date = new Date(parseInt(groups.time));
  let month = date.toLocaleString("en-US", { month: "long" });
  let day = date.toLocaleString("en-US", { day: "2-digit" });
  let year = date.getFullYear();
  let time = date.toLocaleTimeString("en-US");

  console.log(groups);

  const closeModalHandler  = () => setShowModal(false);
  const showModalHandler = () => setShowModal(true);



  return (
      <>
    <Container className="text-light bg-secondary">
      <Row>
        <Col>
          <Image
            style={{ height: "300px", width: "500px" }}
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
              <strong>Tags:</strong>
              {groups.tagsArray}
            </p>
            <Button onClick={()=>setShowModal(true)}>Update</Button>{" "}
            <Button>Delete</Button>
          </section>
        </Col>
      </Row>
    </Container>

    <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header >
          <Modal.Title id="example-custom-modal-styling-title">
            Update Group
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GroupUpdate 
              title = {groups.name}
              type = {groups.type}
              date = {groups.time}
              description = {groups.description}
              tags = {groups.tagsArray}

          />
        </Modal.Body>
      </Modal>
    </>
    
  );
};

export default GroupDetails;
