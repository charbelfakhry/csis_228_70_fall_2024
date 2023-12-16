const jwt = require("jsonwebtoken");
const { loadUser, insertUser, authenticate, deleteUser } = require("../services/userService")
const { validationResult } = require("express-validator")



const authenticateController = async(req, res) =>{
    const {user} = req.body;
    if(!user){
        return res.status(401).json({message: "missing data"});
    }

    const result = await authenticate(user);
    if(!result){
        return res.status(401).json({message: "Unauthorized"})
    }

    const token = jwt.sign({userId: result?.user_id}, process.env.SECRET_KEY);
    res.status(200).json({message: "authenticated", user: result, token: token});
}

const deleteUserController = async(req, res) =>{
    const {user_id} = req.params;
    await deleteUser(user_id);
    // you should go to another page
    //res.render("index");
    res.redirect("/");
}

const loadUserFormController = async(req, res)=>{
    res.render("user");
}

const getAllUsersController = async (req, res) => {
    /**
     * validate data
     * if username is empty return missing data.
     */

    try {
        const users = await loadUser();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Internal error occured" });
    }
}

const insertUserController = async (req, res) => {

    // validating using express validator
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { user_first_name, user_last_name, user_email, user_password, user_dob } = req.body;
        const response = await insertUser(user_first_name, user_last_name, user_email, user_password, user_dob);
        //res.status(200).json({ response });
        //res.redirect("/homepate")
        let data = await loadUser();
        res.render("detailUser", data);
    } catch (error) {
        res.status(500).json({ error: "error inserting user" });
    }
}

const updateUserController = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { user_id, user_first_name, user_last_name, user_email, user_password, user_dob } = req.body;

    const response = await insertUser(user_id, user_first_name, user_last_name, user_email, user_password, user_dob);
    res.status(200).json({ response });
}

module.exports = {
    getAllUsersController,
    insertUserController,
    updateUserController,
    authenticateController,
    deleteUserController,
    loadUserFormController
}