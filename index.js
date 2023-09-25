var express = require("express");
require('dotenv').config();

const { fillDummyData, readUsers, getUsers } = require("./test");
const { query } = require("./database/db");

const app = express();
const PORT = process.env.PORT;


app.get('/', (req, res)=>{

    res.status(200).json({
        message: 'hello from the server side',
    });

});

app.get('/test', (req, res)=>{
    res.status(200).json({message: "test route"})
})

app.get('/users', async(req, res)=>{
    try{
        const userSQL = `SELECT * FROM users`;
        const users = await query(userSQL);
        res.status(200).json({users});
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
})

app.listen(PORT);

console.log(`Your application is runnning on port ${PORT}`);