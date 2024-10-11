import { TApiInstance } from "../api";
import AuthStorage from "./auth/auth";
import CartStorage from "./cart";
import ProductsStorage from "./products";


export class RootStorage {
    products
    cart
    auth
    constructor(api: TApiInstance, localStrg: Storage) {
        this.products = new ProductsStorage(api)
        this.cart = new CartStorage(api, localStrg, this)
        this.auth = new AuthStorage(localStrg, this)
    }
}


