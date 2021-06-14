import React, { useRef, useState, useCallback, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
// import React, { useRef, useState, useEffect, useCallback, useContext } from "react";
import ReactMapGL, {
    // Marker,
    // Popup,
    // GeolocateControl,
    // NavigationControl,
} from "react-map-gl";
// import Geocoder from "react-map-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import userContext from "../Context/UserContext"
// import mapboxgl from 'mapbox-gl';
import axios from "axios";


// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
// mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;






const Map = () => {
    const { userData } = useContext(userContext)
    const [burritos, setBurritos] = useState([])

    const history = useHistory()


    useEffect(() => {
        if (!userData.user) {
            history.push("/login")
        }

        // console.log(userData.user)

        userData.user
            ? console.log(userData.user.displayName)
            : console.log("User loading")

    }, [userData.user, history])



    // reusable backend call to fetch burrito database
    const getAllBurritos = async () => {
        try {
            // console.log("getAllBurritos")
            const displayBurritos = await axios.get("/burritos/all")
            // console.log(displayBurritos.data)

            setBurritos(displayBurritos.data)
            console.log("All Burritos", burritos)

            //   setEvents(showMarkers);
        } catch (error) {
            console.log(error);
        }
    };

    // Use effect to get the burritos from the database
    useEffect(() => {

        getAllBurritos();
    }, []);


    // map setup
    const api = `pk.eyJ1Ijoic2Vhbm1lbG9keSIsImEiOiJja21iYTRtcWYxeGNiMzNvY2t2dXZnMHg0In0.2STcuED1XJgYMIxidRaaoQ`;
    // mapbox://styles/francisn21/cklv81byf44mx17ql4bv4chxl
    const mapstyle = "mapbox://styles/mapbox/streets-v11";
    // const [showevents, setEvents] = useState([]);
    // const [showPopup, setShowPopup] = useState({});
    // const [addEventLocation, setEventLocation] = useState(null);
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 37.76264,
        longitude: -122.44636,
        zoom: 10,
    });
    const mapRef = useRef();

    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    // const handleGeocoderViewportChange = useCallback(
    //     (newViewport) => {
    //         const geocoderDefaultOverrides = { transitionDuration: 1000 };

    //         return handleViewportChange({
    //             ...newViewport,
    //             ...geocoderDefaultOverrides,
    //         });
    //     },
    //     [handleViewportChange]
    // );

    // const geolocateStyle = {
    //     top: 0,
    //     right: 0,
    //     margin: 10,
    // };

    // const positionOptions = { enableHighAccuracy: true };


    return (
        <div className="map" id="map">

            <ReactMapGL
                ref={mapRef}
                {...viewport}
                mapboxApiAccessToken={api}
                mapStyle={mapstyle}
                doubleClickZoom={false}
                // onClick={() => setShowPopup({})}
                // onDblClick={addEventPopup}
                onViewportChange={handleViewportChange}
            >
            </ReactMapGL>
        </div>
    )
}

export default Map
