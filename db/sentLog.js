/* jshint indent: 2 */
'use strict'
module.exports = function (sequelize, DataTypes) {
	const sentLog = sequelize.define(
		'sentLogs',
		{
			id: {
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
            email: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			newsLetter:{
				type:DataTypes.STRING,
				allowNull:true
            }
        },
		{
			timestamps: true
		}
    )
    sentLog.associate = function () {
    };
     
	return sentLog
}
