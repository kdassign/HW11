var express = require("express");
var path = require("path");
const fs = require("fs");


var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,)));

require('./routes/routes')(app);


app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});