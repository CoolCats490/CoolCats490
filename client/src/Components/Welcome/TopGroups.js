import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Image } from "react-bootstrap";
import defaultPic from "../../pages/Media/squad1.png";
import "./Swiper.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
// import required modules
import { Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";

const TopGroups = () => {
  const [topGroups, setTopGroups] = useState([]);

  //Sets the correct backend server address depending
  //on if in dev or production mode
  const url =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_URL_DEVELOPMENT
      : "";

  useEffect(() => {
    const fetchLatestGroups = async () => {
      try {
        const response = await axios(url + "/activities/top");
        //store groups in groups object
        setTopGroups(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    //Call async function
    fetchLatestGroups();
  }, [url]);

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        slidesPerGroup={3}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {topGroups.map((e) => (
          <SwiperSlide key={e._id} className="">
            
            <Link to={`/groups/${e._id}`} className="text-dark text-decoration-none shadow text-capitalize">
            <Container>
            <Image src={e.groupPic||defaultPic } className="imgSize" />
            {e.name}
            </Container>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TopGroups;
