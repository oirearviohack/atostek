import loadGoogleMapsAPI from 'load-google-maps-api';
import $ from 'jquery';

console.log(loadGoogleMapsAPI);

$(document).ready(() => {

    $('button').click(e => {
        $.ajax({
            url: "/api/observation",
            type: "POST",
            data: JSON.stringify({ data:"test" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: data => { alert("köhköh"); }
        });
    });

});
