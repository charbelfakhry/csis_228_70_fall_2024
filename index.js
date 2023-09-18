var express = require("express");
const { fillDummyData, readUsers, getUsers } = require("./test");

const app = express();
const PORT = 3001;


app.get('/', (req, res)=>{

    res.status(200).json({
        message: 'hello from the server side',
    });

});

app.get('/users', async(req, res)=>{
    try{
        await fillDummyData();
        const users = getUsers();
        if(users && users.length > 0){
            res.status(200).json({
                users,
            });
        }else{
            res.status(200).json({message: "no users"});
        }
    }catch(error){
        res.status(500).json({message: `An error has occured ${error}`});
    }
})

app.listen(PORT);

console.log(`Your application is runnning on port ${PORT}`);