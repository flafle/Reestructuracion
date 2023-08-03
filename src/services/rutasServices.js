import CartManager from "../dao/mongo/managers/cartManager.js";
import CartService from "../services/cartServices.js";


import UserManager from "../dao/mongo/managers/users.js";
import UserService from "../services/user.service.js"


export const userService = new UserService(new UserManager());
export const cartService = new CartService(new CartManager());

