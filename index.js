const mongodb = require("mongodb");
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");


const app = express();
app.set('view engine', 'ejs');



app.get("/CompApp", function(req,res){
  res.render("CompApp", {name:})
});