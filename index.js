var express = require("express");
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const { fillDummyData, readUsers, getUsers } = require("./test");
const { query } = require("./database/db");

const app = express();
const PORT = process.env.PORT;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({origin: '*'}));

const userRoute = require("./routes/user.route");

app.get('/', (req, res)=>{

    res.status(200).json({
        message: 'hello from the server side',
    });

});

app.use('/api/users', userRoute);


app.listen(PORT);

console.log(`Your application is runnning on port ${PORT}`);