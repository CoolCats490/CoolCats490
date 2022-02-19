import {React, useState, useEffect} from "react";
//bootstrap
import { Col, Container, ListGroup, Row } from "react-bootstrap";
//Calendar
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
//Database
import axios from "axios";

const GroupCalander = () =>{
    //const [selectedDate, setSelectedDate] = useState(new Date());
    const [groups, setGroups] = useState([]);
    const [calendarGroups, setCalendarGroups] = useState([]);

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

        //Set current month's groups
        
    }, []);

    const currentMonthGroups = ()=>{
        let today = new Date();

        setCalendarGroups(
            groups.filter( x =>
                new Date( x.time ).getMonth() === new Date(today).getMonth())
        )

        let data = groups.filter( x =>
            new Date( x.time ).getMonth() === new Date(today).getMonth())

        //setCalendarGroups( data );

        console.log(data)
        console.log( calendarGroups )
        //console.log(selectedDate);
    }


    // const showGroupsForDay = () =>{
    //     console.log(groups);
        
    // }
    return(
        <Container className="bg-primary pt-4 pb-4 text-black">
            <Row>
                <Col>
                <Calendar onClickDay={currentMonthGroups} showWeekNumbers />
                </Col>
            </Row>
            <Row>
                <ListGroup>
                    {
                        
                    }
                </ListGroup>
            </Row>
        </Container>
    );
}

export default GroupCalander;