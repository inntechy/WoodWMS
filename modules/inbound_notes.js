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

module.exports = sequelize.define('inbound_notes', {
    ID_time: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    createAt: Sequelize.STRING(20),
    container_id: Sequelize.STRING(20),
    brand: Sequelize.STRING(20),
    name: Sequelize.STRING(20),
    level: Sequelize.STRING(10),
    quanlity: Sequelize.INTEGER,
    volume_sum: Sequelize.FLOAT,
    goods_mark: Sequelize.STRING(10),
}, {
        timestamps: false
    });
