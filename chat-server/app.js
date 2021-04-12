const mongoose = require('mongoose');
var cors = require('cors')
const dbModel = require('./dbModel');
const config = require('./config');
const validateModel = require('./validateModel');
const { ErrorResult, Result, Encrypt } = require('./helper');
const ObjectId = require('mongodb').ObjectId;

//Connect DB
mongoose.connect(config.mongoDBConnection, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Create Express Instance
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//Allow same orign policy
app.options('*', cors()) // include before other routes 
app.use(cors())
const server = require('http').createServer(app);

//Create socket.io handler
require('./socketHandler')(server);
 


//Express routing functions

app.get('/', (req, res) => {
    //InitDB();
    res.send('Welcome to Maccabi API Server');

});


//Login
app.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    //validate login model
    const errors = await validateModel.ValidateLogin(userName, password);
    if (errors) return ErrorResult(res, errors);


    //Check if user exist
    const user = await dbModel.User.findOne({ userName, password: Encrypt(password) });
    if (!user) {
        console.log("login information is incorrect", userName, password);
        return ErrorResult(res, 'Your login information is incorrect');
    }

    //customize response

    user.password = undefined;

    //user valid
    console.log('login is valid', userName, password);
    return Result(res, 'user', user);
});

//add new user
app.post('/addUser', async (req, res) => {

    const { userName, password, nickName } = req.body;

    //validation
    const errors = await validateModel.ValidateUser(req.body);
    if (errors) return ErrorResult(res, errors);


    //Create User
    const userObject = new dbModel.User({
        userName,
        nickName,
        password: Encrypt(password)
    });

    dbModel.User.collection.insertOne(userObject, (err, result) => {

        //check if mongodb return any error
        if (err != null) {
            return ErrorResult(res, 'We encountered an error: ' + err);
        }
        else {
            //user inserted
            const insertedUser = result.ops[0];
            console.log("Success Insert", insertedUser);

            return Result(res, 'user', insertedUser);
        }
    });
});


//delete user, Limit only for admin
app.post('/deleteUser', async (req, res) => {

    const { deleteUserId, token } = req.body;

    //validation
    const errors = await validateModel.ValidateDeleteUser(deleteUserId, token);
    if (errors) return ErrorResult(res, errors);

    console.log('Try to delete user', deleteUserId);

    //try to remove the user
    const c = await dbModel.User.collection.findOneAndDelete({ _id: ObjectId(deleteUserId) });
    if (c && c.value) return Result(res);

    return ErrorResult(res, 'Encountered an error, please make sure the user exists');
});


//get users, Limit only for admin
app.post('/getUsers', async (req, res) => {

    const { token } = req.body;
	let { query } = req.body;
	 

	
    //validation
    const errors = await validateModel.ValidateAdminToken(token);
    if (errors) return ErrorResult(res, errors);

	
	if (query===undefined) query={};
	
    console.log('get list of users',query);

    //try to remove the user
    dbModel.User.find(query, function (err, users) {

        if (err) {
            console.error(err);
            return ErrorResult(res, err);
        }

     

        return Result(res, 'users', users);
    });

});


//get rooms, Limit only for admin
app.post('/getRooms', async (req, res) => {

	let { query } = req.body;
	if (query===undefined) query={};
	
    console.log('get list of rooms',query);

    //try to remove the user
    dbModel.Room.find(query, function (err, rooms) {

        if (err) {
            console.error(err);
            return ErrorResult(res, err);
        }

        return Result(res, 'rooms', rooms);
    });

});




//get user by token, (verify token by localstorage)
app.post('/getUserByToken', async (req, res) => {

    const { token } = req.body;

    //validation
    if (!token) return ErrorResult(res, 'You must send token');
    console.log('get user by token', token);

    //try get user by token
    dbModel.User.findOne({token}, function (err, user) {
        if (err) {
            console.error(err);
            return ErrorResult(res, err);
        }
        return Result(res, 'user', user);
    });

});


//get users, Limit only for admin
app.post('/addRoom', async (req, res) => {

    const { roomName, token } = req.body;

    //validation
    const errors = await validateModel.ValidateCreateRoom(roomName, token);
    if (errors) return ErrorResult(res, errors);

    //Create room
    console.log('Begin create room', roomName)

    //Create Room Object
    const newRoom = {
        name: roomName,
        chats: []
    };

    dbModel.Room.collection.insertOne(new dbModel.Room(newRoom), (err => {

        if (err != null) {
            console.error('Cannot Create Room', newRoom);
            return ErrorResult(res, 'Error whilt trying to create the room,' + err);
        }

        console.log('Room Created - Successfully');
        return Result(res, 'room', newRoom);
    }));


});


// make the server listen to requests
server.listen(config.serverPort, () => {
    console.log(`Server running at: http://localhost:${config.serverPort}/`);
});
