require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
require('./dbConnection');
var app=express();
var {router:users2} = require('./routes/users');
const UsersModel = require('./models/users');
const session = require('express-session');
var jobs = require('./routes/postjob');
var resumes = require('./routes/resume');
const http =require('http');
const socketio=require('socket.io');
const cors=require('cors');
const{addUser,removeUser,getUser,getUsersInRoom}=require('./routes/users');
const router=require('./router');
const server=http.createServer(app);
const io=socketio(server);
var path = require('path'); 

app.use("/",express.static('public/build'));



//app.use("/",express.static('public'));
app.use(router);
/*var id=1;
var users = [
        {
        "id": id,
        "name": "Radhika",
        "gender": "Female",
        "email": "radhika@gmail.com",
        "password": "123"
        }
]
var posts = [
    {
        "name": "Amazon",
        "title": "Manager",
        "type": "Full Time",
        "location": "chicago",
        "skills": "java,python,web development"
    }
]
var data = [
    {
        "name": "Radhika",
        "age": "19",
        "gender": "Female",
        "email": "radhika@gmail.com",
        "nationality": "Indian",
        "equalification": "UnderGraduate",
        "pqualification": "Student",
        "experience": "2 years",
        "achievements": "none",
        "hobbies": "Listening music,dancing"
    }
]*/

var cookieValidator = (req, res, next) => {
    if (req.session.name) {
        UsersModel.findUsers(req, (err, res) => {
            if (err) res.status(401).send("User not authenticated");
            if (res && res.length == 0) {
                res.status(401).send("User not authenticated");
            }
            if (res && res.length > 0) {
                next();
            }
        })
    } else {
        res.status(401).send("User not authenticated");
    }
}

//  app.<METHODNAME>('path', handler() => {})

app.use(bodyParser.json());
app.use(session({
    key: "unite",
    secret: "unitesecret"
}))
//app.use("/", express.static('static'))
//app.use("/home", express.static('static'))



//sample middleware
app.use("*", (req, res, next) => {
    console.log("Middleware is called");
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Methods',"*");
    res.setHeader('Access-Control-Allow-Headers',"Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
})
app.use('/users', users2);
app.use('/postjob', jobs);
app.use('/resume', resumes);
app.use(cors());
app.use(router);

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '/public/index.html'))
  })

/*app.get("/",function(req, res) {
    console.log(req);
    res.send("Signup info");
})*/

/*app.get("/usersadd", (req, res)=> {
    res.send(users);
})
app.get("/postsadd", (req, res)=> {
    res.send(posts);
})
app.get("/resumeadd", (req, res)=> {
    res.send(data);
})
app.post("/signup", (req, res) =>{
    id =id+1;
    let user = req.body;
    user.id=id;
    console.log("Add User is called: ", user);
    users.push(user);
    res.send(user);
})
app.post("/postjob", (req, res) =>{
    let job = req.body;
    console.log("Add User is called: ", job);
    posts.push(job);
    res.send(job);
})
app.post("/resume", (req, res) =>{
    let details = req.body;
    console.log("Add User is called: ", details);
    data.push(details);
    res.send(details);
})*/
io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });
  
      if(error) return callback(error);
  
      socket.join(user.room);
  
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
      callback();
    });
  
    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);
  
      io.to(user.room).emit('message', { user: user.name, text: message });
  
      callback();
    });
  
    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
  
      if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
    })
  });
  

app.listen(7000, () => {
    console.log("Server is listening at port 7000");
    console.log(path.join(__dirname + '/public/index.html'));
})