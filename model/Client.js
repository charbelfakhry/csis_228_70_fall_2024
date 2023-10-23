const { DataTypes } = require("sequelize");
const sequelize = require("../database/configSqlz");
const Country = require("./Country");


const Client = sequelize.define('Client', {
    client_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    country_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    client_first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    client_last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    client_username: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    client_email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    client_mobile: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    client_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    client_address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    client_gender: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    client_dob: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        //defaultValue: DataTypes.NOW,
    },
    role: {
        type: DataTypes.ENUM('user', 'admin', 'superuser'),
        allowNull: true,
    }

}, {
    tableName: "client",
    createdAt: false,
    updatedAt: false,
}
);

Client.associate = () => {
    Client.belongsTo(Country, {foreignKey: 'country_id'});
}

module.exports = Client;