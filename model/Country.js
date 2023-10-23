const {DataTypes} = require("sequelize");
const sequelize = require("../DB/configSqlz");
const Client = require("./Client");


const Country = sequelize.define('Country', {
    country_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    country_name:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    country_abbr:{
        type: DataTypes.STRING(6),
        allowNull: false,
    },
    country_code:{
        type: DataTypes.STRING(4),
        allowNull: true,
    },
    
},{
    tableName: "country",
    createdAt: false,
    updatedAt: false,
}
);

// it has error we need to fix.
Country.associate = () =>{
    Country.hasMany(Client, {foreignKey: 'country_id'});
}

module.exports = Country;