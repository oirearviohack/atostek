var fhirjs = require('fhir.js');
var fhir = fhirjs({ baseUrl: 'https://oda.medidemo.fi/phr/baseDstu3' });
var _ = require('lodash');
var rp = require('request-promise-native');

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


function generateCoughObservation(locationId, patientId) {
    var date = new Date();
    var dateString = date.toISOString();

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
        effectiveDateTime: dateString,
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

exports.createObservation = function(coordinates) {
    var locationEntry = {
        resource: createLocation(coordinates.latitude, coordinates.longitude)
    };

    return fhir.create(locationEntry)
        .then(function(response){
            var coughEntry = {
                resource: generateCoughObservation(response.data.id, 3)
            };
            return fhir.create(coughEntry);
        });
}

function getAll(url, previousData) {
    return rp({
        uri: url,
        json: true
    }).then(data => {
        var next = _.find(data.link, l => l.relation === 'next');
        var locations = _
            .chain(data.entry)
            .filter(e => e.resource && e.resource.extension && e.resource.extension.length > 0)
            .map(e => e.resource.extension[0].valueReference.reference)
            .value();

        var newData = _.concat(previousData, locations);
        if(next && next.url && newData.length <= 100)
        {
            return getAll(next.url, newData);
        }
        else 
        {
            return newData;
        }
    });
}

exports.findObservations = function() {
    return getAll("https://oda.medidemo.fi/phr/baseDstu3/Observation?code=49727002&_count=50&_sort=-date", [])
        .then(locations => {
            return Promise.all(_.map(locations, id => {
                return fhir.search({ type: "Location", query: { _id: id } })
                            .then(data => { return data.data.entry[0].resource.position; });
            }));
        }).catch(err => 
            console.error(err)
        );
}