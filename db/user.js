/* jshint indent: 2 */
'use strict'
module.exports = function (sequelize, DataTypes) {
	const user = sequelize.define(
		'user',
		{
			id: {
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
            firstName: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			lastName:{
				type:DataTypes.STRING,
				allowNull:true
			},
			email:{
				type:DataTypes.STRING,
				allowNull:true
			},
			age:{
				type:DataTypes.INTEGER,
				allowNull:true
			},
			created_by: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1 ,
			},
			updated_by: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1 ,
			},
		},
		{
			timestamps: true
		}
    )
    user.associate = function () {
    };
     
	return user
}
