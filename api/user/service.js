const { sendMail } = require('../../modules/email')
const db = require('../../db')
exports.sendNewsLetter = async data => {
    try {

        let userData = data.split(',')

        let userDBdata = await db.user.findOne({
            where:{ 
                email: userData[0]
            }
        });
        let emailContent = `${userData[2]}`

        if(userDBdata)
            emailContent = `Hello ${userDBdata.dataValues.firstName}  ${userDBdata.dataValues.lastName} <br> ${emailContent}`
       
        let emailSend = await sendMail({
            subject: userData[1],
            data: emailContent
        },
            userData [0] //email
        )

        // save log
        if(emailSend.messageId){
            await db.sentLogs.create({
               email:  userDBdata.dataValues.email,
               newsletter: userData[1],
            })
        }

    } catch (err) {
        console.log(err)
        return err
    }
}

