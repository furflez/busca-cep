import request from 'supertest';
import { app } from '../app';

describe('Untokenized routes', () => {
  it('should generate a valid token when sending a valid body to POST /authentication', async () => {
    const response = await request(app).post('/authentication')
      .set('Content-type', 'application/json')
      .send({
        email: 'teste@teste.com.br',
        password: 'batatinhafrita123',
      })
      .expect(200);

    expect(response.body.token).toBeDefined();
  });

  it('should return email field error when sending invalid email address to POST /authentication', async () => {
    const response = await request(app).post('/authentication')
      .set('Content-type', 'application/json')
      .send({
        email: 'testetestecombr',
        password: 'batatinhafrita123',
      })
      .expect(400);

    expect(response.body.errors[0]).toHaveProperty('msg', 'email field must be a valid e-mail');
  });

  it('should return password field error when sending invalid password length to POST /authentication', async () => {
    const response = await request(app).post('/authentication')
      .set('Content-type', 'application/json')
      .send({
        email: 'teste@teste.com.br',
        password: 'a',
      })
      .expect(400);

    expect(response.body.errors[0]).toHaveProperty('msg', 'password field must have at least 5 digits');
  });
});
