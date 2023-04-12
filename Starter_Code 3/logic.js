// creating map object
var myMap = L.map("map", {
    center: [27.96044, -82.30695],
    zoom: 3
}); 

// adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// load the GeoJSON data
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// adding marker functions
function markerSize(mag) {
    return mag * 30000;
}

function markerColor(mag) {
    if (mag <= 1) {
        return "ADFF2F";
    }  else if (mag <= 2) {
        return "#9ACD32";
    }  else if (mag <= 3) {
        return "FFFF00";
    }  else if (mag <= 4) {
        return "ffd700";
    }  else if (mag <= 5) {
        return "#FFA500";
    }  else {
        return "FF0000";
    };
}

// get the data with d3 and send to the createFeatures function

d3.json(geoData).then(function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {
    var earthquakes = L.geoJSON(earthquakeData, {
        // define a function to run once for each feature in features array
        //give each feature a popup describing the place and time of the earthquake
        onEachFeature: function (feature, layer) {
            layer.bindPopup("strong>" + feature.properties.time + "</strong><br /><br />Magnitude: " + 
                feature.properties.mag + "<br /><br />")
            },     pointToLayer: function(feature, latlng) {
            return new L.circle(latlng,
                {radius: markerSize(feature.properties.mag),
                    fillColor: markerColor(feature.properties.mag),
                    fillOpacity: 1,
                    stroke: false,
        })
    }
});

    // sending layer to the map
    createMap(earthquakes);
}

function createMap(earthquakes) {

    //define satelite and dark layers
    var satMap = L.tileLayer
}
