import { MockTokenRepository } from '@repositories/implementation/MockTokenRepository';
import request from 'supertest';
import { GenerateTokenUseCase } from '@usecases/GenerateToken/GenerateTokenUseCase';
import { app } from '../../app';

async function generateToken() {
  const mockTokenRepository = new MockTokenRepository();
  const generateTokenUseCase = new GenerateTokenUseCase(mockTokenRepository);
  return generateTokenUseCase.execute({ id: '1111-2222-3333' });
}

describe('Tokenized Routes', () => {
  it('should return status code 200 when GET /healthcheck', async () => {
    const response = await request(app).get('/healthcheck')
      .set('token', await generateToken())
      .expect(200);

    expect(response.body.uptime).toBeDefined();
  });

  it('should return status code 401 without token when GET /healthcheck', async () => {
    const healthCheckResponse = await request(app).get('/healthcheck')
      .expect(401);
    const addressResponse = await request(app).get('/address/88501440')
      .expect(401);

    expect(healthCheckResponse.unauthorized && addressResponse.unauthorized).toBeTruthy();
  });

  it('should return status code 200 with valid address sending zipcode to GET /address/:zipcode', async () => {
    const response = await request(app).get('/address/88501440')
      .set('token', await generateToken())
      .expect(200);

    expect(response.body).toHaveProperty('zipcode', '88501440');
  });

  it('should return status code 200 with the first valid address sending a different zipcode to GET /address/:zipcode', async () => {
    const response = await request(app).get('/address/88999999')
      .set('token', await generateToken())
      .expect(200);

    expect(response.body).toHaveProperty('zipcode', '88000000');
  });

  it('Should return status code 400 when sending invalid address to GET /address/:zipcode', async () => {
    const response = await request(app).get('/address/99999999')
      .set('token', await generateToken())
      .expect(400);

    expect(response.badRequest).toBeTruthy();
  });

  it('should return status code 400 when sending malformated address to GET /address/:zipcode', async () => {
    const response = await request(app).get('/address/99999x999-9a99')
      .set('token', await generateToken())
      .expect(400);

    expect(response.badRequest).toBeTruthy();
  });
});
