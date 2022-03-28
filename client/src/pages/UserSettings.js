import React, { useState, useEffect, useContext } from "react";
import { Container, Spinner, Tab, Tabs } from "react-bootstrap";
import axios from "axios";
//User token
import AuthContext from "../Store/auth-context";
import ProfileSettings from "../Components/User/ProfileSettings";
//
import AccountSettings from "../Components/User/AccountSettings";

const UserSettings = () => {
  const [userInfo, setUserInfo] = useState(null);

  //Sets the correct backend server address depending
  //on if in dev or production mode
  const url =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_URL_DEVELOPMENT
      : process.env.REACT_APP_URL_PRODUCTION;

  //token stuff
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    try {
      //get user data
      axios
        .get(url + "/users/me", {
          headers: {
            "Content-Type": "application/json",
            token: authCtx.token,
          },
        })
        .then((response) => {
          //Save user data to object
          setUserInfo(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, [authCtx.token, url]);

  if (!userInfo) {
    return <Spinner animation="border" variant="warning" />;
  }

  return (
    <Container className="bg-light text-dark mt-3 pt-2 w-75">
      <Tabs defaultActiveKey="profile">
        <Tab eventKey="profile" title="Profile Settings">
          <ProfileSettings userInfo={userInfo} />
        </Tab>
        <Tab eventKey="user" title="Account Settings">
          <AccountSettings userInfo={userInfo} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default UserSettings;
