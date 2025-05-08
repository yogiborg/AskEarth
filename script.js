let map;
let marker;
let infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 20, lng: 0 },
    zoom: 2,
    mapTypeId: "hybrid"
  });
  // map = new google.maps.Map(document.getElementById("map"), {
  //   center: { lat: 20, lng: 0 },
  //   zoom: 2,
  //   mapTypeId: "satellite",
  //   styles: [
  //     {
  //       featureType: "all",
  //       elementType: "labels.text.fill",
  //       stylers: [{ color: "#ffffff" }]
  //     },
  //     {
  //       featureType: "all",
  //       elementType: "labels.text.stroke",
  //       stylers: [{ color: "#000000" }]
  //     },
  //     {
  //       featureType: "water",
  //       elementType: "geometry",
  //       stylers: [{ color: "#004044" }]
  //     }
  //   ]
  // });  
}

// Geocode using OpenStreetMap (Nominatim)
async function geocodeLocation(locationName) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      display: data[0].display_name,
    };
  } else {
    return null;
  }
}

document.getElementById('questionForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const question = document.getElementById('questionInput').value;

  const parsed = await processQuestion(question);

  if (parsed && parsed.location) {
    const geo = await geocodeLocation(parsed.location);
    if (geo) {
      const position = { lat: geo.lat, lng: geo.lon };

      if (marker) marker.setMap(null); // remove old
      marker = new google.maps.Marker({ position, map });

      if (infoWindow) infoWindow.close();
      infoWindow = new google.maps.InfoWindow({
        content: parsed.caption || `${parsed.topic} in ${geo.display}`
      });
      infoWindow.open(map, marker);

      map.panTo(position);
      setTimeout(() => map.setZoom(6), 400);
    } else {
      alert("Could not find that location on the map.");
    }
  } else {
    alert("Sorry, no location found.");
  }
});
