var express = require("express");
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const ejs = require('ejs');

const { fillDummyData, readUsers, getUsers } = require("./test");
const { query } = require("./database/db");

const schedule = require("node-schedule");

const app = express();
const PORT = process.env.PORT;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({origin: '*'}));

app.set('view engine', 'ejs')

const userRoute = require("./routes/user.route");
const { getTypicode, getTypicodeByUserId } = require("./services/fetchData");

app.get('/', async(req, res)=>{

    const clients = await query(`SELECT 
    client.*, COUNT(client_order.client_id) AS order_count
FROM
    client
        LEFT OUTER JOIN
    client_order ON client.client_id = client_order.client_id
GROUP BY client_id;`);

    const data = {
        message: "welcome from ejs todays is ",
        username: "user001",
        content: "this is a very descriptive content",
        users: clients,
    }

    res.render('index', data);

});

app.get("/testingroute", async(req, res)=>{
    let sql = "select * from users";
    let result = await query(sql);
    res.status(200).json({
        message: "test",
        users: result,
    })
});

app.post("/testingPost", async(req, res)=>{
    try{
        const {userName} = req.body;
        let sql = `SELECT * FROM users WHERE user_username = ?`;
        console.log(sql);
        let result = await query(sql, [userName]);
        res.status(200).json({
            user: result
        });
    }catch(e){
        res.status(500).json({
            error: "Error executing query",
        })
    }

})


app.use('/api/users', userRoute);


const startCronJob = () => {
    const job = schedule.scheduleJob('* */10 * * *', () => {
        console.log("This task is running at : ", new Date());
    })
}

const startSpecificCronJob = (date) => {
    const job = schedule.scheduleJob(date, () => {
        console.log("This task is running at : ", new Date());
    })
}

//startCronJob();
const specificTime = new Date(Date.now() + 20 * 1000);
startSpecificCronJob(specificTime);



app.listen(PORT);

console.log(`Your application is runnning on port ${PORT}`);

