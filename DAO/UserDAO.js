const db_info       = require('./DB_INFO');
const Utils         = require('./../Utils/ExceptionResponse');
const mysql         = require('mysql');

const connection    = mysql.createConnection(db_info.db_config);

module.exports = {
    UpdateUserHealthInfo: UpdateUserHealthInfo,
    GetOneUser: GetOneUser,
    CreateNewUser: CreateNewUser,
    GetHealthInfo: GetHealthInfo
}

function GetOneUser(username) {
    // let sql = "SELECT *" +
    //     ", CASE " +
    //     "WHEN userID IS NULL THEN 'Not existed' " +
    //     "ELSE 'Existed' " +
    //     "END AS user_existed " +
    //     "FROM user WHERE username = ? LIMIT 1";
    // let sql = "SELECT * FROM user WHERE EXISTS (SELECT userID FROM user WHERE username = ?) AND username = ?"
    let sql = "SELECT userID, username, password, roles, BMI FROM user WHERE username = ?";

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