const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.send('hello world');
});

app.listen(7000, function(){
  console.log('Servier started on port 7000');
});
