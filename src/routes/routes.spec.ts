import { MockTokenRepository } from '@repositories/implementation/MockTokenRepository';
import request from 'supertest';
import { GenerateTokenUseCase } from '../usecases/GenerateToken/GenerateTokenUseCase';
import { app } from '../app';

async function generateToken() {
  const mockTokenRepository = new MockTokenRepository();
  const generateTokenUseCase = new GenerateTokenUseCase(mockTokenRepository);
  return generateTokenUseCase.execute({ id: '1111-2222-3333' });
}

describe('Routes tests', () => {
  it('Should generate a valid token by authentication route', async () => {
    const response = await request(app).post('/authentication')
      .set('Content-type', 'application/json')
      .send({
        email: 'teste@teste.com.br',
        password: 'batatinhafrita123',
      })
      .expect(200);

    expect(response.body.token).toBeDefined();
  });

  it('Should return email field error when sending invalid email address', async () => {
    const response = await request(app).post('/authentication')
      .set('Content-type', 'application/json')
      .send({
        email: 'testetestecombr',
        password: 'batatinhafrita123',
      })
      .expect(400);

    expect(response.body.errors[0]).toHaveProperty('msg', 'email field must be a valid e-mail');
  });

  it('Should return password field error when sending invalid password length', async () => {
    const response = await request(app).post('/authentication')
      .set('Content-type', 'application/json')
      .send({
        email: 'teste@teste.com.br',
        password: 'a',
      })
      .expect(400);

    expect(response.body.errors[0]).toHaveProperty('msg', 'password field must have at least 5 digits');
  });

  it('Should return status code 200 with api health check', async () => {
    const response = await request(app).get('/healthcheck')
      .set('token', await generateToken())
      .expect(200);

    expect(response.body.uptime).toBeDefined();
  });

  it('Should return status code 401 in tokenized routes without token', async () => {
    const healthCheckResponse = await request(app).get('/healthcheck')
      .expect(401);
    const addressResponse = await request(app).get('/address/88501440')
      .expect(401);

    expect(healthCheckResponse.unauthorized && addressResponse.unauthorized).toBeTruthy();
  });

  it('Should return status code 200 with valid address sending zipcode', async () => {
    const response = await request(app).get('/address/88501440')
      .set('token', await generateToken())
      .expect(200);

    expect(response.body).toHaveProperty('zipcode', '88501440');
  });

  it('Should return status code 200 with the first valid address sending a different zipcode', async () => {
    const response = await request(app).get('/address/88999999')
      .set('token', await generateToken())
      .expect(200);

    expect(response.body).toHaveProperty('zipcode', '88000000');
  });

  it('Should return status code 400 when sending invalid address', async () => {
    const response = await request(app).get('/address/99999999')
      .set('token', await generateToken())
      .expect(400);

    expect(response.badRequest).toBeTruthy();
  });

  it('Should return status code 400 when sending malformated address', async () => {
    const response = await request(app).get('/address/99999x999-9a99')
      .set('token', await generateToken())
      .expect(400);

    expect(response.badRequest).toBeTruthy();
  });
});
