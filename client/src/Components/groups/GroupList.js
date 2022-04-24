import React, { useContext ,useState, useEffect } from "react";
//
import axios from "axios";
import GrouptListItem from "./GroupListItem";
//Styling
import { Container, Row, Col, Button } from "react-bootstrap";
import GroupSideOptions from "./GroupSideOptions";
import "./CSS/GroupList.css";
import { Link } from "react-router-dom";
//
import AuthContext from "../../Store/auth-context";

const GroupList = () => {
  //Sets the correct backend server address depending
  //on if in dev or production mode
  const url =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_URL_DEVELOPMENT
      : process.env.REACT_APP_URL_PRODUCTION;

  //token stuff
  const authCtx = useContext(AuthContext);
  const isLogedIn = authCtx.isLoggedIn;

  //groups object and setter here
  const [groups, setGroups] = useState([]);
  const [topTags, setTopTags] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //useEffect hook will load groups from data base when component is loaded
  useEffect(() => {
    //async call to database
    const fetchGroups = async () => {
      try {
        const response = await axios(url + "/activities/");
        //store groups in groups object
        setGroups(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchTopTags = async () => {
      try {
        const response = await axios(url + "/tags/top");
        //store groups in groups object
        setTopTags(response.data.map((e) => e.tagName));
      } catch (err) {
        console.log(err);
      }
    };

    //Call async function
    fetchTopTags();
    //Call async function
    fetchGroups();
  }, [url]);

  //returns groups based on filter selections
  const filterGroups = groups
    //filters groups based on type
    .filter((group) => {
      if (selectedType.length !== 0) {
        return group.type === selectedType;
      } else {
        return group;
      }
    }) //filters groups on tags
    .filter((group) => {
      if (selectedTags.length !== 0) {
        return group.tagsArray.some((e) => selectedTags.includes(e));
      } else {
        return group;
      }
    }) //filter groups based on dates selected
    .filter((group) => {
      if (startDate && endDate) {
        return (
          new Date(startDate).getTime() <= new Date(group.time).getTime() &&
          new Date(group.time).getTime() <= new Date(endDate).getTime()
        );
      } else {
        return group;
      }
    });

  const queryHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchHandler = () => {
    axios
      .post(url + "/activities/searchGroups", { query: searchQuery })
      .then((res) => {
        setGroups(res.data);
      });
  };

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      console.log("enter pressed");
      searchHandler();
    }
  };

  if (groups) {
    //console.log(groups )
  }
  // console.log(new Date(startDate).getTime());
  // console.log(new Date(endDate).getTime());

  return (
    <Container className="">

      <Container className="bg-light rounded searchBar mx-2 px-5 row mt-3">

        <input
          type="text"
          placeholder=" Search for a group title"
          className="rounded  col"
          onChange={queryHandler}
          onKeyDown={keyDownHandler}
        />
        <Button
          className="mx-1 searchBTN border-0 shadow col-1"
          onClick={searchHandler}
        >
          Search
        </Button>


        {isLogedIn &&(
          <Button className="mx-1 bg-success border-0  shadow createBTN col-2 ">
          <Link to="/groups/create" className="text-light text-decoration-none"> Create New Group</Link>
          </Button>
       )}

      </Container>

      <Row className="rowContainer">
        <Col className="col-2">
          <section className="bg-info text-dark rounded px-2 sideBar">
            <GroupSideOptions
              topTags={topTags}
              setTopTags={setTopTags}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </section>
        </Col>

        <Col className="g-0 col-10">
          {groups.length === 0 && (
            <h4 className="text-center mt-5">No groups Found</h4>
          )}
          <Container className="bg-light mt-3 rounded groupItems px-4 mb-3 ">
            {/* map each group to a group item card */}
            {filterGroups.map((group) => (
              <GrouptListItem
                key={group._id}
                title={group.name}
                date={new Date(group.time)}
                type={group.type}
                description={group.description}
                tags={group.tagsArray}
                id={group._id}
                members={group.members}
                groupPic={group.groupPic}
              />
            ))}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default GroupList;
