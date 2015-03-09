'use strict';

/* global L , _ , d3  */

// create a map in the "map" div, set the view to a given place and zoom
var map = new L.Map('map', {
    center: new L.LatLng(53.408, -9.128),
    zoom: 3,
    scrollWheelZoom: false
});

L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png', {    
    noWrap: true,
    attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}).addTo(map);

var timeslider, 
    markers = new L.FeatureGroup();

function addMarkerToLayer(value)
{
    var marker = L.marker([value.lat, value.lon]);
        marker.bindPopup('<div style="text-align:center;"><h4>' + value.name + '</h4><a href="'+ value.url+'"><img style="width: 100px; height: 100px;" src="' + value.image + '" /></a>', {
            showOnMouseOver: true
        });                

    markers.addLayer(marker);
    

  }

function initSlider(rows)
{
      var sliderMin = _.min(rows, function(value){ return value.year; });
      var sliderMax = _.max(rows, function(value){ return value.year;  });

      timeslider  = $('input.slider').slider({
            min: sliderMin.year,
            max: sliderMax.year,
            step: 1,
            range: true,
            tooltip: 'always'
          }
      ).on('slideStop', function(val){
        // 
        // when the slider is moved...
        // 
        
        // clean up what's there
        markers.clearLayers();
        
        // get new slider values
        var startYear   = val.value[0];
        var endYear     = val.value[1];

        // check if each value falls within new range
        // and add to map if it does...
        _.each(rows, function(value){
            if(value.year >= startYear && value.year <= endYear){
                addMarkerToLayer(value);
            }
            
        });
    });
}


// d3.csv('/data/sparql.csv', function(d) {
d3.csv('http://davekelly.github.io/QUB-Semantic-Web-Mining-Visualisation-Workshop/data/sparql.csv', function(d) {

    var dateParts = d.launchDate.split('-');
    var year = dateParts[0];
    
    return {
        name: d.name,
        lat: d.lat,
        lon: d.lon,
        url: d.ship,
        image: d.image,
        year: +year
    };
}, function(err, rows) {

    // create the year slider
    initSlider(rows);

    // initialise the map with all the markers
    _.each(rows, function(value){
        addMarkerToLayer(value);
    });
    map.addLayer(markers);
  
});

  