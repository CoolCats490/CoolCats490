import React from "react";
import { Route, Switch } from "react-router-dom";
//Pages and Sidebar
import GroupCreate from "../Components/groups/GroupCreate";
import GroupList from "../Components/groups/GroupList";
import GroupDetails from "./GroupDetails";
import GroupSideBar from "../Components/groups/GroupSideBar";
//Styling
import "./Groups.css";
import { Container } from "react-bootstrap";

const Groups = () => {
  return (
    <Container  className="wrapper bg-dark text-white fluid">
      <GroupSideBar></GroupSideBar>
      <Switch>
      

      <Route path="/groups/create">
        <GroupCreate />
      </Route>

      <Route path="/groups/list">
        <GroupList />
      </Route>

      <Route path="/groups/:groupID" >
        <GroupDetails />
      </Route>
      
      </Switch>

      
    </Container
>
  );
};

export default Groups;
