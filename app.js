const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')
const createError = require('http-errors');
const swaggerUi = require("swagger-ui-express");
const path = require('path');

const db = require('./db');
const settings = require('./config')
const routes = require('./routes/api')

const app = express();

db.sequelize.sync({force: false})
    .then(() => console.log('Successfully synced Models with DB'))
    .catch((err) => console.error('Sync Error: ', err));


app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


const swaggerUrl = `http://${settings.server.HOST}:${settings.server.PORT}/swagger.json`;
require("./modules/swaggerWriter");

const swaggerOptions = {
    swaggerUrl,
    customCss: ".swagger-ui .topbar { display: none }",
};
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(null, swaggerOptions));



app.use('/app',routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
      return res.status(err.status || 422).send({
          STATUS: false,
          MSG: err.message,
          RESULT: ''
      });
});


module.exports = app;
