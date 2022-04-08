import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
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

    //Remove file from state
    setUserFile(null);

    let formData = new FormData();
    formData.append("_id", _id);
    formData.append("userFile", userFile);
    


    const data = {_id:_id, userFile:userFile}
    console.log(data)

    //////////////////////////////////
    // axios.post(url + "/users/profilePic", 
    //   //{_id:_id, userFile:userFile}
    //   formData
    // )
    // .then(res =>{console.log(res.data)})
    // .catch(err =>{console.log(err)}) 

    try{
      const res = await axios({
        method: "post",
        url: url + "/users/profilePic",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
      console.log(res.data)
    }
    catch(err){
      console.log(err.response)
    }

    //Show uploading done in UI
    setUploadingFile(false);


    ///////////////////////

    setUploadFinished(true)

    //console.log(blobUploaded);
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
