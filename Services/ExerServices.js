const ExcerDAO = require('./../DAO/ExcerDAO');
const ExResp = require('./../Utils/ExceptionResponse');
const fs = require('fs');

/*
* NOTE:
*   FormData: https://www.npmjs.com/package/form-data
* */



module.exports = {
    GetExercise: GetExercise,
    CreateExercise: CreateExercise,
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
                        "excer_name": i.excer_name,
                        "bmi_from": i.bmi_from,
                        "bmi_to": i.bmi_to,
                        "description": i.description
                    })
                }
                ExResp.SuccessResp(resp, jResp);
            })
            .catch(err => {
                ExResp.ResponseDAOFail(resp, err);
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

                if (typeFile === "gif") {
                    resp.setHeader("content-type", "image/gif");
                } else if (typeFile === "mp4") {
                    resp.setHeader("content-type", "video/mp4");
                }

                fs.createReadStream(__dirname + path).pipe(resp);

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
                ExResp.ResponseDAOFail(resp, err);
            });
    }
}

function CreateExercise(req, resp) {
    //Doc: https://stackoverflow.com/questions/51954663/how-to-write-a-base64-video-to-file-in-nodejs

    //Check fields
    req = req.body;
    if (!req.hasOwnProperty("exerName")) ExResp.ThrowMissingFields(resp, "exerName");
    if (!req.hasOwnProperty("exerDesc")) ExResp.ThrowMissingFields(resp, "exerDesc");
    if (!req.hasOwnProperty("bmi_from")) ExResp.ThrowMissingFields(resp, "bmi_from");
    if (!req.hasOwnProperty("bmi_to")) ExResp.ThrowMissingFields(resp, "bmi_to");
    if (!req.hasOwnProperty("video")) ExResp.ThrowMissingFields(resp, "video");

    //Convert Base64 to MP4 video
    let video = req.video.replace(/^data:(.*?);base64,/, ""); // <--- make it any type
    video = video.replace(/ /g, '+'); // <--- this is important
    let time = Date.now();
    let videoPath = '\\picture\\' + time + '.mp4';
    fs.writeFile(__dirname + '\\..' + videoPath, video, 'base64', function (err) {
        if (err) ExResp.CustomMsg(resp, 201, "Cannot write file to storage!");
        ExcerDAO.CreateNewExcer({
            "excer_name": req.exerName,
            "bmi_from": Number.parseFloat(req.bmi_from),
            "bmi_to": Number.parseFloat(req.bmi_to),
            "excer_url": "." + videoPath,
            "desc": req.exerDesc,
        })
            .then(res => {
                ExResp.SuccessResp(resp, "Create exercise success!");
            })
            .catch(err => {
                ExResp.ResponseDAOFail(resp, err);
            });
    });
}

function Test(req, resp) {
    resp.set('content-type', "image/gif");
    let c = ".\\picture\\cap-do-de\\Bridge.gif";
    fs.createReadStream(__dirname + '/../picture/cap-do-de/BirdDog.gif').pipe(resp);
}