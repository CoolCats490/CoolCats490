import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import axios from 'axios'

const Activity = (props) =>{
 
  return(
          <Card bg="primary">
            <Card.Body>
              <Card.Title>Group Title: {props.act.name} </Card.Title>
              <Card.Text>
                Group Type: {props.act.type ? "Online" : "In Person"}
                <br />
                Date: {props.act.time}
                <br />
                Description: {props.act.description}
              </Card.Text>
            </Card.Body>
          </Card>
          );
      
      };

export default class ActivityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ActList: []};
  }

  componentDidMount = () => {
    axios.get('http://localhost:5000/activities/').then(response => {
      this.setState({ActList : response.data})
    }).catch((error) => {
      console.log(error);
    })
  }

  viewActivity = () =>{
    return(
     this.state.ActList.map((currentActivity) => {
        return <Activity act = {currentActivity}/>
    }))
  }

  
  render() {
    return (
      <Container variant="light" >
        {this.viewActivity()}
      </Container>)
  };

}

