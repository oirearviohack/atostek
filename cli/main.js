import loadGoogleMapsAPI from 'load-google-maps-api';
import $ from 'jquery';


var pointsArray;

$(document).ready(() => {

    loadGoogleMapsAPI({
        key: "AIzaSyCNokgCGgBO7LMvwuiK3NiPivOILZBKieg",
        libraries: ["visualization"]
    }).then((gMaps) => {
        var tmpArray = [
            new gMaps.LatLng(60.491413, 22.169878),
            new gMaps.LatLng(60.491495, 22.169879),
            new gMaps.LatLng(60.491577, 22.169880),
            new gMaps.LatLng(60.491659, 22.169881),
            new gMaps.LatLng(60.491741, 22.169882),
            new gMaps.LatLng(60.491823, 22.169883),
            new gMaps.LatLng(60.491905, 22.169884),
            new gMaps.LatLng(60.491987, 22.169885),
            new gMaps.LatLng(60.492069, 22.169886),
            new gMaps.LatLng(60.492151, 22.169887),
            new gMaps.LatLng(60.492233, 22.169888),
            new gMaps.LatLng(60.492315, 22.169889),
            new gMaps.LatLng(60.492397, 22.169890),
            new gMaps.LatLng(60.492479, 22.169891),
            new gMaps.LatLng(60.492561, 22.169892),
            new gMaps.LatLng(60.492643, 22.169893),
            new gMaps.LatLng(60.492725, 22.169894),
            new gMaps.LatLng(60.492807, 22.169895),
            new gMaps.LatLng(60.492889, 22.169896),
            new gMaps.LatLng(60.492971, 22.169897),
            new gMaps.LatLng(60.493053, 22.169898),
            new gMaps.LatLng(60.493135, 22.169899),
            new gMaps.LatLng(60.493217, 22.169900),
            new gMaps.LatLng(60.493299, 22.169901),
            new gMaps.LatLng(60.493381, 22.169902),
            new gMaps.LatLng(60.493463, 22.169903),
            new gMaps.LatLng(60.493545, 22.169904),
            new gMaps.LatLng(60.493627, 22.169905),
            new gMaps.LatLng(60.493709, 22.169906),
            new gMaps.LatLng(60.493791, 22.169907),
            new gMaps.LatLng(60.493873, 22.170000),
            new gMaps.LatLng(60.493955, 22.170001),
            new gMaps.LatLng(60.494037, 22.170002),
            new gMaps.LatLng(60.494119, 22.170003),
            new gMaps.LatLng(60.494201, 22.170004),
            new gMaps.LatLng(60.494283, 22.170005),
            new gMaps.LatLng(60.494365, 22.170006),
            new gMaps.LatLng(60.494447, 22.170007),
            new gMaps.LatLng(60.494529, 22.170008),
            new gMaps.LatLng(60.494611, 22.170009),
            new gMaps.LatLng(60.494693, 22.170010),
            new gMaps.LatLng(60.494775, 22.170011),
            new gMaps.LatLng(60.494857, 22.170012),
            new gMaps.LatLng(60.494939, 22.170013),
            new gMaps.LatLng(60.495021, 22.170244),
            new gMaps.LatLng(60.495103, 22.170245),
            new gMaps.LatLng(60.495185, 22.170246),
            new gMaps.LatLng(60.495267, 22.170247),
            new gMaps.LatLng(60.495349, 22.170248),
            new gMaps.LatLng(60.495431, 22.170249),
            new gMaps.LatLng(60.495513, 22.170250),
            new gMaps.LatLng(60.495595, 22.170251),
            new gMaps.LatLng(60.495677, 22.170252),
            new gMaps.LatLng(60.495759, 22.170253),
            new gMaps.LatLng(60.495841, 22.170254),
            new gMaps.LatLng(60.495923, 22.170255),
            new gMaps.LatLng(60.496005, 22.170256),
            new gMaps.LatLng(60.496087, 22.170257),
            new gMaps.LatLng(60.496169, 22.170732),
            new gMaps.LatLng(60.496251, 22.170733),
            new gMaps.LatLng(60.496333, 22.170734),
            new gMaps.LatLng(60.496415, 22.170735),
            new gMaps.LatLng(60.496497, 22.170736),
            new gMaps.LatLng(60.496579, 22.170737),
            new gMaps.LatLng(60.496661, 22.170738),
            new gMaps.LatLng(60.496743, 22.170739),
            new gMaps.LatLng(60.496825, 22.170740),
            new gMaps.LatLng(60.496907, 22.170741),
            new gMaps.LatLng(60.496989, 22.170742),
            new gMaps.LatLng(60.497071, 22.170743),
            new gMaps.LatLng(60.497153, 22.170744),
            new gMaps.LatLng(60.497235, 22.170745),
            new gMaps.LatLng(60.497317, 22.170746),
            new gMaps.LatLng(60.497399, 22.170747),
            new gMaps.LatLng(60.497481, 22.170748),
            new gMaps.LatLng(60.497563, 22.170749),
            new gMaps.LatLng(60.497645, 22.170854),
            new gMaps.LatLng(60.497727, 22.170855),
            new gMaps.LatLng(60.497809, 22.170856),
            new gMaps.LatLng(60.497891, 22.170857),
            new gMaps.LatLng(60.497973, 22.170858),
            new gMaps.LatLng(60.498055, 22.170859),
            new gMaps.LatLng(60.498137, 22.170860),
            new gMaps.LatLng(60.498219, 22.170861),
            new gMaps.LatLng(60.498301, 22.170862),
            new gMaps.LatLng(60.498383, 22.170863),
            new gMaps.LatLng(60.498465, 22.170864),
            new gMaps.LatLng(60.498547, 22.170865),
            new gMaps.LatLng(60.498629, 22.170866),
            new gMaps.LatLng(60.498711, 22.170976),
            new gMaps.LatLng(60.498793, 22.170977),
            new gMaps.LatLng(60.498875, 22.170978),
            new gMaps.LatLng(60.498957, 22.170979),
            new gMaps.LatLng(60.499039, 22.170980),
            new gMaps.LatLng(60.499121, 22.170981),
            new gMaps.LatLng(60.499203, 22.170982),
            new gMaps.LatLng(60.499285, 22.170983),
            new gMaps.LatLng(60.499367, 22.170984),
            new gMaps.LatLng(60.499449, 22.170985),
            new gMaps.LatLng(60.499531, 22.170986)
        ];
        pointsArray = new gMaps.MVCArray(tmpArray);

        navigator.geolocation.getCurrentPosition((position) => {
            var mapProp = {
                center: new gMaps.LatLng(position.coords.latitude, position.coords.longitude),
                zoom: 15,
            };
            var googleMapElement = $("#googleMap")[0];
            var map = new gMaps.Map(googleMapElement, mapProp);

            new gMaps.visualization.HeatmapLayer({
                data: pointsArray,
                map: map
            });
        });

        $('#addCoughToHML').click(e => {
            navigator.geolocation.getCurrentPosition((position) => {
                pointsArray.push(new gMaps.LatLng(position.coords.latitude, position.coords.longitude));
                console.log(position);
                console.log(pointsArray.length);
            });
        });

    }).catch((err) => {
        console.error(err);
    });

    
    
    $('button').click(e => {

        navigator.geolocation.getCurrentPosition(position => {
            $.ajax({
                url: "/api/observation",
                type: "POST",
                data: JSON.stringify({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: data => { alert("köhköh"); }
            });
        });
        
    });


    

});
