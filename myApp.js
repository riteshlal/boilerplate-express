const bodyParser = require('body-parser');

require('dotenv').config();
let express = require('express');
let app = express();

console.log('Hello World');

const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
  };

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/now', 
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({time: req.time});
  }
);

app.get('/:word/echo', (req, res) => {
    res.json({ echo: req.params.word });
  });

app.post('/name', (req, res) => {
  const { first, last } = req.body;
  if (first && last) {
    res.json({ name: `${first} ${last}` });
  } else {
    res.status(400).json({ error: 'Please provide both first and last name' });
  }
});

  app.route('/name')
.get((req, res) => {
const { first, last } = req.query;
if (first && last) {
    res.json({ name: `${first} ${last}` });
} else {
    res.status(400).json({ error: 'Please provide both first and last name' });
}
});
  
app.use('/public', express.static(__dirname + '/public'));

app.use(loggerMiddleware);

console.log(process.env.MESSAGE_STYLE);

  app.get('/json', (req, res) => {
    let message = "Hello json";
    if (process.env.MESSAGE_STYLE === 'uppercase') {
      message = message.toUpperCase();
    }
    
    res.json({ "message": message });
  });


























 module.exports = app;
