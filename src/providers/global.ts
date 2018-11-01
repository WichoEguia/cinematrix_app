let ENV = 'dev';
// let ENV = 'prod';

let url = ENV === 'dev' ? 'http://localhost:3000/' : 'https://cinematrix-api.herokuapp.com/';

export let GLOBAL = {
    url: url,
    ip: '127.0.0.1',
    app_name: 'CINEMATRIX',
    payPalEnvironmentSandbox: 'ARwJ1HciAGzC2LmyVne7RkQCHa0P6MtmX49G98tjz2fJ5kg5BqBf_c6Ft9vnJ9-PUOh_9DQPklIa2Bls',
    payPalEnvironmentProduction: ''
};