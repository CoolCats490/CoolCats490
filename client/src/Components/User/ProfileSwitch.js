import React, { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

const ProfileSwitch = ({
  incomingState,
  setIncomingState,
  incomingURL,
  updateField,
}) => {
  const isInitialMount = useRef(true);

  


  //Save hideProfile state when user clicks switch
  const switchHandler = () => {
    setIncomingState(!incomingState);
  };

  

  //Send hide profile data to the database when user clicks switch
  useEffect(() => {
    
    //Sets the correct backend server address depending
    //on if in dev or production mode
    const url =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_URL_DEVELOPMENT
      : process.env.REACT_APP_URL_PRODUCTION;


    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      axios
      .post(url + incomingURL, updateField)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [updateField, incomingURL]);

  return (
    <>
      <Form>
        <Form.Check
          onChange={switchHandler}
          type="switch"
          checked={false || incomingState}
        />
      </Form>
    </>
  );
};

export default React.memo(
    ProfileSwitch//,
    //(prevProps, nextProps) => prevProps.incomingURL === nextProps.incomingURL
    );
