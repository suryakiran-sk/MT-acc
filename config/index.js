require('dotenv-flow').config();

module.exports = {
	server: {
        HOST: process.env.HOST,
        PORT: process.env.PORT,
	},
	database: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT
    },
    mailer: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        user: process.env.MAIL_USERNAME,
        password: process.env.MAIL_PASSWORD
    }
}