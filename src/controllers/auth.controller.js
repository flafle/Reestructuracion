async function login(req, res){

}

async function register(req, res){
    console.log(req.body)

    const user= req.body.user;
    const password= req.body.password;
    const email= req.body.email;
    if(!user||!email||!password){
        res.status(400).send({status:"Error", message:"Campos incompletos."})
    }
}


export const methods = {
    login,
    register
}