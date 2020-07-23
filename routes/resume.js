const express = require('express');
const router = express.Router();
const ResumeModel = require('./../models/resume');

router.get('', (req, res) => {
    ResumeModel.findResume(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

router.post('/addResume', (req, res) => {
    ResumeModel.addResume(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

router.put('/updateResume', (req, res) => {
    ResumeModel.updateResume(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

router.delete('/deleteResume', (req, res) => {
    ResumeModel.deleteResume(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

module.exports = router;