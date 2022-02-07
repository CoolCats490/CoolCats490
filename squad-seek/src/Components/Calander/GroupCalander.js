import {React, useState, useEffect} from "react";
//bootstrap
import { Container } from "react-bootstrap";
//Calendar
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
//Database
import axios from "axios";

const GroupCalander = () =>{
    const [currentDate, setDate] = useState(new Date());
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


    const showGroupsForDay = () =>{
        console.log(groups);
    }
    return(
        <Container className="bg-primary pt-4 pb-4 text-black">
            <Calendar onClickDay={showGroupsForDay} showWeekNumbers value={currentDate} />
        </Container>
    );
}

export default GroupCalander;