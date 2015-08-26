var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.static('public/js'));

app.listen(port, function() {
  console.log("Server running on port " + port);
});
