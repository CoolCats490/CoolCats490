import React, { } from "react";
import { Route, Switch } from "react-router-dom";
//Pages and Sidebar
import GroupCreate from "../Components/groups/GroupCreate";
import GroupList from "../Components/groups/GroupList";
import GroupDetails from "./GroupDetails";
//Styling
import "./Groups.css";
import TagList from "./TagList";
import TagDetails from "./TagDetails";
import GroupCalander from "../Components/Calander/GroupCalander";

const Groups = () => {

  return (
    <div className="bg-dark text-white">

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
