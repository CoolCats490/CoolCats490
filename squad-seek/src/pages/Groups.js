
import React from "react";
import { Route } from "react-router-dom";
//Pages and Sidebar
import GroupCreate from "../Components/groups/GroupCreate";
import GroupList from "../Components/groups/GroupList";
import GroupDetails from "./GroupDetails";
import GroupSideBar from "../Components/groups/GroupSideBar";
//Styling
import "./Groups.css";
import { Container, Row, Col } from "react-bootstrap";
import "./Groups.css";

const Groups = () => {
  

  return (
    <div className="main-wrapper">
      <Row>
        <Col sm="2" className="fluid vh-100 w-25 bg-light col-Width">
          <GroupSideBar></GroupSideBar>
        </Col>
        <Col className="pl-0 bg-dark col-Width mr-0">
          <Container fluid className="text-white gList">

            <Route path="/groups/create">
              <GroupCreate  />
            </Route>

            <Route path="/groups/list">
              <GroupList/>
            </Route>

            <Route path="/groups/group-details/:groupID">
              <GroupDetails />
            </Route>

          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Groups;
