import React,{ useState} from "react";
import PictureUploadModal from "../FileUpload/PictureUploadModal";
//Connect to database
import ProfileSwitch from "./ProfileSwitch";
import ChangeInterests from "./ChangeInterests";
import ChangeBio from "./ChangeBio";
import { Button, Container } from "react-bootstrap";

const ProfileSettings = ({userInfo}) =>{

    
    const [hideProfile, setHideProfile] = useState(userInfo.hideProfile || false);
    const [displayCreatedGroups, setDisplayCreatedGroups] = useState( userInfo.displayCreatedGroups ||false);
    const [displayJoinedGroups, setDisplayJoinedGroups] = useState( userInfo.displayJoinedGroups || false);
    const [showInterests, setShowInterests] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showBio, setShowBio] = useState(false);


    const picBTNHandler = ()=>{
        setShowUploadModal(true)
    }
    const bioBTNHandler = () =>{
        setShowBio(true);
    }
    const interestsBTNHandler = () =>{
        setShowInterests(true);
    }


    return(
        <Container className="mt-3">
            Change bio<br/>
            
            {showBio && (<ChangeBio userInfo={userInfo} showForm={setShowBio}/>)}
            {!showBio && (<Button onClick={bioBTNHandler} className="mt-2">Update</Button>)}
            <hr/>
            Change interests<br/>
            {!showInterests && (<Button onClick={interestsBTNHandler} className="mt-2">Update</Button>)}
            {showInterests && (<ChangeInterests userInfo={userInfo} showForm={setShowInterests}/>)}
            <hr/>
            Change Profile Picture<br/>
            <Button onClick={picBTNHandler} className="mt-2">Upload Picture</Button>
            <PictureUploadModal
                _id={userInfo._id}
                showUploadModal={showUploadModal}
                setShowUploadModal={setShowUploadModal}
            />
            <hr/>
            Hide Profile
            <ProfileSwitch
                incomingState = {hideProfile}
                setIncomingState = {setHideProfile}
                incomingURL = {"/users/hideProfile"}
                updateField = {{_id:userInfo._id, hideProfile :hideProfile}}
            />
            <hr/>
            Hide Created Groups
            <ProfileSwitch
                incomingState = {displayCreatedGroups}
                setIncomingState = {setDisplayCreatedGroups}
                incomingURL = {"/users/displayCreatedGroups"}
                updateField = {{_id:userInfo._id, displayCreatedGroups :displayCreatedGroups}}
            />
            <hr/>
            Hide Joined Groups
            <ProfileSwitch
                incomingState = {displayJoinedGroups}
                setIncomingState = {setDisplayJoinedGroups}
                incomingURL = {"/users/displayJoinedGroups"}
                updateField = {{_id:userInfo._id, displayJoinedGroups :displayJoinedGroups}}
            />
            <hr/>
            
            

        </Container>
    );
}

export default ProfileSettings;