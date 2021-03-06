const db_info       = require('./DB_INFO');
const Utils         = require('./../Utils/ExceptionResponse');
const mysql         = require('mysql');

const connection    = mysql.createConnection(db_info.db_config);

module.exports = {
    UpdateUserHealthInfo: UpdateUserHealthInfo,
    GetOneUser: GetOneUser,
    CreateNewUser: CreateNewUser,
    GetHealthInfo: GetHealthInfo,
    UpdatePassword: UpdatePassword,
    SetAvaDAO: SetAvaDAO,
    GetAvaDAO: GetAvaDAO
}

function SetAvaDAO(path, uid) {
    let sql = "UPDATE user SET ava_url = ? WHERE userID = ?";
    return new Promise(((resolve, reject) => {
        connection.query(sql, [path, uid], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}

function GetAvaDAO(uid) {
    let sql = "SELECT ava_url FROM user WHERE userID = ?";
    return new Promise(((resolve, reject) => {
        connection.query(sql, [uid], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}

function UpdatePassword(username, newpass) {
    let sql = "UPDATE user SET password = ? WHERE user.username = ?;";

    return new Promise(((resolve, reject) => {
        connection.query(sql, [newpass, username], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}

function GetOneUser(username) {
    let sql = "SELECT userID, username, password, roles, BMI, step_range, age, weight, tall FROM user WHERE username = ?";

    return new Promise(((resolve, reject) => {
        connection.query(sql, [username], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}

function GetHealthInfo(userID) {
    /*
    * userID: <int>
    * */
    let sql = "SELECT userID, BMI, step_range FROM user WHERE userID = ?";

    return new Promise(((resolve, reject) => {
        connection.query(sql, [userID], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}

function UpdateUserHealthInfo(info) {
    /**
     * info: {
     *          userID: <int>,
     *          tall: <float>,
     *          weight: <float>,
     *          age: <int>,
     *          BMI: <float>,
     *          ava_url: <String>,
     *          step_range; <float>
     * }
     */
    let sql = "UPDATE user SET tall = ?, weight = ?, age = ?, ava_url = ?, BMI = ?, step_range = ? WHERE userID = ?";
    return new Promise((resolve, reject) => {
        connection.query(sql, [
            info.tall,
            info.weight,
            info.age,
            info.ava_url,
            info.BMI,
            info.userID,
            info.step_range
        ], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    });
}

function CreateNewUser(username, password, roles) {
    /*
    * username: <String>,
    * password: <String>,
    * roles: 0/1
    * */
    let sql = "INSERT INTO user (username, password, roles) VALUES (?, ?, ?)";
    return new Promise((resolve, reject) => {
        connection.query(sql, [
            username, password, roles
        ], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    });
}