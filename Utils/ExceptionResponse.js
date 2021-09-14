const db_info = require('./../DAO/DB_INFO');

function ThrowMissingFields(resp, FieldName) {
    resp.status(200);
    resp.json({
        "code": 403,
        "msg": `Missing arg '${FieldName}'`
    });
    return;
}

function ResponseDAOFail(resp, data) {
    resp.status(200);
    resp.json(data);
    return;
}

function CustomMsg(resp, code, msg) {
    /*
    * code: <int>,
    * msg: <any>
    * */
    resp.status(200);
    resp.json({
        "code": code,
        "msg": msg
    });
    return;
}

function SuccessResp(resp, msg) {
    CustomMsg(resp, 200, msg);
}

function HandQuery(err, res, resolve, reject) {
    if (err) {
        reject({
            "code": db_info.query_code.QUERY_FAIL,
            "msg": err.message
        });
        // throw Error(err);
    } else {
        resolve({
            "code": db_info.query_code.OK,
            "msg": res
        })
    }
}

module.exports = {
    ThrowMissingFields: ThrowMissingFields,
    ResponseDAOFail: ResponseDAOFail,
    CustomMsg: CustomMsg,
    SuccessResp: SuccessResp,
    HandQuery: HandQuery
}