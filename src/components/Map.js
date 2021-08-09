import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import geoJson from './history-facts.json';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
// import MapInteractivity from './MapInteractivity.js'

mapboxgl.accessToken =
    'pk.eyJ1IjoiYmpoYXl3b29kIiwiYSI6ImNrcndzeHcycTBpcHEycXBnbGgzMGcwc2kifQ.kCAOtKmwGaF82FM8mGpbhQ';


const Map = () => {
    const mapContainerRef = useRef(null);
    const [lng, setLng] = useState(18.1616);
    const [lat, setLat] = useState(-10.1255);
    const [zoom, setZoom] = useState(1.39);
    const useStyles = makeStyles({
        root: {
            width: 300,
        },
    });
    
    function valuetext(value) {
        return `${value}°C`;
    }
    
    const RangeSlider = () => {
        const classes = useStyles();
        const [value, setValue] = React.useState([0, 2021]);
    
        const handleChange = (e, newValue) => {
            setValue(newValue);
        };
    
        return (
            <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Temperature range
            </Typography>
            <Slider
                value={value}
                min={1900}
                max={2021}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
            </div>
        );
    }

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
            .setPopup(new mapboxgl.Popup().setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>' + `<img src=${feature.properties.image}></img>`))
            .addTo(map),
            
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
        <div className="map-container" ref={mapContainerRef}>
            <RangeSlider></RangeSlider>
        </div>
        </div>
);
};

export default Map;



