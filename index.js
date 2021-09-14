const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const API_URL = require('./URL_DEFINE');
const AuthMiddle = require('./Utils/Autho');
const USER_SV = require('./Services/UserServices');
const EXER_SV = require('./Services/ExerServices');

//Config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//User API
// app.post(API_URL.CREATE_USER, AuthMiddle.VerifyToken, USER_SV.CreateNewUser);

app.post(API_URL.LOGIN, USER_SV.Login);
app.post(API_URL.CREATE_USER, USER_SV.CreateNewUser);
app.post(API_URL.UPDATE_HEALTH, USER_SV.EditUserHealthyInfo);

//Exercises API
app.post(API_URL.GET_EXER, EXER_SV.GetExercise);

//For test
app.post(API_URL.TEST, EXER_SV.Test);
app.listen(8080, function() {
    console.log("Listen at 8080");
});