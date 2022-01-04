const multiparty = require('multiparty');
const express = require('express');
const https = require("https");
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const API_URL = require('./URL_DEFINE');
const AuthMiddle = require('./Utils/Autho');
const USER_SV = require('./Services/UserServices');
const EXER_SV = require('./Services/ExerServices');
const HISTORY_SV = require('./Services/HistoryServices');
const JWT_Utils = require('./Utils/Autho');
const path = require("path");
const PORT = 8080;



const privateKey    = fs.readFileSync("./credential/cert.key", 'utf-8');
const publicKey     = fs.readFileSync("./credential/cert.pem", 'utf-8');
const credential    = {key: privateKey, cert: publicKey, passphrase: 'daumoe'};
const httpsServer   = https.createServer(credential, app);

//Public asset
app.use(express.static(path.join(__dirname,'public')));

//Config
app.use(cors()); //Pass CORS

//Setup BodyParser (MAX SIZE: 100MB)
app.use(bodyParser.urlencoded({
    extended: true,
    "limit": '100mb'
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    "limit": "100mb"
}));
app.use(bodyParser.raw());

//User API
// app.post(API_URL.CREATE_USER, AuthMiddle.VerifyToken, USER_SV.CreateNewUser);

app.get("/test", function (req, resp) {
    resp.send("<h1>Hi there</h1>");
});

// app.get("/*", function (req, resp) {
//
// });

app.post(API_URL.LOGIN, USER_SV.Login);
app.post(API_URL.CREATE_USER, JWT_Utils.VerifyToken, USER_SV.CreateNewUser);
app.post(API_URL.UPDATE_HEALTH, JWT_Utils.VerifyToken, USER_SV.EditUserHealthyInfo);
app.post(API_URL.CHANGE_PASS, JWT_Utils.VerifyToken, USER_SV.ChangePassword);
app.post(API_URL.GET_INFO, JWT_Utils.VerifyToken, USER_SV.GetUserInfo);
app.post(API_URL.GET_AVA, JWT_Utils.VerifyToken, USER_SV.GetAva);
app.post(API_URL.SET_AVA, JWT_Utils.VerifyToken, USER_SV.SetAva);

//Exercises API
app.post(API_URL.GET_EXER, JWT_Utils.VerifyToken, EXER_SV.GetExercise);
app.post(API_URL.CREATE_EXER, JWT_Utils.VerifyToken, EXER_SV.CreateExercise);
app.post(API_URL.GET_RECOM_EXER, JWT_Utils.VerifyToken, EXER_SV.GetRecomExercise);
app.post(API_URL.GET_GROUP_EXER, JWT_Utils.VerifyToken, EXER_SV.GetGroupExercise);
app.post(API_URL.GET_DETAIL_EXER, JWT_Utils.VerifyToken, EXER_SV.GetDetailExercise);
app.post(API_URL.RATING, JWT_Utils.VerifyToken, EXER_SV.Rating);
app.post(API_URL.GET_EXER_OF_GROUP, JWT_Utils.VerifyToken, EXER_SV.GetExByGrID)

//History API
app.post(API_URL.NEW_HISTORY, JWT_Utils.VerifyToken, HISTORY_SV.NewHistory);
app.post(API_URL.NEW_STEPS, JWT_Utils.VerifyToken, HISTORY_SV.NewStepHistory);
app.post(API_URL.GET_STEPS, JWT_Utils.VerifyToken, HISTORY_SV.GetStepsHistory);
app.post(API_URL.GET_RECORD, JWT_Utils.VerifyToken, HISTORY_SV.GetLastStepsRecord);
app.post(API_URL.GET_HISTORY, JWT_Utils.VerifyToken, HISTORY_SV.GetHistory);

//Chart data
app.post(API_URL.GET_STEP_CHART_DATA, JWT_Utils.VerifyToken, HISTORY_SV.GetStepChartData);

//For test
app.post(API_URL.TEST, EXER_SV.Test);
// app.listen(8080, function() {
//     console.log("Listen at http://<your device's IP>:8080");
// });

httpsServer.listen(PORT, function() {
   console.log('Server is running at: "https://<your device\'s IP>:' + PORT + '"');
});
