var express = require('express');
var bodyParser = require('body-parser');
var fhirjs = require('fhir.js');
var fhir = fhirjs({ baseUrl: 'https://oda.medidemo.fi/phr/baseDstu3' });
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('json spaces', 2);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  return res.render('pages/index');
});

//noinspection BadExpressionStatementJS
app.get('/api/heatmap', (req, res) => {
  var query = {
    '$and': [
      { 'code': {$exact: 49727002} },
      { 'meta.versionId': 1 }
    ]};
  //noinspection BadExpressionStatementJS
fhir.search({ type: "Observation", query: query })
      .then(data => {
        return res.json(data);
      });
});

app.post('/api/observation', (req, res) => {
    var coordinates = {};
    coordinates.longitude = "64.78444716";
    coordinates.latitude = "21.12686001";

    var locationEntry = {
        resource: createLocation(coordinates.latitude, coordinates.longitude)
    };

    fhir.create(locationEntry)
        .then(function(response){
            var coughEntry = {
                resource: generateCoughObservation(response.data.id, 3)
            };

            fhir.create(coughEntry)
                .then(function(response){
                    console.log("success, observation id " + response.data.id);
                    return res.json(req.body);
                })
                .catch(function(response){
                    console.log(JSON.stringify(response));
                    return res.json(req.body);
                });
        })
        .catch(function(response){
            console.log(JSON.stringify(response));
            return res.json(req.body);
        });

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

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});


