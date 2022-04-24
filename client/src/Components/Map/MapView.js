import React, { useRef } from "react";
import {
  //Autocomplete,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "650px",
  height: "600px"
};
const libraries = ["localContext", "places"];

const MapView = (props) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyA2rBydvPCX6xYShPG1hvuMafzBYaOqRos",
        libraries
    })
    
    //reference of the current map position
    const mapRef = useRef(null);
    

    const onLoad = (map)=>{
        mapRef.current = map;
    }

  const markerHandler = (group) =>{
    props.setGroups([group]);
  }

  //console.log(position)

  return isLoaded ? (
    <GoogleMap
        onLoad={onLoad}
        //onDragEnd={handleCenter}
        mapContainerStyle={containerStyle}
        center={props.position}
        zoom={props.zoom}
        id="map"
        options={{mapTypeControl: false, streetViewControl:false}}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      

      {props.groups && props.groups.map((e)=>
      (
        <Marker
          key={e._id}
          position={{lat:parseFloat(e.location[0].lat), lng:parseFloat(e.location[0].lng)}}
          title={`Group: ${e.name}`}
          shape="MarkerShapePoly"
          onClick={()=>markerHandler(e)}
        />
      )
      )}
      <></>
    </GoogleMap>
) : <></>
};

export default MapView;
