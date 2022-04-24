//Styling
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import "./CSS/GroupListItem.css";
//Router
import { Link } from "react-router-dom";
import { Col, Row, Image } from "react-bootstrap";
import defaultPic from "../../pages/Media/group-defualt.jpg";

const GrouptListItem = (props) => {
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();
  const time = props.date.toLocaleTimeString("en-US");
  console.log();

  return (
    <Container className="pb-0 pt-1 text-dark" key={props.id}>
      <Row>
        <Col className="w-50" md="6">
          <Link
            to={{ pathname: `/groups/${props.id}` }}
            className="text-decoration-none"
          >
            <Image
              src={props.groupPic || defaultPic}
              alt="group image"
              rounded
              className="img-fluid img-max"
            />
          </Link>
        </Col>
        <Col className="mx-4">
          <h5 className="mt-4">
            <strong className="text-info">{props.title}</strong>
          </h5>
          <div className="mb-2 mt-3">
            <strong>Group Type:</strong>{" "}
            {parseInt(props.type) ? "Online" : "In Person"}
          </div>
          <div className="mb-2">
            <strong>Date:</strong>{" "}
            {month + " " + day + ", " + year + " @ " + time}
          </div>
          <div className="mb-2">
            <strong>Description:</strong> {props.description}
          </div>
          <Badge className="mb-2 px-2">
            Memebers in group:
            <Badge className="bg-dark">
              <strong>{props.members.length}</strong>
            </Badge>
          </Badge>
          <br />
          <strong>Tags:</strong>{" "}
          {props.tags.map((e, index) => (
            <Badge className="bg-warning text-dark me-2" key={index}>
              {e}
            </Badge>
          ))}
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

export default GrouptListItem;
