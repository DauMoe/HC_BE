const db_info       = require('./DB_INFO');
const Utils         = require('./../Utils/ExceptionResponse');
const mysql         = require('mysql');

const connection    = mysql.createConnection(db_info.db_config);

module.exports = {
    GetHistory: GetHistory,
    NewExerHistory: NewExerHistory,
    NewStepHistory: NewStepHistory,
    GetStepToday: GetStepToday,
    GetSteps: GetSteps,
    GetLastStepsRecord: GetLastStepsRecord
}

function GetHistory(userID, startimestamp, endtimestamp) {
    /*
    * userID: <int>,
    * startimestamp: <int>,
    * endtimestamp: <int>
    * */
    let sql = "SELECT calo, starttime, endtime FROM history WHERE userID = ? AND starttime >= ? AND endtime <= ?";

    return new Promise(((resolve, reject) => {
        connection.query(sql, [userID, new Date(startimestamp), new Date(endtimestamp)], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}

function NewExerHistory(info) {
    /*
    * info = {
    *       userID: <int>,
    *       gr_excerID: <int>,
    *       starttime: <long>,
    *       endtime: <long>,
    *       calo: <float>
    *       excerID: <int>
    * }
    * */

    let sql = "INSERT INTO history (userID, gr_excerID, excerID, starttime, endtime, calo) VALUES (?, ?, ?, ?, ?, ?)";

    return new Promise(((resolve, reject) => {
        connection.query(sql, [
            info.userID,
            info.gr_excerID,
            info.excerID,
            new Date(info.starttime),
            new Date(info.endtime),
            info.calo,
        ], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}

function NewStepHistory(info) {
    /*
    * info = {
    *       userID: <int>,
    *       starttime: <long>,
    *       endtime: <long>,
    *       calo: <float>,
    *       step: <int>,
    *       stepofday: <int>,
    *       distance: <float>,
    *       distanceofday: <float>
    * }
    * */

    let sql = "INSERT INTO history (userID, starttime, endtime, calo, step, stepofday, distance, distanceofday) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    return new Promise(((resolve, reject) => {
        connection.query(sql, [
            info.userID,
            new Date(info.starttime),
            new Date(info.endtime),
            info.calo,
            info.step,
            info.stepofday,
            info.distance,
            info.distanceofday,
        ], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}

function GetStepToday(userID, starttimestamp, nowtimestamp) {
    /*
    * userID: <int>
    * starttime: <int>
    * endtime: <int>
    * */
    let sql = "SELECT history.userID, history.distance, history.distanceofday, history.step, history.stepofday, history.calo, history.starttime, history.endtime, user.step_range FROM history, user WHERE history.userID = ? AND user.userID = ? AND history.starttime >= ? AND history.endtime <= ? ORDER BY history.endtime DESC LIMIT 1";
    return new Promise(((resolve, reject) => {
        connection.query(sql, [userID, userID, new Date(starttimestamp), new Date(nowtimestamp)], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}

function GetSteps(userID, starttimestamp, nowtimestamp) {
    /*
    * userID: <int>
    * starttime: <int>
    * endtime: <int>
    * */
    let sql = "SELECT userID, distance, distanceofday, step, stepofday, calo, starttime, endtime FROM history WHERE userID = ? AND starttime >= ? AND endtime <= ? ORDER BY distanceofday DESC";
    return new Promise(((resolve, reject) => {
        connection.query(sql, [userID, new Date(starttimestamp), new Date(nowtimestamp)], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}

function GetLastStepsRecord(userID) {
    /*
    * userID: <int>
    * */
    let starttime = new Date();
    starttime.setUTCHours(0,0,0,0);
    console.log(starttime);
    let sql = "SELECT userID, stepofday FROM history WHERE userID = ? AND endtime >= ? ORDER BY distanceofday DESC LIMIT 1";
    return new Promise(((resolve, reject) => {
        connection.query(sql, [userID, starttime], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}