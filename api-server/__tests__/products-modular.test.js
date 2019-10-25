const Products = require('../src/models/products/products-model.js');
let products = new Products();


const app = require('../src/app.js');
const supertest = require('./src/supergoose.js');
const mockRequest = supertest(app.app);


describe('Products Model (Modular)', () => {

  beforeEach(async () => {
    await products.deleteMany({});
  });

  // How will you handle both the happy path and edge cases in these tests?

  it('can create() a new product', async () => {
    let obj = { name: 'John', description: 'Person', price: 3, category: 'People' };
    const response = await mockRequest.post('/api/v1/products').send(obj);  
    const record = JSON.parse(response.res.text);
    Object.keys(obj).forEach(key => {
      expect(record[key]).toEqual(obj[key]);
    });  
  });

  it('can get() a product', async () => {
    let obj = { name: 'John', description: 'Person', price: 3, category: 'People' };
    await mockRequest.post('/api/v1/products').send(obj);
    const response = await mockRequest.get('/api/v1/products');
    const records = JSON.parse(response.res.text);
    Object.keys(obj).forEach(key => {
      expect(records.results[0][key]).toEqual(obj[key]);
    });
  });

  it('can delete() a product', async () => {
    let obj = { name: 'John', description: 'Person', price: 3, category: 'People' };
    const posted = await mockRequest.post('/api/v1/products').send(obj);
    const postedId = JSON.parse(posted.res.text)._id;
    await mockRequest.delete(`/api/v1/products/${postedId}`);
    const response = await mockRequest.get('/api/v1/products');
    const records = JSON.parse(response.res.text);
    expect(records.count).toEqual(0);
  });

  it('can update() a product', async () => {
    let obj = {name: 'John', description: 'Person', price: 3, category: 'People' };
    const posted = await mockRequest.post('/api/v1/products').send(obj);
    const postedId = JSON.parse(posted.res.text)._id;
    await mockRequest.put(`/api/v1/products/${postedId}`).send({name: 'Tarzan'});
    const response = await mockRequest.get('/api/v1/products');
    const records = JSON.parse(response.res.text);
    expect(records.results[0].name).toEqual('Tarzan');
  });

});