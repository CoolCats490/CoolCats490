//Styling
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
//Router
import { useHistory, Link } from "react-router-dom";

const GrouptListItem = (props) => {
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();
  const time = props.date.toLocaleTimeString("en-US");

  const history = useHistory();
  const cardLink = () => {
    history.push("/groups/list");
  };

  return (
    <Container className="pb-3 pt-3 no-underline" key={props.id}>
      <Link to={{ pathname: `/groups/${props.id}` }} className="text-decoration-none">
        <Card
          bg="info"
          onClick={cardLink}
          className="text-dark shadow"
          key={props.id}
        >
          <Card.Header className="text-center">
            <strong>{props.title}</strong>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <strong>Group Type:</strong> {parseInt(props.type) ? "Online" : "In Person"}
              <br />
              <strong>Date:</strong> {month + " " + day + ", " + year + " @ " + time}
              <br />
              <strong>Description:</strong> {props.description}
              <br />
              <strong>Tags:</strong>{" "}
              {props.tags.map((e, index) => (
                <Badge className="bg-warning text-dark me-2" key={index}>
                  {e}
                </Badge>
              ))}
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Container>
  );
};

export default GrouptListItem;
