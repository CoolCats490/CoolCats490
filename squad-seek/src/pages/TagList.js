import { useState, useEffect} from "react";

import axios from "axios";

import { Container } from "react-bootstrap";
import TagListItem from "../Components/Tags/TagListItem";


const TagList = () => {

    //use useEffect to store all tag data
    const [tags, setTags] = useState([])
    useEffect(() => {
        //async call to database
        const fetchGroups = async () => {
          try {
            const response = await axios("http://localhost:5000/tags");
            //store groups in groups object
            setTags(response.data);
          } catch (err) {
            console.log(err);
          }
        };
        //Call async function
        fetchGroups();
      }, []);

      //Sort the tags in alphabetical order
      tags.sort( (x, y) => (x.tagName > y.tagName) ? 1 : -1);

    return(
        <Container>
            {/* Only list the tags with atleast 1 group */}
            {tags.filter(x => x.groups.length > 0).map( (tag) =>(
                <TagListItem
                key = {tag._id}
                tagName = {tag.tagName}
                id = {tag._id}
                groupAmount = {tag.groups.length}
            />
            ))}
        </Container>
    );
}

export default TagList;