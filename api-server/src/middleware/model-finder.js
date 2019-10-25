'use strict';
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);

const modelsFolder = `${__dirname}/../models`;

/**
 * @params {object} - takes in the user input
 * @returns {object} - creates a new Model with the given request info
 */
const load = (req,res,next) => {
  let modelName = req.params.model.replace(/[^a-z0-9-_]/gi, '');
  const Model = require(`../models/${modelName}/${modelName}-model.js`);
  req.model = new Model();
  next();
};

/**
 * @returns {object} - returns a filtered object
 */
const list = () => {
  return readdir(modelsFolder)
    .then(contents =>
      contents.filter((entry) =>
        fs.lstatSync(`${modelsFolder}/${entry}`).isDirectory() && fs.statSync(`${modelsFolder}/${entry}/${entry}-model.js`)
      )
    )
    .catch(console.error);
};

module.exports = {load,list};
