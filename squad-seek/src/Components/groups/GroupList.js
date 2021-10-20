import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const GroupList = (props) => {
  let month = props.date.toLocaleString("en-US", { month: "long" });
  let day = props.date.toLocaleString("en-US", { day: "2-digit" });
  let year = props.date.getFullYear();

  return (
    <Container variant="light">
      
        <Card bg="primary">
          <Card.Body>
            <Card.Title>Group Title: {props.title} </Card.Title>
            <Card.Text>
              Group Type: {props.mType ? "Online" : "In Person"}
              <br />
              Date: {month + " " + day + ", " + year}
              <br />
              Description: {props.description}
            </Card.Text>
          </Card.Body>
        </Card>
      
    </Container>
  );
};

export default GroupList;
