'use strict';

class Model {

  constructor(schema) {
    this.schema = schema;
  }
  /**
   * @returns {object} - returns a JSON object or an empty object if not found
   */
  jsonSchema() {
    console.log(typeof this.schema.jsonSchema);
    return typeof this.schema.jsonSchema === 'function'
      ? this.schema.jsonSchema()
      : {};
  }

  /**
   * @params {string} - takes in the id
   * @returns {object} - returns the object that matches the id, or an empty object if not found
   */
  get(_id) {
    let queryObject = _id ? { _id } : {};
    return this.schema.find(queryObject);
  }

  /**
   * @params {object} - takes in a new object
   * @returns {object} - returns the object that has now been saved
   */
  create(record) {
    console.log('r',record);
    let newRecord = new this.schema(record);
    console.log('n', newRecord);
    return newRecord.save();
  }

  /**
   * @params {string} - takes in an ID
   * @params {string} - takes in a record entry
   * @returns {object} - updates the object matching the id with the new entry, and keeps the new entry
   */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }

  /**
   * @params {string} - takes in an id and deletes the object matching that id.
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }

  /**
  * @params {object} - mongo filter object of items to delee
  */
  deleteMany(filters) {
    return this.schema.deleteMany(filters);
  }
}

module.exports = Model;
