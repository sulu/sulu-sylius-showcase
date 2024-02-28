import {Controller} from '@hotwired/stimulus';
import {
    storeLocalCart,
    loadLocalCart,
    addressCart,
    selectShipment,
    selectPayment,
    complete,
} from "../services/cart";

export default class extends Controller {
    static targets = [
        'quantity',
        'amount',
        'buttonText',
        'overlay',
        'spinner',
    ];

    connect() {
        this.updateCart(loadLocalCart());

        document.addEventListener('localStorage', (e) => {
            if (e.key === 'cart') {
                this.updateCart(JSON.parse(e.value));
            }
        });
    }

    toggleLoading = () => {
        this.spinnerTarget.classList.toggle('hidden');
        this.buttonTextTarget.classList.toggle('hidden');
    }

    updateCart(cart) {
        if (cart) {
            this.quantityTarget.innerText = cart.items.reduce((acc, item) => acc + item.quantity, 0);
            this.amountTarget.innerText = (cart.total / 100).toFixed(2);
        }
    }

    checkout() {
        this.toggleLoading();
        const cart = loadLocalCart();
        addressCart(cart.tokenValue, 'max@mustermann.de', {
            countryCode: 'DE',
            firstName: 'Max',
            lastName: 'Mustermann',
            street: 'Musterstraße 1',
            city: 'Musterstadt',
            postcode: '56781',
        }).then(() => {
            selectShipment(cart.tokenValue, cart.shipments[0].id, 'ups').then(() => {
                selectPayment(cart.tokenValue, cart.payments[0].id, 'cash_on_delivery').then(() => {
                    complete(cart.tokenValue, 'test').then(() => {
                        this.toggleLoading();
                        storeLocalCart(null);
                        this.quantityTarget.innerText = '-';
                        this.amountTarget.innerText = '-';
                        this.overlayTarget.classList.remove('hidden');
                    });
                });
            });
        });
    }

    closeOverlay = () => {
        this.overlayTarget.classList.add('hidden');
    }
}
