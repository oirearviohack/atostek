var express = require('express');
var router = express.Router();
var coughObservation = require("./CoughObservation.json");
var mkFhir = require('fhir.js');
var coordinates = require("./coordinates.txt");

router.get('/', function(req, res, next) {

    res.render('index', { title: 'Yskägeneraattori' });
});

router.get('/generate', function(req, res, next) {
    createCoughData(function(response) {

    });
    /*
     .create(entry)
     .then(function(response){
     res.render('data', {title: 'Data lähetetty', data: JSON.stringify(response)});
     })
     .catch(function(response){
     res.render('error', {title: 'Data ei lähetetty'});
     });
     */
});

function createLocation(lat, long) {
    var location =
    {
        resourceType: "Location",
        position: {
            longitude: parseFloat(long),
            latitude: parseFloat(lat)
        }
    };

    return location;
}

function createCoughData(callback) {

    var client = mkFhir({
        baseUrl: 'https://oda.medidemo.fi/phr/baseDstu3'
    });

    parseLocations(function(locations) {

        for(var i = 0; i<50; i++)
        {
            var fhirLocation = createLocation(locations[i].longitude, locations[i].latitude);

            var locationEntry = {
                resource: fhirLocation
            };

            client
                .create(locationEntry)
                .then(function(response){
                    var coughEntry = {
                        resource: generateCough(response.data.id, 2)
                    };

                    client
                        .create(coughEntry)
                        .then(function(response){

                        })
                        .catch(function(response){
                            console.log(JSON.stringify(response));
                        });
                })
                .catch(function(response){
                    console.log(JSON.stringify(response));
                });

        }
    });
}

function generateCough(locationId, patientId) {
    var fhirCoughObservation = {
        resourceType: "Observation",
        status: "final",
        code: {
            coding: [
                {
                    system: "http://snomed.info/sct",
                    code: "49727002",
                    display: "Observation of cough"
                }
            ],
            text: "Observation of cough"
        },
        subject: {
            reference: "Patient/" + patientId
        },
        effectiveDateTime: "1999-07-02T14:09:46.544+03:00",
        extension: [
            {
                url: "https://github.com/oirearviohack/atostek/fhir/StructureDefinition/observation-site",
                valueReference: {
                    reference: "Location/" + locationId
                }
            }
        ]
    };

    return fhirCoughObservation;
}

function parseLocations(callback) {
    var fs = require('fs'),
        byline = require('byline');

    var stream = fs.createReadStream("../routes/coordinates.txt", { encoding: 'utf-8' });
    stream = byline.createStream(stream);

    var locations = [];

    stream.on('data', function(line) {
        var location = {};
        location.latitude = line.substr(7, 11).replace(",","");
        location.longitude = line.substr(26, 11).replace(",","");

        locations.push(location);
    });

    stream.on('end', function() {
        callback(locations);
    });
}



module.exports = router;
