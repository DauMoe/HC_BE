const UserDAO = require('./../DAO/UserDAO');
const Utils = require('./../Utils/ExceptionResponse');
const JWT_Utils = require('./../Utils/Autho');
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

//Handling request

function Login(req, resp) {
    /*
    * username: <String>,
    * password: <String>
    * */

    //Check fields
    req = req.body;
    console.log(req);
    if (!req.hasOwnProperty("username")) Utils.ThrowMissingFields(resp, "username");
    if (!req.hasOwnProperty("password")) Utils.ThrowMissingFields(resp, "password");

    //Handle
    UserDAO.GetOneUser(req.username)
        .then(res => {
            if (res.msg.length == 0) {
                Utils.CustomMsg(resp, 201, ["User is not existed"]);
                return;
            };

            //Compare hash password
            bcrypt.compare(req.password, res.msg[0].password, (err, result) => {
                if (err) {
                    console.log("User login fail (Conpare pass err)");
                    Utils.CustomMsg(resp, 201, ["Err when compare pass"]);
                    // throw Error(err);
                }
                if (result) {
                    let jResp = JWT_Utils.GenToken({
                        "username": res.msg[0].username,
                        "isAdmin": res.msg[0].roles
                    });
                    jResp.BMI = res.msg[0].BMI;
                    console.log("User login ok");
                    Utils.SuccessResp(resp, [jResp]);
                } else {
                    console.log("User login fail (Wrong pass)");
                    Utils.CustomMsg(resp, 201, ["Wrong password!"]);
                }
            });
        })
        .catch(err => {
            console.log("User login fail (DAO err)");
            console.log(err);
            Utils.ResponseDAOFail(resp, [err]);
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
    if (!req.hasOwnProperty("username")) Utils.ThrowMissingFields(resp, "username");
    if (!req.hasOwnProperty("password")) Utils.ThrowMissingFields(resp, "password");
    if (!req.hasOwnProperty("roles")) Utils.ThrowMissingFields(resp, "roles");

    //Handler
    bcrypt.hash(req.password, SALT_ROUNDS).then(hash => {
        UserDAO.CreateNewUser(req.username, hash, req.roles)
            .then(res => {
                console.log(res);
                if (res.code == 200) {
                    Utils.SuccessResp(resp, ["Create user success"]);
                } else {
                    Utils.CustomMsg(resp, 201, [res.msg]);
                }
            })
            .catch(err => {
                Utils.ResponseDAOFail(resp, [err]);
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
    if (!req.hasOwnProperty("userID")) Utils.ThrowMissingFields(resp, "userID");
    if (!req.hasOwnProperty("tall")) Utils.ThrowMissingFields(resp, "password");
    if (!req.hasOwnProperty("weight")) Utils.ThrowMissingFields(resp, "weight");
    if (!req.hasOwnProperty("age")) Utils.ThrowMissingFields(resp, "age");
    if (!req.hasOwnProperty("stepsOneMeter")) Utils.ThrowMissingFields(resp, "stepsOneMeter");
    let BMI = Number.parseFloat(req.weight) / (2 * Number.parseFloat(req.tall));
    UserDAO.UpdateUserHealthInfo({
        "userID": req.userID,
        "tall": Number.parseFloat(req.tall),
        "weight": Number.parseFloat(req.weight),
        "age": Number.parseInt(req.age),
        "BMI": BMI,
        "step_range": Number.parseFloat(1000/Number.parseInt(req.stepsOneMeter)),
        "ava_url": ""
    })
        .then(res => {
            Utils.SuccessResp(resp, ["Update user's info success"]);
        })
        .catch(err => {
            Utils.ResponseDAOFail(resp, [err]);
        })
}