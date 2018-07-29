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
module.exports = sequelize.define('delivery_notes', {
    id_delivery: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    createAt: Sequelize.STRING(20),
    editor: Sequelize.STRING(20),
    total_price: Sequelize.FLOAT,
}, {
        timestamps: false
    });
