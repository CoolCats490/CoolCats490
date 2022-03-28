import React,{useState} from "react";
import { Button, Container } from "react-bootstrap";
import ChangeEmail from "./ChangeEmail";
import ChangePass from "./ChangePass";

const AccountSettings = ({userInfo})  =>{

    const [showPass, setShowPass] = useState(false);
    const [showEmail, setShowEmail] = useState(false);

    const passBTNHandler = () =>{
        setShowPass(true);
    }

    const emailBTNHandler = () =>{
        setShowEmail(true);
    }

    return(
        <Container className="mt-3">
            Change Email<br/>
            {!showEmail && (<Button onClick={emailBTNHandler} className="mt-2">Update</Button>)}
            {showEmail && (<ChangeEmail userInfo={userInfo} showForm={setShowEmail}/>)}
            <hr/>
            Change Password<br/>
            {!showPass && (<Button onClick={passBTNHandler} className="mt-2">Update</Button>)}
            {showPass &&  (<ChangePass userInfo={userInfo} showForm={setShowPass}/>)}
            <hr/>
        </Container>
    );
};

export default AccountSettings;