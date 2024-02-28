import { Controller } from '@hotwired/stimulus';
import {
    createCart,
    addItemToCart,
    loadLocalCart,
    storeLocalCart,
} from "../services/cart";
import {
    loadProduct,
} from "../services/product";

export default class extends Controller {
    static values = {
        code: String
    }

    static targets = [
        'button',
    ];

    product = null;

    connect() {
        loadProduct(this.codeValue)
            .then((product) => {
                this.product = product;
                this.buttonTarget.disabled = false;
            });
    }

    addToCart() {
        const cart = loadLocalCart();
        if (cart) {
            addItemToCart(cart.tokenValue, this.product.firstVariant.code, 1).then((newCart) => {
                storeLocalCart(newCart);
                alert('Item added to cart');
            });

            return;
        }

        createCart().then((cart) => {
            addItemToCart(cart.tokenValue, this.product.firstVariant.code, 1).then((newCart) => {
                storeLocalCart(newCart);
                alert('Item added to cart');
            });
        });
    }
}
