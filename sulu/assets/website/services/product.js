import shopRequester from './shopRequester';

const loadProduct = (code) => {
    return shopRequester.get('/api/v2/shop/products/' + code).then((data) => {
        return shopRequester.get(data.variants[0]).then((variant) => {
            data.firstVariant = variant;

            return data;
        });
    });
};

export {
    loadProduct,
};
