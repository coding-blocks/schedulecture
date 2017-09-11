/**
 * Created by tech4GT on 8/25/17.
 */
const Sequelize = require('sequelize');
const dbconfig = require('../dbconfig.json')

const sequelize = new Sequelize(dbconfig.db, dbconfig.user, dbconfig.password, {
  dialect: dbconfig.dialect,
  port: dbconfig.port,

  pool: {
    min: 0,
    max: 5,
    idle: 1000
  }
});
const courses = sequelize.define('course',{
    id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name : Sequelize.DataTypes.STRING,
    desc : Sequelize.DataTypes.STRING,
    lect : Sequelize.DataTypes.INTEGER,
    hours : Sequelize.DataTypes.INTEGER
});
const batches = sequelize.define('batch',{
    id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name : Sequelize.DataTypes.STRING,
    startDate : Sequelize.DataTypes.DATE,
    endDate : Sequelize.DataTypes.DATE,
    size : Sequelize.DataTypes.INTEGER
});
const lectures = sequelize.define('lecture',{
    id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name : Sequelize.DataTypes.STRING,
    date : Sequelize.DataTypes.DATE,
    startTime : Sequelize.DataTypes.DATE,
    endTime : Sequelize.DataTypes.DATE,
    topic : Sequelize.DataTypes.STRING
});
const rooms = sequelize.define('room',{
    id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name : Sequelize.DataTypes.STRING,
    capacity : Sequelize.DataTypes.INTEGER
});
const centres = sequelize.define('centre',{
    id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name : Sequelize.DataTypes.STRING,
});
const users = sequelize.define('user',{
    id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name : Sequelize.DataTypes.STRING,
    email : Sequelize.DataTypes.STRING
});

batches.belongsTo(courses)
courses.hasMany(batches)

lectures.belongsTo(batches)
batches.hasMany(lectures)

batches.belongsTo(centres)
centres.hasMany(batches)

rooms.belongsTo(centres)
centres.hasMany(rooms)

lectures.belongsTo(rooms)
rooms.hasMany(lectures)
sequelize.sync()

module.exports = {

   courses,
    batches,
    lectures,
    rooms,
    users,
    centres,
}
