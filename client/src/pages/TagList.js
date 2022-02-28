//React hooks
import { useState, useEffect, useContext, useCallback} from "react";
//
import axios from "axios";

import { Container } from "react-bootstrap";
import TagListItem from "../Components/Tags/TagListItem";
//user token stuff
import AuthContext from "../Store/auth-context";

const TagList = () => {

  //Sets the correct backend server address depending
  //on if in dev or production mode
  const url = process.env.NODE_ENV === "development" ? 
  process.env.REACT_APP_URL_DEVELOPMENT : process.env.REACT_APP_URL_PRODUCTION;

  //gett user token and checking if the user is logged in
  const authCtx = useContext(AuthContext);
  const isLogedIn = authCtx.isLoggedIn;

    //use useState to store various data
    const [tags, setTags] = useState([])
    const [userInfo, setUserInfo] = useState([]);
    //const [doneLoading, setLoading] = useState(false);

    //Use useState to store when data is changed
    const [dataChanged, setDataChanged] = useState(false);


    const loadData = useCallback(async () => {
      //async call to database
      let fetchTags = async () => {
        try {
          const response = await axios( url + "/tags");
          //store groups in groups object
          setTags(response.data);
        } catch (err) {
          console.log(err);
        }
      };
  
      let fetchUser = async () => {
        try {
          const response = await axios.get(url + "/users/me", {
            headers: {
              "Content-Type": "application/json",
              token: authCtx.token,
            },
          });
          //store user info in user object
          setUserInfo(response.data);
          //setLoading(true);
        } catch (err) {
          console.log(err);
          //setLoading(false);
        }
      };
  
      //Call async function
      fetchTags();
      
      if (isLogedIn){
        fetchUser();
      }
  
      //set loading to false
      //setLoading(true)
    }, [authCtx.token, isLogedIn, url ]);//dataChanged
  
    //useEffect hook will load groups from data base when component is loaded
    useEffect(() => {
      loadData();
      setDataChanged(false);
    }, [loadData, dataChanged]);
    

      //Sort the tags in alphabetical order
      tags.sort( (x, y) => (x.tagName > y.tagName) ? 1 : -1);

    return(
        <Container className="bg-secondary">
            {/* Only list the tags with atleast 1 group */}
            {tags.filter(x => x.groups.length > 0).map( (tag) =>(
                <TagListItem
                  key = {tag._id}
                  tagName = {tag.tagName}
                  id = {tag._id}
                  groups = {tag.groups}
                  users = {tag.users}
                  userInfo={userInfo}
                  onDataChanged={setDataChanged}
                />
            ))}
        </Container>
    );
}

export default TagList;