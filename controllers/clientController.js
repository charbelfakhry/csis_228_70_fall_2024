const {validationResult} = require("express-validator");
const { getAllClients, createClient, updateClient, deleteClient } = require("../services/clientsSqlz");

const getAllClientsController = async(req, res) =>{
    
    try{
        const clients = await getAllClients();
        res.status(200).json({users});
    }catch(error){
        res.status(500).json({message: "Internal error occured"});
    }
}

const insertClientController = async(req, res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const {firstName, lastName, username, password, email, mobile, address, gender, dob} = req.body;
    
    const response = await createClient(firstName, lastName, username, password, email, mobile, address, gender, dob);
    res.status(200).json({response});
}

const updateUserController = async (req, res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const {id, firstName, lastName, username, password, email, mobile, address, gender, dob} = req.body;
    
    const response = await updateClient(id, firstName, lastName, username, password, email, mobile, address, gender, dob);
    res.status(200).json({response});
}

const deleteUserController = async (req, res) =>{
    try{
        const {id} = req.body;
        if(!id){
            return res.status(400).json({message: "missing id"});
        }

        const response = await deleteClient(id);
        res.status(200).json({response});
    }catch(error){
        res.status(500).json(error);
    }
}

module.exports = {
    getAllClientsController,
    insertClientController,
    updateUserController,   
    deleteUserController,
}