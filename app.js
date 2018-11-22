const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/zApp');
let db = mongoose.connection;

db.once('open', function(){
  console.log('Connected to MongoDB');
});

db.on('error', function(){
  console.log(err);
});

const app = express();

let Article = require('./models/articles');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  Article.find({}, function(err, articles){
    if(err){
      console.log(err);
    } else {
      res.render('index', {
        title: 'Articles',
        articles: articles
      });
    }
  });
});

app.get('/articles/add', function (req, res) {
  res.render('add_articles', {
    title: 'Add Articles'
  });
});

app.listen(7000, function(){
  console.log('Servier started on port 7000');
});
