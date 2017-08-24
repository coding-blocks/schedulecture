/**
 * Created by tech4GT on 8/25/17.
 */
const Sequelize = require('sequelize');

const sequelize = new Sequelize('db', 'user', 'pass', {
    dialect: 'postgres',
    port: 5432,

    pool: {
        min: 0,
        max: 5,
        idle: 1000
    }
});
