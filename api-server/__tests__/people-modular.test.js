const People = require('../src/models/people/people-model.js');
let people = new People();


const app = require('../src/app.js');
const supertest = require('./src/supergoose.js');
const mockRequest = supertest(app.app);


describe('Peoples Model (Modular)', () => {

  beforeEach(async () => {
    await people.deleteMany({});
  });

  // How will you handle both the happy path and edge cases in these tests?

  it('can create() a new people', async () => {
    let obj = {id: '1', firstName: 'John', lastName: 'Legend', age: 3};
    const response = await mockRequest.post('/api/v1/people').send(obj);  
    const record = JSON.parse(response.res.text);
    Object.keys(obj).forEach(key => {
      expect(record[key]).toEqual(obj[key]);
    });  
  });

  it('can get() a people', async () => {
    let obj = {id: '1', firstName: 'John', lastName: 'Legend', age: 3};
    await mockRequest.post('/api/v1/people').send(obj);
    const response = await mockRequest.get('/api/v1/people');
    const records = JSON.parse(response.res.text);
    Object.keys(obj).forEach(key => {
      expect(records.results[0][key]).toEqual(obj[key]);
    });
  });

  it('can delete() a people', async () => {
    let obj = {id: '1', firstName: 'John', lastName: 'Legend', age: 3};
    const posted = await mockRequest.post('/api/v1/people').send(obj);
    const postedId = JSON.parse(posted.res.text)._id;
    await mockRequest.delete(`/api/v1/people/${postedId}`);
    const response = await mockRequest.get('/api/v1/people');
    const records = JSON.parse(response.res.text);
    expect(records.count).toEqual(0);
  });

  it('can update() a people', async () => {
    let obj = {id: '1', firstName: 'John', lastName: 'Legend', age: 3};
    const posted = await mockRequest.post('/api/v1/people').send(obj);
    const postedId = JSON.parse(posted.res.text)._id;
    await mockRequest.put(`/api/v1/people/${postedId}`).send({firstName: 'Tarzan'});
    const response = await mockRequest.get('/api/v1/people');
    const records = JSON.parse(response.res.text);
    expect(records.results[0].firstName).toEqual('Tarzan');
  });

});



