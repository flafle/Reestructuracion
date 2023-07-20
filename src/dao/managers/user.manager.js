import userModel from '../mongo/user.model.js;';

export default class userManager {
    getUser= (params)=>{
        return userModel.find(params).lean()
    };
    getUserById=(params)=>{
        return userModel.findById(params)
    };
  

    createUser=(user)=>{
        return userModel.create(user)
    };

    updateUser=(id, user)=>{
        return userModel.findByIdAndUpdate(id, {$set: user})
    };

    deleteUser=(id)=>{
        return userModel.findByIdAndDelete(id)
    };
};