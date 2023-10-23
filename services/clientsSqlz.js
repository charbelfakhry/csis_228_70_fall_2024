// CRUD
const Client = require("../model/Client");
const Country = require("../model/Country");

// create client
const createClient = async (firstName, lastName, username, password, email, mobile, address, gender, dob) =>{

    try{
        const newClient = await Client.create({
            client_first_name:firstName, 
            client_last_name:lastName,
            client_username:username,
            client_password:password,
            client_email:email,
            client_mobile:mobile,
            client_address:address,
            client_dob:dob,
            client_gender:gender
        })
        return newClient.toJSON();
    }catch(e){
        console.error('Error creating client', e);
    }

}

const getAllClients = async () =>{
    try{
        const client = await Client.findAll({include: [{model: Country}]});
        return client;
    }catch(e){
        console.error(e);
    }
}

const getClientById = async (id) =>{
    try{
        const client = await Client.findByPk(id);
        if(client){
            return client;
        }
        return "user not found";
    }catch(error){
        console.error(error);
    }
}

const updateClient = async (id, firstName, lastName, username, password, email, mobile, address, gender, dob) => {
    try{
        const updateClient = await Client.update({
            client_first_name:firstName,
            client_last_name:lastName,
            client_username:username,
            client_password:password,
            client_email:email,
            client_mobile:mobile,
            client_address:address,
            client_dob:dob,
            client_gender:gender
        }, {where: {client_id: id}});

        return updateClient;
    }catch(error){
        console.error(error);
    }
}

const deleteClient = async(id) =>{
    try{
        const client = await Client.findByPk(id);
        if(client){
            const deletedClient = await client.destroy();
            return deletedClient.toJSON();
        }
    }catch(error){
        console.error(error);
    }
}

const authenticateClient = async (username, password) => {
    let response = {
        message: "not authenticated",
        client: null,
    }
    try{
        const client = await Client.findOne({where: {client_username: username}});
        if(client){
            if(client.client_password === password){
                response.message = "authenticated";
                response.client = client;
            }
        }

    }catch(error){
        console.error(error);
    }

    return response;
}

module.exports = {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient,
    authenticateClient,
}

