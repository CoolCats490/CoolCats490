//Styling
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
//Router
import { useHistory } from "react-router-dom";

const GrouptListItem = (props) => {
  let month = props.date.toLocaleString("en-US", { month: "long" });
  let day = props.date.toLocaleString("en-US", { day: "2-digit" });
  let year = props.date.getFullYear();
  let time = props.date.toLocaleTimeString("en-US");

  let history = useHistory();
  let num = props.id;

  const cardLink = () => {
    history.push("/groups/group-details/" + { num });
  };


  return (
    <Container className="pb-2 pt-2" key={props.key}>
      <Card bg="primary" >
        <Card.Header className="text-center">
          Group Title: {props.title}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Group Type: {parseInt(props.type) ? "Online" : "In Person"}
            <br />
            Date: {month + " " + day + ", " + year + " @ " + time}
            <br />
            Description: {props.description}
            <br />
            {/* Tags:{" "}
            {props.tags.map((e) => (
              <Badge className="bg-warning text-dark me-2">{e}</Badge>
            ))} */}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GrouptListItem;
