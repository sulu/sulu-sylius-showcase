import requester from './requester';

const defaultOptions = {
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    },
};

const patchOptions = {
    mode: 'cors',
    headers: {
        'Content-Type': 'application/merge-patch+json',
    },
};

class ShopRequester {
    getUrl(url) {
        return window.SYLIUS_BASE_URL + url;
    }

    get(url) {
        return requester.get(this.getUrl(url), defaultOptions);
    }

    post(url, data) {
        return requester.post(this.getUrl(url), data, defaultOptions);
    }

    put(url, data) {
        return requester.put(this.getUrl(url), data, defaultOptions);
    }

    patch(url, data) {
        return requester.patch(this.getUrl(url), data, patchOptions);
    }

    delete(url) {
        return requester.delete(this.getUrl(url), defaultOptions);
    }
}

export default new ShopRequester();
