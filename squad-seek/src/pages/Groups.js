
import React, { useState } from "react";
import { Route } from "react-router-dom";
//Pages and Sidebar
import GroupCreate from "../Components/groups/GroupCreate";
import GroupList from "../Components/groups/GroupList";
import GroupDetails from "./GroupDetails";
import GroupSideBar from "../Components/groups/GroupSideBar";
//Styling
import "./Groups.css";
import { Container, Row, Col } from "react-bootstrap";
import "./Groups.css";

const Groups = () => {
  
  //Array of objects
  const testGroups = [
    {
      id:0,
      title: "Beach",
      mType: 0,
      date: new Date(2020, 11, 21),
      description: "this is my first group",
      tags: ["swimming", "surfing", "barbeque"]
    },
    {
      id:1,
      title: "Cooking",
      mType: 1,
      date: new Date(2021, 10, 12),
      description: "this is my second group",
      tags: ["food", "home made"]
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
  };

  return (
    <div className="main-wrapper">
      <Row>
        <Col sm="2" className="fluid vh-100 w-25 bg-light col-Width">
          <GroupSideBar></GroupSideBar>
        </Col>
        <Col className="pl-0 bg-dark col-Width mr-0">
          <Container fluid className="text-white gList">

            <Route path="/groups/create">
              <GroupCreate onSavedGroup={savedGroupHandler} />
            </Route>

            <Route path="/groups/list">
              {groups.map((groups, index) => (
                <GroupList
                  key={index}
                  title={groups.title}
                  mType={groups.mType}
                  date={groups.date}
                  description={groups.description}
                  tags={groups.tags}
                />
              ))}
            </Route>

            <Route path="/groups/group-details/:groupID">
              <GroupDetails />
            </Route>

          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Groups;
