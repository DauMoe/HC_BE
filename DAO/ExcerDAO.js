const db_info = require('./DB_INFO');
const Utils = require('./../Utils/ExceptionResponse');
const mysql = require('mysql');

const connection = mysql.createConnection(db_info.db_config);

module.exports = {
    GetAllExcer: GetAllExcer,
    GetOnExercise: GetOnExercise,
    EditExcer: EditExcer,
    DeleteExcer: DeleteExcer,
    CreateNewExcer: CreateNewExcer,
    GetRecommendGroupExercise: GetRecommendGroupExercise,
    GetRecommendExercise: GetRecommendExercise,
    GetGroupExercise: GetGroupExercise
}

function GetAllExcer() {
    let sql = "SELECT * FROM excercise";
    return new Promise(((resolve, reject) => {
        connection.query(sql, (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}

function GetOnExercise(excerID) {
    /*
    * excerID: <int>
    * */
    let sql = "SELECT * FROM excercise WHERE excerID = ? LIMIT 1";
    return new Promise(((resolve, reject) => {
        connection.query(sql, [excerID], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}

function EditExcer(info) {
    /*
    * info: {
    *   excerID : <int>,
    *   excer_name: <String>,
    *   bmi_from: <float>,
    *   bmi_to: <float>,
    *   excer_url: <String>,
    *   desc: <String>
    * }
    * */

    let sql = "UPDATE excercise SET excer_name = ?, bmi_from = ?, bmi_to = ?, excer_url = ?, description = ? WHERE excerID = ?";
    return new Promise(((resolve, reject) => {
        connection.query(sql, [
            info.excer_name,
            info.bmi_from,
            info.bmi_to,
            info.excer_url,
            info.desc,
            info.excerID,
        ], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}

function DeleteExcer(excerID) {
    /*
    * excerID: <int>
    * */
    let sql = "DELETE FROM excercise WHERE excerID = ?";
    return new Promise(((resolve, reject) => {
        connection.query(sql, [excerID], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}

function CreateNewExcer(info) {
    /*
    * info: {
    *   excer_name: <String>,
    *   bmi_from: <float>,
    *   bmi_to: <float>,
    *   excer_url: <String>,
    *   description: <String>
    * }
    * */
    let sql = "INSERT INTO excercise (excer_name, bmi_from, bmi_to, excer_url, description) VALUES (?, ?, ?, ?, ?)";
    return new Promise(((resolve, reject) => {
        connection.query(sql, [
            info.excer_name,
            info.bmi_from,
            info.bmi_to,
            info.excer_url,
            info.desc,
        ], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}

function GetRecommendGroupExercise(bmi) {
    /*
    * bmi: <float>
    * */
    let sql = "SELECT * FROM gr_excercise WHERE bmi_from <= ? AND bmi_to >= ?";
    return new Promise(((resolve, reject) => {
        connection.query(sql, [bmi, bmi], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}

function GetGroupExercise() {
    let sql = "SELECT * FROM gr_excercise";
    return new Promise(((resolve, reject) => {
        connection.query(sql,  (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}

function GetRecommendExercise(bmi) {
    /*
    * bmi: <float>
    * */
    let sql = "SELECT * FROM excercise WHERE bmi_from <= ? AND bmi_to >= ?";
    return new Promise(((resolve, reject) => {
        connection.query(sql, [bmi, bmi], (err, res) => Utils.HandQuery(err, res, resolve, reject));
    }));
}