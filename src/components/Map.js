import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import geoJson from './history-facts.json';

mapboxgl.accessToken =
    'pk.eyJ1IjoiYmpoYXl3b29kIiwiYSI6ImNrcndzeHcycTBpcHEycXBnbGgzMGcwc2kifQ.kCAOtKmwGaF82FM8mGpbhQ';

const Map = () => {
const mapContainerRef = useRef(null);

const [lng, setLng] = useState(18.1616);
const [lat, setLat] = useState(-10.1255);
const [zoom, setZoom] = useState(1.39);

// Initialize map when component mounts
useEffect(() => {
    const map = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: 'mapbox://styles/bjhaywood/ckrv1wvz63g9517nzxq0nf7g8',
    center: [lng, lat],
    zoom: zoom,
    });

    // Create default markers
    geoJson.features.map((feature) => new mapboxgl.Marker()
        .setLngLat(feature.geometry.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(feature.properties.title + feature.properties.description))
        .addTo(map)
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
