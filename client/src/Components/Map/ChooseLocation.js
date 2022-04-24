import React, { useState, useRef } from "react";
import {
  Autocomplete,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "500px",
  height: "500px"
};

const libraries = ["localContext", "places"];

const ChooseLocation = (props) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyA2rBydvPCX6xYShPG1hvuMafzBYaOqRos",
        libraries
    })
    
    //reference of the current map position
    const mapRef = useRef(null);
    //Map position with default position at LA
    const [position, setPosition] = useState({lat: 34.151034952871875,lng: -118.37132316739128});
    //Stores the position of the search result
    const [autoComp, setAutoComp] = useState(null);
    const [zoom, setZoom] = useState(11);
    const [markers, setMarkers] = useState([]);
    const [addr, setAddr] = useState("");
    

    const onLoad = (map)=>{
        mapRef.current = map;
    }

  const onLoadAuto = (autocomplete)=>{
    console.log('autocomplete: ', autocomplete)
    setAutoComp(autocomplete);
  }

  const handleCenter = () =>{
    if(!mapRef.current){
        return;
    }

    const newPos = mapRef.current.getCenter().toJSON();

    if (newPos.lat === position.lat && newPos.lng === position.lng){
        return;
    }

    setPosition(newPos);
  }

  const placeChanged = () =>{
    if (autoComp !== null) {
        //console.log(autoComp.getPlace().formatted_address)
        setAddr(autoComp.getPlace().formatted_address)
        props.onSetAddress(autoComp.getPlace().formatted_address)
        console.log(addr)
        // console.log(autoComp.getPlace().geometry.location.lat())
        // console.log(autoComp.getPlace().geometry.location.lng())
        setPosition({lat: autoComp.getPlace().geometry.location.lat(),lng: autoComp.getPlace().geometry.location.lng()})
        props.onSetPosition([{lat: autoComp.getPlace().geometry.location.lat(),lng: autoComp.getPlace().geometry.location.lng()}])
        setZoom(17);
        setMarkers([{lat: autoComp.getPlace().geometry.location.lat(),lng: autoComp.getPlace().geometry.location.lng()}])
      } else {
        console.log('Autocomplete is not loaded yet!')
      }
  }

  //console.log(position)

  return isLoaded ? (
    <GoogleMap
        onLoad={onLoad}
        onDragEnd={handleCenter}
        mapContainerStyle={containerStyle}
        center={position}
        zoom={zoom}
        id="map"
        options={{mapTypeControl: false, streetViewControl:false}}
        
        onRightClick={(e) => {
          console.log("lat");
          console.log(e.latLng.lat());
          console.log("lng");
          console.log(e.latLng.lng());}}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <Autocomplete
        onLoad={onLoadAuto}
        onPlaceChanged={placeChanged}
      >
      <input
              type="text"
              placeholder={`Search Google Maps`}
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `440px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "25%",
                bottom:"91.5%",
                marginLeft: "-120px"
              }}
            />
      
      </Autocomplete>

      {markers && markers.map((e,i)=>(
        <Marker
          key={i}
          position={e}
          onRightClick={()=>setMarkers([])}
        />
      ))}
      <></>
    </GoogleMap>
) : <></>
};

export default ChooseLocation;
