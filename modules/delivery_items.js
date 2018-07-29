const Sequelize = require('sequelize');

const config = require('../SQLconfig');
var now = Date.now();

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5, 
        min: 0, 
        idle: 30000
    }
});
//TO-DO modify ID_time, createAt
module.exports = sequelize.define('delivery_items', {
    ID: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    createAt: Sequelize.STRING(20),
    id_delivery: Sequelize.BIGINT,
    thickness: Sequelize.INTEGER,
    width: Sequelize.INTEGER,
    length: Sequelize.FLOAT,
    pcs: Sequelize.INTEGER,
    volume: Sequelize.FLOAT,
    remarks: Sequelize.STRING(50),
    unitprice: Sequelize.FLOAT,
    amount: Sequelize.FLOAT
}, {
        timestamps: false
    });