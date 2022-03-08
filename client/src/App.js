import React, { Suspense, useContext } from "react";
//Main Header import
import MainHeader from "./Components/MainHeader/MainHeader";
//import styling
import styles from "./App.module.css";
import { Spinner } from "react-bootstrap";
//import of router to go to different pages
import { Redirect, Route, Switch } from "react-router";
//User login token store
import AuthContext from "./Store/auth-context";

//Lazy loading for all pages
const Groups = React.lazy(() => import("./pages/Groups"));
const Login = React.lazy(() => import("./pages/Login"));
const Welcome = React.lazy(() => import("./pages/Welcome"));
const UserProfile = React.lazy(() => import("./pages/UserProfile"));
const MultiForm = React.lazy(() => import("./Components/MultiForm/MultiForm"));

const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <React.Fragment>
      {/* Call to the top navigation */}
      <MainHeader />

      <div className={styles.wrapper}>
        <Suspense fallback={<Spinner animation="border" variant="info" />}>
          <Switch>
            <Redirect from="/groups" to="/groups/create" exact />

            {/* route to the welcome page and call welcome component */}
            <Route path="/" exact>
              <Welcome />
            </Route>
            {/* route to the register page and call welcome component */}
            {!authCtx.isLoggedIn && (
              <Route path="/register" exact>
                <MultiForm />
              </Route>
            )}
            {/* route to the groups page and call welcome component */}

            <Route path="/groups">
              <Groups />
            </Route>

            {/* route to the login page and call welcome component */}
            {!authCtx.isLoggedIn && (
              <Route path="/login" exact>
                <Login />
              </Route>
            )}

            {authCtx.isLoggedIn && (
              <Route path="/profile">
                <UserProfile />
              </Route>
            )}
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </React.Fragment>
  );
};

export default App;
