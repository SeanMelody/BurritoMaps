import React, { useRef, useState, useEffect, useCallback } from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl';
import useSupercluster from "use-supercluster"
import ClusterPins from "../Components/ClusterPins";

import axios from "axios";

const Clusters = () => {
    const [burritos, setBurritos] = useState([])

    // Set the state for viewport
    const [viewport, setViewport] = useState({
        latitude: 35.95626,
        longitude: -121.8657,
        width: "100vw",
        height: "100vh",
        zoom: 4,
    });


    // map setup
    const api = `pk.eyJ1Ijoic2Vhbm1lbG9keSIsImEiOiJja21iYTRtcWYxeGNiMzNvY2t2dXZnMHg0In0.2STcuED1XJgYMIxidRaaoQ`;
    const mapstyle = "mapbox://styles/mapbox/dark-v9";

    // Set Mapref to null
    const mapRef = useRef(null);

    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    // Function to set each event to a point and to GEOJSON object
    const points = burritos.map(point => ({
        type: "Feature",
        properties: {
            cluster: false,
            pointId: point._id,
            category: point.category
        },
        geometry: { type: "Point", coordinates: [point.location[0].longitude, point.location[0].latitude] }
    }))

    // Set bounds for the view window
    const bounds = mapRef.current
        ? mapRef.current
            .getMap()
            .getBounds()
            .toArray()
            .flat()
        : null

    // Get clusters and set clusters using the superclusters
    const { clusters, supercluster } = useSupercluster({
        points,
        zoom: viewport.zoom,
        bounds,
        options: { radius: 75, maxZoom: 20 }
    })

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

    // return (
    //     <div className="map" id="map">

    //         <ReactMapGL
    //             ref={mapRef}
    //             {...viewport}
    //             maxZoom={20}
    //             mapboxApiAccessToken={api}
    //             mapStyle={mapstyle}
    //             doubleClickZoom={false}
    //             // onClick={() => setShowPopup({})}
    //             // onDblClick={addEventPopup}
    //             onViewportChange={setViewport}
    //         >
    //         </ReactMapGL>
    //     </div>
    // )

    // Return everything to display on the page
    return (
        // ReactMapGL for displaying the map
        <ReactMapGL
            ref={mapRef}
            {...viewport}
            maxZoom={20}
            mapboxApiAccessToken={api}
            mapStyle={mapstyle}
            doubleClickZoom={false}
            // onClick={() => setShowPopup({})}
            // onDblClick={addEventPopup}
            onViewportChange={setViewport}
        >
            {/* Map through the clusters to display them */}
            {clusters.map((cluster) => {
                const [longitude, latitude] = cluster.geometry.coordinates;
                const {
                    cluster: isCluster,
                    point_count: pointCount
                } = cluster.properties
                // If it is a cluster display them
                if (isCluster) {
                    return (
                        <Marker key={cluster.id}
                            latitude={latitude}
                            longitude={longitude}>
                            {/* Set the cluster to a different color if it more then 10 events */}
                            <div className={`cluster-marker ${pointCount >= 10 ? "cluster-large" : ""} `}
                                style={{
                                    width: `${10 + (pointCount) / points.length * 50}px`,
                                    height: `${10 + (pointCount) / points.length * 50}px`
                                }}
                                // Onclick functino that lets user click on a cluster to zoom into it
                                onClick={() => {
                                    const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20);
                                    setViewport({
                                        ...viewport,
                                        latitude,
                                        longitude,
                                        zoom: expansionZoom,
                                        transitionInterpolator: new FlyToInterpolator({
                                            speed: 2
                                        }),
                                        transitionDuration: "auto"
                                    })
                                }}

                            >
                                {/* In the center of the cluster display the amount of events */}
                                {pointCount}
                            </div>
                        </Marker>
                    )
                }

                // Return the pins, not the clusters
                return (
                    <Marker
                        className="event-pin"
                        key={cluster.properties.pointId}
                        latitude={latitude}
                        longitude={longitude}
                    >
                        {/* Pin component to dispaly an event, color is yellow */}
                        <ClusterPins color="#FFFF00" />

                    </Marker>
                )
            })}

        </ReactMapGL >
    )
}

export default Clusters
