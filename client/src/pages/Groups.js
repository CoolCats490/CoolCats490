import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
//Pages and Sidebar
import GroupCreate from "../Components/groups/GroupCreate";
import GroupList from "../Components/groups/GroupList";
import GroupDetails from "./GroupDetails";
import GroupSideBar from "../Components/groups/GroupSideBar";
//Styling
import "./Groups.css";
import { Button, Container } from "react-bootstrap";
import TagList from "./TagList";
import TagDetails from "./TagDetails";
import GroupCalander from "../Components/Calander/GroupCalander";
import GroupSideOptions from "../Components/groups/GroupSideOptions";

const Groups = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);

  return (
    <div className="bg-dark text-white">
      {/* <GroupSideBar></GroupSideBar> */}
      {/* <GroupSideOptions
        onSelectedTags={setSelectedTags}
        onSelectedType={setSelectedType}
        oonSelectedDate={setSelectedDate}
      /> */}

      {/* <Container className="sideBar">
        <GroupList />
      </Container> */}

      <Switch>
          <Route path="/groups/calendar">
            <GroupCalander />
          </Route>

          <Route path="/groups/create">
            <GroupCreate />
          </Route>

          <Route path="/groups/tags/:tagName">
            <TagDetails />
          </Route>

          <Route path="/groups/tags">
            <TagList />
          </Route>

          <Route path="/groups/list">
            <GroupList />
          </Route>

          <Route path="/groups/:groupID">
            <GroupDetails />
          </Route>
        </Switch>
    </div>
  );
};

export default Groups;
