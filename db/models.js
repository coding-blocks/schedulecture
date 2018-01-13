/**
 * Created by tech4GT on 8/25/17.
 */
const Sequelize = require('sequelize');
const config = require('../config')
const dbconfig = config.db;


const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
  host: dbconfig.HOST,
  dialect: dbconfig.DIALECT,
  port: dbconfig.PORT,
  pool: {
    min: 0,
    max: 5,
    idle: 10000
  }
});

const Courses = sequelize.define('course', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING,
  desc: Sequelize.DataTypes.STRING,
  lect: Sequelize.DataTypes.INTEGER,
  hours: Sequelize.DataTypes.INTEGER
});
const Batches = sequelize.define('batch', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING,
  startDate: Sequelize.DataTypes.DATE,
  endDate: Sequelize.DataTypes.DATE,
  size: Sequelize.DataTypes.INTEGER,
  status: Sequelize.DataTypes.STRING,
  noOfLectures: Sequelize.DataTypes.INTEGER,
  lectureShortCode: Sequelize.DataTypes.STRING,
  hoursPerLecture: Sequelize.DataTypes.INTEGER,
  defaultTime: Sequelize.DataTypes.STRING
});
const Lectures = sequelize.define('lecture', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING,
  date: Sequelize.DataTypes.DATE,
  startTime: Sequelize.DataTypes.DATE,
  endTime: Sequelize.DataTypes.DATE,
});
const Rooms = sequelize.define('room', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING,
  capacity: Sequelize.DataTypes.INTEGER,
  config: Sequelize.DataTypes.STRING
});

const Centres = sequelize.define('centre', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING,
  head: Sequelize.DataTypes.STRING,
  phone: {type: Sequelize.DataTypes.STRING(12), isNumeric: true}
});
const Users = sequelize.define('user', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING,
  email: Sequelize.DataTypes.STRING
});
const Teachers = sequelize.define('teacher', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING,
  email: Sequelize.DataTypes.STRING,
  contact: {type: Sequelize.DataTypes.STRING(12), isNumeric: true}
});
const AuthToken = sequelize.define('authtoken', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  accesstoken: {type: Sequelize.STRING, unique: true},
  clientoken: {type: Sequelize.STRING, unique: true}
});

AuthToken.belongsTo(Users);
Users.hasOne(AuthToken);

Batches.belongsTo(Courses);
Courses.hasMany(Batches);

Lectures.belongsTo(Batches);
Batches.hasMany(Lectures);

Batches.belongsTo(Centres);
Centres.hasMany(Batches);

Batches.belongsTo(Rooms);
Rooms.hasMany(Batches);

Rooms.belongsTo(Centres);
Centres.hasMany(Rooms);

Lectures.belongsTo(Rooms);
Rooms.hasMany(Lectures);

Batches.belongsTo(Teachers);
Teachers.hasMany(Batches);

Lectures.belongsTo(Teachers);
Teachers.hasMany(Lectures);

module.exports = {
  Courses,
  Batches,
  Lectures,
  Rooms,
  Users,
  Centres,
  Teachers,
  AuthToken,
  DATABASE: sequelize
};
