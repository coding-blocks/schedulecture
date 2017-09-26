/**
 * Created by tech4GT on 8/25/17.
 */
const Sequelize = require('sequelize');

var dbconfig;
try {
  dbconfig = require('./../dbconfig.json');
} catch (e) {
  console.error('Create your own db file lazybones');
  dbconfig = require('../dbconfig-sample.json');
}

const DATABASE_URL = process.env.DATABASE_URL || ('postgres://' + dbconfig.USER + ":" + dbconfig.PASSWORD + "@" + dbconfig.HOST + ":5432/" + dbconfig.DB);


const sequelize = new Sequelize(DATABASE_URL, {
  host: dbconfig.HOST,
  dialect: dbconfig.DIALECT,
  pool: {
    min: 0,
    max: 5,
    idle: 1000
  }
});

const Courses = sequelize.define('course',{
    id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name : Sequelize.DataTypes.STRING,
    desc : Sequelize.DataTypes.STRING,
    lect : Sequelize.DataTypes.INTEGER,
    hours : Sequelize.DataTypes.INTEGER
});
const Batches = sequelize.define('batch',{
    id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name : Sequelize.DataTypes.STRING,
    startDate : Sequelize.DataTypes.DATE,
    endDate : Sequelize.DataTypes.DATE,
    size : Sequelize.DataTypes.INTEGER,
    status : Sequelize.DataTypes.STRING
});
const Lectures = sequelize.define('lecture', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING,
  date: Sequelize.DataTypes.DATE,
  startTime: Sequelize.DataTypes.DATE,
  endTime: Sequelize.DataTypes.DATE,
  topic: Sequelize.DataTypes.STRING
});
const Rooms = sequelize.define('room',{
    id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name : Sequelize.DataTypes.STRING,
    capacity : Sequelize.DataTypes.INTEGER,
    config : Sequelize.DataTypes.STRING
});

const Centres = sequelize.define('centre',{
    id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name : Sequelize.DataTypes.STRING,
    head : Sequelize.DataTypes.STRING,
    phone : {type: Sequelize.DataTypes.STRING(12), isNumeric: true}
});
const Users = sequelize.define('user', {
  id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: Sequelize.DataTypes.STRING,
  email: Sequelize.DataTypes.STRING
});
const Teachers = sequelize.define('teacher',{
    id : {type : Sequelize.DataTypes.INTEGER, primaryKey : true, autoIncrement : true},
    name : Sequelize.DataTypes.STRING,
    email : Sequelize.DataTypes.STRING,
    contact : {type : Sequelize.DataTypes.STRING(12), isNumeric : true}
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

Batches.belongsTo(Teachers);
Teachers.hasMany(Batches);

Lectures.belongsTo(Teachers);
Teachers.hasMany(Lectures);

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
    Teachers
};
