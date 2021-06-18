import React, { useRef, useState, useEffect, useCallback } from "react";
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
// import mapboxgl from 'mapbox-gl';
import axios from "axios";

const Clusters = () => {
    const [burritos, setBurritos] = useState([])

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
    const mapstyle = "mapbox://styles/mapbox/dark-v9";
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

export default Clusters
