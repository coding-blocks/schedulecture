/**
 * Created by tech4GT on 8/25/17.
 */
const Sequelize = require('sequelize');
const dbconfig = require('./../dbconfig.json')

const sequelize = new Sequelize(dbconfig.db, dbconfig.user, dbconfig.password, {
  dialect: dbconfig.dialect,
  port: dbconfig.port,

  pool: {
    min: 0,
    max: 5,
    idle: 1000
  }
});
const Courses = sequelize.define('course', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING,
  desc: Sequelize.DataTypes.STRING
});
const Batches = sequelize.define('batch', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING,
  startDate: Sequelize.DataTypes.DATE,
  endDate: Sequelize.DataTypes.DATE,
  size: Sequelize.DataTypes.INTEGER
});
const Lectures = sequelize.define('lecture', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING,
  date: Sequelize.DataTypes.DATE,
  startTime: Sequelize.DataTypes.DATE,
  endTime: Sequelize.DataTypes.DATE,
  topic: Sequelize.DataTypes.STRING
});
const Rooms = sequelize.define('room', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING,
  capacity: Sequelize.DataTypes.INTEGER
});
const Centres = sequelize.define('centre', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING,
});
const Users = sequelize.define('user', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING,
  email: Sequelize.DataTypes.STRING
});

Batches.belongsTo(Courses);
Courses.hasMany(Batches);

Lectures.belongsTo(Batches);
Batches.hasMany(Lectures);

Batches.belongsTo(Centres);
Centres.hasMany(Batches);

Rooms.belongsTo(Centres);
Centres.hasMany(Rooms);

Lectures.belongsTo(Rooms);
Rooms.hasMany(Lectures);

sequelize.sync({force: false}).then(function () {
  console.log("Database Configured");
});

module.exports = {

  Courses,
  Batches,
  Lectures,
  Rooms,
  Users,
  Centres,
}
