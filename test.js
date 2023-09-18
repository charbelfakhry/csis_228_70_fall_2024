

var users = [];


const fillDummyData = async() =>{
    for(let i = 0; i < 100; i++)
    {
        let user = {
            name: `name ${i}`,
            password: "pwd "+i,
            dob: new Date(),
            grade: Math.ceil(Math.random() *50 + 50),
        }
        users.push(user);
    }
}


const readUsers = () =>{
    users.forEach((user)=>{
        console.log(user.name, user.password, user.dob, user.grade);
    })
}

const getUsers = () => {
    return users;
}

const gradeResults = () => {
    
    let counter = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        F: 0 
    };

    for (const user of users) {
        if (user.grade >= 90) {
            counter.A++;
        } else if (user.grade >= 80) {
            counter.B++;
        } else if (user.grade >= 70) {
            counter.C++;
        } else if (user.grade >= 60) {
            counter.D++;
        } else {
            counter.F++;
        }
    }

    return counter;
}


module.exports={
    fillDummyData,
    readUsers,
    getUsers,
}



