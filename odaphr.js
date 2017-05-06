var fhirjs = require('fhir.js');
var fhir = fhirjs({ baseUrl: 'https://oda.medidemo.fi/phr/baseDstu3' });
var _ = require('lodash');
var rp = require('request-promise-native');
var cache = require('memory-cache');

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
        if(next && next.url)
        {
            return getAll(next.url, newData);
        }
        else 
        {
            return newData;
        }
    });
}

exports.startPolling = function()
{
    var prev = new Date('2017-05-05T22:06:18.818Z');

    var update = () => {
        var url = "https://oda.medidemo.fi/phr/baseDstu3/Observation?code=49727002&date=>" + prev.toISOString() + "&_count=50&_sort=-date";
        
        return getAll(url, [])
            .then(locations => {
                prev = new Date();
                return Promise.all(_.map(locations, id => {
                    return fhir.search({ type: "Location", query: { _id: id } })
                                .then(data => { 
                        var pos = data.data.entry[0].resource.position;
                        cache.put(id, pos)
                    });
                })).then(() => {
                    console.log("Avaimia cachessa", cache.keys().length, "kpl");
                });
            }).catch(err => 
                console.error(err)
            );
    };
    
    update().then(() => {
        setInterval(update, 20000);
    });

}

exports.findObservations = function() {
    return new Promise((resolve) => resolve(_.map(cache.keys(), cache.get)));
}