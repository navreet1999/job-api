const express = require('express');
const router = express.Router();
const UsersModel = require('./../models/users');


const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);




router.get('', (req, res) => {
    UsersModel.findUsers(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

router.post('/add', (req, res) => {
        UsersModel.find({ name: req.body.name }).then(data=>{
    
            console.log(data);
            if(data.length==0)
            {
                UsersModel.addUser(req, (error, response) => {
                    if (error) {
                        console.log("Error is: ", error);
                        res.send(error);
                    }
                    if (response) {
                        req.session.name = response.name
                        console.log("Success response is: ", JSON.stringify(response));
                        res.json({msg:'User added successfully'});
                    }
                });
            }
            else {
                console.log("else");
                res.json({msg:'User already exists'});;
            }

        });
    // UsersModel.addUser(req, (error, response) => {
    //     if (error) {
    //         console.log("Error is: ", error);
    //         res.send(error);
    //     }
    //     if (response) {
    //         req.session.name = response.name
    //         console.log("Success response is: ", JSON.stringify(response));
    //         res.json({msg:'User added successfully'});
    //     }
    // });
    
});

router.post('/login', (req, res) => {
    console.log(req.body);
    UsersModel.findUserForLogin(req, (error, response) => {
        if (error) {
            console.log("Error is: ", error);
            res.send(error);
        }
        console.log(response);
        if (response.length!=0) {
            console.log("mai a gya");
            if (response.length > 1) {
                req.session.name = response.name
                console.log("Success response is: ", JSON.stringify(response));
                res.send('User authenticated successfully');
            } else {
                res.json({msg:'User already exists'});;
                res.status(401).send('User not authenticated');
               
            }
        }
    });
})

router.put('/update', (req, res) => {
    UsersModel.updateUsers(req, (error, response) => {
        if (error) console.log("Error is: ", error);
        if (response) {
            // console.log("Success response is: ", response);
            res.send(response);
        }
    });
});

module.exports = {addUser,removeUser,getUser,getUsersInRoom,router};