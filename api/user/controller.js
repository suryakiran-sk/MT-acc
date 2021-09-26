const db = require('../../db/index')
const { failedResponse, goodResponse } = require('../../helper/response')
const fs = require("fs");
const csvParser = require('fast-csv');
const userService = require('./service')

exports.createUser = async (req, res, next) => {
    const { firstName, lastName, email, age } = req.body
    try {

        if (!firstName) {
            return res.json(failedResponse({}, "First name is required"));
        }
        if (!lastName) {
            return res.json(failedResponse({}, "Last name is required"));
        }
        if (!email) {
            return res.json(failedResponse({}, "Email address is required"));
        }
        if (!age) {
            return res.json(failedResponse({}, "Age is required"));
        }

        let emailCheck = await db.user.findOne({
            where: { email: email },
        });
        
        if (emailCheck) {
            return res.json(failedResponse({}, 'Email aready exist'));
        }

        let userData = await db.user.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            age: age
        })

        return res.json(goodResponse({ userData }, ' User created successfully '));

    } catch (err) {
        console.log(err)
        return res.json(failedResponse({}, 'Something went wrong'));
    }
}


exports.sendNewsletter = async (req, res, next) => {
    try {
        if (req.files && Object.keys(req.files).length) {

            var csvData = [];
            var row = 0
            fs.createReadStream(req.files.file[0].path)
            .pipe(csvParser.parse({ delimiter: ':' }))
            
            .on('data', function (csvrow) {
                if(row !=0 ){
                    csvData.push(csvrow);
                    
                    userService.sendNewsLetter(...csvrow)
                }
                row += 1
            })
         
            .on('end', function () {
            });

            return res.json(goodResponse({}, 'Sendint news letter to the users'));

        } else {
            return res.json(failedResponse({}, 'Error in file upload'));
        }
    } catch (err) {
        console.log(err)
        return res.json(failedResponse({}, 'Something went wrong'));
    }
}


