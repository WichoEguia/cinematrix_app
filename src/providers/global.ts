let ENV = 'dev';
// let ENV = 'env';

let url = ENV === 'dev' ? 'http://localhost:3000/' : 'https://cinematrix-api.herokuapp.com/';

export let GLOBAL = {
    url: url,
    ip: '127.0.0.1'
};