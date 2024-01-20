export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWFkaS1leGUiLCJhIjoiY2xyOWhtbjRxMDE3djJpcnYweWx2ejF2NiJ9.EHa95ogJRF004Z1Q9sluxQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/aadi-exe/clr9ieu47001d01pfec0n5669',
    scrollZoom: false,
    //   center: [-118.113491, 34.111745],
    //   interactive: false,
    //   zoom: 10,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker to map
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom', // point where the marker is attached to the map
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup to marker
    new mapboxgl.Popup({
      offset: 30,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    //extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: { top: 200, bottom: 150, left: 100, right: 100 },
  });
};
