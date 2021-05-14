import { Injectable } from "@angular/core";
import { CartModel } from "src/models/cart/cart";

@Injectable({ providedIn: 'root' })
export class CartComponent { 
    setLoggedUser(cartProduct: CartModel) {
        localStorage.setItem('cartProduct', JSON.stringify(cartProduct));
    }

    getLoggedUser() {
        const cartProduct: CartModel = {
            itensProduct: JSON.parse(localStorage.getItem('cartProduct'))
        };

        return cartProduct;
    }
}