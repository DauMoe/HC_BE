const jwt = require('jsonwebtoken');
const fs = require('fs');
const ExResp = require('./ExceptionResponse');

/*
* NOTE (if you have any ques, please read this instruction first)
*   JWT: https://www.npmjs.com/package/jsonwebtoken
* */

const pubKey = fs.readFileSync(__dirname + "/rsa.pub");
const priKey = fs.readFileSync(__dirname + "/rsa.pri");
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
    *   code: <int>,
    *   token: <String>,
    *   username: <String>
    * }
    * */
    let resp = {};
    let token = jwt.sign({
        isAdmin: info.isAdmin,
        exp: Math.floor(Date.now() / 1000) + TIMEOUT,
    }, priKey, {algorithm: 'RS256'});

    resp.username = info.username;
    resp.token = token;

    return resp;
}

function VerifyToken(req, resp, next) {
    if (!req.hasOwnProperty("token")) ExResp.ThrowMissingFields(resp, "token");
    //Middleware: if token is not exp, return true and return false if exp or any err
    jwt.verify(req.token, pubKey, { algorithms: ['RS256'] }, function (err, payload) {
        if (err) ExResp.CustomMsg(resp, 200, "Token is invalid or expired");
        next();
    });
}

module.exports = {
    GenToken: GenToken,
    VerifyToken: VerifyToken
}