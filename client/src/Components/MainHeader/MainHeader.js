import { useContext, useEffect, useState } from "react";
import AuthContext from "../../Store/auth-context";
import { Link } from "react-router-dom";
//Styling
import "bootstrap/dist/css/bootstrap.css";
import { Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./MainHeader.css";
import { Gear, PersonCircle, XSquareFill } from "react-bootstrap-icons";
//Database connect
import axios from "axios";
import LoginForm from "../Login/LoginForm";
import brandPic from "../../pages/Media/squad1.png";

const MainHeader = () => {
  const authCtx = useContext(AuthContext);
  const isLogedIn = authCtx.isLoggedIn;
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  //const [showLogin, setShowLogin] = useState(false);

  const logoutoutHandler = () => {
    authCtx.logout();
  };

  useEffect(() => {
    //Changes the backend url depending on dev or production
    const url =
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_URL_DEVELOPMENT
        : process.env.REACT_APP_URL_PRODUCTION;

    if (isLogedIn) {
      try {
        axios
          .get(url + "/users/me", {
            headers: {
              "Content-Type": "application/json",
              token: authCtx.token,
            },
          })
          .then((res) => {
            setUserName(res.data.username);
            setUserId(res.data._id);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [isLogedIn, authCtx.token]);

  // const onToggleHandler = (isOpen, e, metadata) => {
  //   if (metadata.source !== "select") {
  //     setShowLogin(isOpen);
  //   }
  // };

  return (
    <header className="headerWrapper">
      <Navbar bg="info" variant="light" sticky="top">
        <Navbar.Brand>
          <Image
            src={brandPic}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Squad Brand"
          />{" "}
          Squad Seek
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/welcome">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/group">
            Groups
          </Nav.Link>
        </Nav>
        <Nav>
          {!isLogedIn && (
            <NavDropdown
              title="Login"
              className="btn btn-info pb-0 pt-0 mx-0 px-0"
              align="end"
              id="dropdown-autoclose-inside"
              //onToggle={(isOpen, e, metadata) => onToggleHandler(isOpen, e, metadata)}
            >
              <LoginForm />
            </NavDropdown>
          )}
          {!isLogedIn && (
            <Nav.Link as={Link} to="/register" className="mx-2">
              Register
            </Nav.Link>
          )}
          {isLogedIn && userName && (
            <NavDropdown
              title={`${userName}`} //userName +
              className="btn btn-info pb-0 pt-0 mx-3 border-bottom border-dark"
            >
              <NavDropdown.Item as={Link} to={{ pathname: `/user/${userId}` }}>
                <PersonCircle /> Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/settings">
                <Gear /> User Settings
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logoutoutHandler}>
                <XSquareFill color="red" /> Logout
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar>
    </header>
  );
};

export default MainHeader;
