const jwt = require('jsonwebtoken');
const fs = require('fs');
const Utils = require('./ExceptionResponse');
const { Convert2String4Java } = require('./ExceptionResponse');

/*
* NOTE (if you have any ques, please read this instruction first)
*   JWT: https://www.npmjs.com/package/jsonwebtoken
* */

const pubKey = fs.readFileSync(__dirname + "/rsa.public");
const priKey = fs.readFileSync(__dirname + "/rsa.private");
const TIMEOUT = 60 * 60; //1 hour

function GenToken(info) {
    /*
    * info: {
    *   username: <String>,
    *   isAdmin: <boolean>
    * }
    * */

    /*
    * resp: {
    *   pub: <String>,
    *   token: <String>,
    *   username: <String>
    * }
    * */
    let resp = {};
    let token = jwt.sign({
        isAdmin: info.isAdmin,
        exp: Math.floor(Date.now() / 1000) + TIMEOUT,
    }, priKey, {algorithm: 'RS256'});

    resp.username = Utils.Convert2String4Java(info.username);
    resp.token = Utils.Convert2String4Java(token);
    resp.pub = Utils.Convert2String4Java(pubKey.toString());
    return resp;
}

function VerifyToken(req, resp, next) {
    if (!req.body.hasOwnProperty("token")) {
        Utils.ThrowMissingFields(resp, "token");
        return;
    }
    //Middleware: if token is not exp, return true and return false if exp or any err
    jwt.verify(req.body.token, pubKey, { algorithms: ['RS256'] }, function (err, payload) {
        if (err) {
            console.log(err);
            Utils.CustomMsg(resp, 200, [Convert2String4Java("Token is invalid or expired")]);
            return;
        }
        next();
    });
}

module.exports = {
    GenToken: GenToken,
    VerifyToken: VerifyToken
}