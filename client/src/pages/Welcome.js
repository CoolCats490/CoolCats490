//React hooks
import { useContext } from "react";
//Styling
import {
  Button,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import "./Welcome.css";
import { ArrowRight, PeopleFill, Tags } from "react-bootstrap-icons";
//links
import { Link } from "react-router-dom";
//database
//import axios from "axios";
//User Token
import AuthContext from "../Store/auth-context";
import RecentGroups from "../Components/Welcome/RecentGroups";
import TopGroups from "../Components/Welcome/TopGroups";


const Welcome = () => {
  
  //The number of top tags to diplay
  //const tagLimit = 5;

  //Sets the correct backend server address depending
  //on if in dev or production mode
  // const url =
  //   process.env.NODE_ENV === "development"
  //     ? process.env.REACT_APP_URL_DEVELOPMENT
  //     : "";

  //useState to store top/new groups and tags
  //const [topGroups, setTopGroups] = useState(null);
  //const [latestGroups, setLatestGroups] = useState(null);
  //const [topTags, setTopTags] = useState(null);

  //token stuff
  const authCtx = useContext(AuthContext);
  const isLogedIn = authCtx.isLoggedIn;

  //useEffect hook will load groups from data base when component is loaded
  // useEffect(() => {
  //   //async call to database
  //   const fetchTopTags = async () => {
  //     try {
  //       const response = await axios(url + "/tags/top");
  //       //store groups in groups object
  //       setTopTags(response.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   //Call async function
  //   fetchTopTags();
  // }, [url]);

  return (
    <Container fluid>
      <header className="bg-dark py-5">
        <Container className="px-5">
          <Row className="gx-5 justify-content-center">
            <Col className="lg-6">
              <div className="text-center my-5">
                <h1 className="display-5 fw-bolder text-white mb-2">
                  Welcome to Squad Seek
                </h1>
                <p className="lead text-white-50 mb-4">
                  A social platform that allows you to meet new people with
                  similar interests for activities that are both offline or
                  online!
                </p>
                {!isLogedIn && (
                  <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                    <Link to="/register">
                      <Button className="btn btn-primary btn-lg px-4 me-sm-3">
                        Register Now
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      {/* <!-- Features section--> */}
      <section className="py-5 border-bottom bg-white text-dark" id="features">
        <Container className=" px-5 my-5">
          <Row className="gx-5">
            <Col className="lg-4 mb-5 mb-lg-0">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <PeopleFill />
              </div>
              <h2 className="h4 fw-bolder">Groups</h2>
              <p>
                Socialize and have fun with new people while doing your favorite
                activities in person or online.
              </p>
              <Link className="text-decoration-none" to="/groups/list">
                View Groups
                <ArrowRight />
              </Link>
            </Col>
            <Col className="lg-4 mb-5 mb-lg-0">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <Tags />
              </div>
              <h2 className="h4 fw-bolder">Tags</h2>
              <p>
                Find groups with new or old friends based on various tags that
                interests you.
              </p>
              <Link className="text-decoration-none" to="/groups/tags">
                View Tags
                <ArrowRight />
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="bg-light py-4 border-bottom text-dark">
        <Container className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder">Top Groups</h2>
            <p className="lead mb-0"> </p>
          </div>
          
          <Row>
            <TopGroups/>
          </Row>
        </Container>
      </section>

      <section className="fistSection py-4 border-bottom text-dark">
        <div className="fistDiv center">
          <iframe src="https://gifer.com/embed/xpR" className="fistFrame center" frameBorder="0" allowFullScreen title="fistBump"/>
          {/* <p><a href="https://gifer.com">via GIFER</a></p> */}
        </div>
        
        
          <Container className="text-center">
          <p>
            Whether it be an online or in person activity Squad Seek has 
            you covered. Squad Seek offers a platform for every activity.
            <br/>
            Create a account now and discover new opportunities new people.
          </p>
          <Link className="text-center" to="/register">
                <Button >Get Started</Button>
          </Link>
          </Container>
      </section>
      
      <section className="bg-light py-5 border-bottom text-dark">
        <Container className="container ">
          <div className="text-center mb-5">
            <h2 className="fw-bolder">Recent Activity</h2>
            <p className="lead mb-0"> </p>
          </div>
          
          <Row>
            <RecentGroups/>
          </Row>
        </Container>
      </section>
      
    </Container>
  );
};

export default Welcome;
