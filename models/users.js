const mongoose=require('mongoose');


//schema for collections
const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    gender: String,
    email: String,
    password: {
        type: String,
        required: true
    },
    isEnabled: Boolean
})

const UsersModel = mongoose.model("Users",usersSchema, "users");

UsersModel.findUsers = function (req, callBack) {

    UsersModel.find({ name: req.session.name }, callBack);
}

UsersModel.findUserForLogin = function (req, callBack) {
    let user = { name: req.body.name, password: req.body.password };
    UsersModel.find(user, callBack);
}

UsersModel.addUser = function (req, callBack) {
    let user = req.body;
    UsersModel.create(user, callBack);
}

UsersModel.updateUsers = function (req, callBack) {
    let query = { _id: req.body._id };
    let user = req.body;
    UsersModel.updateOne(query, user, callBack);
}

module.exports = UsersModel;