const { query } = require("../database/db");
var moment = require("moment");

/**
 * 
 * @returns This class represents the CRUD Of the table user
 */

const loadUser = async() =>{
    try{
        let sql = `select * from users`;
        const users = await query(sql);
        return users;
    }catch(error){
        throw new Error(error);
    }
}

const loadUserById = async(id) =>{
    let sql = `select * from users WHERE user_id = ?`;
        const users = await query(sql, [id]);
        return users;
}

const insertUser = async(user_first_name, user_last_name, user_email, user_password, user_dob) =>{
    let sql = `INSERT INTO users (user_first_name, user_last_name, user_email, user_password, user_dob)
    VALUES
    (?, ?, ?, ?, ?)`;

    const response = await query(sql, [user_first_name, user_last_name, user_email, user_password, moment(user_dob).format("YYYY-MM-DD")]);

    var user = await query("SELECT * FROM users WHERE user_id = ?", [response?.insertId]);

    user[0].user_dob = moment(user[0].user_dob).format("YY-MM-DD");

    return user;
}

const updateUser = async(user_id, user_first_name, user_last_name, user_email, user_password, user_dob)=>{
    let sql = `UPDATE user SET user_first_name = ?, user_last_name = ?, user_email, user_password, user_dob WHERE user_id = ?`;
    const response = await query(sql, [user_first_name, user_last_name, user_email, user_password, moment(user_dob).format("YYYY-MM-DD"), user_id]);
    return response;
}

const deleteUser = async (id) =>{
    let sql = `DELETE from user WHERE user_id = ?`;
    const response = await query(sql, [id]);
    return response;
}

/**
 * Difference between callback and Promise.
 */
const testCall = async() => {
    

    var result = await query("select * from users left outer join country on users.country_id = country.country_id");
    // loop result

    var result1 = await query("select * from users");
    // loop result1

    // query("select * from users left outer join country on users.country_id = country.country_id").then(result=>{
    //     // loop 
    // })

    // query("select * from users").then(result)
    // {
    //     // loop.
    // }
}

module.exports = {
    loadUser,
    insertUser,
    updateUser,
    deleteUser,
    loadUserById,
}