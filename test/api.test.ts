import request from 'supertest';
import app from '../api/index';

describe('GET /', () => {
    it('should return 200 OK', () => {
        // return hello world
        return request(app).get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', "text/html; charset=utf-8")
        .expect(200, 'Hello World');
    });
});

describe('GET /invalid', () => {
    it('should return 404 Not Found', () => {
        // return not found
        return request(app).get('/invalid')
        .set('Accept', 'application/json')
        .expect('Content-Type', "text/html; charset=utf-8")
        .expect(404, 'Not Found');
    });
});

describe('POST /api/login', () => {
    it('should return 200 OK and a token', () => {
        // return access and refresh tokens
        return request(app).post('/api/login')
        .send({ username: 'admin', password: 'admin' })
        .set('Accept', 'application/json')
        .expect('Content-Type', "application/json; charset=utf-8")
        .expect(200)
        .then((response) => {
            expect(response.body).toHaveProperty('accessToken');
            expect(response.body).toHaveProperty('refreshToken');
        });
    });
});