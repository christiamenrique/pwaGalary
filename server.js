require('dotenv').config();
var express = require("express");
var mongoose = require("mongoose");
let uri = ""


var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Serve up static assets (heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  uri = process.env.ATLAS_URI  // connection string for Atlas here  
} else {
  // uri = process.env.LOCAL_URI  // connection string for localhost mongo here 
  uri = process.env.ATLAS_URI 
}

// connection to database
mongoose.connect(uri, {
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true})
 
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB connection is live");
})

app.listen(PORT, function() {
  console.log(`Now listening on port: ${PORT}`);
});
