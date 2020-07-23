const express = require('express');
const router = express.Router();
const JobModel = require('./../models/postjob');

router.get('', (req, res) => {
    JobModel.findJob(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

router.post('/addJob', (req, res) => {
    JobModel.addJob(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

router.put('/updateJob', (req, res) => {
    JobModel.updateJob(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

router.delete('/deleteJob', (req, res) => {
    JobModel.deleteJob(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

module.exports = router;