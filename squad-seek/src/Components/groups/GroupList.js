import React, { useState, useEffect } from "react";
//
import axios from "axios";
import GrouptListItem from "./GroupListItem";

const GroupList = () => {
  //groups object and setter here
  const [groups, setGroups] = useState([]);

  //useEffect hook will load groups from data base when component is loaded
  useEffect(() => {
    //async call to database
    const fetchGroups = async () => {
      try {
        const response = await axios("http://localhost:5000/activities/");
        //store groups in groups object
        setGroups(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    //Call async function
    fetchGroups();
  }, []);

  return (
    <>
      {/* map each group to a group item card */}
      {groups.map((group) => (
        <GrouptListItem 
          key = {group._id}
          title = {group.name}
          date = {new Date(parseInt( group.time ))}
          type = {group.type}
          description = {group.description}
          tags = {group.tagsArray}
        />
      ))}
    </>
  );

};

export default GroupList;