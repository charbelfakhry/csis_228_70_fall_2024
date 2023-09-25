const { loadUser } = require("../services/userService")

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

module.exports = {
    getAllUsersController,
}