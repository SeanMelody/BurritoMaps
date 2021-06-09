import React, { useRef, useState, useEffect, useCallback, useContext } from "react";
import ReactMapGL, {
    Marker,
    Popup,
    GeolocateControl,
    NavigationControl,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import axios from "axios";

const Map = () => {


    // map setup
    const api = `pk.eyJ1IjoiZnJhbmNpc24yMSIsImEiOiJja2x1amVuNGQwYmVkMm9vZW9xc3VwOW9jIn0.eh8hBFzSr0tJUxungpfu3A`;
    // mapbox://styles/francisn21/cklv81byf44mx17ql4bv4chxl
    const mapstyle = "mapbox://styles/mapbox/dark-v9";
    const [showevents, setEvents] = useState([]);
    const [showPopup, setShowPopup] = useState({});
    const [addEventLocation, setEventLocation] = useState(null);
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 37.0902,
        longitude: -95.7129,
        zoom: 10,
    });

    return (
        <div>
            <h1>Map!</h1>
        </div>
    )
}

export default Map
