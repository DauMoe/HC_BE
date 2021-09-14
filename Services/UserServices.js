const UserDAO = require('./../DAO/UserDAO');
const ExResp = require('./../Utils/ExceptionResponse');
const Utils = require('./../Utils/Autho');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
/*
* NOTE:
*   bcrypt: https://www.npmjs.com/package/bcrypt
* */

module.exports = {
    Login: Login,
    CreateNewUser: CreateNewUser,
    EditUserHealthyInfo: EditUserHealthyInfo
}

//Utils


//Handling request

function Login(req, resp) {
    /*
    * username: <String>,
    * password: <String>
    * */

    //Check fields
    req = req.body;
    if (!req.hasOwnProperty("username")) ExResp.ThrowMissingFields(resp, "username");
    if (!req.hasOwnProperty("password")) ExResp.ThrowMissingFields(resp, "password");

    //Handle
    UserDAO.GetOneUser(req.username)
        .then(res => {
            if (res.msg.length == 0) ExResp.CustomMsg(resp, 201, "User is not existed");

            //Compare hash password
            bcrypt.compare(req.password, res.msg[0].password, (err, result) => {
                if (err) {
                    ExResp.CustomMsg(resp, 201, "Err when compare pass");
                    throw Error(err);
                }
                if (result) {
                    let jResp = Utils.GenToken({
                        "username": res.msg[0].username,
                        "isAdmin": res.msg[0].roles
                    });
                    ExResp.SuccessResp(resp, jResp);
                } else {
                    ExResp.CustomMsg(resp, 201, "Wrong password!");
                }
            });
        })
        .catch(err => {
            ExResp.ResponseDAOFail(resp, err);
        });
}

function CreateNewUser(req, resp) {
    /**
     * username: <String>,
     * password: <String>,
     * roles: 0/1
     */
    //Check fields
    req = req.body;
    if (!req.hasOwnProperty("username")) ExResp.ThrowMissingFields(resp, "username");
    if (!req.hasOwnProperty("password")) ExResp.ThrowMissingFields(resp, "password");
    if (!req.hasOwnProperty("roles")) ExResp.ThrowMissingFields(resp, "roles");

    //Handler
    bcrypt.hash(req.password, SALT_ROUNDS).then(hash => {
        UserDAO.CreateNewUser(req.username, hash, req.roles)
            .then(res => {
                console.log(res);
                if (res.code == 200) {
                    ExResp.SuccessResp(resp, "Create user success");
                } else {
                    ExResp.CustomMsg(resp, 201, res.msg);
                }
            })
            .catch(err => {
                ExResp.ResponseDAOFail(resp, err);
            });
    });
}

function EditUserHealthyInfo(req, resp) {
    /*
    * userID: <int>,
    * tall: <float>,
    * weight: <float>,
    * age: <int>,
    * BMI: <float>,
    * */
    //Check fields
    req = req.body;
    if (!req.hasOwnProperty("userID")) ExResp.ThrowMissingFields(resp, "userID");
    if (!req.hasOwnProperty("tall")) ExResp.ThrowMissingFields(resp, "password");
    if (!req.hasOwnProperty("weight")) ExResp.ThrowMissingFields(resp, "weight");
    if (!req.hasOwnProperty("age")) ExResp.ThrowMissingFields(resp, "age");
    let BMI = Number.parseFloat(req.weight) / (2 * Number.parseFloat(req.tall));
    UserDAO.UpdateUserHealthInfo({
        "userID": req.userID,
        "tall": Number.parseFloat(req.tall),
        "weight": Number.parseFloat(req.weight),
        "age": Number.parseInt(req.age),
        "BMI": BMI,
        "ava_url": ""
    })
        .then(res => {
            ExResp.SuccessResp(resp, "Update user's info success");
        })
        .catch(err => {
            ExResp.ResponseDAOFail(resp, err);
        })
}