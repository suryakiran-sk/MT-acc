
const express = require('express')

const router = express.Router()

const UserController = require('./controller')
const uploadCsv = require('../../middlewares/uploadCsv');

/**
 * @swagger
 *  /app/user/createUser:
 *      post:
 *          tags:
 *              -  User
 *          description: Creates a user
 *          parameters:
 *              -   in: body
 *                  name : request body
 *                  description: All fields are required.
 *                  type: object
 *                  schema:
 *                      properties:
 *                          firstName:
 *                              type: string
 *                              description: first name of the user
 *                              required: true
 *                              example: Surya
 *                          lastName:
 *                              type: string
 *                              description: last name of the user
 *                              required: true
 *                              example: s
 *                          email:
 *                              type: string
 *                              description: email of the user
 *                              required: true
 *                              example: "suryas@mailinator"
 *                          age:
 *                              type: integer
 *                              description: age of the user
 *                              required: true
 *                              example: 15
 * 
 *
 *          responses:
 *              200 :
 *                  description: User created successfully
 *
 *
 */

router.post('/createUser', UserController.createUser)

/**
 * @swagger
 *  /app/user/send-newsletter:
 *      post:
 *          tags:
 *              -  Newsletter
 *          description: to send news letter with csv upload
 *          parameters:
 *             - in: formData
 *               name : file
 *               type: file
 *               required: true
 *
 *
 *          responses:
 *              200 :
 *                  description: Note updated successfully
 *
 *
 */
router.post('/send-newsletter', uploadCsv, UserController.sendNewsletter);

module.exports = router;
