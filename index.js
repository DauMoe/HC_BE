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
const PORT = 8080;


//SSL
const privateKey    = fs.readFileSync("./credential/cert.key", 'utf-8');
const publicKey     = fs.readFileSync("./credential/cert.pem", 'utf-8');
const credential    = {key: privateKey, cert: publicKey, passphrase: 'daumoe'};
const httpsServer   = https.createServer(credential, app);

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

app.post(API_URL.LOGIN, USER_SV.Login);
app.post(API_URL.CREATE_USER, USER_SV.CreateNewUser);
app.post(API_URL.UPDATE_HEALTH, USER_SV.EditUserHealthyInfo);
app.post(API_URL.CHANGE_PASS, USER_SV.ChangePassword);
app.post(API_URL.GET_INFO, USER_SV.GetUserInfo);

//Exercises API
app.post(API_URL.GET_EXER, EXER_SV.GetExercise);
app.post(API_URL.CREATE_EXER, EXER_SV.CreateExercise);
app.post(API_URL.GET_RECOM_EXER, EXER_SV.GetRecomExercise);
app.post(API_URL.GET_GROUP_EXER, EXER_SV.GetGroupExercise);
app.post(API_URL.GET_DETAIL_EXER, EXER_SV.GetDetailExercise);
app.post(API_URL.RATING, EXER_SV.Rating);
app.post(API_URL.GET_EXER_OF_GROUP, EXER_SV.GetExByGrID)

//History API
app.post(API_URL.NEW_HISTORY, HISTORY_SV.NewHistory);
app.post(API_URL.NEW_STEPS, HISTORY_SV.NewStepHistory);
app.post(API_URL.GET_STEPS, HISTORY_SV.GetStepsHistory);
app.post(API_URL.GET_RECORD, HISTORY_SV.GetLastStepsRecord);
app.post(API_URL.GET_HISTORY, HISTORY_SV.GetHistory);

//Chart data
app.post(API_URL.GET_STEP_CHART_DATA, HISTORY_SV.GetStepChartData);

//For test
app.post(API_URL.TEST, EXER_SV.Test);
// app.listen(8080, function() {
//     console.log("Listen at http://<your device's IP>:8080");
// });

httpsServer.listen(PORT, function() {
   console.log('Server is running at: "https://<your device\'s IP>:' + PORT + '"');
});
