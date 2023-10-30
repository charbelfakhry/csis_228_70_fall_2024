const { loadUser, insertUser } = require("../services/userService")
const {validationResult} = require("express-validator")

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

    // validating using express validator
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const {user_first_name, user_last_name, user_email, user_password, user_dob} = req.body;
    
    const response = await insertUser(user_first_name, user_last_name, user_email, user_password, user_dob);
    res.status(200).json({response});
}

const updateUserController = async (req, res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const {user_id, user_first_name, user_last_name, user_email, user_password, user_dob} = req.body;
    
    const response = await insertUser(user_id, user_first_name, user_last_name, user_email, user_password, user_dob);
    res.status(200).json({response});
}

module.exports = {
    getAllUsersController,
    insertUserController,
    updateUserController,
}