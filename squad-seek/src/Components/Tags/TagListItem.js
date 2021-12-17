import "./CSS/TagListItem.css";

import { Badge, Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const TagListItem = (props) => {

    const history = useHistory();

    const viewGroupsHandler = () =>{
        <Link to={{ pathname: `/groups/tags/${props.tagName}` }}/>

        history.push(`/groups/tags/${props.tagName}`)
    }
  return (
    <Container
      className="pb-2 pt-2 no-underline text-capitalize tagListItem"
      key={props.id}
    >
      <ListGroup>
        <ListGroup.Item className="bg-primary">
          <h6 className="text-light text-center">Tag Name: {props.tagName}</h6>
          <div className="text-light">
            <Row>
              <Col sm={8}>
                <Badge className="bg-warning text-dark">
                  Groups: {props.groupAmount}
                </Badge>
              </Col>
              <Col sm={4}>
                <Button className="bg-secondary" onClick={viewGroupsHandler}>View Groups</Button>{" "}
                <Button className="bg-secondary">Follow</Button>
              </Col>
            </Row>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default TagListItem;
