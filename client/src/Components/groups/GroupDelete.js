//react imports
import { useCallback} from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

const GroupDelete = (props) => {
  //Sets the correct backend server address depending
  //on if in dev or production mode
  const url = process.env.NODE_ENV === "development" ? 
  process.env.REACT_APP_URL_DEVELOPMENT : process.env.REACT_APP_URL_PRODUCTION;

  //allows us to link back to old page in histor
  const history = useHistory();

  const cancelBtnHandler = useCallback(
    (event) => {
      props.onModalClose(false);
    },
    [props]
  );

  let groupID = props.id;

  const deleteBtnHandler = (event) => {
      
    axios.delete(`${url}/activities/${groupID}`)
        .then(res =>{console.log(res)})
        .catch(error => console.error(error));

    history.push("/groups/list");
  };

  return (
    <>
      <div>
        <p>Are you sure you want to delete this group?</p>
        <p>
          Group: <strong>{props.title} </strong>
        </p>
        <Button onClick={deleteBtnHandler}>Delete</Button>{" "}
        <Button onClick={cancelBtnHandler}>Cancel</Button>
      </div>
    </>
  );
};

export default GroupDelete;
