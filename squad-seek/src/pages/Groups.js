//import { Container,Col,Row,Nav} from "react-bootstrap";
//import Sidebar from "../Components/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import "./Groups.css";
import GroupSideBar from "../Components/groups/GroupSideBar";
import React, { useState } from "react";
import { Route } from "react-router-dom";
import GroupCreate from "../Components/groups/GroupCreate";
import GroupList from "../Components/groups/GroupList";

var Groups = () => {
  const testGroups = [
    {
      title: "Tennis",
      mType: 0,
      date: new Date(2020, 11, 21),
      description: "this is my first group",
    },
    {
      title: "Bowling",
      mType: 1,
      date: new Date(2021, 10, 12),
      description: "this is my second group",
    },
  ];
  const [groups, setGroups] = useState(testGroups);

  const savedGroupHandler = (enteredGroupData) => {
    const groupData = {
      ...enteredGroupData,
    };

    setGroups((oldGroups) => {
      return [groupData, ...oldGroups];
    });

    console.log(groups);
  };

  return (
    <section>
      <Row>
        <Col sm="2">
          <GroupSideBar></GroupSideBar>
        </Col>
        <Col>
          <Container fluid className="text-white d-flex sm-6 vh-100 bg-dark">
            <Route path="/groups/create">
              <GroupCreate onSavedGroup={savedGroupHandler} />
            </Route>
            <Route path="/groups/list">
              {groups.map((groups,index) => (
                <Row>
                <GroupList
                  key={index}
                  title={groups.title}
                  mType={groups.mType}
                  date={groups.date}
                  description={groups.description}
                />
                </Row>
              ))}
            </Route>
          </Container>
        </Col>
      </Row>
    </section>
  );
};

export default Groups;
