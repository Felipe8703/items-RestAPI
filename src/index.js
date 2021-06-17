// Libarys

const express = require("express");
const app = express();
const { env } = require("./lib/utils");


// Config

app.use(express.json());

// Routes

app.use(require("./routes"));

// Listen

app.listen(3000 || process.env.PORT, () => {
  
  console.log("Server Listening");
  
});