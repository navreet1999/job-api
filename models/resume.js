const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    name: String,
    title: String,
    type: String,
    location: String,
    skills: String
})

const ResumeModel = mongoose.model("Resume", resumeSchema,"resume");

ResumeModel.findResume = function (req, callBack) {
    let id = req.query.id;
    let query = {};
    if (id) {
        query = { _id: id }
    }
    ResumeModel.find(query, callBack);
}

ResumeModel.addResume = function (req, callBack) {
    let resumes = req.body;
    ResumeModel.create(resumes, callBack);
}

ResumeModel.updateResume = function (req, callBack) {
    let query = { _id: req.body._id };
    let resumes = req.body;
    JobModel.updateOne(query, resumes, callBack);
}

ResumeModel.deleteResume = function (req, callBack) {
    let query = { _id: req.query.id };
    ResumeModel.deleteOne(query, callBack);
}

module.exports = ResumeModel;