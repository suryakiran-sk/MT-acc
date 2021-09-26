var swaggerJSDoc = require('swagger-jsdoc');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const settings = require('../config');


let schema = []
if(process.env.NODE_ENV == 'local')
    schema = ['http']
else
    schema = ['https']

// swagger definition
var swaggerDefinition = {
    info: {
        title: 'MT : API Documentation',
        version: '1',
        description: '',

    },
    host: `${settings.server.HOST}:${settings.server.PORT}`,
    basePath: '/',
    schemes: [...schema],
    securityDefinitions: {
        Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    }

};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: [
        './api/user/index.js'
    ],
};
// initialize swagger-jsdoc
const swaggerJson = swaggerJSDoc(options);
fs.writeFileAsync('./public/swagger.json', JSON.stringify(swaggerJson, null, 2))
    .then(function (rs) { })
    .catch(function (err) {
        console.log(err);
    });
module.exports = swaggerJson;