import React, { useState } from "react";
import { Link } from "react-router-dom";

//Styling
import {
  Button,
  FormCheck,
  FormControl,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import { Calendar2Event, Grid, Tag } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const GroupSideOptions = ({
  topTags,
  setTopTags,
  selectedType,
  setSelectedType,
  selectedTags,
  setSelectedTags,
}) => {
  const [showTags, setShowTags] = useState(false);
  const [tagsAmount, setTagsAmount] = useState(5);
  const [tagQuery, setTagQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const moreTagsHandler = () => {
    //change the showTags state to true
    setShowTags(true);

    //show 10 tags
    setTagsAmount(10);
  };

  const lessTagsHandler = () => {
    //change the showTags state to true
    setShowTags(false);

    //show 10 tags
    setTagsAmount(5);

    //clear text field
    setTagQuery("");
  };

  const selectedTagHandler = (e, data) => {
    if (e.target.checked) {
      //Remove selected/searched tag from the top tags array
      setTopTags(
        topTags.filter((tag) => {
          
          return tag !== data;
        })
      );

      //Add the selected/searched tag to the top tags array
      setSelectedTags((selectedTags) => [...selectedTags, data]);
    } else if (!e.target.checked) {
      //Remove selected/searched tag from the top tags array
      setSelectedTags(
        topTags.filter((tag) => {
          return tag !== data;
        })
      );

      //Add the selected/searched tag to the top tags array
      setTopTags((selectedTags) => [...selectedTags, data]);
    }
    
  };

  const removeSelectedTag = (e, data) => {
    //Remove selected/searched tag from the top tags array
    setSelectedTags(
      selectedTags.filter((tag) => {
        return tag !== data;
      })
    );

    //Add the selected/searched tag to the top tags array
    setTopTags((selectedTags) => [...selectedTags, data]);
  };

  const searchTagHandler = (data) => {
    //Remove selected/searched tag from the top tags array
    setTopTags(
      topTags.filter((tag) => {
        return tag !== data;
      })
    );

    //Add the selected/searched tag to the top tags array
    setSelectedTags((selectedTags) => [...selectedTags, data]);
  };

  const inPersonHandler = (e) => {
    if (e.target.checked) {
      setSelectedType("0");
    } else {
      setSelectedType("");
    }
  };

  const onlineHandler = (e) => {
    if (e.target.checked) {
      setSelectedType("1");
    } else {
      setSelectedType("");
    }
  };

  const dateStartHandler = (e) => {
    setStartDate(new Date(e.target.value));
    console.log(startDate);
  };

  const dateEndHandler = (e) => {
    setEndDate(new Date(e.target.value));
    console.log(endDate);
  };

  return (
    <>
    
      <h5 className="mt-3">
      <Link to="/groups/create">
          <Button className="mx-1 bg-success border-0 createBTN shadow">
            Start New Group
          </Button>
        </Link>
        <Grid /> Group Type
      </h5>
      {selectedType !== 1 && (
        <FormCheck
          type="checkbox"
          label="In Person"
          onChange={inPersonHandler}
        />
      )}
      {selectedType !== 0 && (
        <FormCheck type="checkbox" label="Online" onChange={onlineHandler} />
      )}
      {selectedType === 0 && (
        <Button className="px-5 pt-2 pb-2 mx-3">
          <span>View Map</span>
        </Button>
      )}
      <hr />

      <h5>
        {" "}
        <Tag /> Top Tags
      </h5>
      {selectedTags &&
        selectedTags.map((tag, index) => (
          <FormCheck
            key={index}
            type="checkbox"
            label={tag}
            defaultChecked
            className="text-capitalize"
            onChange={(e) => removeSelectedTag(e, tag)}
          />
        ))}
      {topTags &&
        topTags
          .slice(0, tagsAmount)
          .map((tag, index) => (
            <FormCheck
              key={tag}
              type="checkbox"
              label={tag}
              className="text-capitalize"
              onChange={(e) => selectedTagHandler(e, tag)}
            />
          ))}
      {!showTags && (
        <Button
          className="px-0 pt-0 pb-0 bg-info border-0"
          onClick={moreTagsHandler}
        >
          + More
        </Button>
      )}
      {showTags && (
        <>
          <div>
            <input
              type="text"
              placeholder="Search Tags"
              onChange={(e) => setTagQuery(e.target.value)}
              value={tagQuery}
            />
            {tagQuery !== "" && (
              <ListGroup className="bg-light pt-1 pb-1 px-1">
                {topTags
                  .slice(9, topTags.length)
                  .filter((tag) => {
                    if (tagQuery === "") {
                      return tag;
                    } else if (
                      tag.includes(tagQuery.toLocaleLowerCase())
                    ) {
                      return tag;
                    } else {
                      return false;
                    }
                  })
                  .slice(0, 5)
                  .map((tag) => (
                    <ListGroup.Item
                      onClick={() => searchTagHandler(tag)}
                      key={tag}
                      className="text-capitalize"
                    >
                      {tag}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            )}
          </div>

          <Button
            className="px-0 pt-0 pb-0 bg-info border-0"
            onClick={lessTagsHandler}
          >
            {" "}
            - Less
          </Button>
        </>
      )}
      <hr />
      <h5>
        {" "}
        <Calendar2Event /> Date Range
      </h5>
      <label>Start:</label>
      <InputGroup>
        <FormControl type="date" onChange={dateStartHandler} />
      </InputGroup>
      <label>End:</label>
      <InputGroup>
        <FormControl type="date" onChange={dateEndHandler} />
      </InputGroup>
      <hr />
      <Link to="/groups/calendar">
        <Button className="mb-4 mx-3">View Calendar</Button>
      </Link>
    </>
  );
};

export default GroupSideOptions;
