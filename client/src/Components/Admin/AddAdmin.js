import axios from "axios";
import React,{ useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const AddAdmin = ()=>{
    //Sets the correct backend server address depending
    //on if in dev or production mode
    const url = process.env.NODE_ENV === "development" ? 
    process.env.REACT_APP_URL_DEVELOPMENT : process.env.REACT_APP_URL_PRODUCTION;

    const [userName, setUserName] = useState("");
    const [adminAdded, setAdminAdded] = useState(false);
    const [errMsg, setErrMsg] = useState(false);

    const userNameHandler = (e) =>{
        setUserName(e.target.value);
    }

    const submitHandler = ()=>{
        axios.post(url +"/users/addAdmin", {username:userName})
        .then((res)=>{
            console.log(res.data);
            setErrMsg(false);
            setAdminAdded(true);
        })
        .catch(err=>{
            console.log(err.response);
            setErrMsg(true);
            setAdminAdded(false);
        })
    }

    return (
        <Container>
            {adminAdded && (<h5 className="bg-success text-center">Admin Added</h5>)}
            {errMsg && (<h5 className="bg-warning text-center">Error Adding Admin</h5>)}
            <Form className="w-50">
                <Form.Label>Add Admin</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    onChange={userNameHandler}
                />
                <Button className="mt-3 mb-3" onClick={submitHandler}>Submit</Button>
            </Form>
        </Container>
    )
}

export default AddAdmin;