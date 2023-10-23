const db = require("../DB/db");
const axios = require("axios");
const mysql = require('mysql2');


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 100,
});



const insertRecords = async(posts) =>{
    let sqls = [];
    for (let n = 0; n < 100; n++) {
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            const { userId, id, title } = post;

            let sql = `INSERT INTO typicode (user_id, id, title, body) VALUES ("${userId}", "${id}", "${title}", "${post.body}")`;
            sqls.push(sql);
        }
    }
    return await executeMultipleQueries(sqls);
} 

const getTypyicode = async () => {

    try {
        await emptyTable();
        const posts = await getTypicodeFromApi();
        let startTime = new Date().getTime(); //ms
        
        const r = await insertRecords(posts);

        let endTime = new Date().getTime();

        let elapsedTime = endTime - startTime;

        console.log(elapsedTime);


    } catch (error) {
        console.log(error);
    }

    return { message: "success" }

}

const getTypicodeFromApi = async () => {
    try {
        const URL = `https://jsonplaceholder.typicode.com/posts`;
        const result = await axios.get(URL);

        const posts = result.data;
        return posts;
    } catch (error) {
        console.log(error);
    }
}

const emptyTable = async () => {
    const sql = `truncate typicode`;
    const res = await db.query(sql);
    console.log(res);
}

const executeMultipleQueries = (sqls) =>{
    pool.getConnection((err, connection)=>{
        if(err) throw err;
        try{
            for(const sql of sqls){
                connection.promise().query(sql).then(([rows, fields])=>{
                    console.log(sql);
                }).catch(console.log);
            }
        }catch(error){
            console.log(error);
        }finally{
            connection.release();
        }
    });
}





module.exports = {
    getTypyicode,

}