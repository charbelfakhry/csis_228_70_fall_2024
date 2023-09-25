const { query } = require("../database/db");


const loadUser = async() =>{
    try{
        let sql = `select * from users`;
        const users = await query(sql);
        return users;
    }catch(error){
        throw new Error(error);
    }
}

const insertUser = async(user) =>{
    let sql = `INSERT INTO user (user_first_name, user_last_name)
    VALUES
    (?, ?)`;

    const response = await query(sql, [user?.first_name, user?.last_name]);
    return response;
}

module.exports = {
    loadUser,
    insertUser,
}