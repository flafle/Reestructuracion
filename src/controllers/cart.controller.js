import { cartService } from "../services/cartServices.js";

const getCart = async (req, res) => {
  const carts = await cartService.getCartsService();
  res.send(carts);
};

const getCartById = async (req, res) => {
  try {
    const cId = req.user.cart;
    const carts = await cartService.getCartByIdService({ _id: cId });
    if (!carts)
      res.status(404).send({ status: "error", error: "producto no encontrado" });
    res.send({ status: "success", payload: carts });
  } catch (error) {
    console.log(error);
  }
};

const createCart = async (req, res) => {
  try {
    cartService.CreateCartService();
    res.send("carro creado");
  } catch (error) {
    console.log(error);
    return res.status(404).send({ status: "error", error: "carro no creado" });
  }
};

const cartPost = async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const { quantity } = req.body;
    const addProductCart = await cartService.addProductToCartService(
      cid,
      pid,
      quantity
    );
    res.send({ status: "success", payload: addProductCart });
  } catch (error) {
    console.log(error);
  }
};

const cartDelete = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const deletedProductCart = await cartService.deleteProductToCartService(
      cid,
      pid
    );
    res.send({ status: "success", payload: deletedProductCart });
  } catch (error) {
    console.log(error);
  }
};

const cartDeleteById = async (req, res) => {
  try {
    const { cid } = req.params;
    const deletedCart = await cartService.deleteCartService(cid);
    res.send({ status: "success", payload: deletedCart });
  } catch (error) {
    console.log(error);
  }
};

const cartPut = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const updatedCart = await cartService.updateProductInCartService(
      cid,
      pid,
      quantity
    );

    res.send({ status: "success", payload: updatedCart });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: err.message });
  }
};

export default {
  getCart,
  getCartById,
  createCart,
  cartPost,
  cartDelete,
  cartDeleteById,
  cartPut,
};
