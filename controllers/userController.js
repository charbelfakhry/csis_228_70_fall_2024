const { loadUser, insertUser } = require("../services/userService")

const getAllUsersController = async(req, res) =>{
    /**
     * validate data
     * if username is empty return missing data.
     */

    try{
        const users = await loadUser();
        res.status(200).json({users});
    }catch(error){
        res.status(500).json({message: "Internal error occured"});
    }
}

const insertUserController = async(req, res)=>{
    const {user} = req.body;
    if(user){
        return res.status(400).json({message: "missing data"});
    }
    const response = await insertUser(user);
    res.status(200).json({response});
}

module.exports = {
    getAllUsersController,
    insertUserController,
}