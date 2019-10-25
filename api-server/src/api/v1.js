'use strict';

const express = require('express');

const modelFinder = require(`../middleware/model-finder.js`);

const router = express.Router();

/**
 * @params {string} takes in the request and creates a new instance
 * @route model
 * @returns {object} creates a new Model instance
 */
router.param('model', modelFinder.load);

/**
 * @params {string} takes in the request
 * @route GET /api/v1/models
 * @returns {object} returns the models objects
 */
router.get('/api/v1/models', (request, response) => {
  modelFinder.list()
    .then(models => response.status(200).json(models));
});

/**
 * @params {string} takes in the request
 * @route GET /api/v1/:model/schema
 * @returns {object} returns the request schema of a specified model
 */
router.get('/api/v1/:model/schema', (request, response) => {
  response.status(200).json(request.model.jsonSchema());
});

/**
 * @params {string} takes in the request model
 * @route GET /api/v1/:model
 * @returns {object} returns all of the specified models
 */
router.get('/api/v1/:model', handleGetAll);

/**
 * @params {string} takes in the request model
 * @route POST /api/v1/:model
 * @returns {object} it will create a new object with the specified information
 */
router.post('/api/v1/:model', handlePost);

/**
 * @params {string} takes in the request model/id
 * @route GET /api/v1/:model/:id
 * @returns {object} it will return the object matching the id
 */
router.get('/api/v1/:model/:id', handleGetOne);

/**
 * @params {string} takes in the request model/id
 * @route PUT /api/v1/:model/:id
 * @returns {object} this will update an object with the new parameter, and return the updated object
 */
router.put('/api/v1/:model/:id', handlePut);

/**
 * @params {string} takes in the request model/id
 * @route DELETE /api/v1/:model/:id
 * @returns {} this will delete the object with the specified id and model
 */
router.delete('/api/v1/:model/:id', handleDelete);

// Route Handlers
function handleGetAll(request,response,next) {
  request.model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function handleGetOne(request,response,next) {
  request.model.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

function handlePost(request,response,next) {
  request.model.create(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handlePut(request,response,next) {
  request.model.update(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handleDelete(request,response,next) {
  request.model.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;
