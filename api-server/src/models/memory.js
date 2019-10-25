'use strict';

const uuid = require('uuid/v4');

class Model {

  constructor() {
    this.database = [];
  }

  /**
   * @params {string} - takes in an id as a string
   * @returns {object} - returns the object that matches the id
   */
  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  /**
   * @params {object} - takes in an entry object
   * @returns {object} - returns a sanitized entry
   */
  create(entry) {
    entry.id = uuid();
    let record = this.sanitize(entry);
    if (record.id) { this.database.push(record); }
    return Promise.resolve(record);
  }

  /**
   * @params {string} - takes in an id and an entry
   * @returns {object} - if the id is found in the database, it returns that entry
   */
  update(id, entry) {
    let record = this.sanitize(entry);
    if (record.id) { this.database = this.database.map((item) => (item.id === id) ? record : item); }
    return Promise.resolve(record);
  }

  /**
   * @params {string} - takes in an id
   * @returns {} - deletes the entry that matches the id from the database
   */
  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

  /**
   * @params {string} - takes in an entry as a string
   * @returns {object} - returns the sanitized object
   */
  sanitize(entry) {

    let valid = true;
    let record = {};
    let schema = this.schema();

    Object.keys(schema).forEach(field => {
      if (schema[field].required) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });

    return valid ? record : undefined;
  }

  deleteMany() {
    this.database = [];
    return Promise.resolve();
  }
}

module.exports = Model;
