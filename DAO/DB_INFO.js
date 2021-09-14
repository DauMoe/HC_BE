/*
* SQL RESPONSE CODE:
*   200: query ok
*   201: query fail
* */

const LOCALHOST_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hue_hoai'
};

const QUERY_CODE = {
    "OK": 200,
    "QUERY_FAIL": 201
}

module.exports = {
    db_config: LOCALHOST_CONFIG,
    query_code: QUERY_CODE
}