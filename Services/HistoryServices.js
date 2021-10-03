const HistoryDAO    = require('./../DAO/HistoryDAO');
const UserDAO       = require('./../DAO/UserDAO');
const Utils         = require('./../Utils/ExceptionResponse');

module.exports = {
    GetHistory: GetHistory,
    GetStepsHistory: GetStepsHistory,
    NewHistory: NewHistory,
    NewStepHistory: NewStepHistory,
    GetLastStepsRecord: GetLastStepsRecord,
    GetStepChartData: GetStepChartData
};

/*
* CASCADE: (CASCADE <=> NO ACTION)
* Doc: https://quantrimang.com/khoa-ngoai-foreign-key-cascade-delete-trong-sql-server-148387
*   Example: ON UPDATE CASCADE => when row in parent table is updated so child value in another table will be updated
*            ON DELETE CASCADE | NO ACTION | SET NULL | SET DEFAULT
* */

function GetHistory(req, resp) {
    req = req.body;

    //Check fields
    if (!req.hasOwnProperty("userID")) Utils.ThrowMissingFields(resp, "userID");
    // if (!req.hasOwnProperty("starttime")) Utils.ThrowMissingFields(resp, "starttime");
    // if (!req.hasOwnProperty("endtime")) Utils.ThrowMissingFields(resp, "endtime");

    //Call services
    HistoryDAO.GetHistory(req.userID, req.starttime, req.endtime)
        .then(res => {
            for (let i of res.msg) {
                i.excer_name = Utils.Convert2String4Java(i.excer_name);
                i.gr_name = Utils.Convert2String4Java(i.gr_name);
                i.starttime = new Date(i.starttime).getTime();
                i.endtime = new Date(i.endtime).getTime();
                i.datestamp = new Date(i.datestamp).getTime();
            }
            Utils.SuccessResp(resp, res.msg);
        })
        .catch(err => {
            Utils.ResponseDAOFail(resp, [err]);
        });
}

async function GetStepsHistory(req, resp) {
    req = req.body;

    //Check fields
    if (!req.hasOwnProperty("userID")) Utils.ThrowMissingFields(resp, "userID");
    if (!req.hasOwnProperty("starttime")) Utils.ThrowMissingFields(resp, "starttime");
    if (!req.hasOwnProperty("endtime")) Utils.ThrowMissingFields(resp, "endtime");

    req.starttime = Number.parseInt(req.starttime);
    req.endtime = Number.parseInt(req.endtime);

    //Call API
    try {
        let TotalSteps = await HistoryDAO.GetSteps(Number.parseInt(req.userID), req.starttime, req.endtime);
        for (let i of TotalSteps.msg) {
            i.starttime = new Date(i.starttime).getTime();
            i.endtime = new Date(i.endtime).getTime();
        }
        Utils.SuccessResp(resp, TotalSteps.msg);
    } catch(err) {
        Utils.ResponseDAOFail(resp, [err]);
    }
}

async function NewHistory(req, resp) {
    req = req.body;

    //Check fields
    if (!req.hasOwnProperty("userID"))      Utils.ThrowMissingFields(resp, "userID");
    if (!req.hasOwnProperty("gr_excerID"))  Utils.ThrowMissingFields(resp, "gr_excerID");
    if (!req.hasOwnProperty("excerID"))     Utils.ThrowMissingFields(resp, "excerID");
    if (!req.hasOwnProperty("starttime"))   Utils.ThrowMissingFields(resp, "starttime");
    if (!req.hasOwnProperty("endtime"))     Utils.ThrowMissingFields(resp, "endtime");

    let result = await HistoryDAO.NewExerHistory(req.userID, req.gr_excerID, req.excerID, req.starttime, req.endtime);

    if (result.code == 200) {
        Utils.SuccessResp(resp, ["\"Create new history success!\""]);
    } else {
        Utils.ResponseDAOFail(resp, [Utils.Convert2String4Java(result.msg.message)]);
    }
}

