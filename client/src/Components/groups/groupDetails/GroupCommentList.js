import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const GroupCommentList = (props) => {

  return (
    <Container className = "bg-light pb-4">
      {props.userComments.comments && props.userComments.comments.map((e, index) => (
        <Card className="text-dark shadow" key={index}>
          <Card.Header>
            <Link to={`/user/${e.userId}`} className="text-dark">
              {e.userName}
            </Link>
          </Card.Header>
          <Card.Body>
              {e.message}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default GroupCommentList;
