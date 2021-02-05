var express = require("express");
var shortid = require("shortid");
var testRepo = require("../repos/testRepos");
var dataCheckinRepo = require("../repos/dataCheckin");
var upload = require('express-fileupload');
var router = express.Router();
router.use(upload());
var fs = require('fs');
var _ = require("lodash");

router.post('/uploaded', async function (req, res) {
    if(req.files){
        var dir = './public/js/labels/'+req.body.name;

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        
        for(i=1; i<11; i++){
            let file = req.files.file[i-1];
            let fileName = i;
            file.mv('./public/js/labels/'+req.body.name+'/'+ fileName+".jpg", function(err){
                if(err){
                    res.send(err);
                }
            })
        }
        res.send("done");
    }
})

router.post("/train", async (req, res) => {
    
    //res.send("abc");
    const _contact = req.body;
    testRepo
        .add(_contact)
        .then(() => {
            res.send("done");
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.send("Error");
        });
});

router.post("/checkin", async (req, res) => {
    
    const _contact = req.body;
    console.log(_contact);
    //res.send("done");
    // _contact.employeeId = 1;
    // _contact.employeeName = req.body.name;
    // _contact.descriptions = req.body.descriptions;
    dataCheckinRepo
        .add(_contact)
        .then(() => {
            res.send("done");
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.send("Error");
        });
});

router.get("/test", (req, res) => {
    testRepo
        .getAll()
        .then(rows => {
            res.statusCode = 200;
            // res.json(rows);
            res.send(
                _.sortBy(JSON.parse(JSON.stringify(rows)), [
                    function (o) {
                        return o.employee_name;
                    }
                ]).reverse()
            );
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end("View error log on console");
        });
});
router.get("/query-data-checkin", (req, res) => {
    dataCheckinRepo
        .getAll()
        .then(rows => {
            res.statusCode = 200;
            // res.json(rows);
            res.send(
                _.sortBy(JSON.parse(JSON.stringify(rows)), [
                    function (o) {
                        return o.employee_name;
                    }
                ]).reverse()
            );
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end("View error log on console");
        });
});

module.exports = router;
