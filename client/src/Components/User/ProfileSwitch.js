import React, {useEffect,useRef} from "react";
import {Form} from "react-bootstrap";
import axios from "axios";

const ProfileSwitch = ({incomingState,setIncomingState,incomingURL, updateField}) =>{

    const isInitialMount = useRef(true);

    //Sets the correct backend server address depending
    //on if in dev or production mode
    const url =
    process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_URL_DEVELOPMENT
        : process.env.REACT_APP_URL_PRODUCTION;

    //Save hideProfile state when user clicks switch
    const switchHandler = () =>{
        setIncomingState(!incomingState)  
    }

    //Send hide profile data to the database when user clicks switch 
    useEffect(()=>{

        if(isInitialMount.current){
            isInitialMount.current = false;
        }
        else{
            axios.post(url + incomingURL, 
                updateField
            )
            .then(res =>{console.log(res.data)})
            .catch(err =>{console.log(err)}) 
        }
    },[incomingState, incomingURL,updateField, url ])

    console.log("updateField")

    return(
        <>
            <Form>
                <Form.Check 
                    onChange={switchHandler}
                    type="switch"
                    checked={false|| incomingState}
                />
            </Form>
        </>
    )
}

export default ProfileSwitch;