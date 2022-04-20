import { useContext, useEffect, useState } from "react";
import AuthContext from "../../Store/auth-context";
import { Link } from "react-router-dom";
//Styling
import "bootstrap/dist/css/bootstrap.css";
import {Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./MainHeader.css";
import {Gear, PersonCircle, XSquareFill} from "react-bootstrap-icons";
//Database connect
import axios from "axios";

const MainHeader = () => {
  const authCtx = useContext(AuthContext);
  const isLogedIn = authCtx.isLoggedIn;
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);


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

  return (
    <header className="headerWrapper">
      <Navbar bg="info" variant="light" sticky="top">
        <Navbar.Brand>Squad Seek</Navbar.Brand>
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
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          )}
          {!isLogedIn && (
            <Nav.Link as={Link} to="/register">
              Register
            </Nav.Link>
          )}
          {isLogedIn && userName && (
            <NavDropdown
              title={  `${userName}`}  //userName +
              className="btn btn-info pb-0 pt-0 mx-3 border-bottom border-dark"
            >
              <NavDropdown.Item as={Link} to={ {pathname: `/user/${userId}`} }>
              <PersonCircle/> Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/settings">
                <Gear/> User Settings
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logoutoutHandler}>
                <XSquareFill color="red"/> Logout
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar>
    </header>
  );
};

export default MainHeader;
