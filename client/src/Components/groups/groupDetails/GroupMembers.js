import React from "react";
import { Accordion, Badge, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const GroupMembers = (props) => {
  return (
    <React.Fragment>
      <Accordion className="text-black pb-4 shadow-sm ">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Members in group <pre> </pre>
            {props.groups.members && (
              <Badge bg="info">{props.groups.members.length}</Badge>
            )}
            {/* {props.groups.members.map(e=>(<div>{e.name}</div>))} */}
          </Accordion.Header>
          <Accordion.Body>
            <ListGroup className="pb-4">
              {props.groups.members &&
                props.groups.members.map((e, index) => (
                  <Link to={`/user/${e.id}`} key={e._id} className="text-black">
                    <ListGroup.Item >{e.username}</ListGroup.Item>
                  </Link>
                ))}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </React.Fragment>
  );
};

export default GroupMembers;
