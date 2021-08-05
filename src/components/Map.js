// import React, { useRef, useEffect, useState} from 'react';
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// // import geoJson from './history-facts.json'

// mapboxgl.accessToken = 'pk.eyJ1IjoiYmpoYXl3b29kIiwiYSI6ImNrcndzeHcycTBpcHEycXBnbGgzMGcwc2kifQ.kCAOtKmwGaF82FM8mGpbhQ';

// export default function Map() {
//     const mapContainer = useRef(null);
//     const map = useRef(null);
//     const [lng, setLng] = useState(-70.9);
//     const [lat, setLat] = useState(42.35);
//     const [zoom, setZoom] = useState(9);

//     useEffect(() => {
//         if (map.current) return; // initialize map only once
//         map.current = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: 'mapbox://styles/bjhaywood/ckrv1wvz63g9517nzxq0nf7g8',
//         center: [18.1616, -10.1255],
//         zoom: 1.39,
//         });
//     });

//     useEffect(() => {
//         if (!map.current) return; // wait for map to initialize
//         map.current.on('move', () => {
//         setLng(map.current.getCenter().lng.toFixed(4));
//         setLat(map.current.getCenter().lat.toFixed(4));
//         setZoom(map.current.getZoom().toFixed(2));
//         });
//     });

//     return (
//         <div>
//         <div className="sidebar">
//             console.log(map.current)
//             Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//         </div>
//         <div ref={mapContainer} className="map-container" />
//         </div>
//     );
// }

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import geoJson from './history-facts.json';

mapboxgl.accessToken =
    'pk.eyJ1IjoiYmpoYXl3b29kIiwiYSI6ImNrcndzeHcycTBpcHEycXBnbGgzMGcwc2kifQ.kCAOtKmwGaF82FM8mGpbhQ';

    const Map = () => {
    const mapContainerRef = useRef(null);

    const [lng, setLng] = useState(-87.65);
    const [lat, setLat] = useState(41.84);
    const [zoom, setZoom] = useState(10);

    // Initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/bjhaywood/ckrv1wvz63g9517nzxq0nf7g8',
        center: [lng, lat],
        zoom: zoom,
        });

        // Create default markers
        geoJson.features.map((feature) =>
        new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map)
        );

        // Add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.on('move', () => {
        setLng(map.getCenter().lng.toFixed(4));
        setLat(map.getCenter().lat.toFixed(4));
        setZoom(map.getZoom().toFixed(2));
        });

        // Clean up on unmount
        return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
        <div className="sidebarStyle">
            <div>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
        </div>
        <div className="map-container" ref={mapContainerRef} />
        </div>
    );
};

export default Map;