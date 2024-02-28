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
        'buttonText',
        'overlay',
        'spinner',
    ];

    product = null;

    connect() {
        loadProduct(this.codeValue)
            .then((product) => {
                this.product = product;
                this.buttonTarget.disabled = false;
            });
    }

    toggleLoading = () => {
        this.buttonTarget.disabled = !this.buttonTarget.disabled;
        this.spinnerTarget.classList.toggle('hidden');
        this.buttonTextTarget.classList.toggle('hidden');
    }

    addToCart = () =>{
        this.toggleLoading();
        const cart = loadLocalCart();
        if (cart) {
            addItemToCart(cart.tokenValue, this.product.firstVariant.code, 1).then(((newCart) => {
                storeLocalCart(newCart);
                this.overlayTarget.classList.remove('hidden');
                this.toggleLoading();
            }).bind(this));

            return;
        }

        createCart().then((cart) => {
            addItemToCart(cart.tokenValue, this.product.firstVariant.code, 1).then(((newCart) => {
                storeLocalCart(newCart);
                this.overlayTarget.classList.remove('hidden');
                this.toggleLoading();
            }).bind(this));
        });
    }

    closeOverlay = () => {
        this.overlayTarget.classList.add('hidden');
    }
}
