const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

var db = mongoose.connection;
db.on('error', function () {
    console.log("Error connecting to db")
})

db.once('open', function () {
    console.log("Connected to db")
})