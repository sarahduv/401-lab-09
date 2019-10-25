'use strict';

const mongoose = require('mongoose');

const people = mongoose.Schema({      
  id: { required: true, type: 'string' },
  firstName: { required: true, type: 'string' },
  lastName: { required: true, type: 'string' },
  age: { required: true, type: 'number' }}, 
{ toObject:{virtuals:true}, toJSON:{virtuals:true} });

module.exports = mongoose.model('people', people);
