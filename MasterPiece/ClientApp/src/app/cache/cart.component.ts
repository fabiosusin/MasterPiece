import { Injectable } from "@angular/core";
import { CartModel } from "src/models/cart/cart";
import { Product } from "src/models/product/product";

@Injectable({ providedIn: 'root' })
export class CartComponent {
    setShoppingCartNewItem(product: Product) {
        let cartProduct = this.getShoppingCartItems();
        if (!cartProduct)
            cartProduct = new CartModel();

        if (!cartProduct.itensProduct)
            cartProduct.itensProduct = new Array<Product>();

        cartProduct.itensProduct.push(product);
        localStorage.setItem('cartProduct', JSON.stringify(cartProduct));
    }

    setShoppingCartItems(products: Product[]) {
        let cartProduct = new CartModel();
        cartProduct.itensProduct = products;
        localStorage.setItem('cartProduct', JSON.stringify(cartProduct));
    }

    getShoppingCartItems = () => JSON.parse(localStorage.getItem('cartProduct'));

    removeProduct(product: Product) {
        let items = this.getShoppingCartItems();
        if (!items || items.itensProduct.length == 0)
            return;

        items.itensProduct = items.itensProduct.filter(x => x.id != product.id);
        this.setShoppingCartItems(items.itensProduct);
    }

    getShoppingCartAmount = () => {
        const items = this.getShoppingCartItems();
        return !items || !items.itensProduct ? '' : items.lenght;
    }
}