const path = require('path');
const express = require('express');
const app = express();

const morgan = require('morgan');
app.use(morgan('dev'))

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '../public/')))

// app.use('/api', require('./api')) // include our routes!

app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("knock knock")
  console.log("who's there")
  console.log(`Your server listening on port ${port}`)
})

module.exports = app