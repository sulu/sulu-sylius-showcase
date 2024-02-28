import shopRequester from './shopRequester';

export const createCart = () => {
    return shopRequester.post('/api/v2/shop/orders', { locale: 'de_DE' });
};

export const addItemToCart = (tokenValue, variantCode, quantity) => {
    return shopRequester.post('/api/v2/shop/orders/' + tokenValue + '/items', {
        productVariant: variantCode,
        quantity: quantity,
    });
};

export const addressCart = (tokenValue, email, address) => {
    return shopRequester.put('/api/v2/shop/orders/' + tokenValue, {
        email,
        billingAddress: address,
    });
};

export const selectShipment = (tokenValue, shipmentId, shippingMethod) => {
    return shopRequester.patch('/api/v2/shop/orders/' + tokenValue + '/shipments/' + shipmentId, {
        shippingMethod,
    });
};

export const selectPayment = (tokenValue, paymentId, paymentMethod) => {
    return shopRequester.patch('/api/v2/shop/orders/' + tokenValue + '/payments/' + paymentId, {
        paymentMethod,
    });
};

export const complete = (tokenValue, notes) => {
    return shopRequester.patch('/api/v2/shop/orders/' + tokenValue + '/complete', {
        notes,
    });
};

export const storeLocalCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const loadLocalCart = () => {
    const cart = localStorage.getItem('cart');
    if (!cart) {
        return null;
    }

    return JSON.parse(cart);
};
