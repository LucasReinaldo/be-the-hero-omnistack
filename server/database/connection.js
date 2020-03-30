const knex = require('knex');
const config = require('../knexfile.js');

const envConfig = process.env.NODE_ENV === 'test' ? config.test : config.development;

const connection = knex(envConfig); //from knexfile.js

module.exports = connection;