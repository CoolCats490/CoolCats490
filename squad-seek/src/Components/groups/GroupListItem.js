//Styling
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
//Router
import { useHistory, useParams, Route, Switch } from "react-router-dom";
//pages
import GroupDetails from "../../pages/GroupDetails";

const GrouptListItem = (props) => {
  let month = props.date.toLocaleString("en-US", { month: "long" });
  let day = props.date.toLocaleString("en-US", { day: "2-digit" });
  let year = props.date.getFullYear();
  let time = props.date.toLocaleTimeString("en-US");

  let history = useHistory();

  //let

  const cardLink = () => {
    history.push("/groups/group-details/" + { props });
  };

  return (
    <Container className="pb-2 pt-2">
      <Card bg="primary" onClick={cardLink}>
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
            Tags:{" "}
            {props.tags.map((e) => (
              <Badge className="bg-warning text-dark me-2">{e}</Badge>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
      <Switch>
        <Route path="/groups/group-details/:groupID" exact>
          <GroupDetails />
        </Route>
      </Switch>
    </Container>
  );
};

export default GrouptListItem;
