const ExcerDAO = require('./../DAO/ExcerDAO');
const Utils = require('./../Utils/ExceptionResponse');
const fs = require('fs');

module.exports = {
    GetExercise: GetExercise,
    CreateExercise: CreateExercise,
    GetRecomExercise: GetRecomExercise,
    Test: Test
};

function GetExercise(req, resp) {
    let excerID = -10;
    req = req.body;
    if (req.hasOwnProperty("id") && Number.parseInt(req.id) > 0) excerID = Number.parseInt(req.id);
    if (excerID == -10) {
        //Get all

        ExcerDAO.GetAllExcer()
            .then(res => {
                // var form = new FormData();
                // form.append('data', JSON.stringify(res.msg));
                // res.msg = res.msg.splice(10, 16);
                // for (let i of res.msg) {
                //     let path = i.excer_url.replace(/\\/g, '/');
                //     path = path.replace(path.charAt(0), '');
                //     path = '/..' + path;
                //     try {
                //         form.append(i.excerID, fs.createReadStream(__dirname + path));
                //     } catch (e) {
                //         form.append(i.excerID, '');
                //     }
                // }
                //
                // form.pipe(resp);
                let jResp = [];
                for (let i of res.msg) {
                    jResp.push({
                        "excerID": i.excerID,
                        "excer_name": Utils.Convert2String4Java(i.excer_name),
                        "bmi_from": i.bmi_from,
                        "bmi_to": i.bmi_to,
                        "description": Utils.Convert2String4Java(i.description)
                    })
                }
                Utils.SuccessResp(resp, jResp);
            })
            .catch(err => {
                Utils.ResponseDAOFail(resp, err);
            });
    } else {
        //get one
        ExcerDAO.GetOneUser(excerID)
            .then(res => {
                //============== SEND BINARY DATA RESPONSE ===============
                let path = res.msg[0].excer_url.replace(/\\/g, '/');
                path = path.replace(path.charAt(0), '');
                path = '/..' + path;

                let typeFile = path.substr(-3);

                let reader = fs.createReadStream(__dirname + path);

                reader.on('error', function (err) {
                    if (err) Utils.CustomMsg(resp, 201, "Can't find video!");
                });

                if (typeFile === "gif") {
                    resp.setHeader("content-type", "image/gif");
                } else if (typeFile === "mp4") {
                    resp.setHeader("content-type", "video/mp4");
                }
                reader.pipe(resp);

                //============== SEND FORM-DATA RESPONSE ===============
                // var form = new FormData();
                // form.append('data', JSON.stringify(res.msg[0]));
                // let path = res.msg[0].excer_url.replace(/\\/g, '/');
                // path = path.replace(path.charAt(0), '');
                // path = '/..' + path;
                // try {
                //     form.append(res.msg[0].excerID, fs.createReadStream(__dirname + path));
                // } catch (e) {
                //     console.log("URL invalid!");
                //     form.append(res.msg[0].excerID, '');
                // }
                // // resp.setHeader('x-Content-Type', 'multipart/form-data');
                // resp.setHeader('Content-Type', "application/x-www-form-urlencoded");
                // form.pipe(resp);
            })
            .catch(err => {
                Utils.ResponseDAOFail(resp, err);
            });
    }
}

function CreateExercise(req, resp) {
    //Doc: https://stackoverflow.com/questions/51954663/how-to-write-a-base64-video-to-file-in-nodejs

    //Check fields
    req = req.body;
    if (!req.hasOwnProperty("exerName")) Utils.ThrowMissingFields(resp, "exerName");
    if (!req.hasOwnProperty("exerDesc")) Utils.ThrowMissingFields(resp, "exerDesc");
    if (!req.hasOwnProperty("bmi_from")) Utils.ThrowMissingFields(resp, "bmi_from");
    if (!req.hasOwnProperty("bmi_to")) Utils.ThrowMissingFields(resp, "bmi_to");
    if (!req.hasOwnProperty("video")) Utils.ThrowMissingFields(resp, "video");

    //Convert Base64 to MP4 video
    let video = req.video.replace(/^data:(.*?);base64,/, ""); // <--- make it any type
    video = video.replace(/ /g, '+'); // <--- this is important
    let time = Date.now();
    let videoPath = '\\picture\\' + time + '.mp4';
    fs.writeFile(__dirname + '\\..' + videoPath, video, 'base64', function (err) {
        if (err) Utils.CustomMsg(resp, 201, "Cannot convert to file!");
        ExcerDAO.CreateNewExcer({
            "excer_name": req.exerName,
            "bmi_from": Number.parseFloat(req.bmi_from),
            "bmi_to": Number.parseFloat(req.bmi_to),
            "excer_url": "." + videoPath,
            "desc": req.exerDesc,
        })
            .then(res => {
                Utils.SuccessResp(resp, "Create exercise success!");
            })
            .catch(err => {
                Utils.ResponseDAOFail(resp, err);
            });
    });
}

function GetRecomExercise(req, resp) {
    req = req.body;
    if (!req.hasOwnProperty("grExer")) Utils.ThrowMissingFields(resp, "grExer");
    if (!req.hasOwnProperty("BMI")) Utils.ThrowMissingFields(resp, "BMI");
    console.log(req.grExer);
    if (Boolean(req.grExer)) {
        //Get list group recommend exercise
        ExcerDAO.GetRecommendGroupExercise(Number.parseFloat(req.BMI))
            .then(res => {
                console.log(res.msg);
                let jResp = [];
                for (let i of res.msg) {
                    jResp.push({
                        "id": i.gr_excerID,
                        "exer_name": Utils.Convert2String4Java(i.gr_name.toString()),
                        "bmi_from": i.bmi_from,
                        "bmi_to": i.bmi_to
                    });
                }
                Utils.SuccessResp(resp, jResp);
            })
            .catch(err => {
                Utils.ResponseDAOFail(resp, err);
            })
    } else {
        //Get list recommend exercise
        ExcerDAO.GetRecommendExercise(Number.parseFloat(req.BMI))
            .then(res => {
                let jResp = [];
                for (let j of res.msg) {
                    let temp = {
                        "id": j.excerID,
                        "exer_name": Utils.Convert2String4Java(j.excer_name),
                        "desc": Utils.Convert2String4Java(j.description),
                        "bmi_from": Number.parseFloat(j.bmi_from),
                        "bmi_to": Number.parseFloat(j.bmi_to)
                    }
                    // console.log(temp);
                    jResp.push(temp);
                }
                Utils.SuccessResp(resp, jResp);
            })
            .catch(err => {
                Utils.ResponseDAOFail(resp, err);
            })
    }
}

function Test(req, resp) {
    resp.set('content-type', "image/gif");
    let c = ".\\picture\\cap-do-de\\Bridge.gif";
    fs.createReadStream(__dirname + '/../picture/cap-do-de/BirdDog.gif').pipe(resp);
}