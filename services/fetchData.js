const axios = require("axios");


const getTypicode = async () =>{
    // this is an api
    const URL = "https://jsonplaceholder.typicode.com/posts";
    const result = await axios.get(URL);

    return result.data;
}

const getTypicodeByUserId = async(userID) =>{

    let arr = [];
    const posts = await getTypicode();
    for(const post of posts)
    {
        if(Number(post.userId) === Number(userID)){
            arr.push(post);
        }
    }

    return arr;

}


module.exports = {
    getTypicode,
    getTypicodeByUserId,
}