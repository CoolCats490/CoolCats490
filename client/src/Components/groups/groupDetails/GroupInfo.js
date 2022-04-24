import { useContext, useState } from "react";
import AuthContext from "../../../Store/auth-context";
import { Button, Modal, Spinner } from "react-bootstrap";
import React from "react";
//Import other custom components
import GroupUpdate from "../GroupUpdate";
import GroupDelete from "../GroupDelete";
//Database stuff
import axios from "axios";
import TagsBadges from "./TagsBadges";
import { Link } from "react-router-dom";

const GroupInfo = (props) => {
  //Sets the correct backend server address depending
  //on if in dev or production mode
  const url = process.env.NODE_ENV === "development" ? 
  process.env.REACT_APP_URL_DEVELOPMENT : process.env.REACT_APP_URL_PRODUCTION;
  
  //User token hook to check if a user is logged in
  const authCtx = useContext(AuthContext);
  const isLogedIn = authCtx.isLoggedIn;

  //use useState to store and set if the update/delete group modals is shown
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const joinBtnHandler = (event) => {
    let alreadyJoined = props.groups.members.find((x) => x.id === props.userInfo._id);

    if (!alreadyJoined) {

      //get user stuff
      const memberInfo = {
        id: props.userInfo._id,
        username: props.userInfo.username,
        userName: props.userInfo.username
      };

      try {//http://localhost:5000/activities/join/:id
        axios
          .post(
            url + "/activities/join/" + props.groups._id,
            memberInfo
          )
          .then((res) => console.log(res.data));
      } catch (err) {
        console.log(err);
      }

      //Update the page data again
      props.onDataChanged(true);
    }
  };
  const leaveBtnHandler = (event) => {
    let alreadyJoined = props.groups.members.find((x) => x.id === props.userInfo._id);

    if (alreadyJoined) {

      //get user stuff
      const memberInfo = {
        id: props.userInfo._id,
        username: props.userInfo.username,
        userName: props.userInfo.username
      };

      try {//http://localhost:5000/activities/leave/:id
        axios
          .post(
            url + "/activities/leave/" + props.groups._id,
            memberInfo
          )
          .then((res) => console.log(res.data));
      } catch (err) {
        console.log(err);
      }

      //Update the page data again
      props.onDataChanged(true);
    }
  };

  if(!props.groups.createdBy|| !props.userInfo){
    return <Spinner animation="border" variant="warning" />
  }

  //Formatting date into a readable format
  let date = new Date(props.groups.time);
  let month = date.toLocaleString("en-US", { month: "long" });
  let day = date.toLocaleString("en-US", { day: "2-digit" });
  let year = date.getFullYear();
  let time = date.toLocaleTimeString("en-US");

  return (
      <React.Fragment>
    {props.groups &&(<section>
      <h2>
        <strong>Group Title:</strong> {props.groups.name}
      </h2>
      {props.groups.createdBy != null && (
        <p>
          <strong>Group Started by:</strong>{" "}
          <Link 
          to={`/user/${props.groups.createdBy[0].id}`}
          className="text-warning"
          >{props.groups.createdBy[0].username}</Link>
        </p>
      )}
      <p>
        <strong>Group Type:</strong>{" "}
        {parseInt(props.groups.type) ? "Online" : "In Person"}{" "}
      </p>
      <p>
        <strong>Date:</strong> {month + " " + day + ", " + year + " @ " + time}
      </p>
      {props.groups.address &&(<p>
        <strong>Location:</strong> {props.groups.address}
      </p>)}
      <p>
        <strong>Description:</strong> {props.groups.description}
      </p>
      <p>
        <strong>Tags: </strong>
        {props.groups.tagsArray && props.groups.tagsArray.map((e, index) => (
          
          <TagsBadges
            key = {index}
            tagName = {e}
            index = {index}
          />
        ))}
      </p>
      { (props.groups.createdBy[0].id === props.userInfo._id || props.userInfo.isAdmin) &&  (
        <Button onClick={() => setShowUpdateModal(true)} className="mx-1">
          Update
        </Button>
      )}
      { isLogedIn && (props.groups.createdBy[0].id === props.userInfo._id || props.userInfo.isAdmin) && (
        <Button variant="danger" onClick={() => setShowDeleteModal(true)} className="mx-1">
          Delete
        </Button>
      )}
      {isLogedIn &&
        props.groups.createdBy[0].id !== props.userInfo._id &&
        !props.groups.members.find(({ id }) => id === props.userInfo._id) && (
          <Button onClick={joinBtnHandler} className="mx-1">Join Group</Button>
        )}{" "}
        {isLogedIn &&
        props.groups.createdBy[0].id !== props.userInfo._id &&
        props.groups.members.find(({ id }) => id === props.userInfo._id) && (
          <Button onClick={leaveBtnHandler} className="btn-danger">Leave Group</Button>
        )}
    </section>)}


    {/*Update Modal/Popup window settings start here                 */}
    <Modal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        dialogClassName="modal-lg"
        aria-labelledby="example-custom-modal-styling-title"
        animation={false}
        className="mt-5"
      >
        <Modal.Header className="">
          <Modal.Title id="group-update-modal">Update Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GroupUpdate
            title={props.groups.name}
            type={props.groups.type}
            date={props.groups.time}
            description={props.groups.description}
            tags={props.groups.tagsArray}
            id={props.groups._id}
            address={props.groups.address}
            location={props.groups.location}
            createdBy={props.groups.createdBy}
            groupPic={props.groups.groupPic}
            members={props.groups.members}
            onModalClose={setShowUpdateModal}
            onDataChanged={props.onDataChanged}
          />
        </Modal.Body>
      </Modal>

       {/* Below is the modal to delete a group */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        animation={false}
        className="mt-5"
      >
        <Modal.Header>
          <Modal.Title id="group-delte-modal">Delete Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GroupDelete
            title={props.groups.name}
            id={props.groups._id}
            onModalClose={setShowDeleteModal}
            //onGroupUpdated={}
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default GroupInfo;
