const Todo = require('../src/models/todo/todo-model.js');
let todo = new Todo();


const app = require('../src/app.js');
const supertest = require('./src/supergoose.js');
const mockRequest = supertest(app.app);


describe('Todos Model (Modular)', () => {

  beforeEach(async () => {
    await todo.deleteMany({});
  });

  // How will you handle both the happy path and edge cases in these tests?

  it('can create() a new todo', async () => {
    let obj = {text: 'todo', category: 'tasks', assignee: 'John', difficulty: 3, complete: true };
    const response = await mockRequest.post('/api/v1/todo').send(obj);  
    const record = JSON.parse(response.res.text);
    Object.keys(obj).forEach(key => {
      expect(record[key]).toEqual(obj[key]);
    });  
  });

  it('can get() a todo', async () => {
    let obj = {text: 'todo', category: 'tasks', assignee: 'John', difficulty: 3, complete: true };
    await mockRequest.post('/api/v1/todo').send(obj);
    const response = await mockRequest.get('/api/v1/todo');
    const records = JSON.parse(response.res.text);
    Object.keys(obj).forEach(key => {
      expect(records.results[0][key]).toEqual(obj[key]);
    });
  });

  it('can delete() a todo', async () => {
    let obj = {text: 'todo', category: 'tasks', assignee: 'John', difficulty: 3, complete: true };
    const posted = await mockRequest.post('/api/v1/todo').send(obj);
    const postedId = JSON.parse(posted.res.text)._id;
    await mockRequest.delete(`/api/v1/todo/${postedId}`);
    const response = await mockRequest.get('/api/v1/todo');
    const records = JSON.parse(response.res.text);
    expect(records.count).toEqual(0);
  });

  it('can update() a todo', async () => {
    let obj = {text: 'todo', category: 'tasks', assignee: 'John', difficulty: 3, complete: true };
    const posted = await mockRequest.post('/api/v1/todo').send(obj);
    const postedId = JSON.parse(posted.res.text)._id;
    await mockRequest.put(`/api/v1/todo/${postedId}`).send({text: 'Tarzan'});
    const response = await mockRequest.get('/api/v1/todo');
    const records = JSON.parse(response.res.text);
    expect(records.results[0].text).toEqual('Tarzan');
  });

});
