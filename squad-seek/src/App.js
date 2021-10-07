//Import of different pages
import RegisterUser from "./pages/RegisterUser";
import MainHeader from "./Components/MainHeader/MainHeader";
import Groups from "./pages/Groups";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
//import styling
import "./App.css"
//import of router to go to different pages
import { Redirect } from 'react-router';
import {Route, Router, Link} from "react-router-dom";

const App = () => {
  return (
    <div className="bg-dark fluid vh-100"> 
      
      {/* Call to the top navigation */}
      <MainHeader />

      <main>
      <Redirect from="/" to="/welcome" />

      {/* route to the welcome page and call welcome component */}
      <Route exact path="/welcome">
          <Welcome />
        </Route>
        {/* route to the register page and call welcome component */}
        <Route path="/register">
          <RegisterUser />
        </Route>
        {/* route to the groups page and call welcome component */}
        <Route path="/groups">
          <Groups />
        </Route>
        {/* route to the login page and call welcome component */}
        <Route path="/login">
          <Login />
        </Route>
      </main>
      
    </div>
  );
};

export default App;
