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

app.get('/api/heatmap', (req, res) => {
  var query = {
    '$and': [
      { 'code': {$exact: 49727002} },
      { 'meta.versionId': 1 }
    ]};
  fhir.search({ type: "Observation", query: query })
      .then(data => {
        return res.json(data);
      });
});

app.post('/api/observation', (req, res) => {
  return res.json(req.body);
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});


