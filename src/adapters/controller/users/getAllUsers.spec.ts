import request from 'supertest';
import { createApp } from '../../../app.js';
import { deleteAllUser } from '../../../infrastructure/database/mongodb/users/utils/deleteAllUser.js';
import { createFakeUser } from '../../../infrastructure/database/mongodb/users/utils/createFakeUser.js';

describe('get all user example', () => {
  beforeEach(async () => {
    jest.setTimeout(20000);
    await deleteAllUser();
  });

  it('should be able get all user', async () => {
    const app = createApp();

    const data = await createFakeUser();

    const response = await request(app).get('/users');

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    // data 1
    expect(response.body.data[0]._id.toString()).toEqual(data[0]._id.toString());
    expect(response.body.data[0].username).toEqual(data[0].username);
    expect(response.body.data[0].email).toEqual(data[0].email);
    expect(response.body.data[0].phone).toEqual(data[0].phone);
    expect(response.body.data[0].password).toEqual(data[0].password);
    expect(response.body.data[0].status).toEqual(data[0].status);
    expect(response.body.data[0].photo).toEqual(data[0].photo);

    // data 2
    expect(response.body.data[1]._id.toString()).toEqual(data[1]._id.toString());
    expect(response.body.data[1].username).toEqual(data[1].username);
    expect(response.body.data[1].email).toEqual(data[1].email);
    expect(response.body.data[1].phone).toEqual(data[1].phone);
    expect(response.body.data[1].password).toEqual(data[1].password);
    expect(response.body.data[1].status).toEqual(data[1].status);
    expect(response.body.data[1].photo).toEqual(data[1].photo);

    // data 3
    expect(response.body.data[2]._id.toString()).toEqual(data[2]._id.toString());
    expect(response.body.data[2].username).toEqual(data[2].username);
    expect(response.body.data[2].email).toEqual(data[2].email);
    expect(response.body.data[2].phone).toEqual(data[2].phone);
    expect(response.body.data[2].password).toEqual(data[2].password);
    expect(response.body.data[2].status).toEqual(data[2].status);
    expect(response.body.data[2].photo).toEqual(data[2].photo);
  });

  it('should be able to limit results', async () => {
    const app = createApp();

    await createFakeUser();

    const response = await request(app).get('/users').query({ limit: 1 });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.results).toEqual(1);
  });

  it('should be error when no users found', async () => {
    const app = createApp();

    const response = await request(app).get('/users');

    expect(response.statusCode).toEqual(404);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual('No users found');
  });
});
