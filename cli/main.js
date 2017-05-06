import loadGoogleMapsAPI from 'load-google-maps-api';
import $ from 'jquery';


var pointsArray;

$(document).ready(() => {

    loadGoogleMapsAPI({
        key: "AIzaSyCNokgCGgBO7LMvwuiK3NiPivOILZBKieg",
        libraries: ["visualization"]
    }).then((gMaps) => {

        //TODO: INITIALIZE HEATMAP FROM ODA DATA
        pointsArray = new gMaps.MVCArray();

        navigator.geolocation.getCurrentPosition((position) => {
            var mapProp = {
                center: new gMaps.LatLng(position.coords.latitude, position.coords.longitude),
                zoom: 15,
            };
            var googleMapElement = $("#googleMap")[0];
            var map = new gMaps.Map(googleMapElement, mapProp);

            new gMaps.visualization.HeatmapLayer({
                data: pointsArray,
                map: map,
                maxIntensity: 1,
                radius: 20
            });

            $.ajax({
                url: "/api/heatmap",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: data => {
                    console.log(data);
                    data.forEach(function (element) {
                        var point = new gMaps.LatLng(element.latitude, element.longitude);
                        pointsArray.push(point);
                    }, this);
                }
            });

        });



        $('#addCough').click(e => {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position, pointsArray.length);

                pointsArray.push(new gMaps.LatLng(position.coords.latitude, position.coords.longitude));

                $.ajax({
                    url: "/api/observation",
                    type: "POST",
                    data: JSON.stringify({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: data => { console.log(data); }
                });
            });
        });


    }).catch((err) => {
        console.error(err);
    });


});
