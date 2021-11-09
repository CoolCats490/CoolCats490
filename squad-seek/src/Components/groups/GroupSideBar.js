import React from "react";
import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const GroupSideBar = () => {
  return (
    <React.Fragment>
      <Container fluid className="">
        <Nav className="flex-column fluid">
          <Nav.Link as={Link} to="/groups/create">Create Group</Nav.Link>
          <Nav.Link as={Link} to="/groups/list">Group List</Nav.Link>
        </Nav>
      </Container>

      
    </React.Fragment>
  );
};

export default GroupSideBar;
