"use strict";function addMarkerToLayer(a){var b=L.marker([a.lat,a.lon]);b.bindPopup('<img style="width: 100px; height: 100px;" src="'+a.image+'" />',{showOnMouseOver:!0}),markers.addLayer(b)}function initSlider(a){var b=_.min(a,function(a){return a.year}),c=_.max(a,function(a){return a.year});timeslider=$("input.slider").slider({min:b.year,max:c.year,step:1,range:!0,tooltip:"always"}).on("slideStop",function(b){markers.clearLayers();var c=b.value[0],d=b.value[1];_.each(a,function(a){a.year>=c&&a.year<=d&&addMarkerToLayer(a)})})}var map=new L.Map("map",{center:new L.LatLng(53.408,-9.128),zoom:3,scrollWheelZoom:!1});L.tileLayer("http://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png",{noWrap:!0,attribution:'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(map);var timeslider,markers=new L.FeatureGroup;d3.csv("../data/sparql.csv",function(a){var b=a.launchDate.split("-"),c=b[0];return{name:a.name,lat:a.lat,lon:a.lon,url:a.ship,image:a.image,year:+c}},function(a,b){initSlider(b),_.each(b,function(a){addMarkerToLayer(a)}),map.addLayer(markers)});