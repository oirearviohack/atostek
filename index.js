var OdaPhr = require('./odaphr'); 
var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
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
  OdaPhr.findObservations().then(locations => {
    return res.json(locations);
  });
});


app.post('/api/observation', (req, res) => {
    OdaPhr.createObservation(req.body)
        .then(function(response){
            console.log("success, observation id " + response.data.id);
            return res.json(req.body);
        })
        .catch(function(response){
            console.error(JSON.stringify(response));
            return res.json(req.body);
        });
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});


