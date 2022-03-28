import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import uploadFileToBlob  from "./azureBlob";
import {CheckCircle} from "react-bootstrap-icons"
import axios from "axios";

const PictureUploadModal = ({ _id,showUploadModal, setShowUploadModal }) => {
  // all blobs in container
  const [userFile, setUserFile] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadFinished, setUploadFinished] = useState(false)

  const fileHandler = (event) => {
    setUserFile(event.target.files[0]);
  };

  //Sets the correct backend server address depending
    //on if in dev or production mode
    const url =
    process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_URL_DEVELOPMENT
        : process.env.REACT_APP_URL_PRODUCTION;

  const submitFileBTN = async () => {
    //show uploading in the UI
    setUploadingFile(true);

    //Upload to azure container
    const blobUploaded = await uploadFileToBlob(userFile);

    //Show uploading done in UI
    setUploadingFile(false);

    //Remove file from state
    setUserFile(null);
    //////////////////////////////////
    axios.post(url + "/users/profilePic", 
      {_id:_id,profilePic:blobUploaded}
    )
    .then(res =>{console.log(res.data)})
    .catch(err =>{console.log(err)}) 

    ///////////////////////

    setUploadFinished(true)

    console.log(blobUploaded);
  };

  const handleClose = () => {
    setShowUploadModal(false);
    setUploadFinished(false)
  };

  return (
    <Modal show={showUploadModal} onHide={handleClose} className="mt-5">
      <Modal.Header closeButton>
        <Modal.Title>Profile Picture Upload</Modal.Title>
      </Modal.Header>
      {!uploadFinished && !uploadingFile &&(
        <Modal.Body>
        <Form.Group>
          <Form.Control
            type="file"
            onChange={fileHandler}
            accept=".jpg,.jpeg,.png"
          />
        </Form.Group>
        <Button onClick={submitFileBTN} className="mt-4">
          Upload
        </Button><br/>
        
      </Modal.Body>
      )}
      {uploadingFile && (<Spinner animation="border" variant="warning" className="mt-3 text-center"/>)}
      {uploadFinished && (<h5 className="text-center text-success mt-5 mb-5">
      <CheckCircle/> Upload Successful
      </h5>)}
    </Modal>
  );
};

export default PictureUploadModal;
