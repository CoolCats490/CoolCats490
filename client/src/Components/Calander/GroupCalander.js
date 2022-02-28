import {React, useState, useEffect} from "react";
//style stuff
import { Card, Col, Container, Row } from "react-bootstrap";
import './GroupCalendar.css';
//Calendar
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
//Database
import axios from "axios";
//router to other pages
import { Link } from "react-router-dom";

const GroupCalander = () =>{
    //Sets the correct backend server address depending
    //on if in dev or production mode
    const url = process.env.NODE_ENV === "development" ? 
    process.env.REACT_APP_URL_DEVELOPMENT : process.env.REACT_APP_URL_PRODUCTION;

    const [calendarValue, setCalendarValue] = useState( new Date() );
    const [groups, setGroups] = useState([]);
    const [calendarGroups, setCalendarGroups] = useState([]);

    
    

    //useEffect hook will load groups from data base when component is loaded
    useEffect(() => {

        //async call to database
        const fetchGroups = async () => {
            try {
                const response = await axios( url + "/activities/");
                //store groups in groups object
                setGroups(response.data);

            } catch (err) {
                console.log(err);
            }
        };
        
        //Call async function
        fetchGroups();       
    }, [url]);


    //Save current month's groups to calendar groups
    //once the database call is successfull
    useEffect(()=>{
        const defaultGroups = () =>{
            if(groups){
                let date = new Date();
    
                setCalendarGroups(
                    groups.filter( x =>
                        new Date( x.time ).getMonth() === date.getMonth()
                        &&
                        new Date( x.time ).getFullYear() === date.getFullYear()
                        )
                )
            }
        }
        defaultGroups();   
    },[groups])
    

    const onDayChanged = (value) =>{
        //Set the current Calendar to the selected date
        setCalendarValue(value)
        //Create a new date object with the current selected date
        let date = new Date(value);
        //Filter all groups that have the selected month, date, and year
        setCalendarGroups(
            groups.filter( x =>
                new Date( x.time ).getMonth() === date.getMonth()
                &&
                new Date( x.time ).getDate() === date.getDate()
                &&
                new Date( x.time ).getFullYear() === date.getFullYear()
                )
        );
        
    }

    const onMonthChanged = (value) =>{
        //Set the current Calendar to the selected date
        setCalendarValue(value)
        //Create a new date object with the current selected date
        let date = new Date(value);
        //Filter all groups that have the selected month and year
        setCalendarGroups(
            groups.filter( x =>
                new Date( x.time ).getMonth() === date.getMonth()
                &&
                new Date( x.time ).getFullYear() === date.getFullYear()
                )
        );
    }

    const onYearChanged = (value) =>{
        //Set the current Calendar to the selected date
        setCalendarValue(value)
        //Create a new date object with the current selected date
        let date = new Date(value);
        //Filter all groups that have the selected year
        setCalendarGroups(
            groups.filter( x =>
                new Date( x.time ).getFullYear() === date.getFullYear()
                )
        );
    }

    return(//bg-light pt-4 pb-4 text-black fill
        <Container className="bg-light pt-4 pb-4 text-black min-vh-100">
            <Row>
                <Col>
                    <h3 className="text-center">Groups</h3>
                        {
                            groups.length === 0
                            && calendarGroups.length === 0
                            && (<h5 className="text-center pt-4">No groups are available for this date</h5>)
                        }
                        {
                            calendarGroups.map( e =>
                                <Link to={{ pathname: `/groups/${e._id}` }} className="text-decoration-none" key={e._id}>
                                    <Card 
                                    className="bg-info mb-4 px-4 pt-4 shadow text-dark" 
                                    
                                    >
                                        <h5>{e.name}</h5>
                                        <p><strong>Description: </strong>{e.description}</p>
                                        <p> <strong>Date: </strong>
                                            {new Date(e.time).getMonth()}/
                                            {new Date(e.time).getDate()}/
                                            {new Date(e.time).getFullYear()}
                                        </p>
                                    </Card>
                                </Link>
                            )
                        }
                </Col>
                <Col className="text-center">
                    
                    <h3>Calendar</h3>
                    <Container className="d-flex align-items-center justify-content-center">
                        <Calendar
                            onClickDay={onDayChanged}
                            onClickMonth={onMonthChanged}
                            onClickYear={onYearChanged}

                            value={calendarValue}
                            selectRange={false}
                            allowPartialRange={true}
                        />
                    </Container>
                </Col>
            </Row>
            <Row className="text-white">
                
            </Row>
        </Container>
    );
}

export default GroupCalander;