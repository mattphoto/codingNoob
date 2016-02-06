require('dotenv').config();

var express = require('express'),
    mongoose = require('mongoose'), 
    bodyParser = require('body-parser');

var user = 'mattkim';
var pass = 'stupid';
var mongolab = '@ds027908.mongolab.com:27908/codingnoob'

var db = mongoose.connect('mongodb://'+user+':'+pass+ mongolab);

var Resource = require('./models/resourceModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

resourceRouter = require('./Routes/resourceRoutes')(Resource);

app.use(express.static('./public'));

app.use('/api', resourceRouter);

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/main.html')
});

app.listen(port, function () {
  console.log('gulp running on PORT: ' + port);
});
