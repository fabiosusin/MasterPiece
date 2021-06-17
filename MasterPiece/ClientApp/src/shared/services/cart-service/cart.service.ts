import { Injectable } from "@angular/core";
import { Product } from "src/models/product/product";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    constructor() { }

    items = [];

    addToCart(product) {
        this.items.push(product);
    }

    getItems() {
        return this.items;
    }

    clearCart(product) {
        debugger;
        console.log('product2', product)
        this.items.splice(product, 1)
        return;
    }


    // removeProduct(product){ 
    //     debugger
    //     this.items.splice(product)
    //     for(let i= 0; i < this.items.length; i +=1) { 
    //     if (this.items[i].product === product) {
    //         this.items.splice(i, 1)
    //         return
    // }





}
