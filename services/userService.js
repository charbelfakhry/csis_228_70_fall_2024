const { query } = require("../database/db");

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

const insertUser = async(user) =>{
    let sql = `INSERT INTO user (user_first_name, user_last_name)
    VALUES
    (?, ?)`;

    const response = await query(sql, [user?.first_name, user?.last_name]);
    return response;
}

const updateUser = async(user)=>{
    let sql = `UPDATE user SET user_first_name = ?, user_last_name = ? WHERE user_id = ?`;
    const response = await query(sql, [user?.first_name, user?.last_name, user?.user_id]);
    return response;
}

const deleteUser = async (id) =>{
    let sql = `DELETE from user WHERE user_id = ?`;
    const response = await query(sql, [id]);
    return response;
}

module.exports = {
    loadUser,
    insertUser,
    updateUser,
    deleteUser,
    loadUserById,
}