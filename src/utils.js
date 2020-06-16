export const parseGeojson = data => {
  const features = data.map(item => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [item.longitude, item.latitude],
    },
    properties: item,
  }));

  return {
    type: 'FeatureCollection',
    features,
  };
};

export const LOCATIONS = [
  {
    id: '1',
    name: 'Wyncode',
    longitude: -80.2044,
    latitude: 25.8028,
  },
  {
    id: '2',
    name: "Joe's Stone Crab",
    longitude: -80.1353,
    latitude: 25.7689,
  },
  {
    id: '3',
    name: 'Zuma',
    longitude: -80.1896,
    latitude: 25.7705,
  },
  {
    id: '4',
    name: 'Home',
    longitude: -80.33618,
    latitude: 25.58416,
  },
];

export const getLocations = () => new Promise(resolve => resolve(LOCATIONS));

export const MARKER_LAYER = {
  id: 'markers',
  type: 'symbol',
  source: 'markers',
  layout: {
    'icon-image': 'mapbox-logo',
    'icon-size': 1.5,
    'icon-allow-overlap': true,
  },
};
