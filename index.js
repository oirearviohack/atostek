var express = require('express');
var bodyParser = require('body-parser');
var fhir = require('fhir.js')({ baseUrl: 'https://oda.medidemo.fi/phr/baseDstu3' });
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
  return res.json([
    
  ]);
});

app.post('/api/observation', (req, res) => {
  return res.json(req.body);
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});


