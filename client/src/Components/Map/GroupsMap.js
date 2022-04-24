import React, { useEffect, useState } from "react";
//styling
import {
  Button,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import "./GroupMap.css";
import defaultPic from "../../pages/Media/group-defualt.jpg";
//google map
import MapView from "./MapView";
//db connection
import axios from "axios";
//router
import { Link } from "react-router-dom";
const GroupsMap = () => {
  //Sets the correct backend server address depending
  //on if in dev or production mode
  const url =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_URL_DEVELOPMENT
      : process.env.REACT_APP_URL_PRODUCTION;

  const [groups, setGroups] = useState([]);
  //Map position with default position at LA
  const [position, setPosition] = useState({lat: 34.151034952871875,lng: -118.37132316739128});
  //zoom for the google map
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    //async call to database
    const fetchGroups = async () => {
      try {
        const res = await axios(url + "/activities/");
        //store groups in groups object
        setGroups(res.data.filter((e) => e.type === "0"));
      } catch (err) {
        console.log(err);
      }
    };

    //Call async function
    fetchGroups();
  }, [url]);

  const clearGroupHandler = async () =>{
    try {
        const res = await axios(url + "/activities/");
        //store groups in groups object
        setGroups(res.data.filter((e) => e.type === "0"));
    } catch (err) {
        console.log(err);
    }
      setZoom(9);
  }

  const focusGroupHandler = (group) =>{

    //set map position to the group
    setPosition({lat:parseFloat(group.location[0].lat), lng:parseFloat(group.location[0].lng)})

    //set zoom for the map
    setZoom(18);
  }

  if (!groups) {
    <Spinner className="bg-warning" />;
  }


  return (
    <Container className="bg-light pt-2 pb-2 text-center mt-4 ">
      <Container className="bg-light mt-2 text-dark h-25 shadow ">
        <Row className="bg-primary mb-3 rounded pt-1 pb-1">
          <Link to="/groups/list" className="text-light text-center">
            Back
          </Link>
        </Row>
        <Row className="mapContainer">
          <Col className=" mapContainer">
            <ListGroup className="overflow-auto w-100 g-0 mx-0 listContainer">
            {groups.length === 1 &&(<Button className="bg-secondary border-0" onClick={clearGroupHandler}>Clear Group</Button>)}
            <br/>
              {groups.map((e) => (
                <ListGroup.Item key={e._id} className="mb-3 shadow" onClick={()=>focusGroupHandler(e)}>
                  <Row className="">
                    <Col className="w-25">
                      <Link to={`/groups/${e._id}`}>
                        <Image src={e.groupPic || defaultPic } className="img-thumbnail" />
                      </Link>
                    </Col>
                    <Col className="w-75 mapContainer">
                      <strong>Group: </strong>
                      {e.name}
                      <hr />
                      <p>
                        <strong>Date: </strong>
                        {new Date(e.time).toLocaleString("en-US", {
                          month: "long",
                        })}{" "}
                        {new Date(e.time).toLocaleString("en-US", {
                          day: "2-digit",
                        })}
                        , {new Date(e.time).getFullYear()}
                      </p>
                      <hr />
                      <strong>Location: </strong>
                      {e.address}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col className="d-flex">
            <MapView 
                groups={groups} 
                setGroups={setGroups}
                position={position}
                zoom={zoom}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default GroupsMap;
