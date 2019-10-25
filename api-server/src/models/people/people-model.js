'use strict';

const Model = require('../mongo.js');
const schema = require('./people-schema.js');

class People extends Model {
  constructor() { super(schema); }
}

module.exports = People;
