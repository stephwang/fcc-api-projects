var express = require('express');
var app = express();
var path = require('path');
var moment = require('moment');

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/:time', function(req, res){
    var time = req.params.time;
    var result = {
      unix: null
      , natural: null
    }
    
    // convert to date object
    var date = new Date(time);
    
    // try timestamp in milliseconds if the above doesn't work
    if (isNaN(date)){
      date = new Date(time * 1000);
    }
    
    if(moment(date).isValid()){
      result.unix = moment(date).unix();
      result.natural = moment(date).format('MMMM D, YYYY');
    }
    
    res.send(result);
});

app.listen(process.env.PORT || 8080);