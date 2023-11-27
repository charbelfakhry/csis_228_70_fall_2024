var express = require("express");
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const ejs = require('ejs');

const { fillDummyData, readUsers, getUsers } = require("./test");
const { query } = require("./database/db");

const app = express();
const PORT = process.env.PORT;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({origin: '*'}));

app.set('view engine', 'ejs')

const userRoute = require("./routes/user.route");
const { getTypicode, getTypicodeByUserId } = require("./services/fetchData");

app.get('/', async(req, res)=>{

    const formattedUsers = [];
    const users = await query("select * from users");
    for(const user of users)
    {
        let obj = {
            user_id: user.user_id,
            user_name: user.user_name,
            user_dob: moment(user.user_dob).format("YYY-MM-DD"),
        }
        formattedUsers.push(obj);
    }
    const data = {
        message: "welcome from ejs todays is ",
        username: "user001",
        content: "this is a very descriptive content",
        users: formattedUsers,
    }

    res.render('index', data);

});


app.use('/api/users', userRoute);

app.listen(PORT);

console.log(`Your application is runnning on port ${PORT}`);

