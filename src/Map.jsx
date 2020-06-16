import React, { useEffect } from 'react';
import mapboxgl, { Map as MapBox, Popup } from 'mapbox-gl';
import { getLocations, parseGeojson, MARKER_LAYER } from './utils';

export const MAPBOX_API_KEY =
  'pk.eyJ1Ijoic3RvbW15MTIzIiwiYSI6ImNqaXh4NXZ6bzA0aHIzd28xcjRvZGJyM2YifQ.h0qUlxu7FnltxVvTFosRDQ';

const mapOptions = {
  container: 'map',
  style: 'mapbox://styles/stommy123/ckbh642so07ek1io87h4v74xw',
  zoom: 12,
  center: [-80.2044, 25.8028],
};

export const popupRenderer = (props = {}) => `
  <div>
    <p>${props.name}</p>
  </div>
`;

const Map = () => {
  const handleMarkerClick = map => e => {
    const marker = e.features[0];

    const coordinates = marker.geometry.coordinates;

    new Popup().setLngLat(coordinates).setHTML(popupRenderer(marker.properties)).addTo(map);
  };

  const initializeMap = async () => {
    mapboxgl.accessToken = MAPBOX_API_KEY;
    const map = new MapBox(mapOptions);
    const locations = await getLocations();

    const parsedLocations = parseGeojson(locations);

    map.on('load', () => {
      map.addSource('markers', { type: 'geojson', data: parsedLocations });
      map.addLayer(MARKER_LAYER);

      map.on('click', 'markers', handleMarkerClick(map));
    });
  };

  useEffect(() => {
    initializeMap();
  }, []);

  return (
    <div className='map-container'>
      <div id='map' />
    </div>
  );
};

export default Map;
