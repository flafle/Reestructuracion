import bcrypt, { hash } from "bcrypt";

//dos metodos principales del bc
export const createHash = async (password) => {
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salts);
}
export const validatePassword = (password, hashedpassword) => bcrypt.compareSync(password, hashedpassword);


//--------------------------

export const privacy = (privacyType) => {
    return (req, res, next)=>{
        const {user} =req.session;
        switch(privacyType){
            case "PRIVATE": //para quienes tienn permiso
                if(user) next();
                else res.redirect("/login");
                break;

              case "NO_AUTHENTICATED":
                if(!user) next();
                else res.redirect("/profile");



        }
    };
};