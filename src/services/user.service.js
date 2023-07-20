export default class UserServices{

    constructor(dao){
        this.dao= dao
    };
    getUsers(){
        return this.dao.getUsers()
    };

    getUser(params,user){
        return this.dao.getUser(params,user)
    };

    createUser(user){
        return this.dao.createUser(user)
    };
    updateUser(id,user){
        return this.dao.updateUser(id,user)
    };

    deleteUser(id){
        return this.dao.deleteUser(id)
    };
};

