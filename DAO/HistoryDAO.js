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
    GetLastStepsRecord: GetLastStepsRecord,
    GetLargestStepsEachDay: GetLargestStepsEachDay
}

function GetHistory(userID, startimestamp = null, endtimestamp = null) {
    /*
    * userID: <int>,
    * startimestamp: <int>,
    * endtimestamp: <int>
    * */
    let sql = "";
    if (startimestamp != null && endtimestamp != null) {
        sql = "SELECT h1.userID, h1.excerID, h1.gr_excerID, h1.starttime, h1.endtime, CAST(h1.endtime AS Date) AS datestamp, h2.excer_name, h3.gr_name FROM history h1, excercise h2, gr_excercise h3 WHERE h1.gr_excerID IS NOT NULL AND h1.excerID IS NOT NULL AND h1.gr_excerID = h3.gr_excerID AND h1.excerID = h2.excerID AND h1.endtime <= ? AND h1.starttime >= ? AND h1.userID = ?";
        return new Promise(((resolve, reject) => {
            connection.query(sql, [new Date(endtimestamp),new Date(startimestamp), userID], (err, res) => Utils.HandQuery(err, res, resolve, reject));
        }));
    } else {
        sql = "SELECT h1.userID, h1.excerID, h1.gr_excerID, h1.starttime, h1.endtime, CAST(h1.endtime AS Date) AS datestamp, h2.excer_name, h3.gr_name FROM history h1, excercise h2, gr_excercise h3 WHERE h1.gr_excerID IS NOT NULL AND h1.excerID IS NOT NULL AND h1.gr_excerID = h3.gr_excerID AND h1.excerID = h2.excerID AND h1.userID = ?";
        return new Promise(((resolve, reject) => {
            connection.query(sql, [userID], (err, res) => Utils.HandQuery(err, res, resolve, reject));
        }));
    }
}

function NewExerHistory(userID, gr_excerID, excerID, starttime, endtime) {
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

    let sql = "INSERT INTO history (userID, gr_excerID, excerID, starttime, endtime) VALUES (?, ?, ?, ?, ?)";

    return new Promise(((resolve, reject) => {
        connection.query(sql, [
            userID,
            gr_excerID,
            excerID,
            new Date(starttime),
            new Date(endtime)
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

    let d = new Date();
    let today = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    let starttimestamp = today + " 00:00:00";
    let endTimestamp = today + " 23:59:59";
    let sql = "SELECT userID, stepofday FROM history WHERE userID = ? AND starttime >= ? AND starttime <= ? AND endtime >= ? AND endtime <=? ORDER BY distanceofday DESC LIMIT 1";
    return new Promise(((resolve, reject) => {
        connection.query(sql, [userID, starttimestamp, endTimestamp, starttimestamp, endTimestamp], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}

function GetLargestStepsEachDay(userID, starttimestamp, endtimestamp) {
    /*
    * userID: <int>
    * starttimestamp <Long>
    * endtimestamp <Long>
    * */

    let sql = "SELECT DATE_FORMAT(h1.endtime, '%d/%m/%y') AS endtimestamp, MAX(h1.stepofday) AS total_step, DATE_FORMAT(h1.starttime, '%d/%m') AS starttime, DATE_FORMAT(h1.endtime, '%d/%m') AS endtime FROM history h1 WHERE userID = ? AND starttime >= ? AND endtime <= ? GROUP BY endtimestamp";
    return new Promise(((resolve, reject) => {
        connection.query(sql, [userID, new Date(starttimestamp), new Date(endtimestamp)], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}