async function NewStepHistory(req, resp) {
    req = req.body;

    //App doc: https://irace.vn/6-lam-tuong-thuong-gap-khi-chay-bo-giam-can/

    //Check fields
    if (!req.hasOwnProperty("userID")) Utils.ThrowMissingFields(resp, "userID");
    if (!req.hasOwnProperty("steps")) Utils.ThrowMissingFields(resp, "steps");
    if (!req.hasOwnProperty("starttime")) Utils.ThrowMissingFields(resp, "starttime");
    if (!req.hasOwnProperty("endtime")) Utils.ThrowMissingFields(resp, "endtime");
    if (!req.hasOwnProperty("calo")) Utils.ThrowMissingFields(resp, "calo");

    // req.starttime = Number.parseInt(req.starttime);
    // req.endtime = Number.parseInt(req.endtime);

    //Get current steps today
    let starttimestamp = new Date();
    starttimestamp.setUTCHours(0,0,0,0);
    let nowtime = new Date();
    try{
        let StepToday = await HistoryDAO.GetStepToday(Number.parseInt(req.userID), starttimestamp.getTime(), nowtime.getTime());
        let todayStepInfo = {
            userID: req.userID,
            calo: Number.parseInt(req.calo),
            starttime: req.starttime,
            endtime: req.endtime
        };
        if (StepToday.msg.length == 0) {
            //Init step event of new day
            try {
                let StepRange = await UserDAO.GetHealthInfo(req.userID);
                console.log(StepRange);
                todayStepInfo.step          = req.steps;
                todayStepInfo.stepofday     = req.steps;
                todayStepInfo.distance      = req.steps * StepRange.msg[0].step_range;
                todayStepInfo.distanceofday = req.steps * StepRange.msg[0].step_range;
            } catch (err) {
                Utils.ResponseDAOFail(resp, [Utils.Convert2String4Java(err)]);
            }
        } else {
            todayStepInfo.step              = req.steps;
            todayStepInfo.stepofday         = req.steps + StepToday.msg[0].stepofday;
            todayStepInfo.distance          = req.steps * StepToday.msg[0].step_range;
            todayStepInfo.distanceofday     = req.steps * StepToday.msg[0].step_range + StepToday.msg[0].distanceofday;
        }
        HistoryDAO.NewStepHistory(todayStepInfo)
            .then(res1 => {
                Utils.SuccessResp(resp, ["\"Update step history of today success\""]);
            })
            .catch(err1 => {
                Utils.ResponseDAOFail(resp, [Utils.Convert2String4Java(err1)]);
            });
    } catch (err) {
        Utils.ResponseDAOFail(resp, [Utils.Convert2String4Java(err)]);
    }
}

async function GetLastStepsRecord(req, resp) {
    req = req.body;

    //Check fields
    if (!req.hasOwnProperty("userID")) Utils.ThrowMissingFields(resp, "userID");

    //Call DAO
    try {
        let LastRecord = await HistoryDAO.GetLastStepsRecord(req.userID);
        Utils.SuccessResp(resp, LastRecord.msg);
    } catch(err) {
        Utils.ResponseDAOFail(resp, [err]);
    }
}

async function GetStepChartData(req, resp) {
    req = req.body;
    if (!req.hasOwnProperty("userID"))      Utils.ThrowMissingFields(resp, "userID");
    if (!req.hasOwnProperty("starttime"))   Utils.ThrowMissingFields(resp, "starttime");
    if (!req.hasOwnProperty("endtime"))     Utils.ThrowMissingFields(resp, "endtime");
    try {
        let BigestStepEachDay = await HistoryDAO.GetLargestStepsEachDay(req.userID, req.starttime, req.endtime);
        // console.log(BigestStepEachDay);
        if(BigestStepEachDay.msg.length == 0 || BigestStepEachDay.msg[0].starttime == null) {
            Utils.SuccessResp(resp, []);
        } else {
            for (let i of BigestStepEachDay.msg) {
                i.endtimestamp = Utils.Convert2String4Java(i.endtimestamp);
                i.starttime = Utils.Convert2String4Java(i.starttime);
                i.endtime = Utils.Convert2String4Java(i.endtime);
            }
            Utils.SuccessResp(resp, BigestStepEachDay.msg);
        }
    } catch(e) {
        console.log(e.message);
    }


}
