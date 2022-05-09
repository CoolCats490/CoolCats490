import React, { useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Container } from "react-bootstrap";

const containerStyle = {
  width: "450px",
  height: "450px",
};

const libraries = ["localContext", "places"];
const ActivityMap = (props) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOG_API,
    libraries,
  });

  //reference of the current map position
  const mapRef = useRef(null);
  //Map position with default position at LA

  const onLoad = (map) => {
    mapRef.current = map;
  };

  console.log(props);
  console.log(props.groups.location[0].lat);

  return isLoaded ? (
    <Container>
      <GoogleMap
        onLoad={onLoad}
        mapContainerStyle={containerStyle}
        center={{
          lat: parseFloat(props.groups.location[0].lat),
          lng: parseFloat(props.groups.location[0].lng),
        }}
        zoom={16}
        id="map"
        options={{ mapTypeControl: false, streetViewControl: false }}
      >
        <Marker
          position={{
            lat: parseFloat(props.groups.location[0].lat),
            lng: parseFloat(props.groups.location[0].lng),
          }}
          title={`Group: ${props.groups.name}`}
          shape="MarkerShapePoly"
        />
        <></>
      </GoogleMap>
    </Container>
  ) : (
    <></>
  );
};

export default ActivityMap;
