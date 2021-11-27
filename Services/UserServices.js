const UserDAO = require('./../DAO/UserDAO');
const Utils = require('./../Utils/ExceptionResponse');
const JWT_Utils = require('./../Utils/Autho');
const bcrypt = require('bcrypt');
const multiparty = require("multiparty");
const {ThrowMissingFields, SuccessResp} = require("../Utils/ExceptionResponse");
const SALT_ROUNDS = 10;
const fs = require("fs");
const {SetAvaDAO} = require("../DAO/UserDAO");
/*
* NOTE:
*   bcrypt: https://www.npmjs.com/package/bcrypt
* */

module.exports = {
    Login: Login,
    CreateNewUser: CreateNewUser,
    EditUserHealthyInfo: EditUserHealthyInfo,
    ChangePassword: ChangePassword,
    GetUserInfo: GetUserInfo,
    GetAva: GetAva,
    SetAva: SetAva
}

//Handling request

function GetAva(req, resp) {
    req = req.body;
}

function SetAva(req, resp) {
    let form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        if (!fields.hasOwnProperty("user_id")) {
            ThrowMissingFields(resp, "user_id");
            return;
        }
        if (!files.hasOwnProperty("avatar_file")) {
            ThrowMissingFields(resp, "avatar_file");
            return;
        }
        let path = files.avatar_file[0].path;
        let uid = fields.user_id[0];
        let newPath = "/../picture/avatar/" + files.avatar_file[0].originalFilename;
        fs.copyFile(path, __dirname + newPath, function (err) {
            fs.unlinkSync(path);
            if (err) {
                console.log(err);
                Utils.ResponseDAOFail(resp, err);
                return;
            }
            SetAvaDAO(newPath, Number.parseInt(uid))
                .then(result => {
                    SuccessResp(resp, ["ok"]);
                })
                .catch(err => {
                    Utils.ResponseDAOFail(resp, err);
                });
        });
    });
}

function GetUserInfo(req, resp) {
    req = req.body;
    if (!req.hasOwnProperty("username")) Utils.ThrowMissingFields(resp, "username");

    UserDAO.GetOneUser(req.username)
        .then(result => {
            let jResp = [];

            jResp.push({
                "step_range": result.msg[0].step_range,
                "height": result.msg[0].tall,
                "weight": result.msg[0].weight,
                "bmi": result.msg[0].BMI,
                "age": result.msg[0].age
            });
            Utils.SuccessResp(resp, jResp);
        })
        .catch(err => {
            console.log(err);
            Utils.ResponseDAOFail(resp, err);
        });
}

async function ChangePassword(req, resp) {
    /*
    * username: <String>,
    * password: <String>
    * newpass:  <String>
    * */

    //Check fields
    req = req.body;
    if (!req.hasOwnProperty("username")) Utils.ThrowMissingFields(resp, "username");
    if (!req.hasOwnProperty("password")) Utils.ThrowMissingFields(resp, "password");
    if (!req.hasOwnProperty("newpass"))  Utils.ThrowMissingFields(resp, "newpass");

    console.log(req);

    let res = await UserDAO.GetOneUser(req.username);
    if (res.msg.length == 0) {
        Utils.CustomMsg(resp, 201, [Utils.Convert2String4Java("User is not existed")]);
        return;
    };
    bcrypt.compare(req.password, res.msg[0].password, (err, result) => {
        if (err) {
            console.log("User login fail (Compare pass err)");
            Utils.CustomMsg(resp, 201, [Utils.Convert2String4Java("Err when compare pass")]);
            // throw Error(err);
        }
        if (result) {
            bcrypt.hash(req.newpass, SALT_ROUNDS).then(hash => {
                UserDAO.UpdatePassword(req.username, hash)
                    .then(res1 => {
                        Utils.SuccessResp(resp, [Utils.Convert2String4Java("Update password successful!")]);
                    })
                    .catch(err => {
                        console.log(err);
                        Utils.CustomMsg(resp, 201, [Utils.Convert2String4Java(err)]);
                    });
            });

        } else {
            console.log("Wrong password in update pass");
            Utils.CustomMsg(resp, 201, [Utils.Convert2String4Java("Wrong password!")]);
        }
    });
}

function Login(req, resp) {
    /*
    * username: <String>,
    * password: <String>
    * */

    //Check fields
    req = req.body;
    let LoginWithFinger = false;
    console.log(req);
    if (!req.hasOwnProperty("username")) Utils.ThrowMissingFields(resp, "username");
    if (req.hasOwnProperty("LoginWithFinger")) LoginWithFinger = req.LoginWithFinger;
    if (!req.hasOwnProperty("password") && !LoginWithFinger) Utils.ThrowMissingFields(resp, "password");

    let password = req.password || "";

    //Handle
    UserDAO.GetOneUser(req.username)
        .then(res => {
            if (res.msg.length == 0) {
                Utils.CustomMsg(resp, 201, [Utils.Convert2String4Java("User is not existed")]);
                return;
            };
            //Compare hash password
            bcrypt.compare(password, res.msg[0].password, (err, result) => {
                if (err) {
                    console.log("User login fail (Compare pass err)");
                    Utils.CustomMsg(resp, 201, [Utils.Convert2String4Java("Err when compare pass")]);
                    // throw Error(err);
                }
                if (LoginWithFinger || result) {
                    let jResp = JWT_Utils.GenToken({
                        "username": res.msg[0].username,
                        "isAdmin": res.msg[0].roles
                    });
                    jResp.BMI = res.msg[0].BMI;
                    jResp.userID = res.msg[0].userID;
                    jResp.step_range = res.msg[0].step_range;
                    console.log("User login ok");
                    Utils.SuccessResp(resp, [jResp]);
                } else {
                    console.log("User login fail (Wrong pass)");
                    Utils.CustomMsg(resp, 201, [Utils.Convert2String4Java("Wrong password!")]);
                }
            });
        })
        .catch(err => {
            console.log("User login fail (DAO err)");
            console.log(err);
            Utils.ResponseDAOFail(resp, [Utils.Convert2String4Java(err)]);
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
    console.log(req.password);
    //Handler
    bcrypt.hash(req.password, SALT_ROUNDS).then(hash => {
        UserDAO.CreateNewUser(req.username, hash, req.roles)
            .then(res => {
                console.log(res);
                if (res.code == 200) {
                    Utils.SuccessResp(resp, [Utils.Convert2String4Java("Create user success")]);
                } else {
                    Utils.CustomMsg(resp, 201, [Utils.Convert2String4Java(res.msg)]);
                }
            })
            .catch(err => {
                console.log(err);
                Utils.ResponseDAOFail(resp, {
                    "code": err.code,
                    "msg": [err.msg]
                });
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
            Utils.SuccessResp(resp, [Utils.Convert2String4Java("Update user's info success")]);
        })
        .catch(err => {
            Utils.ResponseDAOFail(resp, {
                "code": err.code,
                "msg": [err.msg]
            });
        });
}