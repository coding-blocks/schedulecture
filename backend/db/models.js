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

const courses = sequelize.define({
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name : Sequelize.STRING,
    desc : Sequelize.STRING
});
const batches = sequelize.define({
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name : Sequelize.STRING,
    startDate : Sequelize.DATE,
    endDate : Sequelize.DATE,
    size : Sequelize.INTEGER
});
const lectures = sequelize.define({
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name : Sequelize.STRING,
    date : Sequelize.DATE,
    startTime : Sequelize.TIME,
    endTime : Sequelize.TIME,
    topic : Sequelize.STRING
});
const rooms = sequelize.define({
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name : Sequelize.STRING,
    capacity : Sequelize.INTEGER
});
const centres = sequelize.define({
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name : Sequelize.STRING,
});
const user = sequelize.define({
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name : Sequelize.STRING,
    email : Sequelize.STRING
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


module.exports = {
   courses,
    batches,
    lectures,
    rooms,
    user,
    centres,
}

sequelize.sync()
